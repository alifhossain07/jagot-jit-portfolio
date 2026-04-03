"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801761629696",
    icon: FaWhatsapp,
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#25D366]/80",
    text: "Chat on WhatsApp",
  },
  {
    label: "Facebook",
    href: "https://m.me/jagot.jit.7",
    icon: FaFacebookF,
    color: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#1877F2]/80",
    text: "Messenger Inbox",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/direct/t/jagot_jit_/",
    icon: FaInstagram,
    color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    hoverColor: "hover:opacity-90",
    text: "Instagram DM",
  },
  {
    label: "Email",
    href: "mailto:jagotjitsaha@gmail.com?subject=Booking Inquiry",
    icon: FaEnvelope,
    color: "bg-[#c29226]",
    hoverColor: "hover:bg-[#c29226]/80",
    text: "jagotjitsaha@gmail.com",
  },
];

const ContactSection = () => {
  return (
    <section id="booking" className="relative py-20 px-5 md:px-10 bg-[#c29226]/70">
      <div className="max-w-[1200px] mx-auto text-center space-y-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-ice font-space-grotesk tracking-tight"
          >
            Ready to start your project?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sand/80 max-w-2xl mx-auto text-lg leading-relaxed font-light"
          >
            Reach me on any of the following socials to directly contact me for your inquiries. Let&apos;s make something amazing together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all group`}
            >
              <div className={`p-4 rounded-xl ${social.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <social.icon size={24} />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-[0.2em] text-sand/60 font-bold">
                  {social.label}
                </span>
                <span className="text-lg font-medium text-ice group-hover:text-sand transition-colors">
                  {social.text}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="pt-8 opacity-20 flex justify-center gap-12 select-none pointer-events-none">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-ice" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-ice" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
