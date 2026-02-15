"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const defaultTimeline: TimelineItem[] = [
  {
    year: "2021",
    title: "Started Coding",
    description: "Began my journey with HTML, CSS & JavaScript.",
  },
  {
    year: "2022",
    title: "Learned React & Node.js",
    description: "Built my first fullstack applications.",
  },
  {
    year: "2023",
    title: "Freelance & Projects",
    description: "Started freelancing and building real-world projects.",
  },
  {
    year: "2025",
    title: "Leveling Up",
    description: "Diving into 3D web, animations & advanced architectures.",
  },
];

export function Timeline({ items }: { items?: TimelineItem[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const displayItems = items?.length ? items : defaultTimeline;

  useEffect(() => {
    if (!timelineRef.current) return;

    const entries = timelineRef.current.querySelectorAll(".timeline-entry");

    entries.forEach((entry, i) => {
      gsap.fromTo(
        entry,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    const line = timelineRef.current.querySelector(".timeline-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 100%",
            scrub: 0.5,
          },
        },
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [displayItems]);

  return (
    <div ref={timelineRef} className="relative max-w-3xl mx-auto py-8">
      {/* Center line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border">
        <div className="timeline-line absolute inset-0 bg-linear-to-b from-primary via-secondary to-accent origin-top" />
      </div>

      <div className="space-y-16">
        {displayItems.map((item, i) => (
          <div
            key={i}
            className={`timeline-entry relative flex items-center gap-8 ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Content Card */}
            <div
              className={`w-[calc(50%-2rem)] ${i % 2 === 0 ? "text-right" : "text-left"}`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block p-5 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
              >
                <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-2">
                  {item.year}
                </span>
                <h4 className="text-lg font-heading font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background shadow-lg shadow-primary/30" />

            {/* Empty space for other side */}
            <div className="w-[calc(50%-2rem)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
