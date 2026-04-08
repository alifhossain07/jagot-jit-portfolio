'use client';

import React, { useRef, useState } from 'react';
import reviewsData from '@/data/reviews.json';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ReviewModal from './ReviewModal';

interface Review {
  id: string;
  name: string;
  designation: string;
  review: string;
  image?: string;
}

const reviews = reviewsData as Review[];
const marqueeReviews = [...reviews, ...reviews];

const ReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  const handleExpand = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const scrollMobile = (direction: 'prev' | 'next') => {
    if (!mobileScrollerRef.current) return;

    const step = Math.max(mobileScrollerRef.current.clientWidth * 0.85, 260);
    const delta = direction === 'next' ? step : -step;
    mobileScrollerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-20 xl:py-24 px-6 relative overflow-hidden bg-midnight" id="reviews">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center grayscale contrast-125 opacity-40 md:bg-fixed"
        style={{ backgroundImage: "url('/images/parallax.jpg')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#0e1327]/70 md:bg-[#0e1327]/60 md:backdrop-blur-[1px]" />

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

          <div className="flex gap-2 md:hidden mb-2 self-start">
            <button
              onClick={() => scrollMobile('prev')}
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              aria-label="Previous review cards"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollMobile('next')}
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              aria-label="Next review cards"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <div
            ref={mobileScrollerRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((rev) => (
              <ReviewCard key={`mobile-${rev.id}`} rev={rev} onExpand={() => handleExpand(rev)} compact />
            ))}
          </div>
        </div>

        <div className="hidden md:block relative overflow-hidden w-full group">
          <div className="reviews-marquee-track flex gap-6 w-max group-hover:[animation-play-state:paused]">
            {marqueeReviews.map((rev, idx) => (
              <ReviewCard key={`${rev.id}-${idx}`} rev={rev} onExpand={() => handleExpand(rev)} />
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10">
          <div className="flex gap-8">
            <span>Verified Collaborations</span>
            <span>Marquee: CSS Compositor Mode</span>
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
  onExpand: () => void;
  compact?: boolean;
}

const ReviewCard = ({ rev, onExpand, compact = false }: ReviewCardProps) => {
  return (
    <button
      type="button"
      className={`group relative text-left cursor-pointer active:scale-[0.98] transition-transform duration-300 flex-shrink-0 snap-start ${compact ? 'w-[82vw] max-w-[340px]' : 'w-[340px] lg:w-[380px]'}`}
      onClick={onExpand}
    >
      <div className="h-full bg-white/[0.05] md:bg-white/[0.03] backdrop-blur-0 md:backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-500 hover:border-[#c29226]/30 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-start text-left relative">
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

export default ReviewsSection;
