// components/BackToTop.tsx
"use client";

import { useEffect, useState } from "react";

type BackToTopProps = {
  /**
   * The id of the element which, once scrolled past, triggers the button to
   * appear. Defaults to "oliver" — the first agency on the experience page.
   */
  triggerId?: string;
};

export default function BackToTop({ triggerId = "oliver" }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the button once the trigger element has entered (or scrolled
        // past) the viewport.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerId]);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full border border-gold/30 bg-[#0a0a0a]/80 backdrop-blur-sm text-gold shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-[opacity,transform,border-color,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/70 hover:bg-[#0a0a0a]/95 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 motion-reduce:transition-none ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 md:h-[1.35rem] md:w-[1.35rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] motion-reduce:transition-none"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
