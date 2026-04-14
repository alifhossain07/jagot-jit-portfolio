'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export interface Review {
  id: string;
  name: string;
  designation: string;
  review: string;
  image?: string;
}

interface ReviewCardProps {
  rev: Review;
  onExpand: () => void;
  compact?: boolean;
  className?: string;
}

const ReviewCard = ({ rev, onExpand, compact = false, className = "" }: ReviewCardProps) => {
  const defaultWidth = compact ? 'w-[82vw] max-w-[340px]' : 'w-[340px] lg:w-[380px]';
  
  return (
    <button
      type="button"
      className={`group relative text-left cursor-pointer active:scale-[0.98] transition-all duration-300 flex-shrink-0 snap-start 
        ${className.includes('w-') ? '' : defaultWidth} ${className}`}
      onClick={onExpand}
    >
      <div className="h-full bg-white/[0.05] md:bg-white/[0.03] backdrop-blur-0 md:backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-6 xl:p-8 transition-all duration-500 hover:border-[#c29226]/30 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-start text-left relative">
        <Quote className="text-[#deee4d]/20 mb-4 group-hover:text-[#deee4d]/40 transition-colors shrink-0 w-8 h-8" />

        <div className="relative w-full">
          <p className="text-white/70 font-space-grotesk text-[13px] md:text-sm leading-relaxed mb-6 md:mb-8 italic group-hover:text-white/85 transition-colors line-clamp-4">
            &ldquo;{rev.review}&rdquo;
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3 w-full">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
            {rev.image ? (
              <Image
                src={rev.image}
                alt={rev.name}
                fill
                sizes="48px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-[#c29226]/10 flex items-center justify-center text-white/20 text-xs font-mono">
                {rev.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-white font-geist-mono font-medium text-base leading-tight group-hover:text-[#c29226] transition-colors truncate">
              {rev.name}
            </h4>
            <p className="text-[#deee4d]/40 text-[0.6rem] uppercase tracking-widest font-bold mt-1 leading-tight truncate">
              {rev.designation}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReviewCard;
