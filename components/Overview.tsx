// components/Overview.tsx
type OverviewProps = {
  eyebrow?: string;
  heading: string;
  body: string[];
};

export default function Overview({ eyebrow = "Overview", heading, body }: OverviewProps) {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a96e] mb-6">
          {eyebrow}
        </p>

        <h2
          className="font-cormorant font-light text-[#f0ece4] leading-[1.2] tracking-[0.02em] mb-10"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
        >
          {heading}
        </h2>

        <div className="space-y-5">
          {body.map((paragraph, i) => (
            <p
              key={i}
              className="text-[0.88rem] font-light leading-[1.85] text-[#f0ece4]/55"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}