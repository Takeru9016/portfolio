"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

import { EmptyState, ProjectCard } from "@/components";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const defaultProjects: Project[] = [
  {
    _id: "1",
    title: "Portfolio Website",
    slug: { current: "portfolio" },
    description:
      "A 3D animated portfolio built with Next.js, Three.js, and GSAP.",
    tags: ["Next.js", "Three.js", "GSAP"],
  },
  {
    _id: "2",
    title: "E-Commerce Platform",
    slug: { current: "ecommerce" },
    description:
      "Full-stack e-commerce with payments, auth, and admin dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    _id: "3",
    title: "Task Management App",
    slug: { current: "taskapp" },
    description: "Collaborative task manager with real-time updates.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
  },
];

export function ProjectsContent({ projects }: { projects: Project[] }) {
  const displayProjects = projects?.length ? projects : defaultProjects;

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    displayProjects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [displayProjects]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return displayProjects;
    return displayProjects.filter((p) => p.tags?.includes(activeFilter));
  }, [displayProjects, activeFilter]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-secondary mb-2"
          >
            ./projects
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            My <span className="text-primary">Work</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            A collection of projects I&apos;ve built and contributed to
          </motion.p>
        </section>

        {/* Filter Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section>
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      title={project.title}
                      slug={project.slug.current}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      liveUrl={project.liveUrl}
                      githubUrl={project.githubUrl}
                      index={i}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState
              title="No projects found"
              message="No projects match this filter."
            />
          )}
        </section>
      </div>
    </main>
  );
}
