import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StoryScroll } from "@/components/StoryScroll";
import { WhoWeAre } from "@/components/WhoWeAre";
import { HowItWorks } from "@/components/HowItWorks";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
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
      <StoryScroll />
      <WhoWeAre />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
