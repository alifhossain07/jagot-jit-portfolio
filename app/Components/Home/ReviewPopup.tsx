'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote } from 'lucide-react';
import Image from 'next/image';
import reviews from '@/data/reviews.json';

const ReviewPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomReview, setRandomReview] = useState<any>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const showNextReview = () => {
      // Pick a random review
      const randomIndex = Math.floor(Math.random() * reviews.length);
      setRandomReview(reviews[randomIndex]);
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

  const handleClose = () => {
    setIsVisible(false);
    // The cycle will continue naturally after the next 10s hide period
  };

  if (!randomReview) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-24 right-6 z-[60] w-[320px] max-w-[calc(100vw-3rem)]"
        >
          <div className="relative overflow-hidden bg-midnight/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X size={14} />
            </button>

            {/* Decorative Accent */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#c29226]/20 blur-3xl rounded-full" />

            <div className="relative space-y-4">
              <div className="flex items-center gap-2">
                <Quote size={16} className="text-[#deee4d]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#deee4d]/60">
                  Client Love
                </span>
              </div>

              <p className="text-white/80 text-xs leading-relaxed font-space-grotesk italic">
                &ldquo;{randomReview.review.slice(0, 120)}{randomReview.review.length > 120 ? '...' : ''}&rdquo;
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
              key={randomReview.id} // Re-trigger animation when review changes
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-[#c29226]/50 w-full origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewPopup;
