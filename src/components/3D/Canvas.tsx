"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

import { CanvasErrorBoundary } from "@/components";

interface CanvasProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
}

export function Canvas({ children, className, fallback }: CanvasProps) {
  return (
    <CanvasErrorBoundary fallback={fallback}>
      <R3FCanvas
        className={className}
        camera={{ position: [0, 0, 5], fov: 50 }}
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
    </CanvasErrorBoundary>
  );
}
