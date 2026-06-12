"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities } from "./CapabilitiesData";

type OverviewContent = {
  eyebrow: string;
  heading: string;
  body: string[];
};

type CapabilitiesSplitProps = {
  overview: OverviewContent;
};

export default function CapabilitiesSplit({ overview }: CapabilitiesSplitProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<{
    cat: number;
    child: number;
  } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleCategory = (i: number) => {
    const next = openCategory === i ? null : i;
    setOpenCategory(next);
    // When every accordion is closed, fall back to the overview copy.
    if (next === null) {
      setSelected(null);
    }
  };

  const selectChild = (cat: number, child: number) => {
    setSelected({ cat, child });
  };

  // Derive the copy shown in the left panel. When a sub-category is selected we
  // swap the default overview for that section's placeholder copy.
  const selectedChild =
    selected !== null ? capabilities[selected.cat].children[selected.child] : null;

  const leftEyebrow = selectedChild
    ? capabilities[selected!.cat].name
    : overview.eyebrow;
  const leftHeading = selectedChild ? selectedChild.name : overview.heading;
  const leftBody = selectedChild ? [selectedChild.description] : overview.body;

  // Key used to retrigger the fade when the left content swaps.
  const leftKey = selectedChild
    ? `${selected!.cat}-${selected!.child}`
    : "overview";

  return (
    <section
      ref={sectionRef}
      id="capabilities-stack"
      className="scroll-mt-20 relative bg-[#0a0a0a] pb-32 md:pb-40 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
          {/* ============================================ */}
          {/* LEFT — Overview, slides in from left          */}
          {/* ============================================ */}
          <div
            className="md:sticky md:top-28 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:!transition-none motion-reduce:!translate-x-0 motion-reduce:!opacity-100"
            style={{
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? "translateX(0)" : "translateX(-48px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "1100ms",
              transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div key={leftKey} className="animate-[splitFade_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-6">
                {leftEyebrow}
              </p>

              <h2
                className="font-cormorant font-light text-[#f0ece4] leading-[1.2] tracking-[0.02em] mb-6"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                {leftHeading}
              </h2>

              {/* Gold rule under the heading */}
              <div
                aria-hidden
                className="h-px mb-10"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(201,169,110,0.55) 0%, rgba(201,169,110,0.25) 70%, transparent 100%)",
                  width: "min(220px, 40vw)",
                }}
              />

              <div className="space-y-5">
                {leftBody.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedChild && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-10 text-[0.7rem] tracking-[0.14em] uppercase text-[#c9a96e]/70 font-light transition-colors duration-500 hover:text-[#c9a96e] cursor-pointer"
                >
                  ← Back to overview
                </button>
              )}
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT — Category accordion 01–06              */}
          {/* ============================================ */}
          <div>
            <ul
              className={`list-none m-0 p-0 transition-opacity duration-500 ${
                hasEntered ? "opacity-100" : "opacity-0"
              }`}
            >
              {capabilities.map((cap, i) => {
                const isOpen = openCategory === i;
                const revealDelay = `${i * 110}ms`;

                return (
                  <li
                    key={cap.number}
                    className="border-b border-[#c9a96e]/15 last:border-b-0 motion-reduce:!transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100"
                    style={{
                      opacity: hasEntered ? 1 : 0,
                      transform: hasEntered
                        ? "translateY(0)"
                        : "translateY(12px)",
                      transitionProperty: "opacity, transform",
                      transitionDuration: "800ms",
                      transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: hasEntered ? revealDelay : "0ms",
                    }}
                  >
                    {/* CATEGORY HEADER */}
                    <button
                      onClick={() => toggleCategory(i)}
                      className="group relative w-full flex items-center gap-5 md:gap-7 py-6 md:py-7 text-left cursor-pointer"
                      aria-expanded={isOpen}
                      aria-controls={`split-panel-${cap.number}`}
                    >
                      <span
                        className={`font-cormorant font-light italic text-[1.6rem] md:text-[2rem] leading-none tracking-wide transition-colors duration-500 shrink-0 w-11 md:w-14 ${
                          isOpen
                            ? "text-[#c9a96e]"
                            : "text-[#f0ece4]/35 group-hover:text-[#c9a96e]/80"
                        }`}
                      >
                        {cap.number}
                      </span>

                      <h3
                        className={`flex-1 min-w-0 font-cormorant font-light leading-tight transition-colors duration-500 text-[1.4rem] md:text-[1.7rem] ${
                          isOpen
                            ? "text-[#c9a96e]"
                            : "text-[#f0ece4] group-hover:text-[#c9a96e]/80"
                        }`}
                      >
                        {cap.name}
                      </h3>

                      {/* Plus / minus indicator */}
                      <span
                        className={`shrink-0 relative w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        <span
                          className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-500 ${
                            isOpen
                              ? "bg-[#c9a96e]"
                              : "bg-[#f0ece4]/40 group-hover:bg-[#c9a96e]"
                          }`}
                        />
                        <span
                          className={`absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${
                            isOpen
                              ? "bg-[#c9a96e]"
                              : "bg-[#f0ece4]/40 group-hover:bg-[#c9a96e]"
                          }`}
                        />
                      </span>
                    </button>

                    {/* EXPANDED PANEL — sub-section names only (no copy) */}
                    <div
                      id={`split-panel-${cap.number}`}
                      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        maxHeight: isOpen ? "800px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <ul className="list-none m-0 p-0 pl-11 md:pl-14 pb-6 md:pb-8 space-y-1">
                        {cap.children.map((child, idx) => {
                          const isSelected =
                            selected?.cat === i && selected?.child === idx;
                          return (
                            <li
                              key={child.name}
                              className={
                                isOpen
                                  ? "opacity-0 animate-[splitFadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                                  : "opacity-0"
                              }
                              style={{
                                animationDelay: isOpen
                                  ? `${0.12 + idx * 0.07}s`
                                  : "0s",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => selectChild(i, idx)}
                                className={`group/child relative inline-block text-left font-cormorant font-light leading-tight py-1.5 text-[1.1rem] md:text-[1.2rem] transition-colors duration-500 cursor-pointer ${
                                  isSelected
                                    ? "text-[#c9a96e]"
                                    : "text-[#f0ece4]/75 hover:text-[#f0ece4]"
                                }`}
                              >
                                {child.name}
                                <span
                                  className={`absolute -bottom-0.5 left-0 h-px bg-[#c9a96e] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                    isSelected
                                      ? "w-full"
                                      : "w-0 group-hover/child:w-full"
                                  }`}
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes splitFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes splitFadeUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[splitFade_0\\.6s_cubic-bezier\\(0\\.22\\,1\\,0\\.36\\,1\\)_forwards\\],
          .animate-\\[splitFadeUp_0\\.5s_cubic-bezier\\(0\\.22\\,1\\,0\\.36\\,1\\)_forwards\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
