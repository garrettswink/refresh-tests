// components/AgencyNav.tsx
"use client";

import { AgencyData } from "./AgencyEntry";

type AgencyNavProps = {
  agencies: Pick<AgencyData, "id" | "name">[];
};

export default function AgencyNav({ agencies }: AgencyNavProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Update the hash without forcing an instant jump.
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Agency sections"
      className="relative px-6 pb-8 md:pb-10 -mt-10 md:-mt-14"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-6 text-center">
          Jump to
        </p>

        <div className="relative">
          {/* Delicate connecting line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-linear-to-r from-transparent via-gold/25 to-transparent"
          />

          <ul className="relative flex flex-wrap items-center justify-between gap-y-4 gap-x-3 md:gap-x-6">
            {agencies.map((agency) => (
              <li key={agency.id} className="relative">
                <a
                  href={`#${agency.id}`}
                  onClick={(e) => handleClick(e, agency.id)}
                  className="group relative inline-block px-2 md:px-3 py-1 bg-[#0a0a0a]"
                >
                  <span className="agency-nav-label font-cormorant italic font-light text-[0.95rem] md:text-[1.15rem] tracking-[0.02em]">
                    {agency.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="agency-nav-underline pointer-events-none absolute left-2 right-2 md:left-3 md:right-3 -bottom-0.5 h-px origin-center bg-gold/70"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .agency-nav-label {
          background-image: linear-gradient(
            90deg,
            #c9a96e 0%,
            #c9a96e 50%,
            rgba(240, 236, 228, 0.7) 50%,
            rgba(240, 236, 228, 0.7) 100%
          );
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          transition: background-position 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        a:hover .agency-nav-label,
        a:focus-visible .agency-nav-label {
          background-position: 0 0;
        }
        .agency-nav-underline {
          transform: scaleX(0);
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        a:hover .agency-nav-underline,
        a:focus-visible .agency-nav-underline {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .agency-nav-label,
          .agency-nav-underline {
            transition: none;
          }
        }
      `}</style>
    </nav>
  );
}
