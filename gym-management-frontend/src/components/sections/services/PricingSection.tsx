import React, { useState } from "react";
import SectionTitle from "../../common/SectionTitle";
import Button from "../../common/Button";
import { motion } from "framer-motion";

interface PricingPlan {
  id: number;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  isPopular: boolean;
}

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: "Basic",
      price: {
        monthly: 29.99,
        annual: 19.99,
      },
      features: [
        "Access to gym floor",
        "Basic cardio equipment",
        "Free weights area",
        "Locker room access",
        "Online workout library",
        "Free fitness assessment",
      ],
      isPopular: false,
    },
    {
      id: 2,
      name: "Premium",
      price: {
        monthly: 49.99,
        annual: 39.99,
      },
      features: [
        "All Basic features",
        "Unlimited group classes",
        "Pool & sauna access",
        "Nutrition consultation",
        "Monthly InBody scan",
        "Guest passes (2/month)",
        "Priority class booking",
      ],
      isPopular: true,
    },
    {
      id: 3,
      name: "Elite",
      price: {
        monthly: 79.99,
        annual: 69.99,
      },
      features: [
        "All Premium features",
        "Personal training sessions (2/month)",
        "VIP locker service",
        "Advanced performance testing",
        "Exclusive access to special events",
        "Recovery zone access",
        "Customized nutrition plan",
        "Unlimited guest passes",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="MEMBERSHIP PLANS"
          title="Find the Perfect Plan for Your Fitness Journey"
          description="We offer flexible membership options to suit your needs and goals. All plans include access to our state-of-the-art facilities and expert support."
        />

        <div className="mb-12 mt-8 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
            <button
              className={`rounded-full px-6 py-2 text-sm font-medium ${
                billingCycle === "monthly"
                  ? "bg-primary-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-6 py-2 text-sm font-medium ${
                billingCycle === "annual"
                  ? "bg-primary-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={`relative overflow-hidden rounded-lg bg-white shadow-lg ${
                plan.isPopular ? "border-primary-600 border-2" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="bg-primary-600 absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="mb-4 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    $
                    {billingCycle === "monthly"
                      ? plan.price.monthly
                      : plan.price.annual}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2 mt-1">
                        <i className="fas fa-check"></i>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.isPopular ? "primary" : "outline"}
                  size="large"
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>
            Not sure which plan is right for you?{" "}
            <a href="#" className="text-primary-600 font-medium">
              Contact us
            </a>{" "}
            for a free consultation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
