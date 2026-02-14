"use client";

import { motion } from "motion/react";
import { Home } from "lucide-react";

import { AstronautScene, Canvas, MagneticButton } from "@/components";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-24 flex flex-col items-center justify-center px-6">
      <div className="h-72 w-72 md:h-96 md:w-96">
        <Canvas>
          <AstronautScene />
        </Canvas>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-8xl font-heading font-bold text-primary">404</h1>
        <p className="mt-4 text-xl dark:text-white max-w-md">
          Lost in space! This page doesn&apos;t exist in this galaxy.
        </p>

        <div className="mt-8">
          <MagneticButton
            as="a"
            href="/"
            className="bg-primary text-white hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Back to Earth
          </MagneticButton>
        </div>
      </motion.div>
    </main>
  );
}
