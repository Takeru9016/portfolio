"use client";

import { motion } from "motion/react";

import { Canvas, AstronautScene } from "@/components";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  message = "Content is floating somewhere in space. Check back soon!",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-72 w-72 md:h-96 md:w-96">
        <Canvas>
          <AstronautScene />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-4"
      >
        <h3 className="text-2xl font-heading font-bold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-black dark:text-muted-foreground max-w-sm">{message}</p>
      </motion.div>
    </div>
  );
}
