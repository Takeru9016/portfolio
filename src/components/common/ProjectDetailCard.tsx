"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { MagneticButton } from "@/components";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  content?: any[];
  image?: string;
  gallery?: string[];
  tags?: string[];
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// Default projects data
const defaultProjects: Record<string, Project> = {
  portfolio: {
    _id: "default-portfolio",
    title: "3D Portfolio Website",
    slug: { current: "portfolio" },
    description:
      "A modern, interactive portfolio built with Next.js 15, Three.js, and GSAP. Features 3D animations, smooth page transitions, and a playful design with light/dark mode support.",
    image: undefined,
    tags: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS 4",
      "Sanity CMS",
      "Zustand",
      "Vercel",
    ],
    liveUrl: "https://sahiljadhav.vercel.app",
    githubUrl: "https://github.com/Takeru9016/portfolio",
    gallery: [],
    content: undefined,
  },
  ecommerce: {
    _id: "default-ecommerce",
    title: "E-Commerce Platform",
    slug: { current: "ecommerce" },
    description:
      "A full-stack e-commerce platform with user authentication, payment processing, product management, and an admin dashboard.",
    image: undefined,
    tags: ["React", "Node.js", "MongoDB"],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "JWT Auth",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    gallery: [],
    content: undefined,
  },
  taskapp: {
    _id: "default-taskapp",
    title: "Task Management App",
    slug: { current: "taskapp" },
    description:
      "A collaborative task management application with real-time updates, team workspaces, and drag-and-drop functionality.",
    image: undefined,
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth.js",
      "Tailwind CSS",
      "React DnD",
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    gallery: [],
    content: undefined,
  },
};

// Default content sections for portfolio project
const portfolioFeatures = [
  {
    title: "🎨 3D Animations",
    description:
      "Interactive 3D scenes built with React Three Fiber and Drei, featuring floating models, particle effects, and smooth camera transitions.",
  },
  {
    title: "✨ Smooth Transitions",
    description:
      "Page transitions and scroll-triggered animations powered by GSAP and Framer Motion for a fluid user experience.",
  },
  {
    title: "🌓 Light/Dark Mode",
    description:
      "Fully themed with CSS variables and next-themes, including 3D scene lighting that adapts to the current theme.",
  },
  {
    title: "📱 Fully Responsive",
    description:
      "Optimized for all screen sizes with mobile-first design principles and touch-friendly interactions.",
  },
  {
    title: "🚀 Performance Optimized",
    description:
      "Lazy-loaded 3D components, optimized images, and efficient animations for fast load times.",
  },
  {
    title: "📝 CMS Integration",
    description:
      "Content managed through Sanity CMS with live preview, making it easy to update projects, skills, and experiences.",
  },
];

export function ProjectDetailContent({ project }: { project: Project | null }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Use default if project is null or use slug to find default
  const slug = project?.slug?.current;
  const displayProject =
    project ||
    (slug ? defaultProjects[slug] : null) ||
    defaultProjects.portfolio;
  const isPortfolio = displayProject.slug.current === "portfolio";

  return (
    <main className="min-h-screen pb-20">
      {/* Parallax Hero */}
      <section
        ref={heroRef}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          {displayProject.image ? (
            <Image
              src={displayProject.image}
              alt={displayProject.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {isPortfolio ? (
                  <div className="relative w-48 h-32 md:w-64 md:h-40 mb-6 mx-auto rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                    <Image
                      src="https://placehold.net/600x400.png"
                      alt={displayProject.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ) : (
                  <span className="text-8xl md:text-9xl block mb-4">💻</span>
                )}
                <span className="text-xl md:text-2xl font-mono text-muted-foreground">
                  {isPortfolio ? "You are here!" : "Project Preview"}
                </span>
              </motion.div>
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-6xl mx-auto"
        >
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 w-fit transition-colors"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {/* Tags */}
          {displayProject.tags && displayProject.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {displayProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            {displayProject.title}
          </motion.h1>

          {/* Description */}
          {displayProject.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl"
            >
              {displayProject.description}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-12">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {displayProject.liveUrl && (
            <MagneticButton>
              <a
                href={displayProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={18} /> View Live
              </a>
            </MagneticButton>
          )}
          {displayProject.githubUrl && (
            <MagneticButton>
              <a
                href={displayProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:border-primary/50 hover:text-primary transition-all"
              >
                <Github size={18} /> View Code
              </a>
            </MagneticButton>
          )}
        </motion.div>

        {/* Tech Stack */}
        {displayProject.techStack && displayProject.techStack.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-xl font-heading font-semibold mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {displayProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Rich Content from Sanity */}
        {displayProject.content && displayProject.content.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 prose prose-invert prose-lg max-w-none"
          >
            <PortableText value={displayProject.content} />
          </motion.section>
        )}

        {/* Default Features Section (for portfolio) */}
        {isPortfolio && !displayProject.content && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-xl font-heading font-semibold mb-6">
              Key Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolioFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Project Highlights (for non-portfolio defaults) */}
        {!isPortfolio && !displayProject.content && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="p-6 rounded-xl border border-border bg-card/50 text-center">
              <span className="text-4xl mb-4 block">🔧</span>
              <h3 className="font-semibold mb-2">
                Project Details Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground">
                Full project details will be available once added to the CMS.
              </p>
            </div>
          </motion.section>
        )}

        {/* Image Gallery */}
        {displayProject.gallery && displayProject.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-xl font-heading font-semibold mb-6">Gallery</h2>
            <div className="grid gap-4">
              {displayProject.gallery.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative aspect-video rounded-xl overflow-hidden border border-border"
                >
                  <Image
                    src={image}
                    alt={`${displayProject.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back to all projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
