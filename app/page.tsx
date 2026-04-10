import About from "./Components/Home/About";
import Hero from "./Components/Home/Hero";
import MusicSection from "./Components/Home/MusicSection";
import Services from "./Components/Home/Services";
import ReviewsSection from "./Components/Home/ReviewsSection";
import ContactSection from "./Components/Home/ContactSection";
import ReviewPopup from "./Components/Home/ReviewPopup";
import SocialProof from "./Components/Home/SocialProof";


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
      description: "Music producer and sound engineer based in Dhaka specializing in mixing, mastering, and music production for global artists.",
      image: `${siteUrl}/images/jagot2.jpg`,
      mainEntityOfPage: {
  "@type": "WebPage",
  "@id": siteUrl,
},
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
      logo: `${siteUrl}/images/jagot2.jpg`,
      inLanguage: "en",
      potentialAction: {
  "@type": "SearchAction",
  target: `${siteUrl}/?q={search_term_string}`,
  "query-input": "required name=search_term_string"
}
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Jagot Jit Music Production",
      url: siteUrl,
      description:
        "Music production, mixing, mastering, and audio engineering services for artists worldwide.",
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      serviceType: [
        "Music Production",
        "Mixing",
        "Mastering",
        "Audio Engineering",
      ],
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
     <section id="home"><Hero /></section>
<section id="about"><About /></section>
<section id="services"><Services /></section>
<section id="productions"><MusicSection /></section>
<section id="reviews"><ReviewsSection /></section>
<section id="featured-on"><SocialProof /></section>
<section id="contact"><ContactSection /></section>

      {/* Timed Overlays */}
      <ReviewPopup />
    </main>
  );
}
