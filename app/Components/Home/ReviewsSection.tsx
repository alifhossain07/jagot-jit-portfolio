'use client';

import React from 'react';
import { motion } from 'framer-motion';
import reviews from '@/data/reviews.json';
import { Quote } from 'lucide-react';

const ReviewsSection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-midnight" id="reviews">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#c29226]/20 blur-[130px] rounded-full" />
         <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#deee4d]/20 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-12 bg-[#c29226]" />
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.6em] text-[#deee4d]/60">
              Testimonials
            </span>
            <div className="h-[1px] w-12 bg-[#c29226]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tighter text-white font-geist-mono"
          >
            Client <span className="text-[#c29226] italic font-bulgatti block md:inline">Reviews</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl text-lg leading-relaxed font-space-grotesk mt-4"
          >
            What artists and collaborators say about their experience working with Jagot Jit Productions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-[#c29226]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-start text-left">
                
                <Quote className="text-[#deee4d]/20 mb-6 group-hover:text-[#deee4d]/40 transition-colors" size={40} />

                <p className="text-white/60 font-space-grotesk text-sm leading-relaxed mb-10 italic group-hover:text-white/80 transition-colors">
                  &ldquo;{rev.review}&rdquo;
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    {/* Placeholder for images since I don't have real ones yet */}
                    <div className="absolute inset-0 bg-[#c29226]/10 flex items-center justify-center text-white/20 text-xs font-mono">
                       {rev.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-geist-mono font-medium text-lg leading-tight group-hover:text-[#c29226] transition-colors">
                      {rev.name}
                    </h4>
                    <p className="text-[#deee4d]/40 text-[0.7rem] uppercase tracking-widest font-bold mt-1 leading-tight max-w-[180px]">
                      {rev.designation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Summary Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10"
        >
          <div className="flex gap-8">
             <span>Verified Collaborations</span>
             <span>Ref: Industry Standard</span>
          </div>
          <div className="hidden md:block">
            Professional Testimonials // Jagot Jit Productions
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
