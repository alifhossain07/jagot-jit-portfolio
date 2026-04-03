import Image from "next/image";
import Link from "next/link";
import reviews from "@/data/reviews.json";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-start overflow-hidden py-20 px-5 md:px-10"
    >
      {/* Background image with fixed parallax feel */}
      <div
        // className="absolute inset-0 z-0 bg-fixed bg-cover bg-center grayscale contrast-110 brightness-75"
        // style={{ backgroundImage: "url('/images/hero.webp')" }}
        // aria-hidden="true"
      />

      {/* Layered vintage overlays */}
      {/* <div className="absolute inset-0 z-10 bg-midnight/40" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-peach/45 via-transparent to-navy/50 mix-blend-screen" />
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_48%,_rgba(6,2,4,0.55)_100%)] pointer-events-none" />

      {/* Subtle "Light Leak" accents */}
      {/* <div className="absolute -top-24 -left-24 z-40 w-96 h-96 bg-orange/25 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute -bottom-24 -right-24 z-40 w-96 h-96 bg-peach/30 blur-[160px] rounded-full animate-pulse-slow" />  */}

      {/* Scanlines + film grain for 70s texture */}
      {/* <div className="absolute inset-0 z-50 opacity-10 mix-blend-soft-light pointer-events-none bg-[repeating-linear-gradient(0deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)]" />
      <div className="absolute inset-0 z-60 pointer-events-none opacity-[0.03] bg-grain contrast-125 brightness-110" /> */}

      {/* 4. CONTENT + IMAGE: Split hero layout */}
      <div className="relative z-30 mx-auto grid w-full max-w-[1200px] items-center gap-12 md:px-0 lg:grid-cols-2">
        <div className="flex flex-col items-start space-y-8 text-left animate-float max-sm:items-center max-sm:text-center">
          <div className="flex flex-col items-start gap-2 max-sm:items-center">
            <span className="text-[0.9rem] font-bold uppercase tracking-[0.6em] text-sand/60">
              Available Worldwide
            </span>
            <div className="h-[1px] w-12 bg-orange" />
          </div>

          <h1 className="font-geist-mono text-[clamp(2.5rem,8vw,5.5rem)] font-light leading-[1] tracking-tighter text-ice">
            Jagot Jit
          </h1>

          <div className="flex flex-col gap-1 max-sm:items-center max-sm:text-center">
            <h2 className="text-lg md:text-xl font-medium uppercase tracking-[0.25em] text-[#c29226]">
              Sound Engineer &amp; Producer
            </h2>
          </div>

          {/* 5. VINTAGE BUTTONS: Ghost style with thin borders */}
          <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row max-sm:items-center">
            <Link
              href="#work"
              className="group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] leading-none text-ice"
            >
              <span>Explore Work</span>
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#c29226] transition-all duration-300 group-hover:h-[2px] group-hover:bg-orange" />
            </Link>

            <Link
              href="#booking"
              className="rounded-full border border-ice/20 px-10 py-3 text-xs font-bold uppercase tracking-[0.3em] text-ice shadow-[0_0_15px_rgba(239,252,253,0.1)] transition-all duration-500 hover:bg-ice hover:text-midnight"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
          <div className="relative aspect-[5/5] overflow-hidden">
            <Image
              src="/images/jagothero.webp"
              alt="Hero portrait"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 85vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom Marquee: Reviews */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-midnight/50 backdrop-blur-sm py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...reviews, ...reviews].map((rev, idx) => (
            <div key={`${rev.id}-${idx}`} className="flex items-center mx-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white italic">
                &ldquo;{rev.review.slice(0, 100)}...&rdquo;
              </span>
              <span className="ml-4 text-[10px] font-mono uppercase tracking-[0.4em] text-yellow-500">
                &mdash; {rev.name}
              </span>
              <div className="ml-12 h-1 w-1 rounded-full bg-orange/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
