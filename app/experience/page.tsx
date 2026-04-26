// app/experience/page.tsx
import PageBanner from "@/components/PageBanner";
import Overview from "@/components/Overview";

export default function ExperiencePage() {
  return (
    <main className="pt-20">
      <PageBanner titleStart="Agency" titleAccent="Experience" />

      <Overview
        heading="Strategy. Story. Execution."
        body={[
          "Over the past 15 years, I've built my career inside fast-paced communications agencies in New York and Washington, D.C., leading integrated programs across B2B, B2C, and public affairs. My work spans paid, earned, and social media—aligning messaging across channels to deliver cohesive storytelling and measurable impact.",
          "As an account director and strategic partner, I take a solutions-oriented approach—managing cross-functional teams, vendor relationships, and full campaign execution. From high-impact launches to multi-channel media strategies, every engagement is strategically grounded, creatively executed, and designed to exceed expectations.",
        ]}
      />
    </main>
  );
}