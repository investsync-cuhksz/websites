// Data access for the public pages.

// Every page reads through these functions, never from dummy.ts directly.
// When the database is ready, only the bodies below change: replace each
// dummy lookup with a query (Supabase, Prisma, etc.). Pages stay the same.

import type { ArticlePreview, ClubEvent, Department, SiteSettings, TeamMember } from "../types";
import * as dummy from "./dummy";
import { events as allEvents } from "./events";

export async function getSiteSettings(): Promise<SiteSettings> {
  return dummy.settings;
}

export type DepartmentWithMembers = Department & { members: TeamMember[] };

/** Active members grouped by department; empty departments are dropped. */
export async function getTeamByDepartment(): Promise<DepartmentWithMembers[]> {
  const depts = [...dummy.departments].sort((a, b) => a.order - b.order);
  const members = dummy.teamMembers.filter((m) => m.active);
  return depts
    .map((d) => ({
      ...d,
      members: members
        .filter((m) => m.departmentId === d.id)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((d) => d.members.length > 0);
}

function published(): ClubEvent[] {
  return allEvents.filter((e) => e.published);
}

/** An event is upcoming until it ends (or until its start if it has no end). */
function isUpcoming(e: ClubEvent, now: Date): boolean {
  return new Date(e.endsAt ?? e.startsAt).getTime() >= now.getTime();
}

export async function getEvents(now = new Date()): Promise<{
  upcoming: ClubEvent[];
  past: ClubEvent[];
}> {
  const all = published();
  const upcoming = all
    .filter((e) => isUpcoming(e, now))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const past = all
    .filter((e) => !isUpcoming(e, now))
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
  return { upcoming, past };
}

export async function getNextEvent(now = new Date()): Promise<ClubEvent | null> {
  const { upcoming } = await getEvents(now);
  return upcoming[0] ?? null;
}

export async function getEventBySlug(slug: string): Promise<ClubEvent | null> {
  return published().find((e) => e.slug === slug) ?? null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  return published().map((e) => e.slug);
}

/** Latest published articles for the Home page. Owned by the articles feature. */
export async function getLatestArticles(limit = 3): Promise<ArticlePreview[]> {
  return [...dummy.articlePreviews]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
