"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

import { SectionHeader, SkillCard } from "@/components";

const Canvas = dynamic(
  () =>
    import("@/components/3D/Canvas").then((mod) => ({ default: mod.Canvas })),
  {
    ssr: false,
  },
);
const SkillsScene = dynamic(
  () =>
    import("@/components/3D/SkillScene").then((mod) => ({
      default: mod.SkillsScene,
    })),
  {
    ssr: false,
  },
);

interface Skill {
  _id: string;
  name: string;
  iconUrl?: string;
  category?: string;
  proficiency?: number;
}

// Define category order
const categoryOrder = ["Frontend", "Backend", "Database", "Tools", "Other"];

const defaultSkills: Record<string, Skill[]> = {
  Frontend: [
    { _id: "1", name: "React", proficiency: 90 },
    { _id: "2", name: "Next.js", proficiency: 85 },
    { _id: "3", name: "TypeScript", proficiency: 85 },
    { _id: "4", name: "Tailwind CSS", proficiency: 90 },
    { _id: "5", name: "Three.js", proficiency: 60 },
    { _id: "6", name: "Framer Motion", proficiency: 75 },
  ],
  Backend: [
    { _id: "7", name: "Node.js", proficiency: 85 },
    { _id: "8", name: "Express", proficiency: 80 },
  ],
  Database: [
    { _id: "9", name: "MongoDB", proficiency: 80 },
    { _id: "10", name: "PostgreSQL", proficiency: 70 },
    { _id: "11", name: "Redis", proficiency: 65 },
  ],
  Tools: [
    { _id: "12", name: "Git", proficiency: 90 },
    { _id: "13", name: "Docker", proficiency: 65 },
    { _id: "14", name: "VS Code", proficiency: 95 },
    { _id: "15", name: "Figma", proficiency: 70 },
  ],
};

export function SkillsContent({ skills }: { skills: Skill[] }) {
  const groupedSkills =
    skills?.length ?
      skills.reduce(
        (acc, skill) => {
          const category = skill.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        },
        {} as Record<string, Skill[]>,
      )
    : defaultSkills;

  // Sort categories according to predefined order
  const categories = categoryOrder.filter((cat) =>
    Object.keys(groupedSkills).includes(cat),
  );
  // Add any categories not in the predefined order at the end
  const otherCategories = Object.keys(groupedSkills).filter(
    (cat) => !categoryOrder.includes(cat),
  );
  const allCategories = [...categories, ...otherCategories];

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
                <SkillsScene />
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
                <span>./skills</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold"
              >
                My <span className="text-primary">Toolkit</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-muted-foreground leading-relaxed text-base md:text-lg"
              >
                Technologies and tools I use to bring ideas to life. From
                frontend frameworks to backend systems, I'm constantly learning
                and expanding my skillset.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Skills by Category */}
        {allCategories.map((category) => (
          <section key={category} className="mb-16">
            <SectionHeader
              title={category}
              subtitle={`${groupedSkills[category].length} skills`}
              highlight={""}
            />
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {groupedSkills[category].map((skill, i) => (
                <SkillCard key={skill._id} skill={skill} index={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
