"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

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
      className="fixed right-6 top-[35%] -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4 p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, x: -5 }}
          className={`text-ice transition-colors duration-300 p-3 rounded-full hover:bg-white/10 ${social.color}`}
          aria-label={social.label}
        >
          <social.icon size={20} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
