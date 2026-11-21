import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturedEventCard } from "@/components/EventCard";
import { PageBanner } from "@/components/PageBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { getEvents } from "@/lib/data";
import type { ClubEvent } from "@/lib/types";
import { academicYearOf, formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };
export const revalidate = 3600;

/** Groups events (already newest first) by academic year, e.g. "2026/27". */
function groupByAcademicYear(events: ClubEvent[]) {
  const groups = new Map<string, ClubEvent[]>();
  for (const e of events) {
    const ay = academicYearOf(e.startsAt);
    groups.set(ay, [...(groups.get(ay) ?? []), e]);
  }
  return [...groups.entries()];
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      <PageBanner title="Events" subtitle="Workshops, talks and socials from InvestSync." image="/images/events/e1.jpg" />

      <section aria-labelledby="upcoming" className="container-page py-16 sm:py-20">
        <SectionHeading id="upcoming">Upcoming</SectionHeading>
        <div className="mt-10 space-y-6">
          {upcoming.length === 0 ? (
            <p className="border border-line p-8 text-center text-lg text-muted">
              No upcoming events yet. New events are announced on our social channels.
            </p>
          ) : (
            upcoming.map((e) => <FeaturedEventCard key={e.id} event={e} />)
          )}
        </div>
      </section>

      <section aria-labelledby="past" className="border-t border-line bg-mist/50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="past">Past events</SectionHeading>
          {past.length === 0 ? (
            <p className="mt-10 text-center text-lg text-muted">Nothing here yet.</p>
          ) : (
            <div className="mx-auto mt-12 max-w-3xl">
              {groupByAcademicYear(past).map(([year, items]) => (
                <div key={year} className="mb-14 last:mb-0">
                  <h3 className="mb-6 text-2xl font-semibold text-brand">
                    Academic Year {year}
                    <span className="ml-2 text-base font-normal text-muted">
                      · {items.length} {items.length === 1 ? "event" : "events"}
                    </span>
                  </h3>
                  <ol className="relative space-y-8 border-l-2 border-ink/15 pl-6 sm:pl-8">
                    {items.map((e) => (
                      <li key={e.id} className="relative">
                        <span aria-hidden className="absolute top-2 -left-[calc(1.5rem+7px)] size-3 rounded-full border-2 border-paper bg-ink sm:-left-[calc(2rem+7px)]" />
                        <article className="group relative flex flex-col gap-4 sm:flex-row">
                          {e.coverUrl && (
                            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-mist sm:w-48">
                              <Image src={e.coverUrl} alt="" fill sizes="(min-width: 640px) 12rem, 100vw" className="object-cover" />
                            </div>
                          )}
                          <div>
                            <time dateTime={e.startsAt} className="text-sm tracking-wide text-muted uppercase">
                              {formatDate(e.startsAt)}
                            </time>
                            <h4 className="text-2xl leading-snug font-semibold group-hover:text-brand">
                              <Link href={`/events/${e.slug}`} className="after:absolute after:inset-0">
                                {e.title}
                              </Link>
                            </h4>
                            <p className="mt-1 text-muted">{e.summary}</p>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
