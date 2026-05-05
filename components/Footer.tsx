"use client";

import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);

  return (
    <footer className="border-t border-white/[0.07] bg-[#0a0a0a]">
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative px-6 md:px-10 pt-10 pb-6 border-b border-white/[0.07] flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-0 left-1/2 -translate-x-1/2 px-4 pt-1.5 pb-1 border border-t-0 border-white/[0.07] bg-[#0a0a0a] text-[#f0ece4]/55 hover:text-[#f0ece4] transition-colors duration-200 cursor-pointer"
          >
            <span className="block w-2.5 h-2.5 border-r border-b border-current rotate-45 -translate-y-[2px]" />
          </button>
          <p className="text-[0.7rem] font-light tracking-[0.14em] uppercase text-[#f0ece4]/55 text-center max-w-2xl">
            This site was built with{" "}
            <span className="text-[#c9a96e]">Next.js</span>,{" "}
            <span className="text-[#c9a96e]">Tailwind CSS</span>,{" "}
            <span className="text-[#c9a96e]">TypeScript</span>,{" "}
            <span className="text-[#c9a96e]">Node.js</span>, and{" "}
            <span className="text-[#c9a96e]">Claude Code</span>.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-10 py-8 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="text-[0.7rem] font-light tracking-[0.14em] uppercase text-[#f0ece4]/55 hover:text-[#f0ece4] transition-colors duration-200 cursor-pointer"
        >
          &copy; {year} Garrett Swink
        </button>
      </div>
    </footer>
  );
}
