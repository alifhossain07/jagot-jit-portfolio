'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";



const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[80vh] lg:min-h-[98vh] items-center justify-start overflow-hidden  lg:py-16 xl:py-20 px-5 bg-[#525333] md:px-10"
    >
      <div className="relative z-30 mx-auto grid w-full lg:w-9/12 2xl:w-8/12 items-center gap-8 lg:gap-10 xl:gap-12 md:px-0 lg:grid-cols-2">
        
        {/* Image - On top for mobile (Order 1), on right for desktop (Order 2) */}
        <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[340px] lg:max-w-[360px] xl:max-w-[320px] 2xl:max-w-[440px] lg:ml-auto lg:order-2">
          {/* Main Image Frame with HUD Decorations */}
          <div className="relative aspect-[4/5] bg-white/[0.03] backdrop-blur-0 md:backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] group">
            
            {/* Image with technical treatment */}
            <div className="absolute inset-2 rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden transition-all duration-700">
              <Image
                src="/images/jagot2.jpg"
                alt="Jagot Jit music producer and sound engineer in studio"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            </div>

            {/* HUD OVERLAYS */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl" />

           

            
          </div>
        </div>

        {/* Text Content - On bottom for mobile (Order 2), on left for desktop (Order 1) */}
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:items-start lg:text-left lg:order-1 animate-float">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 lg:items-start">
            <span className="text-[9px] sm:text-[11px] lg:text-[0.85rem] 2xl:text-[0.9rem] font-bold uppercase tracking-[0.6em] text-sand/60">
              Available Worldwide
            </span>
            <div className="h-[1px] w-6 sm:w-12 bg-orange" />
          </div>

          <h1 className="font-geist-mono 
            text-[1.8rem] sm:text-[3rem] 
            lg:text-[clamp(2rem,6vw,4rem)] 
            xl:text-[clamp(2.2rem,6.5vw,4.5rem)] 
            2xl:text-[clamp(2.5rem,8vw,5.5rem)] 
            font-light leading-[1] tracking-tighter text-ice">
            Jagot Jit
          </h1>

          <div className="flex flex-col gap-1 items-center text-center lg:items-start lg:text-left">
            <h2 className="text-[11px] sm:text-base lg:text-xl 2xl:text-2xl font-medium uppercase tracking-[0.2em] text-[#deee4d]/60 font-space-grotesk">
                Sound Engineer <span className="text-[#c29226] mx-1 sm:mx-2">&</span> Producer
            </h2>
          </div>

         

          <div className="mt-4 lg:mt-6 flex flex-row items-center gap-3 sm:gap-8 justify-center lg:justify-start w-full">
            <Link
              href="#productions"
              className="group relative inline-flex min-h-[36px] sm:min-h-[44px] items-center justify-center overflow-hidden px-4 sm:px-8 py-2 sm:py-3 text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-none text-ice flex-1 sm:flex-none whitespace-nowrap"
            >
              <span>Explore Work</span>
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#c29226] transition-all duration-300 group-hover:h-[2px] group-hover:bg-orange" />
            </Link>

            <Link
              href="#booking"
              className="rounded-full border border-ice/20 px-4 sm:px-10 py-2 sm:py-3 text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-ice shadow-[0_0_15px_rgba(239,252,253,0.1)] transition-all duration-500 hover:bg-ice hover:text-midnight flex-1 sm:flex-none whitespace-nowrap text-center"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

