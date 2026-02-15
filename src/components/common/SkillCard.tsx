"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface Skill {
  _id: string;
  name: string;
  iconUrl?: string;
  category?: string;
  proficiency?: number;
}

export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-10 h-10 mb-3 flex items-center justify-center">
        {skill.iconUrl ?
          <Image
            src={skill.iconUrl}
            alt={skill.name}
            width={40}
            height={40}
            className="object-contain"
          />
        : <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-lg font-bold text-primary">
              {skill.name.charAt(0).toUpperCase()}
            </span>
          </div>
        }
      </div>

      {/* Name */}
      <h4 className="font-medium text-sm mb-2">{skill.name}</h4>

      {/* Proficiency Bar */}
      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency || 80}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
          className="h-full bg-linear-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </motion.div>
  );
}
