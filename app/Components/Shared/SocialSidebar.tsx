"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801761629696",
    icon: FaWhatsapp,
    color: "hover:text-[#25D366]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jagot.jit.7",
    icon: FaFacebookF,
    color: "hover:text-[#1877F2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jagot_jit_/",
    icon: FaInstagram,
    color: "hover:text-[#E4405F]",
  },
  {
    label: "Email",
    href: "mailto:jagotjitsaha@gmail.com?subject=Booking Inquiry",
    icon: FaEnvelope,
    color: "hover:text-sand",
  },
];

const SocialSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className={cn(
        "fixed right-3 md:right-6 top-1/2 lg:top-[40%] -translate-y-1/2 z-[100] flex flex-col backdrop-blur-xl border border-white/10 shadow-2xl rounded-full bg-white/5 transition-all duration-500",
        "p-1.5 gap-2",                 // Mobile base
        "lg:p-2.5 lg:gap-3",          // lg to xl (reduced)
        "2xl:p-3 2xl:gap-4"           // For 2xl
      )}
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, x: -5 }}
          className={cn(
            "text-ice duration-300 rounded-full hover:bg-white/10 flex items-center justify-center transition-all",
            "w-7 h-7 md:w-8 md:h-8",    // Mobile sizes
            "lg:w-9 lg:h-9",             // lg sizes
            "2xl:w-11 2xl:h-11",         // 2xl sizes
            social.color
          )}
          aria-label={social.label}
        >
          <social.icon 
            className={cn(
              "w-3.5 h-3.5",            // Mobile
              "lg:w-4 lg:h-4",           // lg to xl
              "2xl:w-5 2xl:h-5"          // 2xl
            )}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
