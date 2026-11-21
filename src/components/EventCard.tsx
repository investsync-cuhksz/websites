import Image from "next/image";
import Link from "next/link";
import type { ClubEvent } from "@/lib/types";
import { dateBadge, formatDate, formatTimeRange } from "@/lib/format";
import { ArrowIcon, ClockIcon, PinIcon } from "./icons";

function DateBadge({ iso }: { iso: string }) {
  const { day, month } = dateBadge(iso);
  return (
    <div className="flex w-16 shrink-0 flex-col items-center border-2 border-ink bg-paper py-1.5 leading-none">
      <span className="text-xs font-semibold tracking-[0.15em] text-brand">{month}</span>
      <span className="mt-1 text-3xl font-semibold">{day}</span>
    </div>
  );
}

export function EventMeta({ event, className = "" }: { event: ClubEvent; className?: string }) {
  return (
    <ul className={`flex flex-col gap-1.5 text-base text-muted ${className}`}>
      <li className="flex items-center gap-2">
        <ClockIcon className="size-4 shrink-0" />
        <span>
          <time dateTime={event.startsAt.slice(0, event.timeTba ? 10 : undefined)}>
            {formatDate(event.startsAt)}
          </time>
          {" · "}
          {event.timeTba ? "Time to be announced" : formatTimeRange(event.startsAt, event.endsAt)}
        </span>
      </li>
      <li className="flex items-center gap-2">
        <PinIcon className="size-4 shrink-0" />
        <span>{event.location}</span>
      </li>
    </ul>
  );
}

/** Wide card for an upcoming event: image on the left on desktop, on top on mobile. */
export function FeaturedEventCard({ event }: { event: ClubEvent }) {
  return (
    <article className="group relative grid overflow-hidden border border-line bg-paper md:grid-cols-[1.1fr_1fr]">
      <div className="relative aspect-[16/10] bg-navy md:aspect-auto md:min-h-80">
        {/* Events without their own photo fall back to the brand hero image. */}
        <Image
          src={event.coverUrl ?? "/images/brand/hero-bull.jpg"}
          alt=""
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <DateBadge iso={event.startsAt} />
          <h3 className="text-2xl leading-tight font-semibold sm:text-3xl">
            <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
              {event.title}
            </Link>
          </h3>
        </div>
        <EventMeta event={event} />
        <p className="text-lg">{event.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 font-semibold text-brand">
          Event details <ArrowIcon />
        </span>
      </div>
    </article>
  );
}
