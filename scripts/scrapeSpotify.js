// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require('puppeteer');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const PLAYLIST_URL = 'https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj';
const OUTPUT_FILE = path.join(__dirname, '../data/spotify_playlist.json');

async function scrape() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  // Large viewport to capture more rows at once and reduce virtualization gaps
  await page.setViewport({ width: 1280, height: 2500 });

  console.log(`Navigating to ${PLAYLIST_URL}...`);
  await page.goto(PLAYLIST_URL, { waitUntil: 'networkidle2' });

  // Wait for initial rows to appear
  await page.waitForSelector('div[role="row"]', { timeout: 15000 }).catch(() => console.log('Wait timeout, continuing...'));

  // Extract Header Info
  const header = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1'));
    const playlistName = headings.find(h => h.innerText !== 'Your Library' && h.innerText !== '')?.innerText || 'Unknown Playlist';
    
    const owner = document.querySelector('a[data-testid="creator-link"]')
      || document.querySelector('a[href*="/user/"]')
      || document.querySelector('span[data-testid="playlist-owner"]')
      || { innerText: 'Unknown' };
    
    const image = document.querySelector('img[data-testid="playlist-image"]')?.src 
      || document.querySelector('img[data-testid="entity-image"]')?.src
      || document.querySelector('meta[property="og:image"]')?.content
      || '';

    const allText = document.body.innerText;
    const songCountMatch = allText.match(/(\d+)\s+songs/i);
    const expectedCount = songCountMatch ? parseInt(songCountMatch[1]) : 35;
    
    return { name: playlistName, owner: owner.innerText, image, expectedCount };
  });

  console.log(`Scraping playlist: ${header.name} by ${header.owner} (Expected: ${header.expectedCount} tracks)`);

  const tracks = new Map();
  let scrollCount = 0;
  let stagnantCount = 0;
  let lastSize = 0;

  const extractTracksInView = async () => {
    return await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('div[role="row"]'));
      return rows.map(row => {
        const titleLink = row.querySelector('a[href*="/track/"]');
        if (!titleLink) return null;
        
        const trackNameEl = row.querySelector('div[aria-colindex="2"] a div') 
                          || row.querySelector('div[aria-colindex="2"] div')
                          || titleLink;
        
        const titleText = (trackNameEl.innerText || "").split('\n')[0].trim();
        const artists = Array.from(row.querySelectorAll('a[href*="/artist/"]')).map(a => a.innerText.trim());
        const album = row.querySelector('a[href*="/album/"]')?.innerText.trim() || '';
        
        // High-res Image Logic (640x640)
        let image = row.querySelector('img')?.src || '';
        if (image.includes('00004851')) {
          image = image.replace('00004851', '0000b273');
        } else if (image.includes('00001e02')) {
          image = image.replace('00001e02', '0000b273');
        }
        
        const duration = row.querySelector('div[aria-colindex="5"]')?.innerText.trim()
                        || Array.from(row.querySelectorAll('.Type__TypeElement-sc-g933fd-0.fyHAsd')).pop()?.innerText.trim()
                        || '';
        
        return {
          id: titleLink.href.split('/').pop().split('?')[0],
          title: titleText,
          artists,
          album,
          image,
          duration,
          url: titleLink.href.split('?')[0]
        };
      }).filter(t => t !== null && t.title !== '');
    });
  };

  while (scrollCount < 150) {
    const visibleTracks = await extractTracksInView();
    visibleTracks.forEach(t => {
      if (!tracks.has(t.id)) {
        tracks.set(t.id, t);
      }
    });

    if (tracks.size === lastSize) {
      stagnantCount++;
    } else {
      stagnantCount = 0;
      console.log(`Collected ${tracks.size} tracks...`);
    }

    if (header.expectedCount > 0 && tracks.size >= header.expectedCount) {
       break;
    }

    const reachedEnd = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Recommended') || text.includes('Based on what\'s in this playlist');
    });
    if (reachedEnd && stagnantCount > 10) break;
    
    if (stagnantCount > 40) break;

    lastSize = tracks.size;

    await page.evaluate(() => {
      const scroller = document.querySelector('.os-viewport') 
                    || document.querySelector('.main-view-container__scroll-node')
                    || window;
      scroller.scrollBy(0, 400); 
    });

    await new Promise(r => setTimeout(r, 1000));
    scrollCount++;
  }

  // Final scroll logic
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 2000));
  const finalVisible = await extractTracksInView();
  finalVisible.forEach(t => { if (!tracks.has(t.id)) tracks.set(t.id, t); });

  const capturedTracks = Array.from(tracks.values()).slice(0, header.expectedCount || Infinity);
  console.log(`Total main tracks found: ${capturedTracks.length}. Fetching audio preview URLs...`);

  const tracksWithPreview = [];
  const embedPage = await browser.newPage();

  // Sequential fetch for reliability
  for (let i = 0; i < capturedTracks.length; i++) {
    const track = capturedTracks[i];
    console.log(`[${i + 1}/${capturedTracks.length}] Fetching preview for: ${track.title}`);
    
    try {
      const embedUrl = `https://open.spotify.com/embed/track/${track.id}`;
      await embedPage.goto(embedUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const previewUrl = await embedPage.evaluate(() => {
        try {
          const data = JSON.parse(document.getElementById('__NEXT_DATA__').innerText);
          // Try multiple paths just in case Spotify variations exist
          return data.props.pageProps.state.data.entity.audioPreview.url 
              || data.props.pageProps.state.data.entity.audioPreview?.url 
              || '';
        } catch (e) {
          return '';
        }
      });
      
      tracksWithPreview.push({ ...track, previewUrl });
    } catch (err) {
      console.error(`Failed to fetch preview for ${track.title}:`, err.message);
      tracksWithPreview.push({ ...track, previewUrl: '' });
    }
  }

  const result = {
    playlistName: header.name,
    owner: header.owner,
    playlistImage: header.image,
    totalTracksCollected: tracksWithPreview.length,
    expectedTracksCount: header.expectedCount,
    tracks: tracksWithPreview,
    scrapedAt: new Date().toISOString()
  };

  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log(`Successfully scraped ${result.tracks.length} tracks with audio previews to ${OUTPUT_FILE}`);

  await browser.close();
}

scrape().catch(err => {
  console.error('Error during scraping:', err);
  process.exit(1);
});
