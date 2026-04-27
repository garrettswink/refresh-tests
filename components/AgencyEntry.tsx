// components/AgencyEntry.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type AgencyData = {
  id: string;
  name: string;
  title: string;
  clients: string[];
  highlights: {
    label: string;
    body: React.ReactNode;
  }[];
};

type AgencyEntryProps = {
  agency: AgencyData;
};

// Per-letter delay. Slow and intentional: ~80ms feels deliberate
// without making long names like "WE Communications" drag.
const LETTER_DELAY_MS = 80;
// Each letter's color transition duration.
const LETTER_DURATION_MS = 900;

// Each highlight's own fade-up duration. Slightly quicker than the
// container fade so individual items feel responsive while scrolling.
const HIGHLIGHT_DURATION_MS = 800;

type HighlightItemProps = {
  label: string;
  body: React.ReactNode;
};

function HighlightItem({ label, body }: HighlightItemProps) {
  const ref = useRef<HTMLLIElement>(null);
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
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`pl-5 border-l border-[#c9a96e]/20 hover:border-[#c9a96e]/50 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionDuration: `${HIGHLIGHT_DURATION_MS}ms` }}
    >
      <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55">
        <span className="text-[#f0ece4]/85 font-normal">
          {label}
          {" — "}
        </span>
        {body}
      </p>
    </li>
  );
}

export default function AgencyEntry({ agency }: AgencyEntryProps) {
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split the name into characters so each can animate independently.
  // Preserve spaces by rendering them as non-breaking spaces in their own span.
  const characters = Array.from(agency.name);

  return (
    <article
      id={agency.id}
      ref={ref}
      className={`scroll-mt-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Agency name — large italic display with letter-by-letter gold sweep.
          Reduced-motion users get an instant gold name, no animation. */}
      <h3
        className="font-cormorant font-light italic leading-[1.05] tracking-[0.01em] mb-10 md:mb-14 motion-reduce:text-[#c9a96e]"
        style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        aria-label={agency.name}
      >
        {characters.map((char, i) => (
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

      {/* Role + clients */}
      <dl className="space-y-3 mb-14 md:mb-16 max-w-2xl">
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 sm:w-20 sm:pt-[0.2rem] mb-1 sm:mb-0">
            Title
          </dt>
          <dd className="text-[0.95rem] font-light text-[#f0ece4]/85 leading-[1.6]">
            {agency.title}
          </dd>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 sm:w-20 sm:pt-[0.2rem] mb-1 sm:mb-0">
            Clients
          </dt>
          <dd className="text-[0.95rem] font-light text-[#f0ece4]/85 leading-[1.6]">
            {agency.clients.join(", ")}
          </dd>
        </div>
      </dl>

      {/* Highlights */}
      <div className="max-w-3xl">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e]/70 mb-6">
          Selected Highlights
        </p>

        <ul className="space-y-5">
          {agency.highlights.map((highlight, i) => (
            <HighlightItem
              key={i}
              label={highlight.label}
              body={highlight.body}
            />
          ))}
        </ul>
      </div>
    </article>
  );
}