"use client";

import { motion } from "motion/react";

interface FunFact {
  emoji: string;
  fact: string;
}

const defaultFacts: FunFact[] = [
  { emoji: "☕", fact: "Fueled by mass amounts of coffee" },
  { emoji: "🎮", fact: "Gamer when not coding" },
  { emoji: "🌙", fact: "Night owl developer" },
  { emoji: "🚀", fact: "Love building side projects" },
  { emoji: "📚", fact: "Always learning something new" },
  { emoji: "🎵", fact: "Code with lo-fi beats on" },
];

export function FunFacts({ facts }: { facts?: FunFact[] }) {
  const displayFacts = facts?.length ? facts : defaultFacts;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {displayFacts.map((fact, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ scale: 1.03, y: -6 }}
          className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300 cursor-default overflow-hidden"
        >
          {/* Background glow on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <span className="text-4xl md:text-5xl block mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              {fact.emoji}
            </span>
            <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
              {fact.fact}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
