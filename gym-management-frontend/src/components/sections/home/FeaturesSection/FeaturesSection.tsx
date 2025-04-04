import React from "react";
import { motion } from "framer-motion";
import { GiWeightLiftingUp, GiMuscleUp, GiHeartBeats } from "react-icons/gi";
import {
  MdSportsGymnastics,
  MdSportsMartialArts,
  MdFoodBank,
} from "react-icons/md";
import SectionTitle from "../../../common/SectionTitle";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <GiWeightLiftingUp size={48} />,
    title: "Strength Training",
    description:
      "Build muscle and increase strength with our comprehensive strength training programs tailored to your fitness level.",
  },
  {
    icon: <MdSportsGymnastics size={48} />,
    title: "Group Classes",
    description:
      "Join our energetic group fitness classes led by expert instructors, designed to motivate and challenge you.",
  },
  {
    icon: <GiHeartBeats size={48} />,
    title: "Cardio Training",
    description:
      "Improve your cardiovascular health and endurance with our state-of-the-art cardio equipment and specialized programs.",
  },
  {
    icon: <MdSportsMartialArts size={48} />,
    title: "Functional Training",
    description:
      "Enhance your daily performance with functional exercises that improve strength, stability, and mobility.",
  },
  {
    icon: <GiMuscleUp size={48} />,
    title: "Personal Training",
    description:
      "Get personalized attention and custom workout plans from our certified personal trainers to achieve your goals faster.",
  },
  {
    icon: <MdFoodBank size={48} />,
    title: "Nutrition Guidance",
    description:
      "Complement your fitness routine with expert nutrition advice to optimize your results and overall health.",
  },
];

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What We Offer"
          subtitle="OUR FEATURES"
          description="Discover our comprehensive range of fitness services designed to help you achieve your health and wellness goals."
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-lg bg-white p-8 shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 text-[#0CC6F0]">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-[#0D2E4B]">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
