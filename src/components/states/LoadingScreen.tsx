"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Canvas, Loader3DScene } from "@/components";
import { useStore } from "@/stores";

export function LoadingScreen() {
  const { isLoading, setIsLoading } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
        >
          <div className="h-64 w-64">
            <Canvas>
              <Loader3DScene />
            </Canvas>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Sahil<span className="text-primary">.</span>
            </h2>
            <div className="mt-3 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
