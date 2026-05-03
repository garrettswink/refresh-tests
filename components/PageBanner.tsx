// components/PageBanner.tsx
"use client";

type PageBannerProps = {
  titleStart: string;
  titleAccent: string;
};

export default function PageBanner({ titleStart, titleAccent }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.07]">
      {/* Orbital rings — concentric, gapped, alternating rotation directions.
          Rings fade in staggered with the title words and rule. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="relative"
          style={{ width: "min(900px, 110vw)", aspectRatio: "1 / 1" }}
        >
          {/* Outermost ring — counter-clockwise, slowest — appears with rule.
              Sized larger than the container so it bleeds past viewport edges. */}
          <svg
            viewBox="0 0 100 100"
            className="absolute opacity-0 motion-reduce:!animate-none"
            style={{
              inset: "-13%",
              width: "126%",
              height: "126%",
              animation:
                "bannerRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.35s forwards, bannerRingSpinReverse 200s linear infinite",
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

          {/* Outer ring — clockwise, slow — appears just before rule */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-0 motion-reduce:!animate-none"
            style={{
              animation:
                "bannerRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards, bannerRingSpin 140s linear infinite",
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

          {/* Middle ring — counter-clockwise, medium — appears with accent */}
          <svg
            viewBox="0 0 100 100"
            className="absolute opacity-0 motion-reduce:!animate-none"
            style={{
              inset: "13%",
              width: "74%",
              height: "74%",
              animation:
                "bannerRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards, bannerRingSpinReverse 95s linear infinite",
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

          {/* Inner ring — clockwise, faster — appears with first word */}
          <svg
            viewBox="0 0 100 100"
            className="absolute opacity-0 motion-reduce:!animate-none"
            style={{
              inset: "30%",
              width: "40%",
              height: "40%",
              animation:
                "bannerRingsFade 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, bannerRingSpin 60s linear infinite",
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
      </div>

      <style>{`
        @keyframes bannerUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bannerRingsFade {
          to { opacity: 1; }
        }
        @keyframes bannerRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bannerRingSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="bannerRingSpin"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}