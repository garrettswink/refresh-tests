// components/PageBanner.tsx
"use client";

import { useEffect, useRef } from "react";

type PageBannerProps = {
  titleStart: string;
  titleAccent: string;
};

export default function PageBanner({ titleStart, titleAccent }: PageBannerProps) {
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ruleRef.current) {
      ruleRef.current.style.width = "min(320px, 50vw)";
    }
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/[0.07]">
      {/* Orbital rings */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0"
        style={{ animation: "ringsFade 2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards" }}
      >
        <div className="relative" style={{ width: "min(900px, 110vw)", aspectRatio: "1 / 1" }}>
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: "rgba(201,169,110,0.14)",
              transform: "translate(4%, -2%)",
              animation: "ringSpin 120s linear infinite",
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full border"
            style={{
              inset: "12%",
              borderColor: "rgba(201,169,110,0.10)",
              transform: "translate(-3%, 3%)",
              animation: "ringSpinReverse 180s linear infinite",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute rounded-full border"
            style={{
              inset: "28%",
              borderColor: "rgba(201,169,110,0.08)",
              transform: "translate(2%, -4%)",
              animation: "ringSpin 240s linear infinite",
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        {/* Title */}
        <h1
          className="font-cormorant font-light text-[#f0ece4] leading-[1.15] tracking-[0.02em] flex flex-wrap justify-center gap-x-[0.3em]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          <span
            className="opacity-0 translate-y-2"
            style={{ animation: "bannerUp 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards" }}
          >
            {titleStart}
          </span>
          <span
            className="italic text-[#c9a96e] opacity-0 translate-y-2"
            style={{ animation: "bannerUp 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards" }}
          >
            {titleAccent}
          </span>
        </h1>

        {/* Expanding gold rule */}
        <div
          ref={ruleRef}
          className="mt-10 h-px transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
            width: 0,
            transitionDelay: "1.1s",
          }}
        />
      </div>

      <style>{`
        @keyframes bannerUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringsFade {
          to { opacity: 1; }
        }
        @keyframes ringSpin {
          from { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(0deg); }
          to { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(360deg); }
        }
        @keyframes ringSpinReverse {
          from { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(0deg); }
          to { transform: translate(var(--tx, 0), var(--ty, 0)) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}