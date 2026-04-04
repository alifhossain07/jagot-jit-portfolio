'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaSpotify, FaWhatsapp } from 'react-icons/fa';

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/jagot.jit.7", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/jagot_jit_/", icon: FaInstagram },
  { label: "WhatsApp", href: "https://wa.me/8801761629696", icon: FaWhatsapp },
  { label: "Spotify", href: "https://spotify.com", icon: FaSpotify },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#525333] pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden" id="footer">
      {/* Background Decorative Texture */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c29226]/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#deee4d]/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-11/12 lg:w-10/12 xl:w-9/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 mb-12 lg:mb-16 xl:mb-20 text-center md:text-left">
          
          {/* Brand & Bio */}
          <div className="space-y-6">
            <Link 
              href="#home" 
              className="text-xl lg:text-2xl font-bold uppercase tracking-[0.2em] text-ice hover:text-sand transition-colors font-space-grotesk"
            >
              Jagot Jit
            </Link>
            <p className="text-white/40 text-xs lg:text-sm leading-relaxed font-space-grotesk max-w-xs mx-auto md:mx-0">
              Sound engineer and music producer specializing in high-fidelity recording, mixing, and artist-centric production. Delivering industry-standard sonic excellence.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a 
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ice hover:bg-[#c29226] hover:text-midnight transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="#productions"
                className="text-sm text-white/40 hover:text-white transition-colors tracking-wide"
              >
                Productions
              </Link>
            </nav>
          </div>

          {/* Services Quick List */}
          <div className="space-y-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
              Professional Services
            </h4>
            <div className="flex flex-col space-y-3">
              <span className="text-sm text-white/20">Recording Engineering</span>
              <span className="text-sm text-white/20">Hybrid Mixing</span>
              <span className="text-sm text-white/20">Analog Mastering</span>
              <span className="text-sm text-white/20">Artist Production</span>
            </div>
          </div>

          {/* Contact / Call to action */}
          <div className="space-y-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-[#deee4d]">
              Get in Touch
            </h4>
            <p className="text-xs lg:text-sm text-white/40 leading-relaxed font-space-grotesk">
              Available for projects worldwide. Let&apos;s make your vision sound professional.
            </p>
            <Link 
              href="#booking"
              className="inline-block rounded-full bg-[#c29226] px-6 lg:px-8 py-2.5 lg:py-3 text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-white hover:bg-ice hover:text-midnight transition-all duration-300 shadow-[0_0_20px_rgba(194,146,38,0.2)]"
            >
              Book Now
            </Link>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/10 text-center md:text-left">
            &copy; {currentYear} Jagot Jit Productions // Ref: PCM 24-bit 48kHz High Fidelity
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.4em] text-white/10">
            <span className="hover:text-[#c29226] cursor-pointer transition-colors">Digital Precision</span>
            <span className="hover:text-[#deee4d] cursor-pointer transition-colors">Analog Soul</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
