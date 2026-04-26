// app/case-studies/page.tsx
import PageBanner from "@/components/PageBanner";
import Overview from "@/components/Overview";

export default function CaseStudiesPage() {
  return (
    <main className="pt-20">
      <PageBanner titleStart="Case" titleAccent="Studies" />

      <Overview
        heading="Selected work built for global brands."
        body={[
          "A curated selection of campaigns and programs developed for clients including Microsoft, Nestlé, and The Coca-Cola Company. Each case study highlights the strategy, execution, and measurable outcomes that defined the work.",
          "From integrated product launches to multi-market social programs and public affairs campaigns, these projects reflect a consistent focus on cohesive storytelling, operational rigor, and results that exceed client expectations.",
        ]}
      />
    </main>
  );
}