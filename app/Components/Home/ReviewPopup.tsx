'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote } from 'lucide-react';
import Image from 'next/image';
import reviewsData from '@/data/reviews.json';

interface Review {
  id: string;
  name: string;
  review: string;
  image: string;
  designation: string;
}

import ReviewModal from './ReviewModal';

const ReviewPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomReview, setRandomReview] = useState<Review | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMusicSectionVisible, setIsMusicSectionVisible] = useState(false);
  const [isReviewsSectionVisible, setIsReviewsSectionVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showNextReview = () => {
      // Pick a random review
      const randomIndex = Math.floor(Math.random() * reviewsData.length);
      setRandomReview(reviewsData[randomIndex] as Review);
      setIsVisible(true);

      // Auto-close after 10 seconds
      timer = setTimeout(() => {
        setIsVisible(false);
        // Wait 10 seconds before showing the next one
        timer = setTimeout(showNextReview, 10000);
      }, 10000);
    };

    // Initial wait time of 10 seconds before first appearance
    timer = setTimeout(showNextReview, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Detect if footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
 
    const footer = document.getElementById('footer');
    if (footer) observer.observe(footer);
 
    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  // Suppress popup while music or reviews sections are in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'productions') {
            setIsMusicSectionVisible(entry.isIntersecting);
          }

          if (entry.target.id === 'reviews') {
            setIsReviewsSectionVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.2 }
    );

    const musicSection = document.getElementById('productions');
    const reviewsSection = document.getElementById('reviews');

    if (musicSection) observer.observe(musicSection);
    if (reviewsSection) observer.observe(reviewsSection);

    return () => {
      if (musicSection) observer.unobserve(musicSection);
      if (reviewsSection) observer.unobserve(reviewsSection);
      observer.disconnect();
    };
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleCardClick = () => {
    setIsExpanded(true);
  };

  if (!randomReview) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && !isExpanded && !isFooterVisible && !isMusicSectionVisible && !isReviewsSectionVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[10000] w-[260px] md:w-[320px] max-w-[calc(100vw-2rem)]"
          >
            <div 
              onClick={handleCardClick}
              className="relative overflow-hidden bg-midnight/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 md:p-5 shadow-[0_30px_70px_rgba(0,0,0,0.6)] group transition-all duration-300 cursor-pointer active:scale-95"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
              >
                <X size={14} />
              </button>

              {/* Decorative Accent */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#c29226]/20 blur-3xl rounded-full" />

              <div className="relative space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <Quote size={14} className="text-[#deee4d] md:w-4 md:h-4" />
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#deee4d]/60">
                    Client Love
                  </span>
                </div>

                <p className="text-white/80 text-[11px] md:text-sm leading-relaxed font-space-grotesk italic line-clamp-2">
                  &ldquo;{randomReview.review.slice(0, 80)}{randomReview.review.length > 80 ? '...' : ''}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={randomReview.image}
                      alt={randomReview.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-geist-mono text-[11px] font-medium leading-tight">
                      {randomReview.name}
                    </span>
                    <span className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">
                      {randomReview.designation.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar timer (visual only) */}
              <motion.div 
                key={randomReview.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-[#c29226]/50 w-full origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReviewModal 
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        review={randomReview}
      />
    </>
  );
};

export default ReviewPopup;
