"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaSpotify, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },

  { label: "Services", href: "#services" },
  { label: "Productions", href: "#productions" },
  { label: "Reviews", href: "#reviews" },

];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/jagot.jit.7", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/jagot_jit_/", icon: FaInstagram },
  { label: "WhatsApp", href: "https://wa.me/8801761629696", icon: FaWhatsapp },
  { label: "Spotify", href: "https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj?nd=1", icon: FaSpotify },
  { label: "Email", href: "mailto:jagotjitsaha@gmail.com?subject=Booking Inquiry", icon: FaEnvelope },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-[70px] items-center justify-center shadow-xl border-b border-transparent px-5 md:px-10 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#747a3e] border-tan shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      {/* Inner wrapper */}
      <div className="flex w-full max-w-[1400px] items-center justify-between gap-7">
        {/* Left nav links – hidden on mobile */}
        <nav className="hidden md:flex flex-1 items-center gap-[18px]" aria-label="Primary">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="font-space-grotesk uppercase tracking-[0.15em] text-ice text-[0.85rem] transition-all duration-300 hover:text-sand hover:-translate-y-px"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Center logo */}
        <Link
          href="#home"
          onClick={handleNavClick}
          className="font-space-grotesk text-[1.2rem] font-semibold uppercase tracking-[0.25em] text-ice transition-all duration-300 hover:text-sand hover:scale-105 mx-auto md:mx-0"
        >
          Jagot Jit 
        </Link>

        {/* Right side – hidden on mobile */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-6">
          <div className="flex items-center gap-[18px]" aria-label="Social media">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-ice text-base transition-all duration-300 hover:text-sand"
              >
                <Icon />
              </a>
            ))}
          </div>

          <Link
            href="#booking"
            onClick={handleNavClick}
            className="whitespace-nowrap rounded-full bg-[#c29226] px-[1.4rem] py-[0.6rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-ice transition-all duration-300 hover:bg-[#c29226]/80 hover:scale-105"
          >
            Book a Session
          </Link>
        </div>

        {/* Hamburger toggle – visible on mobile */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="ml-auto flex md:hidden h-8 w-8 flex-col items-end justify-center gap-[5px] bg-transparent border-none cursor-pointer"
        >
          <span
            className={`block h-[2px] w-full bg-ice transition-all duration-200 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-ice transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-ice transition-all duration-200 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`absolute top-[70px] left-0 w-full bg-navy flex flex-col gap-[18px] p-5 origin-top transition-all duration-300 ${
          menuOpen
            ? "scale-y-100 opacity-100 pointer-events-auto"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3.5" aria-label="Mobile primary">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="font-space-grotesk uppercase tracking-[0.15em] text-sand text-[0.95rem] transition-colors duration-300 hover:text-ice"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3.5" aria-label="Mobile social links">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-sand text-base transition-colors duration-300 hover:text-ice"
            >
              <Icon />
            </a>
          ))}
        </div>

        <Link
          href="#booking"
          onClick={handleNavClick}
          className="w-full text-center rounded-md  px-[1.4rem] py-[0.6rem] text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-ice transition-all duration-300 hover:bg-crimson hover:scale-105"
        >
          Book a Session
        </Link>
      </div>
    </header>
  );
};

export default Header;