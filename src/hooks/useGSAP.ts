"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPScrollTrigger() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return { gsap, ScrollTrigger };
}

export function useGSAPAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      timeline.current?.kill();
    };
  }, []);

  return { ref, timeline, gsap, ScrollTrigger };
}
