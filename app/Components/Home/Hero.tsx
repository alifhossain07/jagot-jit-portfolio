'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import reviews from "@/data/reviews.json";
import { motion } from 'framer-motion';


const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-start overflow-hidden py-20 px-5 bg-[#525333] md:px-10"
    >
      <div className="relative z-30 mx-auto grid w-full max-w-[1200px] items-center gap-12 md:px-0 lg:grid-cols-2">
        <div className="flex flex-col items-start space-y-8 text-left animate-float max-sm:items-center max-sm:text-center">
          <div className="flex flex-col items-start gap-2 max-sm:items-center">
            <span className="text-[0.9rem] font-bold uppercase tracking-[0.6em] text-sand/60">
              Available Worldwide
            </span>
            <div className="h-[1px] w-12 bg-orange" />
          </div>

          <h1 className="font-geist-mono text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1] tracking-tighter text-ice">
            Jagot Jit
          </h1>

          <div className="flex flex-col gap-1 max-sm:items-center max-sm:text-center">
            <h2 className="text-xl md:text-2xl font-medium uppercase mt-2 tracking-[0.2em] text-[#deee4d]/60 font-space-grotesk">
                Sound Engineer <span className="text-[#c29226] mx-2">&</span> Producer
            </h2>
          </div>

          <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row max-sm:items-center">
            <Link
              href="#productions"
              className="group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] leading-none text-ice"
            >
              <span>Explore Work</span>
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#c29226] transition-all duration-300 group-hover:h-[2px] group-hover:bg-orange" />
            </Link>

            <Link
              href="#booking"
              className="rounded-full border border-ice/20 px-10 py-3 text-xs font-bold uppercase tracking-[0.3em] text-ice shadow-[0_0_15px_rgba(239,252,253,0.1)] transition-all duration-500 hover:bg-ice hover:text-midnight"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] lg:ml-auto">
          {/* Main Image Frame with HUD Decorations */}
          <div className="relative aspect-[4/5] bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] group">
            
            {/* Image with technical treatment */}
            <div className="absolute inset-2 rounded-[2rem] overflow-hidden  transition-all duration-700">
              <Image
                src="/images/jagot.jpg"
                alt="Jagot Jit"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              {/* Subtle technical scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            </div>

            {/* HUD OVERLAYS */}
            {/* Corner Viewfinder Brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl" />

            {/* Status Indicators */}
            <div className="absolute top-8 left-8 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-widest text-white/40">
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-red-500" 
                />
                <span className="text-white/80">REC // LIVE</span>
              </div>
              <span>FPS: 60.00</span>
              <span>ISO: 400</span>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center font-mono text-[8px] uppercase tracking-widest text-white/40">
              <div className="flex flex-col gap-1">
                <span>LEVEL: -6.4 dB</span>
                <span>FREQ: 48kHz</span>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span>REF: JJ-STUDIO-A</span>
                <span>SYNC: GLOBAL</span>
              </div>
            </div>

            {/* Floating Icon Decoration */}
           
          </div>
        </div>
      </div>

      {/* Bottom Marquee: Reviews */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-midnight/50 backdrop-blur-sm py-5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...reviews, ...reviews].map((rev, idx) => (
            <div key={`${rev.id}-${idx}`} className="flex items-center mx-12">
              <span className="text-lg font-mono uppercase tracking-[0.4em] text-white italic">
                &ldquo;{rev.review.slice(0, 100)}...&rdquo;
              </span>
              <span className="ml-4 text-lg font-mono uppercase tracking-[0.4em] text-yellow-500">
                &mdash; {rev.name}
              </span>
              <div className="ml-12 h-1 w-1 rounded-full bg-orange/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

