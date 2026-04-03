'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviews from '@/data/reviews.json';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isCarousel = reviews.length >= 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-midnight" id="reviews">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center grayscale contrast-125 opacity-40"
        style={{ backgroundImage: "url('/images/parallax.jpg')" }}
      />
      {/* Deep Midnight Tint Overlay */}
      <div className="absolute inset-0 z-10 bg-[#0e1327]/40 backdrop-blur-[1px]" />

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="flex flex-col items-start space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-8 bg-[#c29226]" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
                Testimonials
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-light tracking-tighter text-white font-geist-mono"
            >
              Client <span className="text-[#c29226] italic font-bulgatti inline-block transform translate-y-1">Reviews</span>
            </motion.h2>
          </div>

          {isCarousel && (
            <div className="flex gap-3 mb-2">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {isCarousel ? (
          /* Carousel Layout */
          <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / reviews.length)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${reviews.length * (100 / 3)}%` }}
            >
              {reviews.map((rev, idx) => (
                <ReviewCard key={rev.id} rev={rev} idx={idx} isCarousel={true} />
              ))}
            </motion.div>
          </div>
        ) : (
          /* Grid Layout (if ≤ 3) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <ReviewCard key={rev.id} rev={rev} idx={idx} isCarousel={false} />
            ))}
          </div>
        )}

        {/* Technical Summary Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10"
        >
          <div className="flex gap-8">
             <span>Verified Collaborations</span>
             <span>Ref: {isCarousel ? `${currentIndex + 1}/${reviews.length}` : 'Static'}</span>
          </div>
          <div className="hidden md:block">
            Professional Testimonials // Jagot Jit Productions
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface Review {
  id: string;
  name: string;
  designation: string;
  review: string;
  image?: string;
}

interface ReviewCardProps {
  rev: Review;
  idx: number;
  isCarousel: boolean;
}

const ReviewCard = ({ rev, idx, isCarousel }: ReviewCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className={`group relative ${isCarousel ? 'w-full md:w-[380px] flex-shrink-0' : ''}`}
    >
      <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:border-[#c29226]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-start text-left relative">
        
        <Quote className="text-[#deee4d]/20 mb-4 group-hover:text-[#deee4d]/40 transition-colors" size={32} />

        <div className="relative w-full">
          <p className="text-white/60 font-space-grotesk text-xs leading-relaxed mb-8 italic group-hover:text-white/80 transition-colors line-clamp-2">
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
          <div 
            className="min-w-0 flex-1 relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <h4 className="text-white font-geist-mono font-medium text-base leading-tight group-hover:text-[#c29226] transition-colors truncate">
              {rev.name}
            </h4>
            <p className="text-[#deee4d]/40 text-[0.6rem] uppercase tracking-widest font-bold mt-1 leading-tight truncate">
              {rev.designation}
            </p>

            {/* Designation Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute z-[100] bottom-full left-0 mb-3 w-[200px] p-3 bg-[#0e1327]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl pointer-events-none"
                >
                  <div className="absolute bottom-[-5px] left-4 w-2 h-2 bg-[#0e1327] border-r border-b border-white/10 rotate-45" />
                  <p className="text-[#deee4d]/90 font-space-grotesk text-[0.6rem] uppercase tracking-wider font-bold leading-relaxed">
                    {rev.designation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewsSection;

