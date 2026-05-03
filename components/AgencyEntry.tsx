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

// Per-letter delay for the headline color fade-in.
const LETTER_DELAY_MS = 80;
const LETTER_DURATION_MS = 900;

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
      className={`group relative pl-5 border-l border-[#c9a96e]/20 hover:border-[#c9a96e]/60 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:scale-[1.01] origin-left will-change-transform motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } transition-[transform,opacity,border-color]`}
      style={{ transitionDuration: `${HIGHLIGHT_DURATION_MS}ms` }}
    >
      <p className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55 group-hover:text-[#f0ece4]/70 transition-colors duration-500">
        <span className="agency-label font-normal">{label}</span>
        <span className="text-[#f0ece4]/85">{" — "}</span>
        {body}
      </p>

      <style jsx>{`
        .agency-label {
          /* Two-stop gradient: gold on the left half, cream on the right.
             At 200% size with position 100% 0, only the cream half is visible.
             On hover we slide to 0% 0, exposing the gold half. */
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
          transition: background-position 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        li:hover .agency-label {
          background-position: 0 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .agency-label {
            transition: none;
          }
        }
      `}</style>
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article id={agency.id} ref={ref} className="scroll-mt-24">
      <div
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
      {/* Agency name — large italic display with letter-by-letter gold sweep.
          Reduced-motion users get an instant gold name, no animation. */}
      <h3
        className="font-cormorant italic font-light leading-[1.05] tracking-[0.01em] mb-10 md:mb-12 motion-reduce:text-[#c9a96e]"
        style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        aria-label={agency.name}
      >
        {Array.from(agency.name).map((char, i) => (
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

      {/* Title + clients */}
      <dl className="mb-12 md:mb-16 space-y-4 max-w-2xl">
        <div className="flex gap-6">
          <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 pt-[0.3rem] w-24 shrink-0">
            Role
          </dt>
          <dd className="text-[0.95rem] font-light text-[#f0ece4]/75">
            {agency.title}
          </dd>
        </div>
        <div className="flex gap-6">
          <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-[#f0ece4]/40 pt-[0.3rem] w-24 shrink-0">
            Clients
          </dt>
          <dd className="text-[0.95rem] font-light text-[#f0ece4]/75">
            {agency.clients.join(" · ")}
          </dd>
        </div>
      </dl>

      {/* Highlights */}
      <ul className="space-y-6 max-w-3xl">
        {agency.highlights.map((highlight, i) => (
          <HighlightItem key={i} label={highlight.label} body={highlight.body} />
        ))}
      </ul>
      </div>
    </article>
  );
}