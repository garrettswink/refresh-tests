// components/AgencyDivider.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function AgencyDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="flex justify-center">
      <div
        className="h-px transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:!w-[min(320px,50vw)]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
          width: visible ? "min(320px, 50vw)" : 0,
        }}
      />
    </div>
  );
}