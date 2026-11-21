// DUMMY DATA — stands in for the database until it exists.
// The team roster is the real AY 2026/27 list (no photos yet). Article
// previews are placeholders. Real events live in ./events.ts.

import type {
  ArticlePreview,
  Department,
  SiteSettings,
  TeamMember,
} from "../types";

export const settings: SiteSettings = {
  tagline: "Invest, Innovate, Inspire",
  intro: [
    "InvestSync is the premier investment & networking organization for students of The Chinese University of Hong Kong, Shenzhen.",
    "We broaden students’ investment experience, extend career opportunities, and encourage social networking among members.",
    "Since Spring 2024 our Student Analyst Team has run an investment portfolio, and our research team publishes regular market and company coverage.",
  ],
  mission: [
    {
      title: "Education",
      description:
        "Deepen members’ understanding of investment strategies and market dynamics.",
    },
    {
      title: "Experience",
      description:
        "Provide hands-on learning through real-world investment experience.",
    },
    {
      title: "Empowerment",
      description:
        "Empower future finance leaders with leadership and career development opportunities.",
    },
  ],
  joinUrl: "/join",
  gallery: [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/events/e${n}.jpg`),
  social: {
    linkedin: "https://www.linkedin.com/company/investsync/",
    instagram: "https://www.instagram.com/investsyncofficial?hvrq=M2N4eDdvcWV2emlj",
    email: "investsyncofficial@gmail.com",
  },
};

export const departments: Department[] = [
  { id: "board", name: "Executive Board", order: 1 },
  { id: "operations", name: "Operations", order: 2 },
  { id: "research", name: "Research", order: 3 },
  { id: "education", name: "Education", order: 4 },
  { id: "media", name: "Media", order: 5 },
  { id: "tech", name: "Technology", order: 6 },
  { id: "hr", name: "Human Resources", order: 7 },
];

// Builds one department's members in display order.
function dept(
  departmentId: string,
  people: [name: string, role: string, linkedinUrl?: string][],
): TeamMember[] {
  return people.map(([name, role, linkedinUrl], i) => ({
    id: `${departmentId}-${i + 1}`,
    name,
    role,
    departmentId,
    order: i + 1,
    photoUrl: null,
    linkedinUrl: linkedinUrl ?? null,
    active: true,
  }));
}

export const teamMembers: TeamMember[] = [
  ...dept("board", [
    ["Eugenia Jocelyn Budiono", "President", "https://www.linkedin.com/in/eugenia-jocelyn/"],
    ["Kevinsanto Liu", "President", "https://www.linkedin.com/in/kevinsanto-liu/"],
    ["Christopher Kandiawan", "Vice President", "https://www.linkedin.com/in/christopherkandiawan/"],
    ["Dhyfa Isabella Rudolf", "Vice President", "https://www.linkedin.com/in/dhyfa-isabella-rudolf/"],
  ]),
  ...dept("operations", [
    ["Darryl Kennard Julian", "Head of Operations", "https://www.linkedin.com/in/darryl-kennard-julian-a8a4382aa/"],
    ["Fernando Salim", "Associate", "https://www.linkedin.com/in/fernando-salim-14202b360/"],
    ["Attarasyah Ridla Kamajati", "Associate", "https://www.linkedin.com/in/attarasyahridla/"],
    ["Gwen Emmeline Tan", "Associate", "https://www.linkedin.com/in/gwen-emmeline-tan/"],
    ["Trevar M. Wijoyo", "Associate"],
    ["Rem Vafin", "Associate", "https://www.linkedin.com/in/rem-vafin-5b2496387/"],
  ]),
  ...dept("research", [
    ["Jason Nathanael Gunadi", "Head of Research", "https://www.linkedin.com/in/jason-gunadi-67909a287/"],
    ["Fillson Alexis", "Associate", "https://www.linkedin.com/in/fillson-alexis/"],
    ["Matthew Kevin Wangarrij", "Associate", "https://www.linkedin.com/in/mkevinw/"],
    ["Kenzie Gilbert Arlanno", "Associate"],
    ["Natania Christian", "Associate"],
  ]),
  ...dept("education", [
    ["Andrea Miracle Lo", "Head of Education", "https://www.linkedin.com/in/andrea-miracle-lo/"],
    ["Sultan Meleksha", "Associate"],
    ["Peter Liem Saputra Djaya", "Associate", "https://www.linkedin.com/in/peter-liem-saputra-djaya-6aa3a1351/"],
    ["Jianlang Zheng", "Associate", "https://www.linkedin.com/in/zhengjianlangcuhksz/"],
    ["Mariia Shcheglova", "Associate"],
  ]),
  ...dept("media", [
    ["Jessie Carol Harsono", "Head of Media", "https://www.linkedin.com/in/jessiecarolharsono/"],
    ["Vivian Aileen", "Associate", "https://www.linkedin.com/in/vivian-aileen-a543a62b1/"],
    ["Caroline Anabelle", "Associate", "https://www.linkedin.com/in/carolineanabelle/"],
    ["Angel Kimberly", "Associate"],
    ["Angelica Wijaya", "Associate"],
  ]),
  ...dept("tech", [
    ["Karel Gideon Anugrah Hutajulu", "Head of Technology", "https://www.linkedin.com/in/karel-hutajulu-b1a520204/"],
    ["Christian Angelo Velarde", "Associate", "https://www.linkedin.com/in/christian-angelo-velarde-257aa3235/"],
    ["Kellen Joudan", "Associate"],
    ["Jason Sukiman", "Associate"],
    ["Celine Clarissa Chandra", "Associate", "https://www.linkedin.com/in/celineclarissa/"],
    ["Birlik Yessen", "Associate", "https://www.linkedin.com/in/birlik-yessen-699b35300/"],
  ]),
  ...dept("hr", [
    ["Nadya Jolie Yaslim", "Head of HR", "https://www.linkedin.com/in/nadyajolieyaslim/"],
    ["Keira Patricia Tanuwibowo", "Associate", "https://www.linkedin.com/in/keira-patricia-tanuwibowo-4b69401a9/"],
    ["Gaukhar Abualieva", "Associate", "https://www.linkedin.com/in/gaukhar-abualieva-490063437/"],
  ]),
];

// Placeholder until the articles table (Jason) exists.
export const articlePreviews: ArticlePreview[] = [
  {
    id: "a1",
    slug: "inflation-interest-rates-south-korea",
    title: "Inflation and Interest Rate Challenges in South Korea",
    author: "Market Research Team",
    category: "Macro",
    publishedAt: "2026-11-10",
    coverUrl: "/images/articles/south_korea_flag.jpg",
    excerpt:
      "How the Bank of Korea is balancing sticky inflation against a slowing economy.",
  },
  {
    id: "a2",
    slug: "ai-capex-and-the-semiconductor-cycle",
    title: "AI Capex and the Semiconductor Cycle",
    author: "Equity Research Team",
    category: "Technology",
    publishedAt: "2026-10-28",
    coverUrl: "/images/articles/tech_innovation.jpg",
    excerpt:
      "Is the current wave of data-centre spending a new cycle or a one-off build-out?",
  },
  {
    id: "a3",
    slug: "shenzhen-property-after-the-reforms",
    title: "Shenzhen Property After the Reforms",
    author: "Market Research Team",
    category: "Real Estate",
    publishedAt: "2026-10-09",
    coverUrl: "/images/brand/shenzhen.jpg",
    excerpt:
      "What the latest round of policy easing means for developers and home buyers.",
  },
  {
    id: "a4",
    slug: "older-article",
    title: "An Older Article (should not appear on Home)",
    author: "Research",
    category: "Macro",
    publishedAt: "2026-08-01",
    coverUrl: null,
    excerpt: "",
  },
];
