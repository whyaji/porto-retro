import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  leftIcon,
  rightIcon,
  fullWidth,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 gap-1.5 retro-shadow-sm font-mono tracking-tight",
    md: "text-sm px-5 py-2.5 gap-2 retro-shadow",
    lg: "text-base px-6 py-3.5 gap-2.5 retro-shadow-lg",
  };

  const variantClasses = {
    primary:
      "bg-[var(--navy)] text-[var(--surface)] border-2 border-[var(--navy)] hover:bg-[var(--navy-light)] hover:text-white",
    secondary:
      "bg-[var(--green)] text-white border-2 border-[var(--navy)] hover:bg-[var(--green-light)]",
    gold:
      "bg-[var(--gold)] text-[var(--navy)] border-2 border-[var(--navy)] hover:bg-[var(--gold-light)] font-bold",
    outline:
      "bg-[var(--surface-light)] text-[var(--navy)] border-2 border-[var(--navy)] hover:bg-[var(--white)]",
    ghost:
      "bg-transparent text-[var(--navy)] border border-transparent hover:border-[var(--navy)] hover:bg-black/5 shadow-none",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
