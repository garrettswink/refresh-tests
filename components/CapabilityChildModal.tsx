"use client";

import { useEffect, useRef } from "react";
import type { CapabilityChild } from "./CapabilitiesData";

type CapabilityChildModalProps = {
  child: CapabilityChild | null;
  parentName?: string;
  onClose: () => void;
};

export default function CapabilityChildModal({
  child,
  parentName,
  onClose,
}: CapabilityChildModalProps) {
  const open = child !== null;
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Move focus to dialog on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => dialogRef.current?.focus());
    }
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blurred backdrop. Clicking dismisses. */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full bg-[#0a0a0a]/70 backdrop-blur-md cursor-default"
      />

      {/* Dialog wrapper — centers the panel */}
      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="capability-child-title"
          ref={dialogRef}
          tabIndex={-1}
          className={`relative w-full max-w-[640px] bg-[#0a0a0a] border border-[#c9a96e]/30 shadow-[0_20px_80px_rgba(0,0,0,0.55)] px-7 md:px-12 py-10 md:py-14 max-h-[calc(100vh-3rem)] overflow-y-auto outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
              : "pointer-events-none opacity-0 translate-y-4 scale-[0.98]"
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full border border-[#c9a96e]/30 text-[#c9a96e] hover:border-[#c9a96e]/70 hover:bg-[#c9a96e]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]/60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>

          {child && (
            <>
              {parentName && (
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
                  {parentName}
                </p>
              )}
              <h2
                id="capability-child-title"
                className="font-cormorant font-light text-[#f0ece4] leading-[1.1] tracking-[0.01em] mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
              >
                {child.name}
              </h2>

              {/* Gold rule */}
              <div className="w-12 h-px bg-[#c9a96e]/60 mb-7" />

              <p className="text-[1rem] md:text-[1.05rem] font-light leading-[1.85] text-[#f0ece4]/70">
                {child.description}
              </p>

              {child.proof && (
                <p className="mt-7 text-[0.7rem] tracking-[0.18em] uppercase text-[#c9a96e]/80 font-light">
                  {child.proof}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
