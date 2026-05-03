"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
    <div className="bg-[#0a0a0a] relative overflow-hidden">

      {/* Panel 1 — Headline */}
      <section className="relative h-screen min-h-[500px] flex flex-col items-center justify-center overflow-hidden">

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
            {/* Outermost ring — counter-clockwise, slowest — appears with scroll button.
                Sized larger than the container so it deliberately bleeds past the
                viewport and nav, suggesting endless radiating circles. */}
            <svg
              viewBox="0 0 100 100"
              className="absolute opacity-0 motion-reduce:!animate-none"
              style={{
                inset: "-13%",
                width: "126%",
                height: "126%",
                animation:
                  "heroRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.9s forwards, heroRingSpinReverse 200s linear infinite",
                transformOrigin: "50% 50%",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="rgba(201,169,110,0.12)"
                strokeWidth="0.14"
                strokeDasharray="50 10 22 8 34 12 26 8"
                strokeLinecap="round"
                pathLength="200"
              />
            </svg>

            {/* Outer ring — clockwise, slow — appears with "Strategy" */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full opacity-0 motion-reduce:!animate-none"
              style={{
                animation:
                  "heroRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards, heroRingSpin 140s linear infinite",
                transformOrigin: "50% 50%",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="rgba(201,169,110,0.18)"
                strokeWidth="0.18"
                strokeDasharray="40 8 18 6 28 10 22 6"
                strokeLinecap="round"
                pathLength="200"
              />
            </svg>

            {/* Middle ring — counter-clockwise, medium — appears with "Communications" */}
            <svg
              viewBox="0 0 100 100"
              className="absolute opacity-0 motion-reduce:!animate-none"
              style={{
                inset: "13%",
                width: "74%",
                height: "74%",
                animation:
                  "heroRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards, heroRingSpinReverse 95s linear infinite",
                transformOrigin: "50% 50%",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="rgba(201,169,110,0.14)"
                strokeWidth="0.22"
                strokeDasharray="22 5 14 4 30 6 18 5"
                strokeLinecap="round"
                pathLength="200"
              />
            </svg>

            {/* Inner ring — clockwise, faster — appears with "Digital" */}
            <svg
              viewBox="0 0 100 100"
              className="absolute opacity-0 motion-reduce:!animate-none"
              style={{
                inset: "30%",
                width: "40%",
                height: "40%",
                animation:
                  "heroRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, heroRingSpin 60s linear infinite",
                transformOrigin: "50% 50%",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="rgba(201,169,110,0.20)"
                strokeWidth="0.32"
                strokeDasharray="18 6 26 8 14 4"
                strokeLinecap="round"
                pathLength="200"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <p
          className="font-cormorant font-light italic text-[#f0ece4] text-center px-8 leading-[1.2] tracking-[0.04em] flex flex-wrap justify-center gap-x-[0.3em]"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          <span className="opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards" }}>Digital</span>
          <span className="not-italic text-[#c9a96e] opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}>Communications</span>
          <span className="opacity-0 translate-y-3" style={{ animation: "fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards" }}>Strategy</span>
        </p>

        {/* Scroll indicator — sits inside the inner ring, just below the headline */}
        <button
          onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-10 flex flex-col items-center gap-3 opacity-0 cursor-pointer group"
          style={{ animation: "fadeIn 1.2s ease 1.9s forwards" }}
          aria-label="Scroll to profile"
        >
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#f0ece4]/30 group-hover:text-[#c9a96e]/60 transition-colors duration-300">Scroll</span>
          <div className="flex flex-col items-center gap-1.5" style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
            <div
              className="w-px h-12 group-hover:h-14 transition-all duration-300"
              style={{ background: "linear-gradient(to bottom, rgba(240,236,228,0.1), rgba(201,169,110,0.6))" }}
            />
            <div className="w-[5px] h-[5px] rounded-full bg-[#c9a96e] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </section>

      {/* Panel 2 — Profile */}
      <section id="profile" className="min-h-screen flex items-center justify-center px-6 py-24 border-t border-white/[0.06]">
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
                With over a decade of experience leading integrated digital communications
                campaigns, I specialize in building strategies that connect across digital,
                social, and earned media channels. I've supported B2B, B2C, public affairs,
                and internal communications initiatives for major brands, including Microsoft,
                Intel, Nestlé, The American Beverage Association, UnitedHealth Group, and
                Coca-Cola.
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
                My expertise spans all facets of account management — from guiding internal
                teams and coordinating external vendors to managing client relationships and
                delivering creative, cost-effective, and high-performing solutions.
              </p>
              <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
                In addition to my marketing and communications background, I bring technical
                fluency as a full-stack web developer, with proficiency in the
                JavaScript-based MERN stack, SQL, and Python. I'm passionate about blending
                storytelling, strategy, and technology to create digital experiences that are
                both impactful and scalable.
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