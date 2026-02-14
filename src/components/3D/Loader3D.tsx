"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import type { Mesh } from "three";

export function Loader3DScene() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.6} />
      </mesh>
    </>
  );
}
