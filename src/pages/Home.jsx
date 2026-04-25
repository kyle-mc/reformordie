import React from "react";
import Header from "../components/podcast/Header";
import HeroSection from "../components/podcast/HeroSection";
import ListenSection from "../components/podcast/ListenSection";
import SubstackFeed from "../components/podcast/SubstackFeed";
import ContactSection from "../components/podcast/ContactSection";
import TickerFooter from "../components/podcast/TickerFooter";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-body">
      <Header />
      <HeroSection />
      <ListenSection />
      <SubstackFeed />
      <ContactSection />
      <TickerFooter />
    </div>
  );
}