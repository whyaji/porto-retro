import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "green" | "gold" | "surface" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "surface",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-mono tracking-tight",
    md: "text-xs px-2.5 py-1 font-mono",
  };

  const variantClasses = {
    navy: "bg-[var(--navy)] text-[var(--surface)] border border-[var(--navy)]",
    green: "bg-[var(--green-muted)] text-[var(--green)] border border-[var(--green)] font-semibold",
    gold: "bg-[var(--gold-muted)] text-[var(--navy)] border border-[var(--gold)] font-semibold",
    surface: "bg-[var(--surface-light)] text-[var(--navy)] border border-[var(--navy)]/30",
    outline: "bg-transparent text-[var(--navy)] border border-[var(--navy)]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-mono select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
