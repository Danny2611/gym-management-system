import React from "react";
import ServicesOverviewSection from "../../../components/sections/services/ServicesOverviewSection";
import PricingSection from "../../../components/sections/services/PricingSection";
import FAQSection from "../../../components/sections/services/FAQSection";
import HomeSlider from "../../../components/sections/home/HomeSlider";

const Services: React.FC = () => {
  return (
    <div>
      <HomeSlider />
      <ServicesOverviewSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
};

export default Services;
