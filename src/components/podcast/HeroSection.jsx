import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/ROD-Main-D.png`;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const taglineLeftX = useTransform(scrollY, [0, 500], [0, -120]);
  const taglineRightX = useTransform(scrollY, [0, 500], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.45, 0.75]);

  return (
    <section id="top" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero image background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Reform Or Die"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
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
