import About from "./Components/Home/About";
import Hero from "./Components/Home/Hero";
import MusicSection from "./Components/Home/MusicSection";
import Services from "./Components/Home/Services";
import ReviewsSection from "./Components/Home/ReviewsSection";
import ContactSection from "./Components/Home/ContactSection";
import ReviewPopup from "./Components/Home/ReviewPopup";

const siteUrl = "https://jagotjitproductions.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Jagot Jit",
      jobTitle: "Music Producer and Sound Engineer",
      url: siteUrl,
      image: `${siteUrl}/images/jagot2.jpg`,
      sameAs: [
        "https://www.instagram.com/jagot_jit_/",
        "https://www.facebook.com/jagot.jit.7",
        "https://open.spotify.com/playlist/1NQf9Wq0Nt7Fih4vzlfLhj?nd=1",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Jagot Jit",
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Jagot Jit Music Production",
      url: siteUrl,
      areaServed: "Worldwide",
      serviceType: ["Music Production", "Mixing", "Mastering", "Audio Engineering"],
      provider: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Services />
      <MusicSection />
      <ReviewsSection />
      <ContactSection />
      
      {/* Timed Overlays */}
      <ReviewPopup />
    </main>
  );
}