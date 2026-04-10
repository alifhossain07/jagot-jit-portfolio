import Image from "next/image";
import { ExternalLink } from "lucide-react";

const platformLinks = [
  {
    name: "Genius",
    href: "https://genius.com/artists/Jagot-jit",
    logo: "/images/genius.png",
  },
  {
    name: "Musixmatch",
    href: "https://www.musixmatch.com/creator/Jagot-Jit",
    logo: "/images/musix.png",
  },
  {
    name: "MusicBrainz",
    href: "https://musicbrainz.org/artist/df52f5ae-1f47-4cc1-bcfc-c402ea3ba071/collections",
    logo: "/images/musicbrain.png",
  },
  {
    name: "JioSaavn",
    href: "https://www.jiosaavn.com/artist/jagot-jit-songs/v08CQIbLH-8_",
    logo: "/images/jio.png",
  },
];

export default function SocialProof() {
  return (
    <section className="relative bg-[#525333] px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto w-full max-w-[1150px] rounded-2xl border border-white/10 bg-[#1e2642]/40 px-4 py-4 md:px-6 md:py-5">
        <h3 className="text-center font-geist-mono text-[10px] font-bold uppercase tracking-[0.22em] text-sand/75 md:text-xs">
          Featured On
        </h3>

        <p className="mt-1 flex items-center justify-center gap-1.5 text-center font-geist-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60 md:text-[9px]">
          <ExternalLink className="h-2.5 w-2.5 text-sand/80" />
          Tap icons to open profiles
        </p>

        <div className="mx-auto mt-3 grid w-fit grid-cols-4 items-start gap-2 lg:gap-10">
          {platformLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.name}
              className="group flex w-[68px] flex-col items-center md:w-[76px]"
            >
              <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/20 bg-[#2a324f]/70 p-1.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-sand/70 md:h-[60px] md:w-[60px]">
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={42}
                  height={42}
                  className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
                />
                <span className="absolute -right-0.5 -top-0.5 rounded-full border border-sand/50 bg-[#1e2642] p-0.5">
                  <ExternalLink className="h-2 w-2 text-sand/90" />
                </span>
              </span>
              <span className="mt-1.5 text-center font-geist-mono text-[7px] font-semibold uppercase tracking-[0.07em] text-white/70 transition-colors group-hover:text-[#deee4d] md:text-[10px] md:tracking-widest">
                {platform.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
