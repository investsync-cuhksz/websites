// Taken from the club's WeChat announcements.

import type { ClubEvent } from "../types";

type EventInput = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM, 24-hour. Leave out (with `end`) when the time isn't announced yet. */
  start?: string;
  end?: string;
  /** Leave out when the venue isn't announced yet. */
  location?: string;
  summary: string;
  description: string;
  agenda?: string[];
  registrationUrl?: string;
  coverUrl?: string;
  photoUrls?: string[];
};

const at = (date: string, time: string) => `${date}T${time}:00+08:00`;

function ev(e: EventInput): ClubEvent {
  const timeTba = !e.start;
  return {
    id: e.slug,
    slug: e.slug,
    title: e.title,
    startsAt: at(e.date, e.start ?? "00:00"),
    endsAt: timeTba ? at(e.date, "23:59") : e.end ? at(e.date, e.end) : null,
    timeTba,
    location: e.location ?? "Venue to be announced",
    summary: e.summary,
    description: e.description,
    agenda: e.agenda ?? [],
    coverUrl: e.coverUrl ?? null,
    photoUrls: e.photoUrls ?? [],
    registrationUrl: e.registrationUrl ?? null,
    published: true,
  };
}

export const events: ClubEvent[] = [
  // ── Academic Year 2026/27 ───────────────────────────────────────────
  // Time and venue not announced yet: add `start`, `end` and `location` when known.
  ev({
    slug: "stock-pitch-competition-2026-final",
    title: "Stock Pitch Competition 2026: Final",
    date: "2026-12-05",
    summary:
      "The top 6 teams pitch live to professors and industry practitioners, with prizes worth RMB 1,000+.",
    description:
      "The final of the InvestSync Stock Pitch Competition 2026. After two seminars and a round of two-page investment memos, the six finalist teams pitch their stock ideas live to a panel of professors and industry practitioners. Prizes are worth RMB 1,000+.\n\nTime and venue will be announced soon.",
  }),
  ev({
    slug: "stock-pitch-seminar-2-build-and-deliver-your-pitch",
    title: "Seminar 2: Build & Deliver Your Pitch",
    date: "2026-11-20",
    start: "10:00",
    end: "12:00",
    location: "TB105",
    summary:
      "Professor Yakun Wang and the InvestSync team on building a pitch deck, delivering it with confidence and handling Q&A.",
    description:
      "The second seminar of the InvestSync Stock Pitch Competition 2026, after teams had submitted their investment memos. Professor Yakun Wang (Associate Area Head of Accounting) and the InvestSync team showed how to build a pitch deck, deliver it with confidence and handle Q&A.\n\nThe six finalist teams were to be announced during the session. The seminar was open to everyone, whether preparing for a stock pitch, a case competition or any other competition.",
  }),
  ev({
    slug: "stock-pitch-seminar-1-break-down-and-value-a-business",
    title: "Stock Pitch Competition 2026 · Seminar 1: Break Down and Value a Business",
    date: "2026-10-16",
    start: "15:00",
    end: "17:00",
    location: "ZX109, Zhixin Building",
    summary:
      "The kickoff of the 2026 Stock Pitch Competition: how a business works, the numbers that matter, and valuing a company with DCF and comparables.",
    description:
      "The first seminar of the InvestSync Stock Pitch Competition 2026. It walked through how a business works, the numbers that matter, and how to value a company using DCF and comparables, starting from the basics with no finance background needed. Registered teams received a financial modelling template.\n\nAbout the competition: teams of 1 to 3, open to all CUHK-Shenzhen students from any major and year. Each team writes a two-page investment memo, and the top 6 teams pitch live to professors and industry practitioners on 5 December. Prizes are worth RMB 1,000+. Registration was open until Friday 13 November, 23:59.",
    agenda: [
      "How to break down any business",
      "How to value a company with DCF and comparables",
      "How to make your first Buy, Hold or Sell call",
      "A financial modelling template for registered teams",
    ],
  }),
  ev({
    slug: "information-session-2026",
    title: "InvestSync Information Session",
    date: "2026-09-18",
    start: "15:00",
    end: "17:00",
    location: "TA302",
    summary:
      "Meet the team, find out what InvestSync does, and a short Introduction to Investment Fundamentals.",
    description:
      "InvestSync is CUHK-Shenzhen’s student-led investment and networking organization. We help students learn investing from the ground up through seminars, competitions, practical experience and a community of people learning together.\n\nAt this information session, students met the team, learned what InvestSync does and what being part of the community is like, and joined a short Introduction to Investment Fundamentals. No prior experience needed; open to all years and all majors.",
  }),

  // ── Academic Year 2025/26 ───────────────────────────────────────────
  ev({
    slug: "semester-finale-spring-2026",
    title: "InvestSync Semester Finale",
    date: "2026-05-01",
    start: "16:00",
    end: "17:00",
    location: "TxC 201",
    summary:
      "Private equity and leveraged buyouts made simple, plus the Mock Investment Competition winners.",
    description:
      "Following the previous meeting on Buffett’s investment philosophy and finding companies with wide moats, this session turned to private equity, especially leveraged buyouts (LBOs): how private equity firms use debt to acquire undervalued companies. The explanations were kept simple, and the session closed with the Mock Investment Competition winners announcement.",
    agenda: [
      "April ’26 Market Recap",
      "The Basics: Private Equity, Debt vs. Equity",
      "The Leveraged Buyout (LBO) Analogy",
      "The Ultimate Moat Irony",
      "Mock Investment Winners Announcement",
    ],
  }),
  ev({
    slug: "career-prep-and-application-mastery",
    title: "Career Prep & Application Mastery",
    date: "2026-04-17",
    start: "16:00",
    end: "17:00",
    location: "TB 104",
    summary:
      "Practical career tools: resumes, cover letters, LinkedIn, coffee chats and application strategy.",
    description:
      "A shift from investment principles to practical career tools. The session walked through the essentials of a strong application step by step, giving members a clear roadmap for recruiting and for standing out to employers, even those just starting out.",
    agenda: [
      "Resume & Cover Letter",
      "LinkedIn Optimization",
      "Coffee Chats",
      "Application Strategy",
      "Internships & Pre-internships",
    ],
  }),
  ev({
    slug: "mastering-walk-me-through-a-dcf",
    title: "Mastering the “Walk Me Through a DCF” Question",
    date: "2026-01-30",
    start: "16:30",
    end: "17:30",
    location: "TA101",
    summary:
      "The step-by-step logic of a DCF valuation, so anyone can answer the classic interview question.",
    description:
      "A breakdown of the DCF valuation model: the step-by-step logic and flow, so members can confidently answer the famous “Walk me through a DCF” interview question. The basics were covered too, so non-SME students and underclassmen could follow along.",
    agenda: [
      "January ’26 Market Recap",
      "Building the Foundation for DCF",
      "Step-by-Step DCF Walkthrough",
      "Mock Investment Portfolio Update",
      "Kahoot",
    ],
  }),
  ev({
    slug: "first-meeting-spring-2026",
    title: "First Meeting of Spring ’26",
    date: "2026-01-23",
    start: "16:30",
    end: "17:30",
    location: "TXC302",
    summary:
      "Breaking into finance: internship experiences, the CFA exam, resume format and a 2025 market recap.",
    description:
      "The first meeting of the semester, with one goal: helping members land an internship this summer. It covered past internship experiences, how to structure a resume and cover letter, and how to work out which part of the finance industry suits you best. Sign-up for the semester’s competition opened during the meeting.",
    agenda: [
      "Breaking into Finance",
      "Internship Experiences (feat. PwC & a buy-side hedge fund)",
      "About the CFA Exam",
      "Resume & Cover Letter Format",
      "2025 Stock Market Recap",
      "Competition Sign-up",
    ],
  }),
  ev({
    slug: "final-meeting-fall-2025",
    title: "Final Meeting of the Semester",
    date: "2025-12-05",
    start: "15:30",
    end: "17:00",
    location: "TXA 402",
    summary:
      "A Jeopardy-style semester recap, the mock investment winners and a short networking session.",
    description:
      "The concluding all-hands meeting of the semester, wrapping up with a Jeopardy-style recap of the semester and the announcement of the mock investment competition winners. Winners had to be present to claim their prizes.",
    agenda: [
      "Jeopardy-style Semester Recap",
      "Mock Investment Winners Revealed",
      "Short Networking Session",
    ],
  }),
  ev({
    slug: "all-hands-meeting-october-2025",
    title: "All-Hands Meeting: Getting Started with Investing",
    date: "2025-10-17",
    start: "15:00",
    end: "17:00",
    location: "TD 307",
    summary:
      "Market recap, investment basics and a guide to setting up a brokerage account for real-life investing.",
    description:
      "Everything needed to get started with investing: a market recap, an introduction to investment basics, and help setting up a brokerage account for real-life investing.",
    agenda: [
      "Meet our Board of Directors",
      "$10,000 Mock-Investment Game Checkpoint",
      "Quick Market Recap",
      "Intro to Investment Basics",
      "Brokerage Account Setup Guide",
    ],
  }),
  ev({
    slug: "first-official-meeting-fall-2025",
    title: "InvestSync First Official Meeting",
    date: "2025-09-25",
    start: "15:00",
    end: "17:00",
    location: "TD 307",
    summary:
      "The first club meeting of the semester and the start of the $10,000 Mock-Investment Competition.",
    description:
      "The first official club meeting of the semester. It launched the $10,000 Mock-Investment Competition, where every member mock-invests $10,000 until the end of the semester and competes with one another.",
    agenda: [
      "Board of Directors Introduction and Registration",
      "$10,000 Mock-Investment Competition",
      "Group Elevator Pitch Game",
    ],
  }),
  ev({
    slug: "information-session-2025",
    title: "AY2025/26 Information Session",
    date: "2025-09-19",
    start: "16:00",
    end: "17:00",
    location: "TxA 401",
    summary:
      "An introduction to CUHK(SZ)’s international student investment & networking club.",
    description:
      "The AY2025/26 information session of InvestSync, CUHK(SZ)’s international student investment & networking club. InvestSync aims to be a place where CUHK(SZ) students can start their investment journey, gain real-life investment knowledge, take part in investment competitions and win prizes, learn from current finance and investment professionals, earn leadership experience, network with students and professors, and hear about internship opportunities in China and Hong Kong.\n\nNo membership fee and no real money involved. Completely beginner-friendly and open to students of any major.",
  }),

  // ── Academic Year 2024/25 ───────────────────────────────────────────
  ev({
    slug: "final-meeting-ay2024-25",
    title: "AY24/25 Final Meeting",
    date: "2025-04-27",
    start: "16:00",
    end: "17:00",
    location: "TxC-101",
    summary:
      "The last meeting of the academic year: closing remarks from the outgoing President and the mock investment winners.",
    description:
      "The last meeting of the academic year and the outgoing President’s final meeting, with no technical topics. Instead, final remarks on 1.5 years as President and the future of InvestSync, plus the announcement of the mock investment competition’s top 5.",
    agenda: [
      "InvestSync as a Launchpad for Your Career",
      "Mock Investment Competition Winners Announcement",
      "Leadership Application Announcement",
      "What’s Next for InvestSync",
      "Group Photos",
    ],
  }),
  ev({
    slug: "tariffs-turmoil",
    title: "April All-Hands Meeting: Tariffs Turmoil",
    date: "2025-04-18",
    start: "16:00",
    end: "17:30",
    location: "TA-202",
    summary:
      "How recent tariffs affected the market, and a team debate on which asset to hold right now.",
    description:
      "Meetings resumed with a look at how recent tariffs had affected the market, followed by a group debate in which teams argued which asset you should be holding right now.",
    agenda: [
      "Quick Market Recap",
      "Group Discussion and Debate Prep",
      "Teams Face-off: Stock Buy/Sell Debate",
      "Leadership Application Announcement",
    ],
  }),
  ev({
    slug: "april-career-development-meeting-2025",
    title: "April Career Development Meeting",
    date: "2025-04-12",
    start: "16:00",
    end: "17:30",
    location: "TxA-402",
    summary:
      "InvestSync’s first career development meeting, with a guest speaker from JPMorgan.",
    description:
      "InvestSync’s first ever career development meeting, held at the start of internship hunting season. A guest speaker from JPMorgan shared tips and tricks for securing an internship or full-time job, and members brought their CVs to fine-tune together.",
    agenda: [
      "Guest Speaker Session: JPMorgan CIB Analyst",
      "Summer Internship Application Cycles",
      "Securing an Offer in Banking, Finance or Tech: Tips and Tricks",
      "Perfecting Your Resume and Cover Letter Workshop",
    ],
  }),
  ev({
    slug: "crypto-and-technical-analysis",
    title: "March All-Hands Meeting: Crypto and Technical Analysis",
    date: "2025-03-28",
    start: "16:00",
    end: "17:30",
    location: "TB-102",
    summary: "Crypto market cycles, technical indicators and chart patterns.",
    description:
      "A session on crypto cycles and technical analysis, alongside mid-point checks on the mock investment competition. Sign-ups for the competition closed after the meeting.",
    agenda: [
      "Quick Market Recap",
      "Crypto Market Cycles",
      "Technical Indicators for Crypto Trading",
      "Chart Pattern Technical Analysis",
    ],
  }),
  ev({
    slug: "commodities-investing",
    title: "March All-Hands Meeting: Commodities Investing",
    date: "2025-03-07",
    start: "16:00",
    end: "17:30",
    location: "TxB-201",
    summary:
      "Options and futures part II, and commodities as a diversification tool and inflation hedge.",
    description:
      "The last meeting before a two-week midterm break. It briefly revisited options and futures from the previous meeting, then went deeper into commodities and their role as a diversification tool and inflation hedge. The 2nd Mock Investment Competition kicked off the next day, with more winners than the first.",
    agenda: [
      "Quick Market Recap",
      "All You Need to Know about Options and Futures, Part II",
      "Commodities Investing: Inflation Hedge and Diversification",
      "Kahoot!",
      "InvestSync 2nd Mock Investment Competition Sign-up",
    ],
  }),
  ev({
    slug: "options-and-futures-feb-28",
    title: "February All-Hands Meeting: Options & Futures",
    date: "2025-02-28",
    start: "16:00",
    end: "17:30",
    location: "TxB-201",
    summary:
      "Options and futures explained simply, with a hedging case study for business owners.",
    description:
      "An introduction to options and futures, one of the topics members were most interested in. In a group activity, members acted as business owners hedging their industry’s risks with derivatives. The concepts were simplified to make them easy to grasp.",
    agenda: [
      "All You Need to Know about Options and Futures",
      "Speculating vs. Hedging: Betting on Price Change and Protecting Against Risks",
      "Hedging Case Study: How to Protect Your Business from Risks",
    ],
  }),
  ev({
    slug: "options-and-futures-feb-21",
    title: "February All-Hands Meeting: Options & Futures",
    date: "2025-02-21",
    start: "16:00",
    end: "17:30",
    location: "TxC-201",
    summary:
      "Options and futures explained simply, with a hedging case study for business owners.",
    description:
      "An introduction to options and futures, one of the topics members were most interested in. In a group activity, members acted as business owners hedging their industry’s risks with derivatives. The concepts were simplified to make them easy to grasp.",
    agenda: [
      "All You Need to Know about Options and Futures",
      "Speculating vs. Hedging: Betting on Price Change and Protecting Against Risks",
      "Hedging Case Study: How to Protect Your Business from Risks",
    ],
  }),
  ev({
    slug: "february-all-hands-2025",
    title: "February All-Hands Meeting",
    date: "2025-02-14",
    start: "16:00",
    end: "17:30",
    location: "TxB-201",
    summary:
      "A holiday market recap and three investing mistakes to avoid: greed, arrogance and stubbornness.",
    description:
      "The first meeting of the term looked at key market events over the holiday and what they meant for members’ investments, and shared real investment mistakes so members could learn from them instead of repeating them.",
    agenda: [
      "Holiday Market Recap",
      "The 3 Horsemen of Investment Apocalypse: Greed, Arrogance, Stubbornness",
    ],
  }),
  ev({
    slug: "final-meeting-fall-2024",
    title: "Final Meeting of Fall ’24",
    date: "2024-11-29",
    start: "16:00",
    end: "17:00",
    location: "TXA 401",
    summary:
      "The outgoing President’s stock-picking strategies, technical analysis and when to buy and sell.",
    description:
      "The last meeting of the semester and the outgoing President’s final meeting before going on exchange. It shared the strategies and knowledge behind four years of investing: how to pick a stock, which company could be the “next Nvidia”, technical analysis on crypto charts, and when to buy and sell. Kept short at one hour for the busy season.",
    agenda: [
      "How Joseph Picks His Stocks",
      "What’s the Next NVDA?",
      "Technical Analysis on Stocks and Crypto",
      "When to Buy and Sell?",
      "Competition Winner",
      "Important Announcements",
    ],
  }),
  ev({
    slug: "november-all-hands-us-markets-2024",
    title: "November All-Hands Meeting: US Markets & Earnings",
    date: "2024-11-22",
    start: "16:00",
    end: "17:30",
    location: "TxA402",
    summary:
      "Recent US market developments, from earnings updates to crypto trends, plus a Kahoot.",
    description:
      "A session on recent developments in the US markets, from earnings updates to cryptocurrency trends, finished with a Kahoot game to recap market knowledge.",
    agenda: [
      "Overview of US Market Indices",
      "Key Recent Earnings Releases",
      "RKLB Discussion and Insights",
      "Current Market Risk Factors",
      "Crypto InvestSync Executives Buy",
      "Kahoot Quiz",
    ],
  }),
  ev({
    slug: "november-all-hands-red-flags-2024",
    title: "November All-Hands Meeting: Spotting Red Flags",
    date: "2024-11-15",
    start: "16:00",
    end: "18:00",
    location: "TxA-401",
    summary:
      "Reading real financial statements to spot warning signs before you invest.",
    description:
      "A dive into real financial statements to spot potential warning signs, designed to sharpen fundamental analysis skills for more informed and confident investment decisions. The session also reviewed the progress of all competition portfolios.",
    agenda: [
      "How to Avoid Bad Companies (Red Flags)",
      "Key Types of Red Flags to Watch For",
      "Real-Life Financial Analysis",
      "“Spot the Risk” Game",
    ],
  }),
  ev({
    slug: "november-event-snapshots-2024",
    title: "November Event Snapshots Meeting",
    date: "2024-11-08",
    start: "16:00",
    end: "17:30",
    location: "TB 201",
    summary:
      "The US election, earnings shocks and an accounting scandal: what they mean for your portfolio.",
    description:
      "Meetings resumed after midterms with lighter topics: a few major events, from the US election to firm-level news, and what they could mean for the stock market and members’ portfolios. Applications for senior analysts opened at the end of the meeting, for anyone with more than a year of investing experience.",
    agenda: [
      "Trump’s Election Victory: Will Markets Soar or Sink?",
      "Profit Breakthroughs and Earnings Shocks: The Case of RDDT and PLTR",
      "Exposing Accounting Scandals: SMCI’s Accounting Red Flags",
    ],
  }),
  ev({
    slug: "october-wrap-up-2024",
    title: "October Wrap-Up Meeting",
    date: "2024-10-18",
    start: "16:00",
    end: "17:30",
    location: "TXA 402",
    summary:
      "The launch of the 50-Day $10,000 Mock-Investment Competition, plus Jeopardy.",
    description:
      "The last meeting before a two-week midterm break, and the start of the “50-Day $10,000 Mock-Investment Competition”, where every member mock-invested $10,000 until the end of the semester. Stock Pitch Competition winners collected their certificates.",
    agenda: [
      "Next Topic: Macroeconomics & Earnings Reports",
      "$10,000 Mock-Investment Competition",
      "Jeopardy!",
    ],
  }),
  ev({
    slug: "october-all-hands-2024",
    title: "October All-Hands Meeting",
    date: "2024-10-11",
    start: "15:00",
    end: "16:00",
    location: "TXA 401",
    summary:
      "New leaders, Stock Pitch Competition D-Day, and the SME CDC Career Resource Meeting.",
    description:
      "A shortened one-hour meeting, after which members attended SME CDC’s Career Resource Meeting together, a source of information for international students looking for internships and jobs in China and Hong Kong. The meeting also covered buying your first stock.",
    agenda: [
      "New Leaders Introduction",
      "InvestSync AY24-25 Stock Pitch Competition D-Day",
      "Where to Get Started with Your Investment Journey",
      "CDC Career Resource Meeting",
    ],
  }),
  ev({
    slug: "september-wrap-up-2024",
    title: "September Wrap-Up Meeting",
    date: "2024-09-27",
    start: "16:00",
    end: "18:00",
    location: "TxC-402",
    summary:
      "Stock analysis basics, Jeopardy, and a guest speaker on picking the right stock.",
    description:
      "The last meeting of September: the most important aspects of investing and the basics of analysing a stock, InvestSync Jeopardy, a guest speaker, and sign-up for the Stock Pitch Competition.",
    agenda: [
      "The Most Important Aspects of Investment and the Basics of Analysing a Stock",
      "InvestSync Jeopardy!",
      "Guest Speaker: “How to Pick the Right Stock: High Quality, Low Price, and Synergy”",
      "Stock Pitch Competition Sign-up",
    ],
  }),
  ev({
    slug: "september-all-hands-2024",
    title: "September All-Hands Meeting",
    date: "2024-09-20",
    start: "16:00",
    end: "18:00",
    location: "TA-302",
    summary:
      "The first all-hands of the year: icebreakers, open leadership roles and a first look at stock pitching.",
    description:
      "The first all-hands meeting of the year, welcoming new members and returning ones. It announced the open AY2024/25 leadership roles, introduced the basics of a stock pitch with a group analysis activity, and walked through what to do before buying your first stock.",
    agenda: [
      "Icebreaking Activity for New and Returning Members",
      "Announcement of Open AY2024/25 Leadership Roles",
      "Basics of a Stock Pitch and a Group Stock Analysis Activity",
      "Before You Buy Your First Stock: Setting Up a Brokerage Account",
    ],
  }),
];
