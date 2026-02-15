"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const techIcons = [
  { name: "React", icon: "/icons/react.svg", position: [-1.5, 0.8, 0] },
  { name: "Node", icon: "/icons/nodejs.svg", position: [1.5, 0.5, -0.5] },
  {
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    position: [0, 1.5, 0.5],
  },
  { name: "Next.js", icon: "/icons/nextjs.svg", position: [-1, -1, 0.5] },
  {
    name: "Tailwind",
    icon: "/icons/tailwindcss.svg",
    position: [1.2, -1, 0],
  },
];

function FloatingIcon({
  position,
  iconPath,
}: {
  position: number[];
  iconPath: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Load SVG as texture
    const loader = new THREE.TextureLoader();
    loader.load(iconPath, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [iconPath]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group
        ref={meshRef}
        position={position as [number, number, number]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        {/* Icon plane */}
        <mesh>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function SkillsScene() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.7} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 1 : 1.5} />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#8B5CF6" />
      <pointLight position={[3, -2, -2]} intensity={0.4} color="#6366f1" />
      <Environment preset={isDark ? "night" : "city"} />

      {techIcons.map((icon, i) => (
        <FloatingIcon key={i} position={icon.position} iconPath={icon.icon} />
      ))}
    </>
  );
}
