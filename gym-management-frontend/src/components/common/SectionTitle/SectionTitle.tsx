import React from "react";
import classNames from "classnames";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string; // Thêm description
  alignment?: "left" | "center" | "right";
  titleSize?: "small" | "medium" | "large";
  className?: string;
  decorative?: boolean;
  centered?: boolean; // Thêm centered
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  alignment = "center",
  titleSize = "medium",
  className = "",
  decorative = true,
  centered = false, // Mặc định là false
}) => {
  const containerClasses = classNames(
    "mb-12",
    {
      "text-left": alignment === "left",
      "text-center": alignment === "center" || centered,
      "text-right": alignment === "right",
    },
    className,
  );

  const titleClasses = classNames("font-bold text-gray-900 mb-2 font-heading", {
    "text-2xl": titleSize === "small",
    "text-3xl md:text-4xl": titleSize === "medium",
    "text-4xl md:text-5xl": titleSize === "large",
  });

  return (
    <div className={containerClasses}>
      <h2 className={titleClasses}>{title}</h2>

      {decorative && (
        <div
          className={`flex ${alignment === "center" || centered ? "justify-center" : alignment === "right" ? "justify-end" : "justify-start"} mb-4`}
        >
          <div className="bg-primary-500 h-1 w-20 rounded-full"></div>
          <div className="bg-primary-300 ml-1 h-1 w-4 rounded-full"></div>
        </div>
      )}

      {subtitle && (
        <p className="mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
      )}

      {description && ( // Thêm mô tả nếu có
        <p className="mx-auto max-w-3xl text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
