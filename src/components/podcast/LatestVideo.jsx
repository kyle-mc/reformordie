import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// YouTube channel RSS — no API key needed, no count parameter (requires paid rss2json key)
const FEED_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCWRp5w3fCvqBnGETu_QVzng";

function extractVideoId(link = "") {
  try {
    return new URL(link).searchParams.get("v");
  } catch {
    return null;
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function LatestVideo() {
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok" && data.items?.length > 0) {
          setVideo(data.items[0]);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  const videoId = video ? extractVideoId(video.link) : null;

  return (
    <section className="py-24 md:py-40 bg-foreground text-background border-t border-border/20">
      <div className="px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-background/50">
            Latest Episode
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] mb-16"
        >
          Watch
          <br />
          <span className="text-primary">Now</span>
        </motion.h2>

        {status === "loading" && (
          <div className="max-w-4xl">
            <div className="aspect-video w-full bg-background/10 animate-pulse" />
            <div className="mt-6 flex flex-col gap-2">
              <div className="h-5 bg-background/10 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-background/10 rounded w-32 animate-pulse" />
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-background/50 tracking-wide">
            Couldn't load the latest video right now.{" "}
            <a
              href="https://www.youtube.com/channel/UCWRp5w3fCvqBnGETu_QVzng"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-background transition-colors"
            >
              Watch on YouTube
            </a>
          </p>
        )}

        {status === "ready" && videoId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-lg font-bold tracking-[-0.01em] leading-snug">
                  {video.title}
                </p>
                <p className="mt-1 text-xs tracking-[0.1em] uppercase text-background/50">
                  {formatDate(video.pubDate)}
                </p>
              </div>
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-background/50 hover:text-primary transition-colors duration-300 mt-1"
              >
                YouTube
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
