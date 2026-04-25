import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PlatformTile({ platform, index }) {
  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{ boxShadow: "0 10px 25px -6px rgba(0,0,0,0.2)" }}
      whileHover={{
        y: -12,
        boxShadow: "0 20px 40px -8px rgba(0,0,0,0.28)",
        transition: { duration: 0.3, ease: "easeOut", delay: 0 }
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        y: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      viewport={{ once: true }}
      className="relative flex-shrink-0 w-full md:w-80 lg:w-96 aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-neutral-800/35 group cursor-pointer block snap-start bg-white"
    >
      {/* 3D HIGHLIGHT: Light source from Top-Left */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] border-t-[3px] border-l-[3px] border-white/80" />

      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`w-full h-full ${platform.gradient} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
        {/* Grain texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <filter id={`grain-${index}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${index})`} />
        </svg>
      </div>

      {/* Card Content */}
      <div className="relative z-30 flex flex-col justify-between h-full p-10">
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white/40 p-2 rounded-full backdrop-blur-md border border-white/50"
          >
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="transition-all duration-500"
            whileHover={{ 
              scale: 1.15,
              filter: "drop-shadow(12px 15px 20px rgba(0,0,0,0.15))"
            }}
          >
            {platform.logo}
          </motion.div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-1">
          <h3 className="hidden md:block text-3xl font-black uppercase tracking-tighter italic text-foreground/90 leading-none">
            {platform.name}
          </h3>
          
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 35, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase font-bold text-primary"
            >
              Listen Now
              <div className="w-5 h-px bg-primary" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Light Catch (Physical edge detail) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </motion.a>
  );
}