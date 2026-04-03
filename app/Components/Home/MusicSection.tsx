'use client';

import React, { useState } from 'react';
import { useMusic, Track } from '@/app/Context/MusicContext';
import { Play, Pause, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import musicData from '@/data/spotify_playlist.json';

// Utility for cleaner class management
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MusicSection = () => {
  const { currentTrack, isPlaying, playTrack } = useMusic();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Limiting to first 10 tracks as requested
  const displayTracks = musicData.tracks.slice(0, 10);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTracks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTracks.length) % displayTracks.length);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="productions">
      {/* Background Decorative Elements to match Hero */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c29226]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#deee4d]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.6em] text-[#deee4d]/60">
                Latest Works
              </span>
              <div className="h-[1px] w-12 bg-[#c29226]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white font-geist-mono">
              MY <span className="text-[#c29226] italic font-bulgatti block md:inline">Productions</span>
            </h2>
            
            <p className="text-white/40 max-w-md text-lg leading-relaxed font-space-grotesk">
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
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div 
            className="flex gap-8"
            animate={{ x: `-${currentIndex * (100 / displayTracks.length)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${displayTracks.length * 30}%` }}
          >
            {displayTracks.map((track, idx) => {
              const isCurrent = currentTrack?.id === track.id;
              const isThisPlaying = isCurrent && isPlaying;

              return (
                <motion.div 
                  key={track.id}
                  className="w-full md:w-[320px] flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className={cn(
                    "group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500",
                    "hover:border-[#c29226]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]",
                    isThisPlaying && "border-[#deee4d]/40 ring-1 ring-[#deee4d]/20"
                  )}>
                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden m-3 rounded-[1.5rem]">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
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
                    <div className="px-6 pb-6 pt-1">
                       <div className="flex justify-between items-start gap-3 mb-1">
                        <h3 className="font-geist-mono font-light text-xl text-white truncate group-hover:text-[#deee4d] transition-colors tracking-tighter">
                          {track.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/40 font-space-grotesk text-xs mb-4 flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#c29226] rounded-full" />
                        {track.artists.join(', ')}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <a 
                          href={track.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#deee4d]/60 hover:text-[#deee4d] transition-colors"
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
                </motion.div>
              );
            })}
          </motion.div>
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
