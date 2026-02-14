"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function AstronautModel() {
  const { scene, animations } = useGLTF("/models/astronaut.glb");
  const ref = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      action?.reset().fadeIn(0.5).play();
    }

    return () => {
      names.forEach((name) => actions[name]?.fadeOut(0.5));
    };
  }, [actions, names]);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive
        ref={ref}
        object={scene}
        scale={1.4}
        position={[0, -1.5, 0]}
        rotation={[0, 0, 0]}
      />
    </Float>
  );
}

export function AstronautScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
      <Environment preset="city" />
      <AstronautModel />
    </>
  );
}

useGLTF.preload("/models/astronaut.glb");
