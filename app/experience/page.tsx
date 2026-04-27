// app/experience/page.tsx
import PageBanner from "@/components/PageBanner";
import Overview from "@/components/Overview";
import AgencyExperience from "@/components/AgencyExperience";
import AgencyNav from "@/components/AgencyNav";
import BackToTop from "@/components/BackToTop";
import { AgencyData } from "@/components/AgencyEntry";

const agencies: AgencyData[] = [
  {
    id: "oliver",
    name: "Oliver",
    title: "Senior Content Strategist",
    clients: ["Morgan Stanley"],
    highlights: [
      {
        label: "LinkedIn Channel Strategy",
        body: "Lead content and channel strategy for Morgan Stanley's IBDGCM LinkedIn presence, overseeing both paid and organic programming.",
      },
      {
        label: "Stakeholder Relations",
        body: "Partner with senior client stakeholders to identify content opportunities and translate business priorities into editorial strategy.",
      },
      {
        label: "Team Management",
        body: "Manage a cross-functional team of designers and copywriters to develop and execute content across the channel.",
      },
      {
        label: "Governance + Best Practices",
        body: "Manage a cross-functional team of designers and copywriters to develop and execute content across the channel.",
      },
      {
        label: "Team Management",
        body: "Manage a cross-functional team of designers and copywriters to develop and execute content across the channel.",
      },
      {
        label: "Website Refresh",
        body: "Directed a refresh of the internal resource website supporting the firm's social media program.",
      },
      {
        label: "Executive Communication Program",
        body: "Built and launched an executive communications program establishing banker activation strategy and providing ongoing editorial and creative support.",
      },
         {
        label: "Reporting",
        body: "Lead metrics reporting and deliver optimization recommendations to improve channel performance.",
      },
    ],
  },
  {
    id: "we-communications",
    name: "WE Communications",
    title: "Director of Content & Channel Strategy",
    clients: ["Microsoft", "Intel", "Alteryx"],
    highlights: [
      {
        label: "Sustainability Sponsored Content",
        body: "Negotiated publication pricing and placements, created SEO-optimized stories, leveraged social media to amplify messaging, and developed strategies to engage “opinion elite” audiences with key messages about Microsoft’s sustainability efforts.",
      },
      {
        label: "Instagram and TikTok Influencer Program",
        body: "Spearheaded a TikTok and Instagram influencer campaign that successfully boosted awareness and engagement around Microsoft Store promotions, leveraging platform trends and influencer partnerships to maximize reach.",
      },
      {
        label: "Microsoft Satellite Office Social Governance",
        body: "Developed a comprehensive social media governance policy for Microsoft satellite offices and employees, created official office content, and established KPIs to measure effectiveness and engagement.",
      },
      {
        label: "Intel Internal Communications Governance",
        body: "Designed an internal communications plan, established a governance policy, and created tailored content to ensure clarity, consistency, and alignment across all internal channels.",
      },
      {
        label: "Intel and Alteryx Social Strategy",
        body: "Led content development, placement strategy, and optimization for client social media channels, accompanied by detailed weekly and monthly performance reporting.",
      },
    ],
  },
  {
    id: "ketchum",
    name: "Ketchum",
    title: "Managing Account Supervisor",
    clients: [
      "Nestlé N.A.",
      "Tyson Foods",
      "Ardent Mills",
      "Corteva",
      "Bunge Limited",
      "ExxonMobil",
    ],
    highlights: [
      {
        label: "Paid Media Management",
        body: "Directed traditional and digital paid media strategies, including budgeting, asset creation, trafficking, and performance reporting, for key agency accounts.",
      },
      {
        label: "Promoted Content Management",
        body: "Negotiated pricing and placements with key industry publications, crafted SEO-optimized stories and supporting social media assets, managed trafficking and reporting, and nurtured relationships with publication partners.",
      },
      {
        label: "Earned Media",
        body: "Researched and built relationships with key publications and reporters, crafted and pitched press releases for executive transitions, mergers, acquisitions, and partnerships on behalf of Bunge Ltd. and Ardent Mills. Oversaw newswire distribution and conducted comprehensive media and industry landscape monitoring.",
      },
      {
        label: "Website Development & Deployment",
        body: (
          <>
            Oversaw stakeholder interviews, wireframing, development, client reviews, and deployment of the Ardent Mills{" "}
            <a
              href="https://www.ardentmills.com/quinoa-hub/"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quinoa
            </a>{" "}
            and{" "}
            <a
              href="https://www.ardentmills.com/pizza-hub/"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pizza
            </a>{" "}
            hub websites.
          </>
        ),
      },
      {
        label: "Digital Platform Migration",
        body: (
          <>
            Ran content migration from CMFeeltheLove.com to the{" "}
            <a
              href="https://www.nestleprofessional.us/brands/coffee-mate"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nestlé Professional Coffee mate homepage
            </a>{" "}
            and Coffee mate Amazon Storefront as part of a B2B sales redirect strategy.
          </>
        ),
      },
      {
        label: "Internal Communication Strategy",
        body: "Provided UX consultation and generated robust content for Bunge Ltd. intranet platforms, including blog posts and the production of 20+ podcast episodes.",
      },
      {
        label: "UI and Content Refresh",
        body: (
          <>
            Oversaw the UI refresh strategy of{" "}
            <a
              href="https://www.libbysvegetables.com/"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LibbysVegetables.com
            </a>
            , including wireframes and SEO-optimized content creation.
          </>
        ),
      },
    ],
  },
  {
    id: "gmmb",
    name: "GMMB",
    title: "Account Supervisor",
    clients: [
      "American Beverage Association",
      "Fiat Chrysler Automobiles",
      "United Health Group",
    ],
    highlights: [
      {
        label: "BalanceUS.org Paid Media Campaign",
        body: "Directed traditional and digital paid media strategies, including budgeting, asset creation, trafficking, and performance reporting.",
      },
      {
        label: "BalanceUS.org Video Content Production",
        body: "Negotiated pricing and placements with key industry publications, crafted SEO-optimized stories and supporting social media assets, managed trafficking and reporting, and nurtured relationships with publication partners.",
      },
      {
        label: "Earned Media for BalanceUS.org",
        body: "Researched and built relationships with key publications and reporters, crafted and pitched press releases. Oversaw newswire distribution and conducted comprehensive media and industry landscape monitoring.",
      },
      {
        label: "Public Affairs Campaign Website",
        body: (
          <>
            Directed the end-to-end development and launch of{" "}
            <a
              href="https://www.balanceus.org/"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              BalanceUS.org
            </a>
            , overseeing budgeting, stakeholder interviews, wireframing, client reviews, and seamless project execution.
          </>
        ),
      },
      {
        label: "Automotive Safety Initiative",
        body: (
          <>
            Directed the development and launch of{" "}
            <a
              href="https://checktoprotect.org/"
              className="text-[#c9a96e] hover:text-[#c9a96e]/70 underline-offset-4 underline decoration-[#c9a96e]/30 hover:decoration-[#c9a96e]/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              CheckToProtect.org
            </a>
            , managing budgeting, stakeholder interviews, wireframing, client reviews, and deployment. Facilitated collaboration between FCA stakeholders and developers to integrate an API with sensitive customer data, enabling visitors to check for vehicle recalls securely.
          </>
        ),
      },
      {
        label: "Progressive Web App + Canvassing Campaign",
        body: "Led the development of a Progressive Web App (PWA) incorporating the core CheckToProtect.org API functionality for use on tablets and mobile devices during a national automotive safety canvassing campaign. Analyzed campaign performance, generated detailed reports, and presented insights to stakeholders.",
      },
    ],
  },
  {
    id: "goddard-gunster",
    name: "Goddard Gunster",
    title: "Senior Account Executive",
    clients: [
      "American Beverage Association",
      "The Coca-Cola Company",
      "Walmart",
    ],
    highlights: [
      {
        label: "Account Management",
        body: "Directed strategic planning and execution across paid, earned, and social media channels for the American Beverage Association account, managing campaigns, stakeholder relationships, and deliverables to align with client goals.",
      },
      {
        label: "Ballot Initiative TV Ad Production",
        body: "Managed the production of TV ads for ballot initiatives, including overseeing scripts, filming, post-production, and YouTube bumper ad creation.",
      },
      {
        label: "Paid Media Planning",
        body: "Developed strategic plans for paid media campaigns, cultivating relationships with key publications to secure optimal placements and drive campaign success.",
      },
      {
        label: "Social Media Strategy and Implementation",
        body: "Planned and executed paid and organic social media strategies for the American Beverage Association, creating and presenting detailed KPI reports to the client to measure campaign performance and impact.",
      },
    ],
  },
];

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

      <AgencyNav
        agencies={agencies.map(({ id, name }) => ({ id, name }))}
      />

      <AgencyExperience agencies={agencies} />

      <BackToTop triggerId="oliver" />
    </main>
  );
}