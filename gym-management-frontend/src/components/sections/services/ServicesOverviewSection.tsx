import React from "react";
import SectionTitle from "../../common/SectionTitle";
import ServiceCard from "../../common/ServiceCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Service {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  icon: string;
}

const ServicesOverviewSection: React.FC = () => {
  const services: Service[] = [
    {
      id: "personal-training",
      title: "Personal Training",
      shortDescription:
        "One-on-one coaching tailored to your specific goals, fitness level, and schedule.",
      image: "/images/services/personal-training.jpg",
      icon: "user",
    },
    {
      id: "group-fitness",
      title: "Group Fitness Classes",
      shortDescription:
        "Energetic and motivating classes led by expert instructors in a supportive group setting.",
      image: "/images/services/group-fitness.jpg",
      icon: "users",
    },
    {
      id: "strength-training",
      title: "Strength Training",
      shortDescription:
        "Build muscle, increase strength, and improve your overall physical performance.",
      image: "/images/services/strength-training.jpg",
      icon: "dumbbell",
    },
    {
      id: "cardio-training",
      title: "Cardio Training",
      shortDescription:
        "Improve your heart health, burn calories, and boost your endurance with our cardio programs.",
      image: "/images/services/cardio-training.jpg",
      icon: "heartbeat",
    },
    {
      id: "nutrition-coaching",
      title: "Nutrition Coaching",
      shortDescription:
        "Expert dietary guidance to complement your fitness routine and maximize your results.",
      image: "/images/services/nutrition-coaching.jpg",
      icon: "apple-alt",
    },
    {
      id: "yoga-pilates",
      title: "Yoga & Pilates",
      shortDescription:
        "Enhance flexibility, build core strength, and find balance with our mindful movement classes.",
      image: "/images/services/yoga-pilates.jpg",
      icon: "peace",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="OUR SERVICES"
          title="Comprehensive Fitness Solutions"
          description="We offer a wide range of services designed to help you achieve your health and fitness goals. Our expert trainers and state-of-the-art facilities provide everything you need for a complete wellness journey."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div key={service.id} whileHover={{ y: -10 }}>
              <Link to={`/services/${service.id}`}>
                <ServiceCard
                  title={service.title}
                  description={service.shortDescription}
                  iconBackgroundColor={service.image}
                  icon={service.icon}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;
