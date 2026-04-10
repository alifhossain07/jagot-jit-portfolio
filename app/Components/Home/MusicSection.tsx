'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useMusic, Track } from '@/app/Context/MusicContext';
import { Play, Pause, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import musicData from '@/data/spotify_playlist.json';

const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj?nd=1';

// Utility for cleaner class management
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MusicSection = () => {
  const { currentTrack, isPlaying, playTrack } = useMusic();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4); // Default to 4 for SSR/Desktop
  const [currentGap, setCurrentGap] = useState(32); // Default to 8 (32px) for desktop
  
  // Dragging state
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Limiting to first 8 tracks as requested
  const displayTracks = musicData.tracks.slice(0, 8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1.5);
        setCurrentGap(16); // gap-4
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
        setCurrentGap(32); // gap-8
      } else {
        setVisibleItems(4);
        setCurrentGap(32); // gap-8
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, displayTracks.length - visibleItems);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPointerDown(true);
    setIsDragging(false);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown) return;
    const diff = e.clientX - startX;
    
    if (!isDragging && Math.abs(diff) > 5) {
      setIsDragging(true);
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    }

    if (isDragging) {
      setDragOffset(diff);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPointerDown(false);
    if (isDragging) {
        setIsDragging(false);
        if (containerRef.current) {
            containerRef.current.releasePointerCapture(e.pointerId);
        }
        
        const containerWidth = containerRef.current?.offsetWidth || 1;
        const dragThreshold = containerWidth / (visibleItems * 4); // Slide if dragged 25% of an item
        
        if (dragOffset > dragThreshold) {
          prevSlide();
        } else if (dragOffset < -dragThreshold) {
          nextSlide();
        }
    }
    setDragOffset(0);
  };

  return (
    <section className="py-9 px-6 relative overflow-hidden" id="productions">
      {/* Background Decorative Elements to match Hero */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c29226]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#deee4d]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto relative z-10 mt-8 lg:mt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 lg:mb-16 gap-8">
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] lg:text-[0.7rem] font-bold uppercase tracking-[0.6em] text-[#deee4d]/60">
                Latest Works
              </span>
              <div className="h-[1px] w-10 lg:w-12 bg-[#c29226]" />
            </div>
            
            <h2 className="text-3xl xl:text-5xl 2xl:text-6xl font-light tracking-tighter text-white font-geist-mono animate-fade-in-up">
              MY <span className="text-[#c29226] italic font-bulgatti block md:inline">Productions</span>
            </h2>
            
            <p className="text-white/40 max-w-sm lg:max-w-md text-base lg:text-lg leading-relaxed font-space-grotesk">
              A curated selection of sound engineering and music production projects.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <Link 
              href="/productions" 
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#deee4d] hover:text-white transition-colors"
            >
              <span>See All Tracks</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex gap-2 ml-4">
              <button 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={cn(
                  "p-3 rounded-full border border-white/10 text-white transition-all active:scale-90",
                  currentIndex === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/5"
                )}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className={cn(
                  "p-3 rounded-full border border-white/10 text-white transition-all active:scale-90",
                  currentIndex >= maxIndex ? "opacity-20 cursor-not-allowed" : "hover:bg-white/5"
                )}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden pb-8">
          <div 
            ref={containerRef}
            className={cn(
              "flex gap-4 md:gap-8 transition-transform duration-700 ease-out will-change-transform",
              isDragging && "transition-none",
            )}
            style={{ 
              transform: `translateX(calc(-${currentIndex} * (100% + ${currentGap}px) / ${visibleItems} + ${dragOffset}px))`,
            }}
          >
            {displayTracks.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              const isThisPlaying = isCurrent && isPlaying;

              return (
                <div 
                  key={track.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: `calc((100% - ${Math.floor(visibleItems - 1) * currentGap}px) / ${visibleItems})`
                  }}
                >
                  <div className={cn(
                    "group relative bg-white/5 backdrop-blur-0 md:backdrop-blur-sm border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-500",
                    "hover:border-[#c29226]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]",
                    isThisPlaying && "border-[#deee4d]/40 ring-1 ring-[#deee4d]/20"
                  )}>
                    <div 
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className={cn(
                        "relative aspect-[4/3] md:aspect-square overflow-hidden m-1.5 md:m-3 rounded-[1.2rem] md:rounded-[1.5rem] select-none",
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                      )}
                    >                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 24vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isDragging) return;
                            playTrack(track as Track);
                          }}
                          className="w-14 h-14 bg-[#c29226] text-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl hover:bg-[#deee4d] hover:text-black hover:scale-110 active:scale-90"
                        >
                          {isThisPlaying ? (
                            <Pause size={24} fill="currentColor" />
                          ) : (
                            <Play size={24} fill="currentColor" className="ml-1" />
                          )}
                        </button>
                      </div>

                      {isThisPlaying && (
                        <div className="absolute top-4 right-4 bg-[#deee4d] text-black px-3 py-1.5 rounded-full flex gap-0.5 items-end h-6 shadow-xl">
                          <div className="w-0.5 bg-black animate-music-bar-1" />
                          <div className="w-0.5 bg-black animate-music-bar-2" />
                          <div className="w-0.5 bg-black animate-music-bar-3" />
                        </div>
                      )}
                    </div>

                    {/* Meta Area */}
                    <div className="px-4 pb-4 lg:px-6 lg:pb-6 pt-0">
                       <div className="flex justify-between items-start gap-3 mb-1">
                        <h3 className="font-geist-mono font-light text-base lg:text-lg text-white truncate group-hover:text-[#deee4d] transition-colors tracking-tighter">
                          {track.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/40 font-space-grotesk text-[9px] lg:text-[10px] mb-3 lg:mb-4 flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#c29226] rounded-full" />
                        {track.artists.join(', ')}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <a 
                          href={track.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#deee4d]/60 hover:text-[#deee4d] transition-colors"
                        >
                          <ExternalLink size={12} />
                          <span>Open in Spotify</span>
                        </a>
                        <span className="text-[10px] font-mono text-white/20">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 mb-12 md:mb-14 flex justify-center">
          <a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#deee4d]/30 bg-[#deee4d] px-5 py-3 md:px-7 text-[11px] md:text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_8px_25px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-[#d8a133] hover:scale-[1.03] lg:animate-breath"
          >
            <FaSpotify className="h-4 w-4 md:h-5 md:w-5 text-[#1DB954]" aria-hidden="true" />
            <span>Open Spotify Playlist</span>
          </a>
        </div>

        {/* Technical Footer Vibe to match Hero */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10">
          <div className="flex gap-8">
             <span>Stereo // 24-bit PCM</span>
             <span>Ref: {currentIndex + 1} of {displayTracks.length}</span>
          </div>
          <div className="hidden md:block">
            Production Credits // Jagot Jit Productions
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
