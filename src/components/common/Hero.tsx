"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { AnimatedText, MagneticButton } from "@/components";

const Canvas = dynamic(
  () =>
    import("@/components/3D/Canvas").then((mod) => ({ default: mod.Canvas })),
  { ssr: false },
);

const HeroScene = dynamic(
  () =>
    import("@/components/3D/HeroScene").then((mod) => ({
      default: mod.HeroScene,
    })),
  { ssr: false },
);

const socials = [
  { icon: Github, href: "https://github.com/Takeru9016", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/sahiljadhav",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com/sahiljadhav", label: "Twitter" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll indicator bounce animation
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <HeroScene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base font-mono text-secondary mb-4"
        >
          👋 Hey there, I&apos;m
        </motion.p>

        {/* Name */}
        <AnimatedText
          text="Sahil Jadhav"
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 text-foreground"
          delay={0.4}
          scrollTrigger={false}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          A{" "}
          <span className="text-primary font-semibold">
            Fullstack Developer
          </span>{" "}
          who builds{" "}
          <span className="text-secondary font-semibold">interactive</span> &{" "}
          <span className="text-accent font-semibold">delightful</span> web
          experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <MagneticButton>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              View My Work
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              Get In Touch
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          {socials.map((social) => (
            <MagneticButton key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono">Scroll</span>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}
