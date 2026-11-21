import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventMeta } from "@/components/EventCard";
import { ArrowIcon } from "@/components/icons";
import { getAllEventSlugs, getEventBySlug } from "@/lib/data";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllEventSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug((await params).slug);
  if (!event) notFound();

  const isUpcoming = new Date(event.endsAt ?? event.startsAt).getTime() >= Date.now();
  const gallery = event.photoUrls.filter((p) => p !== event.coverUrl);

  return (
    <article className="pb-20">
      {event.coverUrl && (
        <div className="relative aspect-[16/9] max-h-[60svh] w-full bg-mist sm:aspect-[21/9]">
          <Image src={event.coverUrl} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      )}

      <div className="container-page max-w-3xl pt-10">
        <Link href="/events" className="inline-flex items-center gap-2 text-base text-muted hover:text-brand">
          <ArrowIcon className="size-4 rotate-180" /> All events
        </Link>
        <p className="eyebrow mt-6">{isUpcoming ? "Upcoming event" : "Past event"}</p>
        <h1 className="mt-2 text-4xl leading-tight font-semibold sm:text-5xl">{event.title}</h1>
        <EventMeta event={event} className="mt-5 text-lg" />

        {isUpcoming && event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-ink px-6 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-brand"
          >
            Register
          </a>
        )}

        <div className="mt-8 space-y-5 text-lg sm:text-xl">
          {event.description.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {event.agenda.length > 0 && (
          <section aria-labelledby="agenda" className="mt-10 border-t border-line pt-8">
            <h2 id="agenda" className="text-2xl font-semibold tracking-[0.06em] uppercase">
              Agenda
            </h2>
            <ol className="mt-5 space-y-3">
              {event.agenda.map((item, i) => (
                <li key={i} className="flex gap-4 text-lg">
                  <span className="w-6 shrink-0 text-right font-semibold text-brand">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {gallery.length > 0 && (
        <section aria-label="Photos" className="container-page mt-14">
          <h2 className="mb-6 text-2xl font-semibold tracking-[0.06em] uppercase">Photos</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {gallery.map((src) => (
              <li key={src} className="relative aspect-[3/2] overflow-hidden bg-mist">
                <Image src={src} alt={`Photo from ${event.title}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
