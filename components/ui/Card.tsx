import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  badge?: string;
  variant?: "default" | "dark" | "gold" | "green";
  shadow?: "none" | "sm" | "md" | "lg";
  windowHeader?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  badge,
  variant = "default",
  shadow = "md",
  windowHeader = false,
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-[var(--card)] text-[var(--navy)] border-2 border-[var(--navy)]",
    dark: "bg-[var(--navy)] text-[var(--surface)] border-2 border-[var(--navy)]",
    gold: "bg-[var(--gold-muted)] text-[var(--navy)] border-2 border-[var(--navy)]",
    green: "bg-[var(--green-muted)] text-[var(--navy)] border-2 border-[var(--green)]",
  };

  const shadowClasses = {
    none: "",
    sm: "retro-shadow-sm",
    md: "retro-shadow",
    lg: "retro-shadow-lg",
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-150 ${variantClasses[variant]} ${shadowClasses[shadow]} ${className}`}
      {...props}
    >
      {windowHeader && (
        <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--navy)] text-[var(--surface)] border-b-2 border-[var(--navy)] select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block border border-black/30"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block border border-black/30"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block border border-black/30"></span>
          </div>
          {title && (
            <span className="text-xs font-mono font-medium tracking-tight truncate max-w-[200px]">
              {title}
            </span>
          )}
          {badge && (
            <span className="text-[10px] font-mono uppercase bg-[var(--gold)] text-[var(--navy)] px-1.5 py-0.2 font-bold">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className={windowHeader ? "p-4 md:p-6" : "p-4 md:p-6"}>{children}</div>
    </div>
  );
};
