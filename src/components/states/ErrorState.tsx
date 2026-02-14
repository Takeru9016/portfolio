"use client";

import { motion } from "motion/react";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{
          textShadow: [
            "0 0 10px rgba(139,92,246,0.5)",
            "0 0 20px rgba(139,92,246,0.8)",
            "0 0 10px rgba(139,92,246,0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertTriangle className="h-20 w-20 text-accent" />
      </motion.div>

      {/* Glitchy title */}
      <motion.h3
        className="mt-6 text-3xl font-heading font-bold text-foreground relative"
        animate={{
          x: [0, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <span className="relative">
          {title}
          {/* Glitch layers */}
          <span className="absolute inset-0 text-primary opacity-50 clip-glitch-1">
            {title}
          </span>
          <span className="absolute inset-0 text-secondary opacity-50 clip-glitch-2">
            {title}
          </span>
        </span>
      </motion.h3>

      <p className="mt-3 text-muted max-w-sm text-center">{message}</p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </motion.button>
      )}
    </div>
  );
}
