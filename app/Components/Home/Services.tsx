'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, SlidersHorizontal, Zap, Music4 } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Recording",
    description: "Get your projects recorded with high-fidelity tracking in a professional studio environment.",
    icon: Mic2,
    color: "#c29226", // Gold
  },
  {
    title: "Mixing",
    description: "Get your tracks balanced and sonically sculpted to meet modern industry standards.",
    icon: SlidersHorizontal,
    color: "#deee4d", // Lime
  },
  {
    title: "Mastering",
    description: "Get your music mastered and production-ready for global distribution and playback.",
    icon: Zap,
    color: "#c29226", // Gold
  },
  {
    title: "Production",
    description: "Get your vision brought to life with full-scale production from concept to completion.",
    icon: Music4,
    color: "#deee4d", // Lime
  }
];

const Services = () => {
  return (
    <section className="py-16 lg:py-20 xl:py-24 px-6 relative overflow-hidden" id="services">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center grayscale contrast-125 opacity-40"
        style={{ backgroundImage: "url('/images/parallax.jpg')" }}
      />
      {/* Deep Midnight Tint Overlay */}
      <div className="absolute inset-0 z-10 bg-[#0e1327]/40 backdrop-blur-[1px]" />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col items-center text-center mb-10 lg:mb-16 space-y-4 lg:space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 relative z-20"
          >
            <div className="h-[1px] w-6 lg:w-8 bg-[#c29226]" />
            <span className="text-[0.6rem] lg:text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
              Services
            </span>
            <div className="h-[1px] w-6 lg:w-8 bg-[#c29226]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tighter text-white font-geist-mono relative z-10 leading-[1.2]"
          >
            My <span className="text-[#c29226] italic font-bulgatti inline-block transform translate-y-1">Specialties</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="relative h-full bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl lg:rounded-3xl p-3.5 lg:p-6 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Minimal Icon Area */}
                <div 
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mb-2.5 lg:mb-4 transition-all duration-500 group-hover:scale-110 shadow-lg"
                  style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}40` }}
                >
                  <service.icon 
                    size={16} 
                    style={{ color: service.color }} 
                    className="group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Content */}
                <h3 
                  className="text-sm lg:text-xl font-geist-mono font-medium mb-1 lg:mb-2 transition-colors uppercase tracking-wider"
                  style={{ color: service.color }} 
                >
                  {service.title}
                </h3>
                
                <p className="text-white/60 font-space-grotesk text-[9px] lg:text-xs leading-relaxed group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>
                
                {/* Subtle bottom glow based on service color */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"
                  style={{ backgroundColor: service.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 lg:mt-16 flex justify-center"
        >
          <Link
            href="#booking"
            className="group relative inline-flex items-center justify-center rounded-full border border-ice/20 px-8 lg:px-10 py-3 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-ice shadow-[0_0_15px_rgba(239,252,253,0.1)] transition-all duration-500 bg-[#747a3e] hover:bg-[#c29226] hover:text-midnight hover:scale-105 active:scale-95"
          >
            Book a Session
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
