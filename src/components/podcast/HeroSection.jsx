import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCWRp5w3fCvqBnGETu_QVzng";

function extractVideoId(link = "") {
  try { return new URL(link).searchParams.get("v"); } catch { return null; }
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const taglineLeftX = useTransform(scrollY, [0, 500], [0, -120]);
  const taglineRightX = useTransform(scrollY, [0, 500], [0, 120]);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok" && data.items?.length > 0) {
          setVideoId(extractVideoId(data.items[0].link));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section 
      id="top" 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 bg-background z-10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
    >
      {/* BACKGROUND PATTERN: Subtle Diagonal Lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            currentColor 0,
            currentColor 1px,
            transparent 0,
            transparent 50%
          )`,
          backgroundSize: '10px 10px'
        }}
      />

      {/* Latest YouTube video — centered above title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-3xl md:max-w-5xl px-6 md:px-12 relative z-10"
      >
        <div className="aspect-video w-full overflow-hidden bg-foreground/5 shadow-2xl">
          {videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Reform Or Die — Latest Episode"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-10 text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-center relative z-10"
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
        className="mt-8 text-base md:text-lg text-muted-foreground tracking-wide max-w-md font-light text-center relative z-10"
      >
        Everything must be reformed.<br />Join the conversation.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-16 relative z-10"
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