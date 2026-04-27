// components/AgencyExperience.tsx
import AgencyEntry, { AgencyData } from "./AgencyEntry";
import AgencyDivider from "./AgencyDivider";

type AgencyExperienceProps = {
  agencies: AgencyData[];
};

export default function AgencyExperience({ agencies }: AgencyExperienceProps) {
  return (
    <section className="relative px-6 pt-8 pb-32 md:pt-12 md:pb-40">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 md:mb-24">
          <AgencyDivider />
        </div>
        {agencies.map((agency, i) => (
          <div key={agency.id}>
            <AgencyEntry agency={agency} />
            {i < agencies.length - 1 && (
              <div className="my-20 md:my-24">
                <AgencyDivider />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}