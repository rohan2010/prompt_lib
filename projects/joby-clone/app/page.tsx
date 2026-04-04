import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import AppSection from "@/components/AppSection";
import TechSection from "@/components/TechSection";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import CompanySection from "@/components/CompanySection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ExperienceSection />
        <AppSection />
        <TechSection />
        <NewsSection />
        <PartnersSection />
        <CompanySection />
        <VisionSection />
      </main>
      <Footer />
    </>
  );
}
