'use client';

import React from 'react';
import { useMusic } from '@/app/Context/MusicContext';
import { Play, Pause, X } from 'lucide-react';
import Image from 'next/image';

const MiniPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, stopTrack, progress } = useMusic();

  if (!currentTrack) return null;

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-10 duration-500"
      id="mini-player"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden p-3 flex items-center gap-4 group">
        {/* Progress Bar background */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-black/10 w-full"
        />
        {/* Active Progress */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Track Info */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md flex-shrink-0">
          <Image 
            src={currentTrack.image} 
            alt={currentTrack.title}
            fill
            className="object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="flex gap-0.5 items-end h-3">
                <div className="w-0.5 bg-white animate-music-bar-1" />
                <div className="w-0.5 bg-white animate-music-bar-2" />
                <div className="w-0.5 bg-white animate-music-bar-3" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-bold text-black truncate leading-tight">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-black/60 truncate italic">
            {currentTrack.artists.join(', ')}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          
          <button
            onClick={() => stopTrack()} // Properly reset the state to close player
            className="p-2 text-black/40 hover:text-black transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
