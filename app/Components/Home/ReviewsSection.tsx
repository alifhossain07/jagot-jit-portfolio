'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import reviewsData from '@/data/reviews.json';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import ReviewModal from './ReviewModal';

interface Review {
  id: string;
  name: string;
  designation: string;
  review: string;
  image?: string;
}

const ReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Carousel State
  const [offset, setOffset] = useState(0); // Offset in percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); // In pixels
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGap, setCurrentGap] = useState(24);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Configuration
  const SCROLL_SPEED = 0.040; // Percentage per frame (~1% every 66 frames)
  const reviews = reviewsData as Review[];
  const extendedReviews = [...reviews, ...reviews, ...reviews]; // 3x for infinite feel
  const totalReviews = reviews.length;
  
  // Responsive visible items
  const [visibleItems, setVisibleItems] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 768) {
        setVisibleItems(1);
        setCurrentGap(16); // gap-4 
      } else if (width < 1024) {
        setVisibleItems(2);
        setCurrentGap(24); // gap-6
      } else {
        setVisibleItems(3);
        setCurrentGap(24); // gap-6
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemWidthPercent = 100 / visibleItems;
  const loopLimit = 100; // Reset at 100% (end of the first reviews set)

  // Animation Loop
  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      if (!isPaused && !isPointerDown && !isDragging && !isNavigating && !isMobile) {
        setOffset((prev) => {
          let next = prev + SCROLL_SPEED;
          if (next >= loopLimit) next = 0;
          return next;
        });
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [isPaused, isPointerDown, isDragging, isNavigating, isMobile, loopLimit]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Actions
  const getSlotWidthPercent = () => {
    if (!containerRef.current) return 100 / visibleItems;
    const containerWidth = containerRef.current.offsetWidth;
    // The total width of one item + its gap as a percentage of the container
    return ((containerWidth / visibleItems + currentGap) / containerWidth) * 100;
  };

  const nextSlide = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    const slotWidth = getSlotWidthPercent();
    setOffset((prev) => {
        const nextIdx = Math.round(prev / slotWidth) + 1;
        let nextPos = nextIdx * slotWidth;
        if (nextPos >= totalReviews * slotWidth) nextPos = 0;
        return nextPos;
    });
    setTimeout(() => setIsNavigating(false), 700);
  };

  const prevSlide = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    const slotWidth = getSlotWidthPercent();
    setOffset((prev) => {
        const nextIdx = Math.round(prev / slotWidth) - 1;
        let nextPos = nextIdx * slotWidth;
        if (nextPos < 0) nextPos = (totalReviews - visibleItems) * slotWidth;
        return nextPos;
    });
    setTimeout(() => setIsNavigating(false), 700);
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
    
    if (!isDragging && Math.abs(diff) > 10) {
      setIsDragging(true);
      if (containerRef.current) containerRef.current.setPointerCapture(e.pointerId);
    }
    
    if (isDragging) {
      setDragOffset(diff);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const dragPercentage = (dragOffset / containerWidth) * 100;
        
        setOffset((prev) => {
            let next = prev - dragPercentage;
            // Snap to nearest item
            next = Math.round(next / itemWidthPercent) * itemWidthPercent;
            
            // Loop boundaries
            if (next < 0) next = (totalReviews - visibleItems) * itemWidthPercent;
            if (next >= totalReviews * itemWidthPercent) next = 0;
            
            return next;
        });
        
        containerRef.current.releasePointerCapture(e.pointerId);
    }
    
    setIsPointerDown(false);
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleExpand = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 lg:py-20 xl:py-24 px-6 relative overflow-hidden bg-midnight" id="reviews">
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center grayscale contrast-125 opacity-40"
        style={{ backgroundImage: "url('/images/parallax.jpg')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#0e1327]/60 backdrop-blur-[2px]" />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 md:gap-8">
          <div className="flex flex-col items-start space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#c29226]" />
              <span className="text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
                Testimonials
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl xl:text-6xl font-light tracking-tighter text-white font-geist-mono">
              Client <span className="text-[#c29226] italic font-bulgatti inline-block transform translate-y-1">Reviews</span>
            </h2>
          </div>

          <div className="flex gap-2 md:gap-3 mb-2 self-start md:self-auto">
            <button 
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden w-full group">
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={cn(
                "flex gap-4 md:gap-6 will-change-transform",
                isDragging ? "cursor-grabbing" : "cursor-grab",
                // Transition only when not dragging
                !isDragging && "transition-transform duration-700 ease-out"
            )}
            style={{ 
              transform: `translateX(calc(-${offset}% + ${dragOffset}px))`,
            }}
          >
            {extendedReviews.map((rev, idx) => (
              <ReviewCard 
                key={`${rev.id}-${idx}`} 
                rev={rev} 
                visibleItems={visibleItems}
                onExpand={() => handleExpand(rev)} 
              />
            ))}
          </div>
        </div>

        {/* Technical Summary Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10">
          <div className="flex gap-8">
             <span>Verified Collaborations</span>
             <span>Ref: Marquee Mode // {Math.round(offset)}%</span>
          </div>
          <div className="hidden md:block">
            Professional Testimonials // Jagot Jit Productions
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
      />
    </section>
  );
};

interface ReviewCardProps {
  rev: Review;
  visibleItems: number;
  onExpand: () => void;
}

const ReviewCard = ({ rev, visibleItems, onExpand }: ReviewCardProps) => {
  return (
    <div
      className="group relative cursor-pointer active:scale-[0.98] transition-transform duration-300 flex-shrink-0"
      style={{ 
          width: `calc((100% - ${(visibleItems - 1) * (visibleItems < 2 ? 0 : 24)}px) / ${visibleItems})`
      }}
      onClick={onExpand}
    >
      <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 hover:border-[#c29226]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-start text-left relative">
        
        <Quote className="text-[#deee4d]/20 mb-4 group-hover:text-[#deee4d]/40 transition-colors shrink-0 w-8 h-8" />

        <div className="relative w-full">
          <p className="text-white/60 font-space-grotesk text-[13px] md:text-sm leading-relaxed mb-6 md:mb-8 italic group-hover:text-white/80 transition-colors line-clamp-4">
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
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            ) : (
              <div className="absolute inset-0 bg-[#c29226]/10 flex items-center justify-center text-white/20 text-xs font-mono">
                 {rev.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 relative group/tooltip">
            <h4 className="text-white font-geist-mono font-medium text-base leading-tight group-hover:text-[#c29226] transition-colors truncate">
              {rev.name}
            </h4>
            <p className="text-[#deee4d]/40 text-[0.6rem] uppercase tracking-widest font-bold mt-1 leading-tight truncate">
              {rev.designation}
            </p>

            {/* Designation Tooltip (CSS only) */}
            <div className="absolute z-[100] bottom-full left-0 mb-3 w-[220px] p-4 bg-[#0e1327]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl pointer-events-none opacity-0 group-hover/tooltip:opacity-100 translate-y-2 group-hover/tooltip:translate-y-0 transition-all duration-300">
                <div className="absolute bottom-[-5px] left-4 w-2 h-2 bg-[#0e1327] border-r border-b border-white/10 rotate-45" />
                <p className="text-[#deee4d]/90 font-space-grotesk text-[0.65rem] uppercase tracking-wider font-bold leading-relaxed">
                    {rev.designation}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
