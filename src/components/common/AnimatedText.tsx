"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "chars" | "words" | "lines" | "fade-up";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
}

export function AnimatedText({
  text,
  className,
  as: Tag = "p",
  animation = "words",
  delay = 0,
  stagger = 0.05,
  scrollTrigger = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".anim-unit");

    // Set initial state
    gsap.set(elements, { opacity: 1, y: 0 });

    const animConfig: gsap.TweenVars = {
      y: 40,
      opacity: 0,
    };

    const toConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      delay,
      ease: "power3.out",
    };

    if (scrollTrigger) {
      gsap.fromTo(elements, animConfig, {
        ...toConfig,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.fromTo(elements, animConfig, toConfig);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [text, animation, delay, stagger, scrollTrigger]);

  const renderContent = () => {
    if (animation === "fade-up") {
      return <span className="anim-unit inline-block">{text}</span>;
    }

    if (animation === "chars") {
      return text.split("").map((char, i) => (
        <span key={i} className="anim-unit inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    // words (default)
    return text.split(" ").map((word, i) => (
      <span key={i} className="anim-unit inline-block mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Tag className={cn("flex flex-wrap", className)}>{renderContent()}</Tag>
    </div>
  );
}
