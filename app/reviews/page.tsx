'use client';

import React, { useState } from 'react';
import reviewsData from '@/data/reviews.json';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReviewCard, { Review } from '../Components/Home/ReviewCard';
import ReviewModal from '../Components/Home/ReviewModal';

const reviews = reviewsData as Review[];

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <main className="py-10 lg:py-24 px-6 min-h-screen relative overflow-hidden bg-midnight">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c29226]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#deee4d]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Parallax Background Style Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center grayscale contrast-125 opacity-20 md:bg-fixed"
        style={{ backgroundImage: "url('/images/parallax.jpg')" }}
      />
      <div className="absolute inset-0 z-10 bg-[#0e1327]/60 md:backdrop-blur-[1px]" />

      <div className="max-w-5xl 2xl:max-w-7xl mx-auto relative z-20">
        <div className="mb-20">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-[#deee4d]/60 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.6em] text-[#deee4d]/60">
                Testimonials
              </span>
              <div className="h-[1px] w-12 bg-[#c29226]" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white font-geist-mono">
              CLIENT <span className="text-[#c29226] italic font-bulgatti block md:inline">Reviews</span>
            </h1>
            
            <p className="text-white/40 max-w-xl text-lg leading-relaxed font-space-grotesk">
              Read what artists and collaborators have to say about working with Jagot Jit.
            </p>
          </div>
        </div>

        {/* Grid for all reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-center md:justify-start"
            >
              <ReviewCard 
                rev={rev} 
                onExpand={() => handleExpand(rev)} 
                compact={false}
                className="w-full !max-w-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
             <span>Verified Feedback // Client Success</span>
             <span>Total Reviews: {reviews.length}</span>
          </div>
          <div>
            © {new Date().getFullYear()} Jagot Jit Productions // All Rights Reserved
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
      />
    </main>
  );
}
