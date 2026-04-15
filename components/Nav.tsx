"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Agency Experience", href: "#agency" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Case Studies", href: "#case-studies" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/[0.07]">
      <div className="flex items-center justify-between px-6 md:px-10 h-20">

        {/* Wordmark */}
        <Link href="/" className="font-cormorant font-light text-[1.35rem] tracking-[0.08em] uppercase text-[#f0ece4]">
          Garrett<span className="text-[#f0ece4]/40">&nbsp;/&nbsp;</span>Swink
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-10 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.75rem] font-light tracking-[0.12em] uppercase text-[#f0ece4]/55 hover:text-[#f0ece4] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a96e] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              className="text-[0.7rem] tracking-[0.14em] uppercase text-[#c9a96e] border border-[#c9a96e]/40 px-4 py-2 hover:bg-[#c9a96e]/10 hover:border-[#c9a96e] transition-all duration-200"
            >
              Contact Me
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-px bg-[#f0ece4]/70 transition-all duration-250 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-[22px] h-px bg-[#f0ece4]/70 transition-all duration-250 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] h-px bg-[#f0ece4]/70 transition-all duration-250 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col border-t border-white/[0.07] px-6 pb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[0.75rem] tracking-[0.12em] uppercase text-[#f0ece4]/55 hover:text-[#f0ece4] py-4 border-b border-white/[0.06] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-[0.75rem] tracking-[0.12em] uppercase text-[#c9a96e] pt-5 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      )}
    </nav>
  );
}