import Image from "next/image";

const clientImages = [
  { name: "Conclusion", src: "/images/conclusion.png" },
  { name: "Nivaniya", src: "/images/nivaniya.png" },
  { name: "QOP", src: "/images/qop.png" },
  { name: "Achar", src: "/images/achar.png" },
];

const ClientMarquee = () => {
  const marqueeItems = [...clientImages, ...clientImages];

  return (
    <section className="relative isolate overflow-hidden bg-[#c29226]/70 py-20 px-5 md:px-10">
      <div className="absolute inset-0 opacity-[0.07] bg-grain pointer-events-none" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.65em] text-ice/70">
            Clients & Collaborations
          </p>
          <h2 className="text-4xl font-space-grotesk font-semibold leading-tight text-[#c8d647]">
          Artists, bands, and creators I’ve worked with.
          </h2>
          <p className="text-sm text-ice/70">
            From live sound engineering to studio production and mixing, I’ve collaborated with diverse artists and music collectives to shape powerful and authentic sonic experiences..
          </p>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[28px] border border-ice/10 bg-gradient-to-r from-maroon/60 via-peach/10 to-navy/70 py-8 shadow-[0_25px_60px_rgba(8,10,34,0.55)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-midnight via-midnight/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-midnight via-midnight/80 to-transparent" />

          <div className="flex animate-marquee gap-14 px-10">
            {marqueeItems.map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="flex min-w-[200px] items-center justify-center">
                <div className="relative h-24 w-40 rounded-2xl bg-ice/5 p-3 backdrop-blur">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-contain drop-shadow-[0_6px_15px_rgba(0,0,0,0.35)]"
                    sizes="160px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
