import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const TICKER_ITEMS = [
  "NEW EPISODES EVERY WEEK",
  "REFORM OR DIE PODCAST",
  "SUBSCRIBE NOW",
  "EVERYTHING MUST BE REFORMED",
  "REFORM OR DIE",
  "LISTEN EVERYWHERE",
];

export default function TickerFooter() {
  return (
    <footer className="border-t border-border">
      {/* Ticker tape */}
      <div className="overflow-hidden py-4 border-b border-border">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-xs tracking-[0.2em] uppercase text-muted-foreground"
            >
              {item}
              <span className="ml-8 text-primary">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="py-20 md:py-32 flex flex-col items-center justify-center px-6">
        <motion.a
          href="https://media.rss.com/reform-or-die/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group text-center"
        >
          <span className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] group-hover:text-primary transition-colors duration-500">
            Join The Reform
          </span>
          <motion.div
            className="flex items-center justify-center mt-4 gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300"
          >
            <span className="text-xs tracking-[0.2em] uppercase">
              Subscribe via RSS
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
          © {new Date().getFullYear()} Reform Or Die
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://open.spotify.com/show/0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Spotify
          </a>
          <a
            href="https://podcasts.apple.com/us/podcast/reform-or-die/id1875146399"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Apple
          </a>
          <a
            href="https://www.youtube.com/channel/UCWRp5w3fCvqBnGETu_QVzng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}