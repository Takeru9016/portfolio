"use client";

import { useRef, useEffect, useState } from "react";
import {
  useGLTF,
  useAnimations,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function WorkingManModel() {
  const { scene, animations } = useGLTF("/models/laptop.glb");
  const ref = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    // Play typing animation if available
    if (names.length > 0) {
      const action = actions[names[0]];
      action?.reset().fadeIn(0.5).play();
    }
    return () => {
      names.forEach((name) => actions[name]?.fadeOut(0.5));
    };
  }, [actions, names]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.3}
      position={[-0.5, -1, 0]}
      rotation={[0, 1, 0.5]}
    />
  );
}

export function AboutScene() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <>
      <ambientLight intensity={isDark ? 0.6 : 0.9} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDark ? 1.2 : 1.8}
        color={isDark ? "#c4b5fd" : "#ffffff"}
      />
      <pointLight position={[-3, 2, 4]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[3, 1, 2]} intensity={0.3} color="#22D3EE" />
      <Environment preset={isDark ? "night" : "city"} />
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={isDark ? 0.5 : 0.4}
        scale={12}
        blur={2.5}
        far={4}
      />
      <WorkingManModel />
    </>
  );
}

useGLTF.preload("/models/laptop.glb");
