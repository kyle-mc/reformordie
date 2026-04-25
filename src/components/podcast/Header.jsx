import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#top" className="group">
          <span className="text-sm tracking-[0.15em] uppercase font-light text-foreground/80 group-hover:font-bold transition-all duration-300">
            Reform Or Die
          </span>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="#articles"
            className="text-xs tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 hidden md:block"
          >
            Articles
          </a>
          <a
            href="#contact"
            className="text-xs tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 hidden md:block"
          >
            Contact
          </a>
          <a
            href="https://ko-fi.com/R6R71X70Y8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden border border-foreground/20 rounded-full px-5 py-2 text-xs tracking-[0.1em] uppercase text-foreground/80 hover:text-primary-foreground transition-colors duration-500 group"
          >
            <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" />
              Support Our Work
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}