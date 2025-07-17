import React from "react";

export type ButtonVariant = "primary" | "red" | "ghost" | "green" | "secondary";
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: "md" | "lg";
  Icon?: React.ComponentType<{ className?: string }>;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}
const getClassName = (vatiant: ButtonVariant) => {
  switch (vatiant) {
    case "green":
      return "bg-green-light  hover:bg-green-dark text-white";
    case "ghost":
      return "bg-none hover:bg-gray-100 text-primary";
    case "secondary":
      return "bg-transparent text-gray-900 hover:bg-gray-100";
    case "red":
      return "bg-red  hover:bg-red-dark text-white";
    default:
      return "bg-primary hover:bg-primary-dark text-white";
  }
};
const Button = ({
  variant = "primary",
  size = "md",
  title,
  onClick,
  disabled = false,
  className = "",
  loading = false,
  type = "button",
  Icon,
  children,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`flex items-center justify-center  gap-2 px-2 py-1 rounded-md transition-colors cursor-pointer duration-200 focus:outline-none ${getClassName(
          variant
        )} w-fit ${className}`}
      >
        {!!Icon && (
          <span className="flex-shrink-0">
            <Icon className="w-4 h-4" />
          </span>
        )}
        {loading ? (
          <span className="loader"></span>
        ) : (
          <span>{title && title}</span>
        )}
        {children && children}
      </button>
    </div>
  );
};

export default Button;
