"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/Hero/HeroSection";
import SectionDivider from "@/components/ui/SectionDivider";

const ProjectsSection = dynamic(() => import("@/components/Projects/ProjectsSection"), {
  ssr: false,
});
const AchievementsSection = dynamic(() => import("@/components/Achievements/AchievementsSection"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/About/AboutSection"), {
  ssr: false,
});
const ContactSection = dynamic(() => import("@/components/Contact/ContactSection"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/ui/SmoothScroll"), {
  ssr: false,
});
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), {
  ssr: false,
});
const WanderingSpider = dynamic(() => import("@/components/ui/WanderingSpider"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />

      <CustomCursor />

      <Navbar />

      <WanderingSpider />

      <main>
        <HeroSection />
        <SectionDivider variant="web" />
        <ProjectsSection />
        <SectionDivider variant="line" />
        <AchievementsSection />
        <SectionDivider variant="dots" />
        <AboutSection />
        <SectionDivider variant="line" />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
