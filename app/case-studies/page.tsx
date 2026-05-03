// app/case-studies/page.tsx
import PageBanner from "@/components/PageBanner";
import Overview from "@/components/Overview";
import CaseStudies from "@/components/CaseStudies";
import { CaseStudyData } from "@/components/CaseStudyEntry";

const caseStudies: CaseStudyData[] = [
  {
    id: "balance-us",
    title: "BalanceUS",
    client: "American Beverage Association",
    campaignType: "Public Affairs",
    logo: "/logos/aba.png",
    logoAlt: "American Beverage Association",
    logoScale: 1,
    tactics: [
      "Custom Website",
      "SEO Strategy",
      "Paid + Organic Social",
      "YouTube Infeed & Bumper Ads",
      "Publication Partnerships",
      "Programmatic Ad Buy",
    ],
    summary:
      "Designed to raise awareness of Coca-Cola, Pepsi, and Dr. Pepper's initiatives to reduce sugar consumption and promote low- and no-calorie options, the BalanceUS campaign took a multifaceted approach: a custom website as the campaign hub, an impactful video series, targeted paid social media, thought leadership events, and significant earned media coverage. Together, these efforts elevated consumer awareness of the brands' commitment to healthier beverage choices.",
    link: "https://www.balanceus.org/",
  },
  {
    id: "check-to-protect",
    title: "Check to Protect",
    client: "National Safety Council",
    campaignType: "Public Safety",
    logo: "/logos/check-to-protect.svg",
    logoAlt: "Check to Protect",
    logoScale: 1,
    tactics: [
      "Custom Website",
      "Custom API Development",
      "Out-of-Home Billboards",
      "SEO Strategy",
      "Industry Event Canvassing",
      "Paid + Organic Social",
      "Custom Digital Advertising",
    ],
    summary:
      "Anchored by a custom website featuring a tailored API to check vehicle recall status and locate nearby dealerships for repairs, the campaign raised awareness about open recalls for vehicles with defective airbags. SEO, digital ads, and paid social directed audiences to the landing page to take action. The campaign also included out-of-home advertising and an extensive canvassing program at industry events, where a custom PWA version of the website API helped attendees identify recall status and schedule repairs on-site.",
    link: "https://checktoprotect.org/",
  },
  {
    id: "cm-feel-the-love",
    title: "CM Feel the Love",
    client: "Nestlé",
    campaignType: "B2B",
    logo: "/logos/nestle.svg",
    logoAlt: "Nestlé",
    logoScale: 1,
    tactics: [
      "Customer Loyalty Program",
      "Email Marketing",
      "Amazon Storefront & DSP",
      "Industry Publication Ad Buy",
      "Google Ads",
      "Promotional Giveaways",
      "Paid + Organic Social",
    ],
    summary:
      "Designed to boost B2B sales of Coffee-mate creamer among convenience store operators, the campaign emphasized direct purchases through the Amazon storefront while driving lead generation for the Nestlé sales team. Key initiatives included a customer loyalty program anchored by targeted email marketing and a dedicated membership club website tailored to small grocers and c-store operators. Paid advertising in c-store publications, a robust social media strategy, and an optimized Amazon sales approach combined to drive growth in both sales and leads.",
  },
  {
    id: "quinoa-pizza-hub",
    title: "Quinoa + Pizza Hub",
    client: "Ardent Mills",
    campaignType: "B2B",
    logo: "/logos/ardent-mills.svg",
    logoAlt: "Ardent Mills",
    logoScale: 1,
    tactics: [
      "Product Website Development",
      "R&D White Papers",
      "Thought Leadership Events",
      "Paid Publication Partnerships",
      "SEO Strategy",
      "Google Ads Campaign",
      "Programmatic Ad Buy",
    ],
    summary:
      "Focused on increasing sales of key flour products among mid-sized retailers and driving awareness of innovative offerings among bakers and industry R&D professionals, the campaign leveraged a multi-channel approach. Efforts included earned media highlighting product innovations and acquisitions, a custom website designed to educate and engage, and white papers showcasing industry insights. An online thought leadership event further positioned the brand as a leader in innovation, while paid advertising in industry publications amplified reach.",
    link: "https://www.ardentmills.com/quinoa-hub/",
  },
  {
    id: "microsoft-online-retail",
    title: "Microsoft Online Retail",
    client: "Microsoft",
    campaignType: "B2C",
    logo: "/logos/microsoft.png",
    logoAlt: "Microsoft",
    logoScale: 1.6,
    tactics: [
      "TikTok & Instagram Influencer Campaign",
      "Promotional Giveaways",
      "SEO",
      "Paid + Organic Social",
      "Earned Media Outreach",
    ],
    summary:
      "Designed to increase awareness and drive sales of key products on Microsoft's online consumer retail store, the campaign centered on a dynamic influencer strategy to engage audiences and amplify brand visibility. The initiative included a TikTok and Instagram influencer campaign to create authentic, shareable content, promotional giveaways to incentivize engagement, search engine optimization to boost discoverability, and earned media outreach to secure additional coverage.",
  },
  {
    id: "morgan-stanley",
    title: "[Project Title TBD]",
    client: "Morgan Stanley",
    campaignType: "[Campaign Type TBD]",
    logo: "/logos/morgan-stanley.svg",
    logoAlt: "Morgan Stanley",
    logoScale: 1,
    tactics: [
      "[Tactic 1 TBD]",
      "[Tactic 2 TBD]",
      "[Tactic 3 TBD]",
    ],
    summary:
      "[Summary paragraph TBD — replace this placeholder text with the campaign description, approach, and outcomes.]",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="pt-20">
      <PageBanner titleStart="Case" titleAccent="Studies" />

      <Overview
        heading="The Work."
        body={[
          "A selection of campaigns from across my career — spanning public affairs, public safety, B2B, and B2C — where strategy, content, and operational discipline came together to drive measurable outcomes for clients.",
          "Each project reflects a different challenge: a website launch, an influencer campaign, a paid media program, a public-facing API. Different clients, different industries, same approach — clear thinking, careful execution, and a focus on results.",
        ]}
      />

      <CaseStudies caseStudies={caseStudies} />
    </main>
  );
}