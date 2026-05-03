// components/CaseStudyEntry.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type CaseStudyData = {
  id: string;
  title: string;
  client: string;
  campaignType: string;
  logo: string;
  logoAlt: string;
  /** Scale multiplier for the logo within its panel.
   * Default 1. Use values >1 for logos with extra viewBox padding
   * (e.g., Nestlé, Microsoft) that render small at object-fit:contain. */
  logoScale?: number;
  tactics: string[];
  summary: string;
  link?: string;
};

type CaseStudyEntryProps = {
  caseStudy: CaseStudyData;
  index: number;
};

const LETTER_DELAY_MS = 80;
const LETTER_DURATION_MS = 900;

export default function CaseStudyEntry({ caseStudy, index }: CaseStudyEntryProps) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Even indexes (0, 2, 4) -> logo on left
  // Odd indexes (1, 3, 5) -> logo on right
  // On mobile, everything stacks logo-first regardless of index.
  const logoOnLeft = index % 2 === 0;

  return (
    <article
      id={caseStudy.id}
      ref={ref}
      className={`scroll-mt-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Campaign type eyebrow */}
      <p className="text-[0.65rem] tracking-[0.25em] uppercase text-[#c9a96e] mb-6">
        {caseStudy.campaignType}
      </p>

      {/* Project title — large italic with letter-by-letter gold sweep */}
      <h3
        className="font-cormorant italic font-light leading-[1.05] tracking-[0.01em] mb-12 md:mb-16 motion-reduce:text-[#c9a96e]"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.75rem)" }}
        aria-label={caseStudy.title}
      >
        {Array.from(caseStudy.title).map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
            style={{
              color: visible ? "#c9a96e" : "#f0ece4",
              transitionDuration: `${LETTER_DURATION_MS}ms`,
              transitionDelay: visible ? `${i * LETTER_DELAY_MS}ms` : "0ms",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h3>

      {/* Two-column body: logo + content, alternating left/right by index */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start ${
          logoOnLeft ? "" : "md:[&>:first-child]:order-2"
        }`}
      >
        {/* Logo panel */}
        <div className={`md:col-span-5 ${logoOnLeft ? "md:order-1" : "md:order-2"}`}>
          <div
            className={`relative aspect-[4/3] flex items-center justify-center p-10 md:p-12 transition-colors duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? "border-[#c9a96e]/40" : "border-[#c9a96e]/15"
            }`}
            style={{
              backgroundColor: "rgba(240, 236, 228, 0.02)",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${caseStudy.logoScale ?? 1})`,
                transformOrigin: "center",
              }}
            >
              <Image
                src={caseStudy.logo}
                alt={caseStudy.logoAlt}
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-contain"
                priority={index < 2}
              />
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className={`md:col-span-7 ${logoOnLeft ? "md:order-2" : "md:order-1"}`}>
          {/* Client meta */}
          <dl className="mb-8 space-y-3">
            <div className="flex gap-6">
              <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 pt-[0.3rem] w-20 shrink-0">
                Client
              </dt>
              <dd className="text-[0.95rem] font-light text-[#f0ece4]/85">
                {caseStudy.client}
              </dd>
            </div>
            {caseStudy.link && (
              <div className="flex gap-6">
                <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 pt-[0.3rem] w-20 shrink-0">
                  Live
                </dt>
                <dd className="text-[0.95rem] font-light">
                  <a
                    href={caseStudy.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
                  >
                    {caseStudy.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          {/* Summary */}
          <p className="text-[0.95rem] font-light leading-[1.85] text-[#f0ece4]/75 mb-10">
            {caseStudy.summary}
          </p>

          {/* Tactics credit line */}
          <div>
            <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[#f0ece4]/40 mb-4">
              Tactics
            </p>
            <p className="text-[0.7rem] tracking-[0.18em] uppercase font-light leading-[2.2] text-[#f0ece4]/55">
              {caseStudy.tactics.map((tactic, i) => (
                <span key={i}>
                  {tactic}
                  {i < caseStudy.tactics.length - 1 && (
                    <span className="text-[#c9a96e] mx-3" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}