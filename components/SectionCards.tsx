"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: "Agency Experience",
    description:
      "A decade of leading integrated campaigns for global brands across B2B, B2C, and public affairs.",
    href: "/experience",
  },
  {
    title: "Capabilities",
    description:
      "Strategy, social, paid media, SEO, and web development — the full spectrum of digital communications.",
    href: "/capabilities",
  },
  {
    title: "Case Studies",
    description:
      "Selected work and results from campaigns built for Microsoft, Nestlé, Coca-Cola, and more.",
    href: "/case-studies",
  },
];

export default function SectionCards() {
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
    <section
      id="work"
      className="bg-[#0a0a0a] border-t border-white/[0.06] px-6 py-24 min-h-screen scroll-mt-20"
    >
      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] text-center mb-4">
        Explore
      </p>
      <h2
        className="font-cormorant font-light text-[#f0ece4] text-center tracking-[0.02em] mb-6"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
      >
        What I Do
      </h2>

      {/* Left-to-right gold rule under the heading */}
      <div
        ref={ruleRef}
        aria-hidden
        className="h-px mx-auto mb-16 transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:!w-[min(220px,40vw)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,169,110,0.55) 0%, rgba(201,169,110,0.25) 70%, transparent 100%)",
          width: ruleVisible ? "min(220px, 40vw)" : 0,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative border border-white/[0.08] p-10 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-white/[0.02] hover:border-[#c9a96e]/30"
          >
            {/* Bottom gold sweep */}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-[#c9a96e] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />

            <h3 className="font-cormorant font-light text-[1.5rem] text-[#f0ece4] tracking-[0.02em] leading-[1.2] mb-4">
              {card.title}
            </h3>
            <p className="text-[0.78rem] font-light leading-[1.75] text-[#f0ece4]/40 mb-8">
              {card.description}
            </p>
            <span className="flex items-center gap-2 text-[0.65rem] tracking-[0.15em] uppercase text-[#c9a96e] opacity-0 -translate-x-1.5 transition-all duration-[250ms] group-hover:opacity-100 group-hover:translate-x-0">
              Learn more <span className="text-[0.8rem]">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}