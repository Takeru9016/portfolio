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
  settings: {
    name?: string;
    bio?: string;
    resumeUrl?: string | null;
    location?: string;
    yearsExperience?: string;
    jobTitle?: string;
    funFacts?: { emoji: string; fact: string }[];
    timeline?: { year: string; title: string; description: string }[];
  } | null;
}

// Defaults
const defaults = {
  name: "Sahil Jadhav",
  bio: "I'm a fullstack developer passionate about building interactive web experiences with modern technologies. I love turning ideas into reality through clean code and creative solutions.",
  location: "India",
  yearsExperience: "2+ Years",
  jobTitle: "Fullstack Developer",
  funFacts: [
    { emoji: "☕", fact: "Fueled by mass amounts of coffee" },
    { emoji: "🎮", fact: "Gamer when not coding" },
    { emoji: "🌙", fact: "Night owl developer" },
    { emoji: "🚀", fact: "Love building side projects" },
    { emoji: "📚", fact: "Always learning something new" },
    { emoji: "🎵", fact: "Code with lo-fi beats on" },
  ],
  timeline: [
    {
      year: "2022",
      title: "Started Coding",
      description: "Began my journey with HTML, CSS & JavaScript.",
    },
    {
      year: "2023",
      title: "Learned React & Node.js",
      description: "Built my first fullstack applications.",
    },
    {
      year: "2024",
      title: "Freelance & Projects",
      description: "Started freelancing and building real-world projects.",
    },
    {
      year: "2025",
      title: "Leveling Up",
      description: "Diving into 3D web, animations & advanced architectures.",
    },
  ],
};

export function AboutContent({ settings }: AboutContentProps) {
  const name = settings?.name || defaults.name;
  const bio = settings?.bio || defaults.bio;
  const location = settings?.location || defaults.location;
  const yearsExperience = settings?.yearsExperience || defaults.yearsExperience;
  const jobTitle = settings?.jobTitle || defaults.jobTitle;
  const funFacts = settings?.funFacts?.length
    ? settings.funFacts
    : defaults.funFacts;
  const timeline = settings?.timeline?.length
    ? settings.timeline
    : defaults.timeline;
  const resumeUrl = settings?.resumeUrl;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 text-sm font-mono text-secondary"
              >
                <Sparkles size={14} />
                <span>./about-me</span>
              </motion.div>

              <AnimatedText
                text={`Hey, I'm ${name}!`}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold"
                delay={0.5}
              />

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-muted-foreground leading-relaxed text-base md:text-lg"
              >
                {bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Briefcase size={14} /> {jobTitle}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                  <MapPin size={14} /> {location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                  <Code2 size={14} /> {yearsExperience}
                </span>
              </motion.div>

              {resumeUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="pt-2"
                >
                  <MagneticButton>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                      <Download size={18} /> Download Resume
                    </a>
                  </MagneticButton>
                </motion.div>
              )}
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
            <FunFacts facts={funFacts} />
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-12">
          <SectionHeader
            title="My Journey"
            subtitle="The path that led me here"
            highlight={""}
          />
          <div className="mt-10">
            <Timeline items={timeline} />
          </div>
        </section>
      </div>
    </main>
  );
}
