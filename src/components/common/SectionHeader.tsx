"use client";

import { AnimatedText } from "@/components";
import { cn } from "@/lib";

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  highlight,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      <AnimatedText
        text={`${title} ${highlight}`}
        as="h2"
        animation="words"
        className="text-4xl md:text-5xl font-heading font-bold text-black dark:text-white [&>.anim-unit:last-child]:text-primary"
      />
      {subtitle && (
        <AnimatedText
          text={subtitle}
          as="p"
          animation="fade-up"
          delay={0.3}
          className="mt-4 text-black dark:text-muted-foreground text-lg max-w-2xl mx-auto"
        />
      )}
    </div>
  );
}
