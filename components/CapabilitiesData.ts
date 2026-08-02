// Single source of truth for the Capabilities section.
// Every layout variant (Spine, Print Layout, Index, etc.) reads from this file.
//
// To update copy: edit here. All layouts will pick up the change.
// To add proof points: fill in the `proof` field on a child (currently null).

export type CapabilityChild = {
  name: string;
  description: string[]; // one entry per paragraph of supporting copy
  proof: string | null; // optional one-line proof point, fill later
};

export type CapabilityParent = {
  number: string; // "01", "02", etc.
  name: string;
  children: CapabilityChild[];
};

export const capabilities: CapabilityParent[] = [
  {
    number: "01",
    name: "Strategy",
    children: [
      {
        name: "Brand",
        description: [
          "I help businesses establish a clear identity and a consistent voice. The work starts with the fundamentals: audience research, competitive positioning, and the messaging architecture that determines what you say to whom.",
          "Next, I build the practical assets that keep teams and vendors telling one story: voice and tone guidelines, messaging frameworks, and brand narratives.",
          "I've done this work for global consumer brands refining their presence, and for businesses still defining who they are.",
        ],
        proof: null,
      },
      {
        name: "Content",
        description: [
          "I build content strategies that connect business priorities to an editorial calendar a team can execute. That includes defining pillars and formats, mapping content to audience and channel, and setting the cadence that keeps a program publishing.",
          "My work has spanned website copy, blogs, op-eds, social content, email campaigns, and podcast series produced with company leadership.",
        ],
        proof: null,
      },
      {
        name: "Channel",
        description: [
          "Not every brand belongs everywhere. I evaluate where your audience actually spends attention, prioritize the platforms worth the investment, and define the role each one plays. Next, the work turns to maximizing what each platform offers: native formats, publishing rhythms, and the features that reward brands for showing up consistently.",
        ],
        proof: null,
      },
      {
        name: "Thought Leadership",
        description: [
          "I build thought leadership programs around the formats executives actually use: panels, podcasts, op-eds, and LinkedIn.",
          "Past work includes panel events with Axios and The Atlantic, a podcast series produced with company leadership, and a C-suite video series.",
          "The format changes, but the job doesn't: build an audience around someone's expertise and give people a reason to keep listening.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "02",
    name: "Creative",
    children: [
      {
        name: "Creative Direction",
        description: [
          "I set the creative direction for campaigns and keep it intact from concept through delivery. I brief designers, videographers, and writers, edit the work until it matches the strategy, and manage the reviews and approvals that get it shipped.",
        ],
        proof: null,
      },
      {
        name: "Copy Writing",
        description: [
          "Writing is where my career started, and it remains at the core of everything else I do.",
          "I've written sponsored content articles, white papers, website and blog copy, and social posts across platforms.",
          "I take a particular pride in synthesizing complex ideas into clear messaging and adapting a brand's voice to any format.",
        ],
        proof: null,
      },
      {
        name: "Video Production",
        description: [
          "I manage video productions from script to delivery: concepting, hiring production partners, shoot coordination, editing, approval cycles, and trafficking.",
          "Past work includes TV ads for statewide ballot campaigns and an executive video series repurposed for broadcast, social, and YouTube.",
          "I plan and run the logistics that keep a production on budget, without letting the idea shrink to meet it.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "03",
    name: "Paid + Promotion",
    children: [
      {
        name: "Paid Digital",
        description: [
          "I specialize in integrated paid media planning and take a hands-on approach to execution: ad buying, flight calendars, asset trafficking, and reporting.",
          "I've run campaigns across paid search, paid social, display, and direct publisher buys, negotiating insertion orders and premium placements with major publications. Once live, I follow the data, refining creative and placement and shifting budget toward what's working.",
        ],
        proof: null,
      },
      {
        name: "Publication Partnerships",
        description: [
          "I've negotiated sponsored content programs directly with trade and tier-one publications, including Bloomberg and Axios, managing pricing, placement, and the editorial process end to end.",
          "I write SEO-optimized copy for the articles themselves and handle amplification, promoting the finished piece through social and the publication's in-platform ads. It's a tactic that lends a campaign credibility and nuance standard ads can't.",
        ],
        proof: null,
      },
      {
        name: "Search Engine Optimization",
        description: [
          "I fold SEO into content from the start rather than retrofitting it: keyword strategy, on-page optimization, and the site structure that helps pages rank.",
          "This work now includes optimizing for AI, structuring pages so assistants and answer engines can find, parse, and cite them.",
          "And because I build websites as well as advise on them, the technical layer gets handled in the code itself: semantic markup, meta tags, and performance tuned for search.",
        ],
        proof: null,
      },
      {
        name: "Email Marketing",
        description: [
          "The goal of an email campaign is to create an experience subscribers don't just open, but look forward to. I've built email programs end to end, from copy and design to the UX that drives clicks.",
          "My work has spanned grassroots political campaigns, employee communications, and B2B marketing that has driven measurable sales and conversions.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "04",
    name: "Social Media",
    children: [
      {
        name: "Organic Social",
        description: [
          "Organic social is the foundation of digital communications strategy: no channel does more to build awareness and move an audience toward conversion.",
          "I've run always-on programs since the early days of social media, for audiences ranging from consumers to voters to industry leaders.",
          "I take a methodical approach to editorial calendars, post development, community management, and the governance that keeps a brand consistent, with every program informed by metrics and built for compounding growth.",
        ],
        proof: null,
      },
      {
        name: "Paid Amplification",
        description: [
          "If organic social is the foundation, paid amplification is the catalyst: budget applied at the moments that matter most, whether a launch, a milestone, or a post already outperforming.",
          "The right scale varies by campaign: some run on sustained paid support, others deploy it selectively. I put spend behind proven content to extend its reach, and I use dark posting to test creative and grow an audience beyond a brand's followers without crowding its feed.",
          "Applied correctly, the ROI of amplified content is hard to beat: it turns a channel's best moments into its fastest growth.",
        ],
        proof: null,
      },
      {
        name: "Influencer & Creator Partnerships",
        description: [
          "I've built influencer programs for major consumer brands, including creator campaigns for Microsoft Store: identifying creators, negotiating contracts, creating briefing books, and reviewing content before it goes live.",
          "I vet a creator's actual audience to ensure it aligns with the brand's customer base, and use shared metrics to confirm the client's message is resonating.",
          "Done right, the partnership produces content the brand couldn't have made itself, with the credibility of a voice its audience already trusts.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "05",
    name: "Web Development",
    children: [
      {
        name: "Website Project Management",
        description: [
          "Beyond my own builds, I've led cross-functional teams delivering websites at agency scale, for clients including Fiat Chrysler, Ardent Mills, and the American Beverage Association.",
          "I've run the full arc: discovery, content and UX strategy, development oversight, and launch.",
          "Because I write code myself, I can direct developers with a builder's understanding of the work, and clients get one person accountable from kickoff to live site.",
        ],
        proof: null,
      },
      {
        name: "Full Stack Web Development",
        description: [
          "Every business needs a digital homebase: a site where its content lives, its story gets told on its own terms, and its audience acts.",
          "I build web applications end to end, meaning both the front-end visitor experience and the back-end mechanics. I work primarily in JavaScript and TypeScript, with Next.js, Node, Express, and MongoDB for data. The work ranges from informational sites to full e-commerce, built mobile-first, with contact flows, transactional email, content management, secure user accounts, and checkout logic as the project demands.",
          "Because I come from communications, the build always serves the story: architecture, performance, and design decisions all start from what the site needs to say.",
        ],
        proof: null,
      },
      {
        name: "Custom Applications",
        description: [
          "When off-the-shelf tools don't fit, I build the tool. Recent work includes e-commerce logic built from scratch, content platforms with custom back ends, and API integrations that pull outside data and services into one workflow. I scope the build to the actual problem: sometimes that's a full application, sometimes a small utility that saves an hour a day.",
          "This is the work I'm most excited about right now: AI has brought the cost of custom software down to where a small business can own tools built for exactly how it operates, and I think that's one of the defining shifts of this era.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "06",
    name: "Measurement",
    children: [
      {
        name: "Metrics, Analytics, and Reporting",
        description: [
          "Everything I do, from copy to strategy to web builds, is grounded in research and data.",
          "KPIs are defined at the start of an engagement, so success gets measured against business goals rather than aesthetics or intuition, and clients can quantify the return on their investment.",
          "I operate on a steady reporting cadence: monthly and quarterly analysis that illustrates how the campaign is performing and how it can be optimized.",
        ],
        proof: null,
      },
    ],
  },
  {
    number: "07",
    name: "Artificial Intelligence",
    children: [
      {
        name: "Workflow Optimizations",
        description: [
          "I design AI-assisted workflows that cut production time without cutting quality: research, data processing, first drafts, and the repetitive steps that eat a team's week.",
          "The work starts with mapping how a process actually runs, then deciding where AI genuinely helps and where human judgment has to stay.",
          "I use these systems daily in my own practice, across writing, analytics, and development, so I recommend only what I've seen hold up in real work.",
        ],
        proof: null,
      },
      {
        name: "AI-Assisted Content Production",
        description: [
          "I build content pipelines that use AI for speed and a writer's editorial judgment for everything that matters: grounding drafts in real source material, editing machine output until it carries the brand's actual voice, and knowing what a model gets wrong.",
          "The same standard applies to visuals: I generate imagery, graphics, and design components with AI, then art-direct and refine them so nothing lands in the uncanny valley or reads as machine-made.",
          "20+ years of writing and editing is what makes the tools useful. AI raises the floor, and the craft still sets the ceiling.",
        ],
        proof: null,
      },
      {
        name: "AI Governance + Best Practices",
        description: [
          "I've built governance for content production inside highly regulated industries: compliance guidelines, best-practice playbooks, and templates that let brands publish at scale without incident.",
          "AI adoption raises the same problem in a new form, and I bring the same approach: clear standards for what the tools may touch, what stays human, and how quality gets checked before anything ships.",
          "The result is a team that moves faster with AI instead of arguing about it, inside rules everyone can follow.",
        ],
        proof: null,
      },
      {
        name: "AI Search Optimization",
        description: [
          "A growing share of discovery now happens inside AI assistants rather than on a search results page, and content has to be structured for it.",
          "I build pages so answer engines can find, parse, and cite them: clean semantic markup, structured data, and copy organized so a model can quote it accurately.",
          "The same thinking now extends to platforms: long-form LinkedIn strategy, articles, newsletters, and substantive posts gives executives and brands a presence in the sources AI answers draw from.",
          "The aim is to be the answer, wherever the question gets asked.",
        ],
        proof: null,
      },
    ],
  },
];