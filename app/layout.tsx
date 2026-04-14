import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./Components/Shared/Header";
import SocialSidebar from "./Components/Shared/SocialSidebar";

const siteUrl = "https://jagotjitproductions.com";
const metadataBase = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("https://example.com");
  }
})();

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Jagot Jit | Music Producer & Audio Engineer",
    template: "%s | Jagot Jit",
  },
  description:
    "Jagot Jit is a top-rated music producer and sound engineer in Bangladesh (BD). Professional mixing, mastering, and production services for artists worldwide.",
  keywords: [
    "Jagot Jit",
    "music producer in BD",
    "sound engineer in BD",
    "best music producer in Bangladesh",
    "best mix master in BD",
    "Dhaka music producer",
    "mixing engineer Bangladesh",
    "mastering engineer BD",
    "audio engineering",
    "music production services",
  ],
  authors: [{ name: "Jagot Jit" }],
  creator: "Jagot Jit",
  publisher: "Jagot Jit",
  alternates: {
    canonical: "https://jagotjitproductions.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jagot Jit | Music Producer & Audio Engineer",
    description:
      "Jagot Jit is a music producer and sound engineer based in Dhaka, offering mixing, mastering, and full-scale music production services for artists worldwide.",
    siteName: "Jagot Jit",
    images: [
      {
        url: "/images/jagot2.jpg",
        width: 1200,
        height: 630,
        alt: "Jagot Jit in studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagot Jit | Music Producer & Audio Engineer",
    description:
      "Mixing, mastering, production, and session services for artists worldwide.",
    images: ["/images/jagot2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

import { MusicProvider } from "./Context/MusicContext";
import MiniPlayer from "./Components/Music/MiniPlayer";
import Footer from "./Components/Shared/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://jagotjitproductions.com/#person",
      name: "Jagot Jit",
      url: "https://jagotjitproductions.com",
      image: "https://jagotjitproductions.com/images/jagot2.jpg",
      jobTitle: "Music Producer & Audio Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      sameAs: [
        "https://instagram.com/jagot_jit_/",
        "https://www.facebook.com/jagot.jit.7",
        "https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj?nd=1"
      ]
            }),
          }}
        />

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Jagot Jit",
      url: "https://jagotjitproductions.com",
    }),
  }}
/>
      </head>
      <body className={`${bricolageGrotesque.variable} ${spaceGrotesk.variable} antialiased bg-[#525333] min-h-screen relative`}>
        {/* 70s Film Grain Overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Optional: Faded Paper Wash (Gives it that 70s warm tint) */}
        <div className="pointer-events-none fixed inset-0 z-40 bg-orange-900/5 mix-blend-multiply" />

        <MusicProvider>
          <Header />
          <SocialSidebar />
            <div className="relative z-10 transition-opacity duration-700">
               {children}
            </div>
          <Footer />
          <MiniPlayer />
        </MusicProvider>
        <GoogleAnalytics gaId="G-H4BFZ3P6T5" />
      </body>
    </html>
  );
}
