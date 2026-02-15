"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  _id: string;
  company: string;
  role: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  type?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
}

const defaultExperiences: Experience[] = [
  {
    _id: "1",
    company: "Freelance",
    role: "Fullstack Developer",
    startDate: "2023-01-01",
    isCurrent: true,
    location: "Remote",
    type: "freelance",
    description:
      "Building modern web applications for clients worldwide using React, Next.js, and Node.js.",
    highlights: [
      "Developed 10+ production applications",
      "Worked with clients across 5 countries",
      "Specialized in 3D web experiences",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Three.js"],
  },
  {
    _id: "2",
    company: "Tech Startup",
    role: "Frontend Developer",
    startDate: "2022-03-01",
    endDate: "2022-12-31",
    location: "Mumbai, India",
    type: "full-time",
    description:
      "Led frontend development for a SaaS platform, improving performance and user experience.",
    highlights: [
      "Reduced load time by 40%",
      "Implemented design system",
      "Mentored junior developers",
    ],
    technologies: ["React", "Redux", "Tailwind CSS", "Jest"],
  },
  {
    _id: "3",
    company: "Digital Agency",
    role: "Web Developer Intern",
    startDate: "2021-06-01",
    endDate: "2022-02-28",
    location: "Pune, India",
    type: "internship",
    description:
      "Started my professional journey building websites and learning modern development practices.",
    highlights: [
      "Built 5+ client websites",
      "Learned agile methodologies",
      "Gained production experience",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"],
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getEmploymentBadge(type?: string) {
  const badges: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    freelance: "Freelance",
    internship: "Internship",
  };
  return badges[type || ""] || type;
}

export function ExperienceContent({
  experiences,
}: {
  experiences: Experience[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayExperiences =
    experiences?.length ? experiences : defaultExperiences;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-secondary mb-2"
          >
            ./experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            My <span className="text-primary">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            A timeline of my professional experience and growth
          </motion.p>
        </section>

        {/* Timeline */}
        <section ref={containerRef} className="relative">
          {/* Animated Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 w-full bg-linear-to-b from-primary via-secondary to-accent"
            />
          </div>

          {/* Experience Items */}
          <div className="space-y-12">
            {displayExperiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2 z-10">
                  {exp.isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                  )}
                </div>

                {/* Date (Desktop) */}
                <div
                  className={`hidden md:flex md:w-1/2 ${
                    index % 2 === 0 ?
                      "justify-start pl-12"
                    : "justify-end pr-12"
                  }`}
                >
                  <div
                    className={`text-sm text-muted-foreground ${
                      index % 2 === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        {formatDate(exp.startDate)} —{" "}
                        {exp.isCurrent ? "Present" : formatDate(exp.endDate!)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`md:w-1/2 pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0">
                        {exp.logo ?
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        : <Briefcase
                            size={24}
                            className="text-muted-foreground"
                          />
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-lg">
                          {exp.role}
                        </h3>
                        <p className="text-primary font-medium">
                          {exp.company}
                        </p>

                        {/* Mobile Date */}
                        <p className="text-xs text-muted-foreground mt-1 md:hidden">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.isCurrent ? "Present" : formatDate(exp.endDate!)}
                        </p>
                      </div>

                      {/* Badge */}
                      {exp.type && (
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary shrink-0">
                          {getEmploymentBadge(exp.type)}
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    {exp.location && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {exp.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* End Dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute left-0 md:left-1/2 bottom-0 w-6 h-6 rounded-full bg-linear-to-br from-primary to-secondary -translate-x-1/2 translate-y-3 flex items-center justify-center"
          >
            <span className="text-xs">🚀</span>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
