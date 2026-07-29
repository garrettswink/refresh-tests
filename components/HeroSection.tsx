"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type HeroRing = {
  size: number;
  inset: number;
  mobileOnly: boolean;
  clockwise: boolean;
  delay: number;
  duration: number;
  opacity: number;
  strokeWidth: number;
};

// Concentric orbital rings — generated with a constant diameter step so the
// spacing between circles stays uniform from the core out to the perimeter.
const HERO_RINGS: HeroRing[] = (() => {
  const STEP = 13; // % between consecutive ring diameters (uniform gap)
  const MIN = 27; // innermost ring diameter (%)
  const MAX_ALL = 131; // largest ring shown on all breakpoints (%)
  const MAX_MOBILE = 235; // largest ring shown on mobile (bleeds off-section)
  const rings: HeroRing[] = [];
  let i = 0;
  for (let size = MIN; size <= MAX_MOBILE; size += STEP, i++) {
    rings.push({
      size,
      inset: (100 - size) / 2,
      mobileOnly: size > MAX_ALL,
      clockwise: i % 2 === 0,
      delay: +(0.2 + i * 0.14).toFixed(2),
      duration: Math.round(40 + size * 1.4),
      opacity: +Math.max(0.05, 0.24 - i * 0.011).toFixed(3),
      strokeWidth: +Math.max(0.08, 0.4 - i * 0.02).toFixed(3),
    });
  }
  return rings;
})();

export default function HeroSection() {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (profileRef.current) observer.observe(profileRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0a0a0a] relative">

      {/* Panel 1 — Headline */}
      <section className="relative h-[100svh] sm:h-[calc(100svh-5rem)] sm:mt-20 min-h-[560px] flex flex-col items-center justify-center overflow-hidden">

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        {/* Orbital rings — concentric, gapped, rotating in alternating directions.
            Each ring fades in synced with its corresponding headline word. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div
            className="relative"
            style={{ width: "min(960px, 120vw)", aspectRatio: "1 / 1" }}
          >
            {HERO_RINGS.map((ring, idx) => (
              <svg
                key={idx}
                viewBox="0 0 100 100"
                className={`absolute opacity-0 motion-reduce:!animate-none${
                  ring.mobileOnly ? " sm:hidden" : ""
                }`}
                style={{
                  inset: `${ring.inset}%`,
                  width: `${ring.size}%`,
                  height: `${ring.size}%`,
                  animation: `heroRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${ring.delay}s forwards, ${
                    ring.clockwise ? "heroRingSpin" : "heroRingSpinReverse"
                  } ${ring.duration}s linear infinite`,
                  transformOrigin: "50% 50%",
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke={`rgba(201,169,110,${ring.opacity})`}
                  strokeWidth={ring.strokeWidth}
                  strokeDasharray="34 9 18 6 26 8 20 7"
                  strokeLinecap="round"
                  pathLength="200"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Headline group — only the headline participates in the vertical
            centering so "Digital Communications Strategy" lands on the rings'
            horizontal axis. The sub-headline and scroll hang directly below it.
            The negative translate compensates for the nav offset and nudges the
            headline to sit square in the viewport's vertical center. */}
        <div className="relative flex flex-col items-center -translate-y-8 sm:-translate-y-14">
          {/* Headline */}
          <p
            className="font-cormorant font-light italic text-[#f0ece4] text-center px-5 sm:px-8 leading-[1.1] sm:leading-[1.2] tracking-[0.02em] sm:tracking-[0.04em] flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-1 sm:gap-y-0 gap-x-0 sm:gap-x-[0.3em]"
            style={{ fontSize: "clamp(2.1rem, 9vw, 5rem)" }}
          >
            <span className="opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards" }}>Digital</span>
            <span className="not-italic text-[#c9a96e] opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}>Communications</span>
            <span className="opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards" }}>Strategy</span>
          </p>

          {/* Sub-headline + scroll — hang below the centered headline */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Sub-headline */}
            <p
              className="mt-8 sm:mt-12 px-6 font-light text-[#f0ece4]/50 text-center tracking-[0.16em] sm:tracking-[0.22em] uppercase whitespace-nowrap opacity-0"
              style={{
                fontSize: "clamp(0.72rem, 3vw, 0.95rem)",
                animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.7s forwards",
              }}
            >
              Story, written end to end
            </p>

            {/* Scroll indicator — sits inside the inner ring, just below the headline */}
            <a
              href="#profile"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center gap-3 opacity-0 cursor-pointer group no-underline"
              style={{ animation: "fadeIn 1.2s ease 1.9s forwards" }}
              aria-label="Scroll to profile"
            >
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f0ece4]/30 group-hover:text-[#c9a96e]/60 transition-colors duration-300">Scroll</span>
              <div className="flex flex-col items-center gap-1.5" style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
                <div
                  className="w-px h-10 sm:h-12 group-hover:h-14 transition-all duration-300"
                  style={{ background: "linear-gradient(to bottom, rgba(240,236,228,0.1), rgba(201,169,110,0.6))" }}
                />
                <div className="w-[5px] h-[5px] rounded-full bg-[#c9a96e] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Panel 2 — Profile */}
      <section id="profile" className="scroll-mt-20 min-h-screen flex items-center justify-center px-6 py-24 border-t border-white/[0.06]">
        <div
          ref={profileRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 max-w-4xl w-full items-center opacity-0 translate-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          {/* Image */}
          <div className="relative aspect-[3/4] border border-white/[0.08] overflow-hidden max-w-[320px] w-full mx-auto md:mx-0">
            <Image
              src="/profile.jpg"
              alt="Garrett Swink"
              fill
              className="object-cover object-top"
              priority
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(160deg, rgba(201,169,110,0.04) 0%, transparent 60%)" }}
            />
          </div>

          {/* Bio */}
          <div>
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-5">
              Overview
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
               I'm a digital communications strategist and developer with more than 15 years in the field. My work covers the full arc of a brand's digital presence: the story it tells, the experience built around that story, and the strategy that puts both in front of the right audience. 
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
              I've led programs for major brands across B2B, B2C, and public affairs, and I bring that same discipline to small and mid-sized businesses as an independent consultant. 
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
            Whatever the scale of the engagement, the approach holds: story, strategy, and technology working together to build a complete digital experience. 

              </p>
            </div>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block text-[0.7rem] tracking-[0.14em] uppercase text-[#c9a96e] border border-[#c9a96e]/35 px-5 py-2.5 hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-200"
>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes expandRule {
          to { width: min(320px, 60vw); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes heroRingsFade {
          to { opacity: 1; }
        }
        @keyframes heroRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroRingSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroRingSpin"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}