import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#c29226]/70 py-20">
      <div className="w-9/12 mx-auto flex flex-col md:flex-row items-center md:space-x-12">

        {/* Image Collage - 2 staggered images */}
        <div data-aos="fade-right" className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <div className="relative w-full max-w-[280px] md:max-w-[420px] h-[350px] md:h-[500px]">
            {/* Top Image (Shifted Left) */}
            <div className="absolute top-0 left-0 w-[100%] h-[60%] z-10 -translate-x-8 md:-translate-x-16 transition-transform duration-500 hover:scale-105 hover:z-20">
              <Image
                src="/images/keyboard.jpg"
                alt="Jagot Jit working in studio"
                fill
                className="rounded-xl shadow-2xl object-cover border-4 border-[#deee4d]/10"
              />
            </div>

            {/* Bottom Image (Shifted Right) */}
            <div className="absolute bottom-0 right-0 w-[100%] h-[60%] z-0 translate-x-8 md:translate-x-16 transition-transform duration-500 hover:scale-105 hover:z-20">
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
        <div data-aos="fade-left" className="font-space-grotesk md:w-1/2 space-y-6 text-center md:text-left text-[#deee4d]">

          <p className="font-geist-mono font-semibold tracking-widest uppercase text-sm">
            About
          </p>

          <div className="h-px w-16 bg-[#deee4d]/70 mx-auto md:mx-0" />

          <h2 className="font-geist-mono text-3xl md:text-4xl font-bold">
            Introducing Jagot Jit
          </h2>

          <p className="text-lg leading-relaxed text-white/80">
            Jagot Jit  is a sound engineer and music producer who works with artists and bands on recording, mixing, and music production. He also performs as a musician, playing drums for Nivaniya and keyboard for Conclusion, while collaborating with different artists as a session keyboardist.
          </p>

          {/* Roles */}
          <ul className="space-y-2 text-md">
            <li>🎧 Music Producer & Sound Engineer</li>
            <li>🎹 Keyboardist — Conclusion</li>
            <li>🥁 Drummer — Nivaniya</li>
            <li>🎚 Former Live Sound Engineer — Conclusion</li>
            <li>🎼 Session Keyboardist — Various Bands</li>
          </ul>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-4">

            <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-md">
              <p className="font-geist-mono text-xl font-bold">5+</p>
              <p className="text-sm">Years Experience</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-md">
              <p className="font-geist-mono text-xl font-bold">35+</p>
              <p className="text-sm">Songs Mixed & Produced</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-md">
              <p className="font-geist-mono text-xl font-bold">10+</p>
              <p className="text-sm">Artists & Bands Worked With</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}