import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import TechnologySection from "@/components/TechnologySection";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import StorySection from "@/components/StorySection";
import IllustrationSection from "@/components/IllustrationSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ExperienceSection />
        <TechnologySection />
        <NewsSection />
        <PartnersSection />
        <StorySection />
        <IllustrationSection />
        <FooterSection />
      </main>
    </>
  );
}
