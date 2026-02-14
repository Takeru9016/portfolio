"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatsProps {
  stats?: { value: number; suffix: string; label: string }[];
}

const defaultStats = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Passion" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val));
            },
          },
        );
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl font-heading font-bold text-primary"
    >
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection({ stats }: StatsProps) {
  const displayStats = stats?.length ? stats : defaultStats;
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {displayStats.map((stat) => (
          <div key={stat.label} className="text-center space-y-2">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="text-sm md:text-base text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
