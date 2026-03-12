import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#c29226]/70 py-20">
      <div className="w-9/12 mx-auto flex flex-col md:flex-row items-center md:space-x-12">
        
        {/* Image Collage */}
        <div data-aos="fade-right" className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <div className="flex space-x-4">
            
            {/* Left single centered image */}
            <div className="flex items-center">
              <Image
                src="/images/keyboard.jpg"
                alt="Jagot Jit working in studio"
                width={384}
                height={384}
                className="rounded-md shadow-lg w-40 md:w-96 md:h-auto h-96 object-cover"
              />
            </div>

            {/* Right two stacked images */}
            <div className="flex flex-col space-y-4">
              <Image
                src="/images/drum.jpg"
                alt="Music production studio"
                width={240}
                height={288}
                className="rounded-md shadow-lg w-40 md:w-60 h-64 md:h-72 object-cover"
              />
              <Image
                src="/images/studio.jpg"
                alt="Jagot Jit performing"
                width={240}
                height={240}
                className="rounded-md shadow-lg w-40 md:w-60 h-60 object-cover"
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