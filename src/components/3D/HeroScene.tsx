"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  MeshTransmissionMaterial,
  Environment,
  Stars,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Theme-aware color palettes
const palette = {
  dark: {
    primary: "#8B5CF6",
    secondary: "#22D3EE",
    accent: "#F472B6",
    particles: "#a78bfa",
    ambient: 0.3,
    directional: 0.8,
    bg: "#030014",
  },
  light: {
    primary: "#7C3AED",
    secondary: "#0891B2",
    accent: "#EC4899",
    particles: "#7C3AED",
    ambient: 0.7,
    directional: 1.5,
    bg: "#f8fafc",
  },
};

function GlassSphere({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref} position={[-3.5, 1.2, -2]}>
        <icosahedronGeometry args={[1.2, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color={isDark ? palette.dark.primary : palette.light.primary}
          roughness={0.1}
          transmission={isDark ? 0.95 : 0.85}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}

function DistortedTorus({ isDark }: { isDark: boolean }) {
  return (
    <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
      <mesh position={[3.5, -0.8, -1.5]}>
        <torusGeometry args={[0.9, 0.35, 32, 64]} />
        <MeshDistortMaterial
          color={isDark ? palette.dark.secondary : palette.light.secondary}
          distort={0.3}
          speed={2}
          roughness={isDark ? 0.15 : 0.3}
          metalness={isDark ? 0.9 : 0.6}
        />
      </mesh>
    </Float>
  );
}

function WobbleOctahedron({ isDark }: { isDark: boolean }) {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.8}>
      <mesh position={[2.2, 2.2, -3]}>
        <octahedronGeometry args={[0.6]} />
        <MeshWobbleMaterial
          color={isDark ? palette.dark.accent : palette.light.accent}
          factor={0.4}
          speed={1.5}
          roughness={isDark ? 0.1 : 0.3}
          metalness={isDark ? 0.95 : 0.5}
        />
      </mesh>
    </Float>
  );
}

function WireframeDodecahedron({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={ref} position={[-2, 2.5, -4]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial
          color={isDark ? palette.dark.secondary : palette.light.secondary}
          wireframe
          roughness={0.1}
          metalness={1}
          emissive={isDark ? palette.dark.secondary : palette.light.secondary}
          emissiveIntensity={isDark ? 0.3 : 0.1}
        />
      </mesh>
    </Float>
  );
}

function FloatingCone({ isDark }: { isDark: boolean }) {
  return (
    <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1}>
      <mesh position={[-1.5, -1.8, -2]} rotation={[0.5, 0.3, 0.2]}>
        <coneGeometry args={[0.45, 1.2, 6]} />
        <meshStandardMaterial
          color={isDark ? palette.dark.primary : palette.light.primary}
          roughness={isDark ? 0.2 : 0.4}
          metalness={isDark ? 0.85 : 0.5}
          emissive={isDark ? palette.dark.primary : palette.light.primary}
          emissiveIntensity={isDark ? 0.15 : 0.05}
        />
      </mesh>
    </Float>
  );
}

function RingShape({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={ref} position={[1, -2, -3]}>
        <torusGeometry args={[0.5, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={isDark ? palette.dark.accent : palette.light.accent}
          roughness={0.1}
          metalness={0.9}
          emissive={isDark ? palette.dark.accent : palette.light.accent}
          emissiveIntensity={isDark ? 0.2 : 0.05}
        />
      </mesh>
    </Float>
  );
}

function Particles({
  count = 250,
  isDark,
}: {
  count?: number;
  isDark: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.035 : 0.025}
        color={isDark ? palette.dark.particles : palette.light.particles}
        transparent
        opacity={isDark ? 0.7 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Lighting({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight
        intensity={isDark ? palette.dark.ambient : palette.light.ambient}
      />
      <directionalLight
        position={[5, 5, 5]}
        intensity={
          isDark ? palette.dark.directional : palette.light.directional
        }
        color={isDark ? "#c4b5fd" : "#ffffff"}
      />
      <pointLight
        position={[-5, -3, -5]}
        intensity={isDark ? 0.4 : 0.2}
        color={palette.dark.secondary}
      />
      <pointLight
        position={[5, -3, 5]}
        intensity={isDark ? 0.3 : 0.15}
        color={palette.dark.accent}
      />
      {isDark && (
        <pointLight
          position={[0, 5, 0]}
          intensity={0.2}
          color={palette.dark.primary}
        />
      )}
    </>
  );
}

export function HeroScene() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <>
      <Lighting isDark={isDark} />
      <Environment preset={isDark ? "night" : "city"} />

      {/* Dark mode: stars + sparkles | Light mode: subtle sparkles */}
      {isDark && (
        <Stars
          radius={60}
          depth={60}
          count={1500}
          factor={3}
          fade
          speed={0.8}
        />
      )}
      <Sparkles
        count={isDark ? 80 : 40}
        scale={12}
        size={isDark ? 2 : 1.5}
        speed={0.3}
        color={isDark ? palette.dark.primary : palette.light.primary}
        opacity={isDark ? 0.6 : 0.3}
      />

      {/* Shapes */}
      <GlassSphere isDark={isDark} />
      <DistortedTorus isDark={isDark} />
      <WobbleOctahedron isDark={isDark} />
      <WireframeDodecahedron isDark={isDark} />
      <FloatingCone isDark={isDark} />
      <RingShape isDark={isDark} />

      {/* Particles */}
      <Particles count={300} isDark={isDark} />
    </>
  );
}
