"use client";

import { useState, useEffect, useRef } from "react";
import { capabilities, type CapabilityChild } from "./CapabilitiesData";
import CapabilityChildModal from "./CapabilityChildModal";

export default function CapabilitiesComponent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [modalChild, setModalChild] = useState<{
    child: CapabilityChild;
    parentName: string;
  } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const toggleBand = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities-stack"
      className="scroll-mt-20 relative bg-[#0a0a0a] -mt-12 md:-mt-20 pb-32 md:pb-40 overflow-hidden"
    >
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        {/* ============================================ */}
        {/* THE STACK                                     */}
        {/* ============================================ */}
        <div>
          <ul
            className={`list-none m-0 p-0 border-t border-[#c9a96e]/15 transition-opacity duration-500 ${
              hasEntered ? "opacity-100" : "opacity-0"
            }`}
          >
            {capabilities.map((cap, i) => {
              const isActive = activeIndex === i;
              const isOtherActive = activeIndex !== null && activeIndex !== i;

              const revealDelay = `${i * 140}ms`;

              return (
                <li
                  key={cap.number}
                  id={`capability-${cap.number}`}
                  className="scroll-mt-24 border-b border-[#c9a96e]/15 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:!transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100"
                  style={{
                    opacity: hasEntered ? (isOtherActive ? 0.55 : 1) : 0,
                    transform: hasEntered ? "translateY(0)" : "translateY(12px)",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "900ms",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: hasEntered ? revealDelay : "0ms",
                  }}
                >
                  {/* CLICKABLE BAND HEADER */}
                  <button
                    onClick={() => toggleBand(i)}
                    className="group relative w-full flex items-center gap-6 md:gap-10 py-7 md:py-9 text-left cursor-pointer transition-all duration-500"
                    aria-expanded={isActive}
                    aria-controls={`panel-${cap.number}`}
                  >
                    {/* Number — large Cormorant italic */}
                    <span
                      className={`font-cormorant font-light italic text-[2rem] md:text-[2.5rem] leading-none tracking-wide transition-colors duration-500 shrink-0 w-14 md:w-20 ${
                        isActive
                          ? "text-[#c9a96e]"
                          : "text-[#f0ece4]/35 group-hover:text-[#c9a96e]/80"
                      }`}
                    >
                      {cap.number}
                    </span>

                    {/* Name + tagline */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-cormorant font-light leading-tight ${
                          isActive
                            ? "text-[1.65rem] md:text-[2rem]"
                            : "text-[1.5rem] md:text-[1.85rem]"
                        }`}
                      >
                        <span
                          className={`cap-name inline-block transition-[font-size] duration-500 ${
                            isActive ? "is-active" : ""
                          }`}
                        >
                          {cap.name}
                        </span>
                      </h3>
                      <p
                        className={`font-cormorant italic font-light leading-snug mt-1 transition-colors duration-500 text-[0.95rem] md:text-[1.05rem] ${
                          isActive
                            ? "text-[#f0ece4]/65"
                            : "text-[#f0ece4]/40 group-hover:text-[#f0ece4]/55"
                        }`}
                      >
                        {cap.tagline}
                      </p>
                    </div>

                    {/* Plus / minus indicator on the right */}
                    <span
                      className={`shrink-0 relative w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      {/* Horizontal bar */}
                      <span
                        className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-500 ${
                          isActive
                            ? "bg-[#c9a96e]"
                            : "bg-[#f0ece4]/40 group-hover:bg-[#c9a96e]"
                        }`}
                      />
                      {/* Vertical bar */}
                      <span
                        className={`absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${
                          isActive
                            ? "bg-[#c9a96e]"
                            : "bg-[#f0ece4]/40 group-hover:bg-[#c9a96e]"
                        }`}
                      />
                    </span>
                  </button>

                  {/* EXPANDED PANEL — children */}
                  <div
                    id={`panel-${cap.number}`}
                    className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      maxHeight: isActive ? "3000px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="pl-14 md:pl-[5.75rem] pr-6 pb-10 md:pb-14 pt-2">
                      {/* Children grid — 2 columns on desktop, 1 on mobile */}
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12 list-none m-0 p-0">
                        {cap.children.map((child, idx) => (
                          <li
                            key={child.name}
                            className={
                              isActive
                                ? "opacity-0 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                                : "opacity-0"
                            }
                            style={{
                              animationDelay: isActive
                                ? `${0.15 + idx * 0.08}s`
                                : "0s",
                            }}
                          >
                            {/* Child as a button that opens an expanded modal */}
                            <button
                              type="button"
                              onClick={() =>
                                setModalChild({ child, parentName: cap.name })
                              }
                              className="group/child block w-full text-left border-l border-[#c9a96e]/30 pl-5 transition-colors duration-500 hover:border-[#c9a96e] cursor-pointer"
                            >
                              {/* Name with the gold underline sweep on hover */}
                              <h4 className="relative inline-block font-cormorant font-light text-[#f0ece4] text-[1.35rem] md:text-[1.5rem] leading-tight mb-2.5 tracking-tight">
                                {child.name}
                                {/* Underline sweep — matches Nav.tsx hover treatment */}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a96e] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/child:w-full" />
                              </h4>
                              <p className="text-[0.9rem] md:text-[0.95rem] font-light leading-[1.75] text-[#f0ece4]/55 transition-colors duration-500 group-hover/child:text-[#f0ece4]/75">
                                {child.description}
                              </p>
                              {child.proof && (
                                <p className="mt-3 text-[0.7rem] tracking-[0.14em] uppercase text-[#c9a96e]/70 font-light">
                                  {child.proof}
                                </p>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <CapabilityChildModal
        child={modalChild?.child ?? null}
        parentName={modalChild?.parentName}
        onClose={() => setModalChild(null)}
      />
      <style jsx>{`
        /* Gold left-to-right sweep on the capability headline.
           Two-stop gradient at 200% size: gold on left half, cream on right.
           Default position 100% 0 shows only the cream half; on hover or
           when active we slide to 0 0 to reveal the gold half. */
        .cap-name {
          background-image: linear-gradient(
            90deg,
            #c9a96e 0%,
            #c9a96e 50%,
            rgba(240, 236, 228, 0.85) 50%,
            rgba(240, 236, 228, 0.85) 100%
          );
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          transition: background-position 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        :global(button.group:hover) .cap-name,
        :global(button.group:focus-visible) .cap-name,
        .cap-name.is-active {
          background-position: 0 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .cap-name {
            transition: none;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}