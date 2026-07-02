import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const DISCORD_URL = "https://discord.gg/26FYrVhzc";

export default function DiscordBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <a
        href={DISCORD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-10 py-2 text-center text-xs md:text-sm tracking-wide hover:underline"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>
          Join our Discord to chat with us, give feedback, and interact with the Reform Or Die community
        </span>
      </a>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
