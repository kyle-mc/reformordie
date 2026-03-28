import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const logoOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const taglineLeftX = useTransform(scrollY, [0, 500], [0, -120]);
  const taglineRightX = useTransform(scrollY, [0, 500], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.3, 0.6]);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background replacing CDN image */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-stone-300 via-amber-100 to-stone-400" />
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="mb-8"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-32 h-32 md:w-48 md:h-48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="10"
              width="180"
              height="180"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              fill="none"
            />
            <rect
              x="30"
              y="30"
              width="140"
              height="140"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="100"
              y1="50"
              x2="100"
              y2="150"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
            <line
              x1="50"
              y1="100"
              x2="150"
              y2="100"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="25"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.04em] leading-[0.85]"
        >
          <motion.span style={{ x: taglineLeftX }} className="block">
            Reform
          </motion.span>
          <motion.span style={{ x: taglineRightX }} className="block text-primary">
            Or Die
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-base md:text-lg text-muted-foreground tracking-wide max-w-md font-light"
        >
          The conversation that refuses to be contained.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
