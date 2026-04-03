'use client';

import React, { createContext, useContext, useState, useRef } from 'react';

export interface Track {
  id: string;
  title: string;
  artists: string[];
  album: string;
  image: string;
  previewUrl: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  progress: number;
  stopTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: Track) => {
    console.log('playTrack triggered for:', track.title);
    
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    if (!track.previewUrl) {
      console.error('No previewUrl for track:', track.title);
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.src = track.previewUrl;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlay,
        progress,
        stopTrack,
      }}
    >
      {children}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnded}
        onError={(e) => console.error("Audio error:", e)}
      />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
