'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  name: string;
  review: string;
  image?: string;
  designation: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
}

const ReviewModal = ({ isOpen, onClose, review }: ReviewModalProps) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/20 backdrop-blur-md">
          {/* Backdrop click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#5d5e3b] border border-white/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-6 md:space-y-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#c29226]/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#deee4d]/10 blur-3xl rounded-full" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="relative flex items-center gap-3">
              <Quote size={28} className="text-[#deee4d]" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#deee4d]/80">Full Review</span>
            </div>

            <div className="relative max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              <p className="text-white/90 text-sm md:text-lg leading-relaxed font-space-grotesk italic">
                &ldquo;{review.review}&rdquo;
              </p>
            </div>

            <div className="relative flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                {review.image ? (
                  <Image src={review.image} alt={review.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[#c29226]/10 flex items-center justify-center text-white/20 text-xl font-mono">
                    {review.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-geist-mono text-lg md:text-xl font-medium truncate">{review.name}</h4>
                <p className="text-[#deee4d]/60 text-xs md:text-sm uppercase tracking-wider mt-1">{review.designation}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
