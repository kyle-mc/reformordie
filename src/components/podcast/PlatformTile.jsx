import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PlatformTile({ platform, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-72 md:w-80 lg:w-96 aspect-[3/4] overflow-hidden border border-border group cursor-pointer block"
    >
      {/* Background Image */}
      <motion.div
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <img
          src={platform.image}
          alt={platform.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 group-hover:bg-background/50 transition-all duration-500" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8">
        {/* Platform number */}
        <div className="flex items-start justify-between">
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            0{index + 1}
          </span>
          <motion.div
            animate={{ 
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -45 
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Platform Logo SVG */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              filter: isHovered ? "drop-shadow(0 0 20px hsl(72 100% 50% / 0.4))" : "none",
            }}
            transition={{ duration: 0.4 }}
          >
            {platform.logo}
          </motion.div>
        </div>

        {/* Bottom section */}
        <div>
          <h3 className="text-xl font-bold uppercase tracking-[-0.02em] mb-2">
            {platform.name}
          </h3>
          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary font-medium">
              Listen Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom border glow on hover */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-primary origin-left"
      />
    </motion.a>
  );
}