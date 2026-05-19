// components/CaseStudyNav.tsx
"use client";

import { CaseStudyData } from "./CaseStudyEntry";

type CaseStudyNavProps = {
  caseStudies: Pick<CaseStudyData, "id" | "title">[];
};

export default function CaseStudyNav({ caseStudies }: CaseStudyNavProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Case study sections"
      className="relative px-6 pb-8 md:pb-10 -mt-10 md:-mt-14"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-6 text-center">
          Jump to
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 justify-items-center">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.id} className="relative">
              <a
                href={`#${caseStudy.id}`}
                onClick={(e) => handleClick(e, caseStudy.id)}
                className="group relative inline-block px-2 md:px-3 py-1 text-center"
              >
                <span className="case-study-nav-label font-cormorant italic font-light text-[0.95rem] md:text-[1.15rem] tracking-[0.02em]">
                  {caseStudy.title}
                </span>
                <span
                  aria-hidden="true"
                  className="case-study-nav-underline pointer-events-none absolute left-2 right-2 md:left-3 md:right-3 -bottom-0.5 h-px origin-center bg-gold/70"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .case-study-nav-label {
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
        a:hover .case-study-nav-label,
        a:focus-visible .case-study-nav-label {
          background-position: 0 0;
        }
        .case-study-nav-underline {
          transform: scaleX(0);
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        a:hover .case-study-nav-underline,
        a:focus-visible .case-study-nav-underline {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .case-study-nav-label,
          .case-study-nav-underline {
            transition: none;
          }
        }
      `}</style>
    </nav>
  );
}
