"use client";

import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { openEmailComposer } from "@/app/lib/emailComposer";

const EMAIL_TO = "jagotjitsaha@gmail.com";
const EMAIL_SUBJECT = "Booking Inquiry";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/8801761629696",
    icon: FaWhatsapp,
    color: "transition-colors hover:text-[#25D366]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jagot.jit.7",
    icon: FaFacebookF,
    color: "transition-colors hover:text-[#1877F2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jagot_jit_/",
    icon: FaInstagram,
    color: "transition-colors hover:text-[#E4405F]",
  },
  {
    label: "Email",
    href: "#",
    icon: FaEnvelope,
    color: "transition-colors hover:text-sand",
  },
];

const SocialSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const handleEmailClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openEmailComposer({ to: EMAIL_TO, subject: EMAIL_SUBJECT });
  };

  useEffect(() => {
    // Initial entrance delay for that premium feel
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "fixed right-3 md:right-6 lg:top-[45%] top-[27%] -translate-y-1/2 z-[100] flex flex-col backdrop-blur-xl border border-white/10 shadow-2xl rounded-full bg-white/5",
        "p-1.5 gap-2 lg:p-2.5 lg:gap-3 2xl:p-3 2xl:gap-4",
        "transition-all duration-700 delay-1000", // Smooth entrance only
        !isMounted ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
      )}
    >
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          onClick={social.label === "Email" ? handleEmailClick : undefined}
          target={social.label === "Email" ? undefined : "_blank"}
          rel={social.label === "Email" ? undefined : "noopener noreferrer"}
          className={cn(
            "text-ice rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-300",
            "w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 2xl:w-11 2xl:h-11",
            "hover:scale-125 hover:-translate-x-1", // Keep the premium hover effect
            social.color
          )}
          aria-label={social.label}
        >
          <social.icon 
            className={cn(
              "w-3.5 h-3.5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5"
            )}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
