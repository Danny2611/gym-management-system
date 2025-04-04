// src/components/common/ServiceCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaAppleAlt,
  FaUsers,
  FaHeartbeat,
  FaRunning,
  FaWeightHanging,
  FaSwimmer,
  FaBrain,
  FaBicycle,
} from "react-icons/fa";

export interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
  className?: string;
  iconBackgroundColor?: string;
  hoverEffect?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  link,
  className = "",
  iconBackgroundColor = "bg-primary-500",
  hoverEffect = true,
}) => {
  // Map string icon names to actual icon components
  const getIcon = () => {
    const iconSize = 24;

    switch (icon) {
      case "dumbbell":
        return <FaDumbbell size={iconSize} />;
      case "apple-alt":
        return <FaAppleAlt size={iconSize} />;
      case "users":
        return <FaUsers size={iconSize} />;
      case "heartbeat":
        return <FaHeartbeat size={iconSize} />;
      case "running":
        return <FaRunning size={iconSize} />;
      case "weight":
        return <FaWeightHanging size={iconSize} />;
      case "swimming":
        return <FaSwimmer size={iconSize} />;
      case "brain":
        return <FaBrain size={iconSize} />;
      case "bicycle":
        return <FaBicycle size={iconSize} />;
      default:
        return <FaDumbbell size={iconSize} />;
    }
  };

  return (
    <div
      className={`rounded-lg bg-white p-6 shadow-md ${hoverEffect ? "transition-transform duration-300 hover:-translate-y-2" : ""} ${className} `}
    >
      <div
        className={`h-16 w-16 ${iconBackgroundColor} mb-4 flex items-center justify-center rounded-full text-white`}
      >
        {getIcon()}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="mb-4 text-gray-600">{description}</p>

      {link && (
        <Link
          to={link.url}
          className="text-primary-600 group inline-flex items-center font-medium"
        >
          {link.text}
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
