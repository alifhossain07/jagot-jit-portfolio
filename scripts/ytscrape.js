const puppeteer = require("puppeteer");

function extractVideoId(url) {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

async function scrapeVideo(url, page) {
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const title =
      document.querySelector("h1 yt-formatted-string")?.innerText ||
      document.querySelector("h1")?.innerText;

    const channel =
      document.querySelector("#channel-name a")?.innerText ||
      document.querySelector("ytd-channel-name a")?.innerText;

    return {
      title: title || "",
      channel: channel || ""
    };
  });

  const videoId = new URL(url).searchParams.get("v");

  return {
    id: videoId,
    title: data.title,
    artists: [data.channel],
    image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    url
  };
}

async function run() {
  const links = [
    "https://www.youtube.com/watch?v=mKFPAM7m-Lw",
    "https://www.youtube.com/watch?v=cXYSxwapk0c"
  ];

  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();

  const tracks = [];

  for (const link of links) {
    const video = await scrapeVideo(link, page);
    tracks.push(video);
  }

  await browser.close();

  const result = {
    playlistName: "Jagot Jit Productions",
    owner: "SamudraJS",
    playlistImage: "",
    totalTracksCollected: tracks.length,
    expectedTracksCount: links.length,
    tracks
  };

  console.log(JSON.stringify(result, null, 2));
}

run();