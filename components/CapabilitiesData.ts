// Single source of truth for the Capabilities section.
// Every layout variant (Spine, Print Layout, Index, etc.) reads from this file.
//
// To update copy: edit here. All layouts will pick up the change.
// To add proof points: fill in the `proof` field on a child (currently null).

export type CapabilityChild = {
  name: string;
  description: string; // ~40-60 words, lorem for now
  proof: string | null; // optional one-line proof point, fill later
};

export type CapabilityParent = {
  number: string; // "01", "02", etc.
  name: string;
  tagline: string; // short italic line that frames the parent
  children: CapabilityChild[];
};

export const capabilities: CapabilityParent[] = [
  {
    number: "01",
    name: "Strategy",
    tagline: "The thinking that comes before the work.",
    children: [
      {
        name: "Brand",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        proof: null,
      },
      {
        name: "Messaging",
        description:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        proof: null,
      },
      {
        name: "Content",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        proof: null,
      },
      {
        name: "Executive Comms + Thought Leadership",
        description:
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
        proof: null,
      },
    ],
  },
  {
    number: "02",
    name: "Creative",
    tagline: "Concept, voice, and craft across formats.",
    children: [
      {
        name: "Creative Direction",
        description:
          "Consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        proof: null,
      },
      {
        name: "Graphic Design",
        description:
          "Nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
        proof: null,
      },
      {
        name: "Copywriting",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
        proof: null,
      },
      {
        name: "Multimedia Production",
        description:
          "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
        proof: null,
      },
    ],
  },
  {
    number: "03",
    name: "Paid + Promotion",
    tagline: "Bought distribution that earns its budget.",
    children: [
      {
        name: "Paid Digital",
        description:
          "Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
        proof: null,
      },
      {
        name: "Publication Partnerships",
        description:
          "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
        proof: null,
      },
      {
        name: "Email Marketing",
        description:
          "Magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
        proof: null,
      },
    ],
  },
  {
    number: "04",
    name: "Social Media",
    tagline: "Where brand voice meets community.",
    children: [
      {
        name: "Organic Social",
        description:
          "Pariatur excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        proof: null,
      },
      {
        name: "Paid Amplification",
        description:
          "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
        proof: null,
      },
      {
        name: "Influencer & Creator Partnerships",
        description:
          "Magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.",
        proof: null,
      },
    ],
  },
  {
    number: "05",
    name: "Build",
    tagline: "Owned platforms, made to last.",
    children: [
      {
        name: "Full Stack Web Development",
        description:
          "Et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit.",
        proof: null,
      },
      {
        name: "Custom Applications",
        description:
          "Qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
        proof: null,
      },
      {
        name: "SEO",
        description:
          "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        proof: null,
      },
    ],
  },
  {
    number: "06",
    name: "Measurement",
    tagline: "The proof that everything else worked.",
    children: [
      {
        name: "Metrics, Analytics, and Reporting",
        description:
          "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
        proof: null,
      },
      {
        name: "AI-Optimized Workflows",
        description:
          "Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur.",
        proof: null,
      },
    ],
  },
];