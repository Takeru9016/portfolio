"use client";

import { motion } from "motion/react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

import { SectionHeader, MagneticButton, EmptyState } from "@/components";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  slug: string;
}

// Placeholder until Sanity is connected
const placeholderProjects: Project[] = [];

export function FeaturedProjects({
  projects = placeholderProjects,
}: {
  projects?: Project[];
}) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="Some things I've built recently"
          highlight={""}
        />

        {projects.length === 0 ? (
          <EmptyState
            title="Projects loading..."
            message="My latest work will appear here once connected to the CMS."
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    {/* Image */}
                    <div className="aspect-video bg-muted overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Preview
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink size={14} /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github size={14} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All */}
            <div className="flex justify-center mt-12">
              <MagneticButton>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors"
                >
                  View All Projects <ArrowRight size={16} />
                </Link>
              </MagneticButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
