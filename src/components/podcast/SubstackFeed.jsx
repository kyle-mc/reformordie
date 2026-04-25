import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// count parameter requires a paid rss2json key — omit it and take items[0]
const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Freformordie.substack.com%2Ffeed";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SubstackFeed() {
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok" && data.items?.length > 0) {
          setPost(data.items[0]);
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
            From The Blog
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
          <span className="text-primary">Article</span>
        </motion.h2>

        {status === "loading" && (
          <div className="max-w-3xl border border-border p-8 md:p-12 animate-pulse">
            <div className="h-3 bg-muted-foreground/10 rounded w-32 mb-6" />
            <div className="h-8 bg-muted-foreground/10 rounded w-full mb-3" />
            <div className="h-8 bg-muted-foreground/10 rounded w-2/3 mb-8" />
            <div className="space-y-2 mb-10">
              <div className="h-4 bg-muted-foreground/10 rounded w-full" />
              <div className="h-4 bg-muted-foreground/10 rounded w-full" />
              <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
            </div>
            <div className="pt-6 border-t border-border flex justify-between">
              <div className="h-3 bg-muted-foreground/10 rounded w-28" />
              <div className="h-3 bg-muted-foreground/10 rounded w-16" />
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-muted-foreground tracking-wide">
            Couldn't load the latest article right now.{" "}
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

        {status === "ready" && post && (() => {
          const excerpt = stripHtml(post.description || "");
          const truncated = excerpt.length > 240 ? excerpt.slice(0, 240).trimEnd() + "…" : excerpt;
          return (
            <motion.a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="group block max-w-3xl border border-border p-8 md:p-12 hover:border-primary/50 transition-colors duration-500"
            >
              <span className="text-xs font-mono text-muted-foreground/40">01</span>

              <h3 className="mt-4 text-2xl md:text-4xl font-black uppercase tracking-[-0.03em] leading-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>

              {truncated && (
                <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                  {truncated}
                </p>
              )}

              <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
                <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
                  {formatDate(post.pubDate)}
                </span>
                <span className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  Read Article
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          );
        })()}

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
