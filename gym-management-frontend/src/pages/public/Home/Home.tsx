import React from "react";

import FeaturesSection from "../../../components/sections/home/FeaturesSection";
import AboutSection from "../../../components/sections/home/AboutSection";
import ServicesSection from "../../../components/sections/home/ServicesSection";
import TestimonialsSection from "../../../components/sections/home/TestimonialsSection";
import BlogPreviewSection from "../../../components/sections/home/BlogPreviewSection";
import CallToActionSection from "../../../components/sections/home/CallToActionSection";

import HomeSlider from "../../../components/sections/home/HomeSlider";

const Home: React.FC = () => {
  return (
    <div>
      <HomeSlider />
      <FeaturesSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
