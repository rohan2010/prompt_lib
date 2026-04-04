import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AISection from "@/components/AISection";
import WearableSection from "@/components/WearableSection";
import FeaturesSection from "@/components/FeaturesSection";
import EncryptionSection from "@/components/EncryptionSection";
import GripSection from "@/components/GripSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import TestimoniesSection from "@/components/TestimoniesSection";
import SocialSection from "@/components/SocialSection";
import ProductSection from "@/components/ProductSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AISection />
        <WearableSection />
        <FeaturesSection />
        <EncryptionSection />
        <GripSection />
        <SustainabilitySection />
        <TestimoniesSection />
        <SocialSection />
        <ProductSection />
        <FooterSection />
      </main>
    </>
  );
}
