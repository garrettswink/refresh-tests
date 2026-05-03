// app/capabilities/page.tsx
import PageBanner from "@/components/PageBanner";
import Overview from "@/components/Overview";
import CapabilitiesComponent from "@/components/CapabilitiesComponent";

export default function CapabilitiesPage() {
  return (
    <main className="pt-20">
      <PageBanner titleStart="My" titleAccent="Capabilities" />

      <Overview
        heading="Full Funnel. Full Stack. 360 Solutions."
        body={[
          "I offer the full spectrum of digital communications capabilities, bringing together strategy, creative, and execution across paid, earned, and owned channels. My approach is grounded in audience insight and built for measurable impact—ensuring every program is aligned to business outcomes.",
          "From integrated campaign planning and social strategy to performance media, SEO, and web development, I partner with clients to build programs that scale. Whether leading a cross-channel launch or optimizing an always-on content engine, I bring rigor, creativity, and operational clarity to every engagement.",
        ]}
      />

      <CapabilitiesComponent />
    </main>
  );
}