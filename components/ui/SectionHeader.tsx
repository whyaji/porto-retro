import React from "react";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  number?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  badge,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  return (
    <div
      className={`mb-8 md:mb-12 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 mb-3 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        {number && (
          <span className="font-mono text-xs font-bold text-[var(--green)] bg-[var(--green-muted)] px-2 py-0.5 border border-[var(--green)]">
            {"//"} {number}
          </span>
        )}
        {badge && (
          <Badge variant="gold" size="sm">
            {badge}
          </Badge>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[var(--navy)]/75 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      <div
        className={`mt-4 h-1 w-16 bg-[var(--navy)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};
