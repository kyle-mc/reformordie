import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/ROD-Main-D.png`;

export default function HeroSection() {
  const { scrollY } = useScroll();
  const taglineLeftX = useTransform(scrollY, [0, 500], [0, -120]);
  const taglineRightX = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 bg-gradient-to-b from-[#EDF4ED] via-[#f5faf5] to-white">
      {/* Hero image — fully visible, centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-2xl px-8 md:px-12"
      >
        <img
          src={HERO_IMAGE}
          alt="Reform Or Die"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-10 text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-center"
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
        className="mt-8 text-base md:text-lg text-muted-foreground tracking-wide max-w-md font-light text-center"
      >
        Everything must be reformed.<br />Join the conversation.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-16"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
