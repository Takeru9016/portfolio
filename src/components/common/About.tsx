"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Download, Briefcase, MapPin, Code2, Sparkles } from "lucide-react";

import {
  MagneticButton,
  AnimatedText,
  SectionHeader,
  FunFacts,
  Timeline,
} from "@/components";

const Canvas = dynamic(
  () =>
    import("@/components/3D/Canvas").then((mod) => ({ default: mod.Canvas })),
  { ssr: false },
);
const AboutScene = dynamic(
  () =>
    import("@/components/3D/AboutScene").then((mod) => ({
      default: mod.AboutScene,
    })),
  {
    ssr: false,
  },
);

interface AboutContentProps {
  settings: any;
  resumeUrl: string | null;
}

export function AboutContent({
  settings,
  resumeUrl,
}: AboutContentProps) {
  const name = settings?.name || "Sahil Jadhav";
  const bio =
    settings?.bio ||
    "I'm a fullstack developer passionate about building interactive web experiences with modern technologies. I love turning ideas into reality through clean code and creative solutions.";

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section - 3D Left, Text Right */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
            {/* Left: 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 via-transparent to-secondary/5 border border-border/50"
            >
              <Canvas>
                <AboutScene />
              </Canvas>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 text-sm font-mono text-secondary"
              >
                <Sparkles size={14} />
                <span>./about-me</span>
              </motion.div>

              {/* Heading */}
              <AnimatedText
                text={`Hey, I'm ${name}!`}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold"
                delay={0.5}
              />

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-muted-foreground leading-relaxed text-base md:text-lg"
              >
                {bio}
              </motion.p>

              {/* Quick Info Pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Briefcase size={14} /> Fullstack Developer
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <MapPin size={14} /> India
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                  <Code2 size={14} /> 2+ Years
                </span>
              </motion.div>

              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="pt-2"
              >
                <MagneticButton>
                  <a
                    href={resumeUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download size={18} /> Download Resume
                  </a>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="mb-24">
          <SectionHeader
            title="Fun Facts"
            subtitle="A few things about me"
            highlight={""}
          />
          <div className="mt-10">
            <FunFacts facts={settings?.funFacts} />
          </div>
        </section>

        {/* Tech Journey */}
        <section className="mb-12">
          <SectionHeader
            title="My Journey"
            subtitle="The path that led me here"
            highlight={""}
          />
          <div className="mt-10">
            <Timeline />
          </div>
        </section>
      </div>
    </main>
  );
}
