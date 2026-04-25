import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Freformordie.substack.com%2Ffeed";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SubstackFeed() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok" && data.items?.length > 0) {
          setPosts(data.items.slice(0, 5));
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section id="articles" className="py-24 md:py-40 border-t border-border">
      <div className="px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            From The Substack
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] mb-16"
        >
          Latest
          <br />
          <span className="text-primary">Articles</span>
        </motion.h2>

        {status === "loading" && (
          <div className="max-w-3xl animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-5 border-t border-border gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="h-3 bg-muted-foreground/10 rounded w-6 flex-shrink-0" />
                  <div className="h-5 bg-muted-foreground/10 rounded w-2/3" />
                </div>
                <div className="h-3 bg-muted-foreground/10 rounded w-28 flex-shrink-0 hidden md:block" />
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-muted-foreground tracking-wide">
            Couldn't load articles right now.{" "}
            <a
              href="https://reformordie.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Read on Substack
            </a>
          </p>
        )}

        {status === "ready" && posts.length > 0 && (
          <div className="max-w-3xl">
            {posts.map((post, index) => (
              <motion.a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-1 lg:gap-6 py-5 border-t border-border hover:border-primary/40 transition-colors duration-300"
              >
                <div className="flex items-baseline gap-6 min-w-0">
                  <span className="text-lg md:text-xl font-black uppercase tracking-[-0.02em] leading-tight group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 text-xs tracking-[0.1em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <span>{formatDate(post.pubDate)}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
            <div className="border-t border-border" />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a
            href="https://reformordie.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            All Articles on Substack
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
