// components/CaseStudies.tsx
import CaseStudyEntry, { CaseStudyData } from "./CaseStudyEntry";
import AgencyDivider from "./AgencyDivider";

type CaseStudiesProps = {
  caseStudies: CaseStudyData[];
};

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  return (
    <section className="relative px-6 pt-8 pb-32 md:pt-12 md:pb-40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:mb-24">
          <AgencyDivider />
        </div>
        <div className="space-y-32 md:space-y-44">
          {caseStudies.map((caseStudy, i) => (
            <div key={caseStudy.id}>
              <CaseStudyEntry caseStudy={caseStudy} index={i} />
              {i < caseStudies.length - 1 && (
                <div
                  aria-hidden
                  className="mt-32 md:mt-44 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(240,236,228,0.08), transparent)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}