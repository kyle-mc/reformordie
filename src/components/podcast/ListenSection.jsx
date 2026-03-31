import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PlatformTile from "./PlatformTile";

const SpotifyLogo = () => (
  <svg viewBox="0 0 48 48" className="w-16 h-16" fill="currentColor">
    <path
      d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm11.005 34.605a1.497 1.497 0 01-2.06.495c-5.64-3.45-12.735-4.23-21.105-2.316a1.498 1.498 0 01-.66-2.925c9.165-2.1 17.025-1.2 23.325 2.685a1.498 1.498 0 01.5 2.061zm2.94-6.525a1.875 1.875 0 01-2.58.615c-6.45-3.96-16.275-5.115-23.895-2.79a1.876 1.876 0 11-1.086-3.594c8.7-2.652 19.515-1.368 26.94 3.189a1.875 1.875 0 01.621 2.58zm.255-6.795C31.14 17.31 18.09 16.875 10.545 19.17a2.25 2.25 0 11-1.305-4.305c8.67-2.64 23.085-2.13 32.19 3.225a2.25 2.25 0 01-3.24 3.195h.01z"
      className="text-foreground group-hover:text-primary transition-colors duration-500"
    />
  </svg>
);

const AppleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-16 h-16" fill="currentColor">
    <path
      d="M44.527 34.752c-.99 2.313-2.167 4.44-3.54 6.39-1.87 2.655-3.397 4.49-4.575 5.505-1.826 1.665-3.784 2.518-5.877 2.565-1.503 0-3.315-.428-5.427-1.29-2.118-.858-4.065-1.286-5.844-1.286-1.87 0-3.877.428-6.023 1.286-2.152.862-3.885 1.312-5.206 1.357-2.003.087-4.013-.79-6.033-2.632-1.275-1.108-2.868-3.008-4.779-5.7-2.05-2.88-3.733-6.222-5.052-10.032C.724 27.105 0 23.412 0 19.845c0-4.065.878-7.571 2.637-10.51C4.11 6.15 6.094 3.703 8.595 1.938 11.097.173 13.81-.727 16.74-.78c1.593 0 3.682.493 6.276 1.462 2.586.972 4.248 1.465 4.98 1.465.546 0 2.396-.576 5.532-1.72C35.73-.2 37.916-.72 39.667-.635c4.404.354 7.71 2.09 9.904 5.22-3.938 2.388-5.885 5.73-5.843 10.017.04 3.335 1.245 6.113 3.61 8.32 1.074 1.02 2.273 1.808 3.6 2.37-.288.84-.594 1.644-.91 2.416v-.001zM34.018 1.5c0 2.615-.955 5.054-2.86 7.306-2.3 2.688-5.082 4.24-8.098 3.995a8.141 8.141 0 01-.06-1.005c0-2.51 1.093-5.196 3.034-7.39.97-1.11 2.203-2.032 3.7-2.767C31.228.913 32.647.33 33.987.003c.025.502.03 1.003.03 1.498z"
      className="text-foreground group-hover:text-primary transition-colors duration-500"
      transform="scale(0.85) translate(4, 2)"
    />
  </svg>
);

const YoutubeLogo = () => (
  <svg viewBox="0 0 48 34" className="w-16 h-12" fill="currentColor">
    <path
      d="M47.04 5.28C46.5 3.18 44.88 1.56 42.78 1.02 39.06 0 24 0 24 0S8.94 0 5.22 1.02C3.12 1.56 1.5 3.18.96 5.28 0 9 0 17 0 17s0 8 .96 11.72c.54 2.1 2.16 3.72 4.26 4.26C8.94 34 24 34 24 34s15.06 0 18.78-1.02c2.1-.54 3.72-2.16 4.26-4.26C48 25 48 17 48 17s0-8-.96-11.72zM19.2 24.2V9.8L31.68 17 19.2 24.2z"
      className="text-foreground group-hover:text-primary transition-colors duration-500"
    />
  </svg>
);

const SubstackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16" fill="currentColor">
    <path
      d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
      className="text-foreground group-hover:text-primary transition-colors duration-500"
    />
  </svg>
);

const platforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/4JiVd7NQay86Xah5k9Q02A",
    gradient: "from-emerald-200 via-stone-200 to-emerald-100",
    logo: <SpotifyLogo />,
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/reform-or-die/id1875146399",
    gradient: "from-violet-200 via-stone-200 to-pink-100",
    logo: <AppleLogo />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCWRp5w3fCvqBnGETu_QVzng",
    gradient: "from-red-200 via-stone-200 to-orange-100",
    logo: <YoutubeLogo />,
  },
  {
    name: "Substack",
    url: "https://reformordie.substack.com",
    gradient: "from-orange-200 via-stone-200 to-amber-100",
    logo: <SubstackLogo />,
  },
];

const RssTile = () => (
  <motion.a
    href="https://media.rss.com/reform-or-die/feed.xml"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.45 }}
    viewport={{ once: true }}
    className="relative flex-shrink-0 w-full md:w-80 lg:w-96 aspect-[3/4] overflow-hidden border border-border group flex flex-col items-center justify-center gap-6 hover:border-primary/50 transition-colors duration-500 snap-start"
  >
    <svg viewBox="0 0 24 24" className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 11a9 9 0 019 9" strokeLinecap="round" />
      <path d="M4 4a16 16 0 0116 16" strokeLinecap="round" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" />
    </svg>
    <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300">
      RSS Feed
    </span>
  </motion.a>
);

export default function ListenSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-40">
      {/* Section label */}
      <div className="px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Where to Listen
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em]"
        >
          Choose Your
          <br />
          <span className="text-primary">Platform</span>
        </motion.h2>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="md:hidden px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((platform, index) => (
            <PlatformTile key={platform.name} platform={platform} index={index} />
          ))}
        </div>
      </div>

      {/* Desktop: scroll-driven parallax */}
      <div className="hidden md:block overflow-x-auto hide-scrollbar">
        <motion.div style={{ x }} className="flex gap-8 px-12">
          {platforms.map((platform, index) => (
            <PlatformTile key={platform.name} platform={platform} index={index} />
          ))}
          <RssTile />
        </motion.div>
      </div>
    </section>
  );
}
