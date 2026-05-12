import HeroSection from "./sections/hero/HeroSection";
import FeaturesSection from "./sections/features/FeaturesSection";
import HowItWorksSection from "./sections/how-it-works/HowItWorksSection";
import WorkflowSection from "./sections/workflow/WorkflowSection";
import SecuritySection from "./sections/security/SecuritySection";
import SolutionsSection from "./sections/solutions/SolutionsSection";
import AboutSection from "./sections/about/AboutSection";
import LandingFooter from "./components/LandingFooter";

const ProductInfoManagement = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WorkflowSection />
      <SecuritySection />
      <SolutionsSection />
      <AboutSection />
      <LandingFooter />
    </div>
  );
};

export default ProductInfoManagement;
