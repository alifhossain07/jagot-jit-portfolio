'use client';

import React, { useRef, useState } from 'react';
import reviewsData from '@/data/reviews.json';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import Link from 'next/link';
import ReviewModal from './ReviewModal';
import ReviewCard, { Review } from './ReviewCard';

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

          <div className="flex items-center gap-4">
             <Link 
              href="/reviews" 
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#deee4d] hover:text-white transition-colors"
            >
              <span>See All Reviews</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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



export default ReviewsSection;
