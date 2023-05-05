import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
