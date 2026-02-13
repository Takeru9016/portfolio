"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface CanvasProps {
  children: ReactNode;
  className?: string;
}

export function Canvas({ children, className }: CanvasProps) {
  return (
    <R3FCanvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </R3FCanvas>
  );
}
