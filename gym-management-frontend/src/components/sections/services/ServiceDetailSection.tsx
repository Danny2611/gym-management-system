import React from "react";
import SectionTitle from "../../common/SectionTitle";
import { useParams } from "react-router-dom";
import HomeSlider from "../home/HomeSlider";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  image: string;
  benefits: string[];
  includedFeatures: string[];
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
}

const ServiceDetailSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically come from an API or context
  const servicesData: Record<string, ServiceDetail> = {
    "personal-training": {
      id: "personal-training",
      title: "Personal Training",
      description:
        "One-on-one coaching tailored to your specific goals, fitness level, and schedule.",
      fullDescription: [
        "Our personal training service offers individualized attention and customized workout plans designed specifically for you. Whether you're just starting your fitness journey or looking to break through a plateau, our certified trainers will guide you every step of the way.",
        "Each session is structured to maximize your time and effort, ensuring you get the results you want. We focus not just on exercise, but on creating sustainable habits that lead to long-term success.",
      ],
      image: "/images/services/personal-training-detail.jpg",
      benefits: [
        "Customized workout plans tailored to your goals",
        "Expert guidance on proper form and technique",
        "Regular progress assessments and plan adjustments",
        "Nutritional advice to complement your training",
        "Accountability and motivation to keep you on track",
        "Flexible scheduling to fit your lifestyle",
      ],
      includedFeatures: [
        "Initial fitness assessment and goal-setting session",
        "Personalized workout program",
        "Nutritional guidance",
        "Regular progress tracking",
        "Access to exclusive training areas",
        "Direct communication with your trainer between sessions",
      ],
      testimonial: {
        text: "Working with my personal trainer at FittLife has completely transformed my approach to fitness. The customized program addresses my specific needs, and the accountability keeps me consistent. I've achieved results I never thought possible!",
        author: "Jessica Reynolds",
        role: "Member since 2019",
      },
    },
    // Additional service details would be defined here
  };

  const service = servicesData[id || ""] || {
    id: "",
    title: "Service Not Found",
    description: "",
    fullDescription: ["Service information not available."],
    image: "/images/services/default.jpg",
    benefits: [],
    includedFeatures: [],
    testimonial: { text: "", author: "", role: "" },
  };

  return (
    <div>
      <HomeSlider />
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="OUR SERVICES"
            title={service.title}
            description={service.description}
          />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <img
                src={service.image}
                alt={service.title}
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
            </div>
            <div>
              {service.fullDescription.map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-600">
                  {paragraph}
                </p>
              ))}

              <h3 className="mb-4 mt-8 text-2xl font-bold">Benefits</h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2 mt-1">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">What's Included</h3>
              <ul className="space-y-3">
                {service.includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2 mt-1">
                      <i className="fas fa-check"></i>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.testimonial.text && (
              <div className="border-primary-600 bg-primary-50 rounded-lg border-l-4 p-8">
                <div className="text-primary-600 mb-4">
                  <i className="fas fa-quote-left text-3xl"></i>
                </div>
                <p className="mb-6 italic text-gray-700">
                  {service.testimonial.text}
                </p>
                <div>
                  <p className="font-bold">{service.testimonial.author}</p>
                  <p className="text-gray-500">{service.testimonial.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailSection;
