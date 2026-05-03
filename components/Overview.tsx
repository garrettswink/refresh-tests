// components/Overview.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type OverviewProps = {
  eyebrow?: string;
  heading: string;
  body: string[];
};

export default function Overview({ eyebrow = "Overview", heading, body }: OverviewProps) {
  const ruleRef = useRef<HTMLDivElement>(null);
  const [ruleVisible, setRuleVisible] = useState(false);

  useEffect(() => {
    const el = ruleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRuleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative px-6 pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-6">
          {eyebrow}
        </p>

        <h2
          className="font-cormorant font-light text-[#f0ece4] leading-[1.2] tracking-[0.02em] mb-6"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
        >
          {heading}
        </h2>

        {/* Left-to-right gold rule under the heading */}
        <div
          ref={ruleRef}
          aria-hidden
          className="h-px mb-10 transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:!w-[min(220px,40vw)]"
          style={{
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.55) 0%, rgba(201,169,110,0.25) 70%, transparent 100%)",
            width: ruleVisible ? "min(220px, 40vw)" : 0,
          }}
        />

        <div className="space-y-5">
          {body.map((paragraph, i) => (
            <p
              key={i}
              className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}