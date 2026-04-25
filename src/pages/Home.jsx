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
      <div className="purple-section relative bg-[#791E94] rounded-2xl p-[10px] md:rounded-3xl md:py-[25px] md:px-0">
        <div className="relative bg-[#FFFFF2] rounded-xl overflow-hidden md:grid md:grid-cols-2 md:divide-x md:divide-border md:mx-[35px] md:rounded-2xl">
          <SubstackFeed />
          <ContactSection />
        </div>
      </div>
      <TickerFooter />
    </div>
  );
}