// import ClientMarquee from "./Components/Home/ClientMarquee";
import About from "./Components/Home/About";
import Hero from "./Components/Home/Hero";

export default function Home() {
  return (
    <main className="relative bg-[#525333] overflow-hidden min-h-screen">
      {/* 70s Film Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Optional: Faded Paper Wash (Gives it that 70s warm tint) */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-orange-900/5 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        {/* <ClientMarquee /> */}
      </div>
    </main>
  );
}