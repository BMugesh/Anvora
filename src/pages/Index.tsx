import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StudentSection } from "@/components/StudentSection";
import { SignalArchetypes } from "@/components/SignalArchetypes";
import { TransformationLab } from "@/components/TransformationLab";
import { SelectedSystems } from "@/components/SelectedSystems";
import { StudentHub } from "@/components/StudentHub";
import { BusinessHub } from "@/components/BusinessHub";
import { SignalEnhancements } from "@/components/SignalEnhancements";
import { ImpactSignals } from "@/components/Testimonials";
import { BuildingInPublic } from "@/components/BuildingInPublic";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import Footer from "@/components/anvora/Footer";

interface IndexProps {
  showIntro?: boolean;
}

const Index = ({ showIntro = false }: IndexProps) => {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet selection:text-white">
      <Navbar />
      <Hero showIntro={showIntro} />
      <StudentSection />
      <SignalArchetypes />
      <TransformationLab />
      <SelectedSystems />
      <StudentHub />
      <BusinessHub />
      <SignalEnhancements />
      <ImpactSignals />
      <BuildingInPublic />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
