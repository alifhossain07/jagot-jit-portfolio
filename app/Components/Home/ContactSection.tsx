"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801761629696",
    icon: FaWhatsapp,
    text: "Chat Live",
    color: "#25D366",
  },
  {
    label: "Messenger",
    href: "https://m.me/jagot.jit.7",
    icon: FaFacebookF,
    text: "Message",
    color: "#1877F2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/direct/t/jagot_jit_/",
    icon: FaInstagram,
    text: "Direct DM",
    color: "#E4405F",
  },
  {
    label: "Email",
    href: "mailto:jagotjitsaha@gmail.com?subject=Booking Inquiry",
    icon: FaEnvelope,
    text: "Email Me",
    color: "#c29226", // Use Gold icon for email against dark background
  },
];

const ContactSection = () => {
  return (
    <section id="booking" className="relative py-12 px-5 md:px-10 bg-[#c29226] overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-[0.12] pointer-events-none" />
      
      <div className="2xl:max-w-[1300px] max-w-[1150px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 text-center md:text-left">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0e1327] font-geist-mono leading-none"
            >
              Get your music mixed, mastered, <br/> and release-ready.
            </motion.h2>
            <p className="text-[#0e1327] text-xs md:text-lg font-space-grotesk tracking-wide ">
              Connect via your preferred platform for immediate inquiries.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-[#0e1327] text-white shadow-xl"
          >
             <div className="w-2 h-2 rounded-full bg-sand animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-geist-mono">
               Quick response active
             </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ backgroundColor: "#1e2642" }}
              whileHover={{ y: -5, scale: 1.02, backgroundColor: "#151b33" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group flex flex-col p-4 md:p-5 rounded-2xl md:rounded-3xl transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div 
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: social.color }}
              />

              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ color: social.color }}
                >
                  <social.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </div>
                <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-white font-semibold font-geist-mono">
                  {social.label}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm md:text-base font-semibold text-white tracking-tight group-hover:text-sand transition-colors">
                  {social.text}
                </h4>
                <div className="flex items-center gap-2">
                   <span className="text-[8px] md:text-[9px] font-bold text-sand uppercase tracking-tighter">
                     Click to connect
                   </span>
                   <motion.div 
                     animate={{ x: [0, 4, 0] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="w-3 h-[1px] bg-sand" 
                   />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Minimal Bottom Label */}
        <div className="mt-10 pt-6 border-t border-[#0e1327]/5 flex justify-between items-center opacity-30 select-none">
            <span className="text-[9px] font-mono tracking-[0.2em] font-bold text-[#0e1327] uppercase">
                Secure Studio Link
            </span>
            <div className="flex gap-1.5 px-3 py-1 rounded-full border border-[#0e1327]">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#0e1327]" />)}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;




