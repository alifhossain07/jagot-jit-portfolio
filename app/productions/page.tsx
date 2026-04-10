'use client';

import React from 'react';
import { useMusic, Track } from '@/app/Context/MusicContext';
import { Play, Pause, ExternalLink, ArrowLeft } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import musicData from '@/data/spotify_playlist.json';

const SPOTIFY_PLAYLIST_URL = 'https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj?nd=1';

const getPlatformLabel = (url: string) => {
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be') ? 'YouTube' : 'Spotify';
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProductionsPage() {
  const { currentTrack, isPlaying, playTrack } = useMusic();

  return (
    <main className="py-10 lg:py-24 px-6 min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c29226]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#deee4d]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl 2xl:max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-[#deee4d]/60 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.6em] text-[#deee4d]/60">
                Full Catalog
              </span>
              <div className="h-[1px] w-12 bg-[#c29226]" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white font-geist-mono">
              ALL <span className="text-[#c29226] italic font-bulgatti block md:inline">Productions</span>
            </h1>
            
            <p className="text-white/40 max-w-xl text-lg leading-relaxed font-space-grotesk">
              Explore the complete collection of 35+ professional productions and engineering works.
            </p>
          </div>
        </div>

        {/* Grid for all 35 tracks - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {musicData.tracks.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            const isThisPlaying = isCurrent && isPlaying;
            const isYouTubeTrack = track.url.toLowerCase().includes('youtube.com') || track.url.toLowerCase().includes('youtu.be');
            const platformLabel = getPlatformLabel(track.url);

            return (
              <motion.div 
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={cn(
                  "group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden transition-all duration-500",
                  "hover:border-[#c29226]/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]",
                  isThisPlaying && "border-[#deee4d]/40 ring-1 ring-[#deee4d]/20"
                )}
              >
                {/* Image Area */}
                <div className="relative aspect-square overflow-hidden m-1.5 md:m-3 rounded-[1rem] md:rounded-[1.5rem]">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                      onClick={() => {
                        if (isYouTubeTrack) {
                          window.open(track.url, '_blank', 'noopener,noreferrer');
                          return;
                        }
                        playTrack(track as Track);
                      }}
                      className="w-10 h-10 md:w-14 md:h-14 bg-[#c29226] text-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl hover:bg-[#deee4d] hover:text-black hover:scale-110 active:scale-90"
                    >
                      {isThisPlaying ? (
                        <Pause className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
                      ) : (
                        <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" fill="currentColor" />
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
                <div className="px-3 pb-3 md:px-6 md:pb-6 pt-0 md:pt-1">
                   <div className="flex justify-between items-start gap-2 md:gap-3 mb-0.5 md:mb-1">
                    <h3 className="font-geist-mono font-light text-sm md:text-xl text-white truncate group-hover:text-[#deee4d] transition-colors tracking-tighter">
                      {track.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/40 font-space-grotesk text-[9px] md:text-xs mb-2 md:mb-4 flex items-center gap-1.5 md:gap-2">
                    <span className="w-1 h-1 bg-[#c29226] rounded-full" />
                    {track.artists.join(', ')}
                  </p>

                  <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/5">
                    <a 
                      href={track.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#deee4d]/60 hover:text-[#deee4d] transition-colors"
                    >
                      <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span className="truncate max-w-[60px] md:max-w-none">{platformLabel}</span>
                    </a>
                    <span className="text-[8px] md:text-[10px] font-mono text-white/20 whitespace-nowrap">
                      {track.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <a
            href={SPOTIFY_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#deee4d]/30 bg-[#c29226] px-6 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_25px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-[#d8a133] hover:scale-[1.03] lg:animate-breath"
          >
            <FaSpotify className="h-4 w-4 md:h-5 md:w-5 text-[#1DB954]" aria-hidden="true" />
            <span>Open Spotify Playlist</span>
          </a>
        </div>

        {/* Technical Footer */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
             <span>Streaming Quality // PCM High-Res</span>
             <span>Bit Depth: 24-bit // Sample Rate: 48kHz</span>
             <span>Total Tracks: {musicData.tracks.length}</span>
          </div>
          <div>
            © {new Date().getFullYear()} Jagot Jit Productions // All Rights Reserved
          </div>
        </div>
      </div>
    </main>
  );
}
