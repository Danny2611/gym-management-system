import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export interface ButtonProps {
  as?: "button" | "a" | typeof Link; // Hỗ trợ thẻ "a" hoặc "Link"
  href?: string; // Dùng khi as="a"
  to?: string; // Dùng khi as=Link
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  text?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  as: Component = "button", // Mặc định là <button>
  href,
  to,
  variant = "primary",
  size = "medium",
  icon,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
  text,
  children,
  ...props
}) => {
  const buttonClasses = classNames(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    {
      // Variants
      "bg-primary-600 text-white hover:bg-primary-700": variant === "primary",
      "bg-secondary-600 text-white hover:bg-secondary-700":
        variant === "secondary",
      "bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50":
        variant === "outline",
      "bg-transparent text-primary-600 hover:text-primary-700 shadow-none":
        variant === "text",

      // Sizes
      "text-sm px-3 py-1.5": size === "small",
      "text-base px-4 py-2": size === "medium",
      "text-lg px-6 py-3": size === "large",

      // Disabled state
      "opacity-50 cursor-not-allowed": disabled,

      // Width
      "w-full": fullWidth,
    },
    className,
  );

  if (Component === "a") {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {icon && <span className="mr-2">{icon}</span>}
        {text || children}
      </a>
    );
  }

  if (Component === Link) {
    return (
      <Link to={to!} className={buttonClasses} {...props}>
        {icon && <span className="mr-2">{icon}</span>}
        {text || children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text || children}
    </button>
  );
};

export default Button;
