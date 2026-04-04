import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#c29226]/70 py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      
      {/* --------------------------------------------------------------------------- */}
      {/* 1. DESKTOP/LAPTOP LAYOUT (Visible on md and up) */}
      {/* --------------------------------------------------------------------------- */}
      <div className="hidden md:flex w-11/12 lg:w-10/12 xl:w-9/12 mx-auto flex-row items-center md:space-x-8 lg:space-x-12">
        {/* Image Collage */}
        <div data-aos="fade-right" className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <div className="relative w-full max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] h-[400px] lg:h-[450px] xl:h-[500px]">
            {/* Top Image (Shifted Left) */}
            <div className="absolute top-0 left-0 2xl:w-[100%] w-[90%] h-[20%] lg:h-[60%] z-10 -translate-x-8 lg:-translate-x-12 xl:-translate-x-16 transition-transform duration-500 hover:scale-105 hover:z-20">
              <Image
                src="/images/keyboard.jpg"
                alt="Jagot Jit working in studio"
                fill
                className="rounded-xl shadow-2xl object-cover border-4 border-[#deee4d]/10"
              />
            </div>

            {/* Bottom Image (Shifted Right) */}
            <div className="absolute bottom-0 right-0 2xl:w-[100%] w-[90%] h-[10%] lg:h-[60%] z-0 translate-x-8 lg:translate-x-12 xl:translate-x-16 transition-transform duration-500 hover:scale-105 hover:z-20">
              <Image
                src="/images/studio.jpg"
                alt="Music production studio"
                fill
                className="rounded-xl shadow-2xl object-cover border-4 border-[#deee4d]/10"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div data-aos="fade-left" className="font-space-grotesk md:w-1/2 space-y-4 lg:space-y-6 text-left text-[#deee4d]">
          <p className="font-geist-mono font-semibold tracking-widest uppercase text-[10px] lg:text-xs xl:text-sm">
            About
          </p>
          <div className="h-px w-12 lg:w-16 bg-[#deee4d]/70 mx-auto md:mx-0" />
          <h2 className="font-geist-mono text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
            Introducing Jagot Jit
          </h2>
          <p className="text-sm lg:text-base 2xl:text-lg leading-relaxed text-white/80">
            Jagot Jit is a sound engineer and music producer who works with artists and bands on recording, mixing, and music production. He also performs as a musician, playing drums for Nivaniya and keyboard for Conclusion, while collaborating with different artists as a session keyboardist.
          </p>

          <ul className="space-y-1 lg:space-y-2 text-xs lg:text-sm xl:text-md">
            <li>🎧 Music Producer & Sound Engineer</li>
            <li>🎹 Keyboardist — Conclusion</li>
            <li>🥁 Drummer — Nivaniya</li>
            <li>🎚 Former Live Sound Engineer — Conclusion</li>
            <li>🎼 Session Keyboardist — Various Bands</li>
          </ul>

          <div className="flex flex-wrap gap-4 lg:gap-6 pt-2 lg:pt-4 justify-start">
            <div className="bg-white/20 backdrop-blur-sm px-4 lg:px-5 py-2 lg:py-3 rounded-md">
              <p className="font-geist-mono text-lg lg:text-xl font-bold">5+</p>
              <p className="text-[10px] lg:text-xs">Years Experience</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 lg:px-5 py-2 lg:py-3 rounded-md">
              <p className="font-geist-mono text-lg lg:text-xl font-bold">35+</p>
              <p className="text-[10px] lg:text-xs">Songs Produced</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 lg:px-5 py-2 lg:py-3 rounded-md">
              <p className="font-geist-mono text-lg lg:text-xl font-bold">10+</p>
              <p className="text-[10px] lg:text-xs">Artists Worked With</p>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* 2. MOBILE LAYOUT (Visible only on mobile) */}
      {/* --------------------------------------------------------------------------- */}
      <div className="md:hidden w-11/12 mx-auto flex flex-col space-y-12">
        
        {/* Mobile Text Content (Top) */}
        <div className="font-space-grotesk space-y-3 text-center text-[#deee4d]">
          <div className="flex flex-col items-center gap-3">
             <p className="font-geist-mono font-semibold tracking-widest uppercase text-[10px]">
                About
              </p>
              <div className="h-px w-10 bg-[#deee4d]/70" />
          </div>

          <h2 className="font-geist-mono text-2xl font-bold leading-tight">
            Introducing Jagot Jit
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Jagot Jit is a sound engineer and music producer who works with artists and bands on recording, mixing, and music production. He also performs as a musician, playing drums for Nivaniya and keyboard for Conclusion.
          </p>

          <ul className="space-y-2 text-[11px] text-white/70">
            <li>🎧 Music Producer & Sound Engineer</li>
            <li>🎹 Keyboardist — Conclusion</li>
            <li>🥁 Drummer — Nivaniya</li>
            <li>🎚 Former Live Sound Engineer — Conclusion</li>
            <li>🎼 Session Keyboardist — Various Bands</li>
          </ul>

        <div className="flex justify-center flex-wrap gap-3 pt-4">
  
  <div className="bg-white/20 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-md border border-white/5">
    <p className="font-geist-mono text-base lg:text-lg font-bold text-white leading-none">
      5+
    </p>
    <p className="text-[9px] uppercase tracking-wider leading-none text-white/80">
      Years Exp
    </p>
  </div>

  <div className="bg-white/20 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-md border border-white/5">
    <p className="font-geist-mono text-base lg:text-lg font-bold text-white leading-none">
      35+
    </p>
    <p className="text-[9px] uppercase tracking-wider leading-none text-white/80">
      Produced
    </p>
  </div>

  <div className="bg-white/20 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-md border border-white/5">
    <p className="font-geist-mono text-base lg:text-lg font-bold text-white leading-none">
      10+
    </p>
    <p className="text-[9px] uppercase tracking-wider leading-none text-white/80">
      Artists
    </p>
  </div>

</div>
        </div>

        {/* Mobile Image Collage (Bottom) */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[320px]">
            {/* Top Image */}
            <div className="absolute top-0 left-0 w-[85%] h-[65%] z-10 -translate-x-4 shadow-2xl">
              <Image
                src="/images/keyboard.jpg"
                alt="Jagot Jit studio"
                fill
                className="rounded-2xl object-cover border-2 border-[#deee4d]/30"
              />
            </div>

            {/* Bottom Image */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[65%] z-0 translate-x-4 shadow-2xl">
              <Image
                src="/images/studio.jpg"
                alt="Studio setup"
                fill
                className="rounded-2xl object-cover border-2 border-[#deee4d]/30"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}