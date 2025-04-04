import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "../../../common/SectionTitle";

interface ServiceProps {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

const services: ServiceProps[] = [
  {
    id: "personal-training",
    image: "/images/services/personal-training.jpg",
    title: "Personal Training",
    description:
      "Get one-on-one attention from our expert trainers who will customize workouts to help you reach your specific fitness goals.",
    link: "/services/personal-training",
  },
  {
    id: "group-fitness",
    image: "/images/services/group-fitness.jpg",
    title: "Group Classes",
    description:
      "Join our high-energy group classes, from HIIT to yoga, designed to motivate you and make fitness fun and social.",
    link: "/services/group-classes",
  },
  {
    id: "nutrition-coaching",
    image: "/images/services/nutrition-coaching.jpg",
    title: "Nutrition Coaching",
    description:
      "Optimize your diet with personalized nutrition plans that complement your workout routine and lifestyle needs.",
    link: "/services/nutrition-coaching",
  },
  {
    id: "strength-training",
    image: "/images/services/strength-training.jpg",
    title: "Strength Training",
    description:
      "Build muscle, increase strength, and improve your body composition with our comprehensive strength training programs.",
    link: "/services/strength-training",
  },
];

const ServicesSection: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
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
          title="Our Services"
          subtitle="WHAT WE PROVIDE"
          description="Discover our comprehensive range of fitness services designed to help you achieve optimal health and performance."
          centered
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-[#0D2E4B]">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center font-medium text-[#0CC6F0] transition-colors hover:text-[#0D2E4B]"
                >
                  Learn More <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <button className="rounded-md bg-[#0D2E4B] px-8 py-3 font-medium text-white transition-colors hover:bg-[#0CC6F0]">
              View All Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
