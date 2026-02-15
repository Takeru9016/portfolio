"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, ContactShadows } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Mailbox({ success }: { success: boolean }) {
  const { scene } = useGLTF("/models/mailbox.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - Math.PI / 2;
      if (success) {
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive
        ref={ref}
        object={scene.clone()}
        scale={5}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
    </Float>
  );
}

function PaperAirplane({ animate }: { animate: boolean }) {
  const { scene } = useGLTF("/models/paper-airplane.glb");
  const ref = useRef<THREE.Group>(null);
  const startTime = useRef(0);

  useFrame((state) => {
    if (ref.current && animate) {
      if (startTime.current === 0) startTime.current = state.clock.elapsedTime;
      const elapsed = state.clock.elapsedTime - startTime.current;

      // Fly animation
      ref.current.position.x = Math.min(elapsed * 2, 5);
      ref.current.position.y = Math.sin(elapsed * 3) * 0.3 + elapsed * 0.5;
      ref.current.position.z = -elapsed * 0.5;
      ref.current.rotation.z = Math.sin(elapsed * 5) * 0.1;
      ref.current.rotation.x = -0.3;

      // Fade out
      if (elapsed > 2) {
        ref.current.visible = false;
      }
    }
  });

  if (!animate) return null;

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      scale={0.3}
      position={[-2, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

function Scene({ success }: { success: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 1}
        castShadow
      />
      <pointLight
        position={[-3, 2, 0]}
        intensity={0.5}
        color={isDark ? "#8B5CF6" : "#22D3EE"}
      />

      <Mailbox success={success} />
      <PaperAirplane animate={success} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
      />

      <Environment preset={isDark ? "night" : "city"} />
    </>
  );
}

export function MailboxScene({ success = false }: { success?: boolean }) {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene success={success} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload models
useGLTF.preload("/models/mailbox.glb");
useGLTF.preload("/models/paper-airplane.glb");
