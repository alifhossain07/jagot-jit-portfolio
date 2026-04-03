import About from "./Components/Home/About";
import Hero from "./Components/Home/Hero";
import MusicSection from "./Components/Home/MusicSection";
import Services from "./Components/Home/Services";
import ReviewsSection from "./Components/Home/ReviewsSection";
import ReviewPopup from "./Components/Home/ReviewPopup";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Services />
      <MusicSection />
      <ReviewsSection />
      
      {/* Timed Overlays */}
      <ReviewPopup />
    </main>
  );
}