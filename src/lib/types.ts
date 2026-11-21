// Shapes of the records the public pages read.
// These mirror the database tables we expect; keep them in sync with the
// schema once the DB is chosen (see README → "Swapping in the database").

export type Department = {
  id: string;
  name: string;
  /** Lower comes first on the Team page. */
  order: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  /** Path or URL to a photo. Null shows initials instead. */
  photoUrl: string | null;
  linkedinUrl: string | null;
  /** Lower comes first inside a department. */
  order: number;
  /** Only active members are shown. */
  active: boolean;
};

export type ClubEvent = {
  id: string;
  slug: string;
  title: string;
  /** ISO 8601 with timezone offset, e.g. 2026-12-05T19:00:00+08:00 */
  startsAt: string;
  endsAt: string | null;
  /**
   * True when only the date is known. Times are then stored as the whole day
   * (00:00–23:59) so the event stays "upcoming" all day, and pages show
   * "Time to be announced" instead of a time.
   */
  timeTba: boolean;
  location: string;
  /** One-line teaser shown on cards. */
  summary: string;
  /** Full description; paragraphs separated by a blank line. */
  description: string;
  /** Agenda items in order; empty if none. */
  agenda: string[];
  coverUrl: string | null;
  photoUrls: string[];
  /** Optional sign-up / registration link for upcoming events. */
  registrationUrl: string | null;
  published: boolean;
};

/**
 * Article preview used by the Home page.
 * Owned by the articles feature (Jason); only the fields Home needs.
 */
export type ArticlePreview = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  publishedAt: string;
  coverUrl: string | null;
  excerpt: string;
};

export type SiteSettings = {
  tagline: string;
  intro: string[];
  mission: { title: string; description: string }[];
  joinUrl: string;
  /** Photos for the Home page "What we do" strip. */
  gallery: string[];
  social: { linkedin: string | null; instagram: string | null; email: string | null };
};
