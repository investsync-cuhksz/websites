import Image from "next/image";
import Link from "next/link";
import { FeaturedEventCard } from "@/components/EventCard";
import { BookIcon, BulbIcon, PeopleIcon, ArrowIcon } from "@/components/icons";
import { PhotoStrip } from "@/components/PhotoStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { getEvents, getLatestArticles, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";

// Re-render at most hourly so "next event" rolls over without a redeploy.
export const revalidate = 3600;

const MISSION_ICONS = [BookIcon, BulbIcon, PeopleIcon];

export default async function HomePage() {
  const [settings, articles, events] = await Promise.all([
    getSiteSettings(),
    getLatestArticles(3),
    getEvents(),
  ]);
  const nextEvent = events.upcoming[0] ?? null;
  const galleryPhotos = settings.gallery;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-black text-white sm:min-h-[80svh] sm:items-center">
        <Image
          src="/images/brand/hero-bull.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35" />
        <div className="container-page pb-14 sm:pb-0">
          <h1 className="text-5xl font-semibold tracking-[0.08em] sm:text-7xl lg:text-8xl">INVESTSYNC</h1>
          <p className="mt-3 text-lg tracking-[0.25em] uppercase text-white/90 sm:text-2xl">{settings.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={settings.joinUrl}
              className="bg-white px-6 py-2.5 text-lg font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
            >
              Join InvestSync
            </Link>
            <Link
              href="/research"
              className="border border-white/70 px-6 py-2.5 text-lg font-semibold transition-colors hover:bg-white/10"
            >
              Read our research
            </Link>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section aria-labelledby="who" className="container-page py-16 sm:py-24">
        <SectionHeading id="who">Who we are</SectionHeading>
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-lg sm:text-xl">
          {settings.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission" className="border-y border-line bg-mist/60 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading id="mission">Our mission</SectionHeading>
          <ul className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {settings.mission.map((item, i) => {
              const Icon = MISSION_ICONS[i % MISSION_ICONS.length]!;
              return (
                <li key={item.title} className="mx-auto max-w-xs text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-full border-2 border-ink">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-3xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-lg text-muted">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Next event */}
      <section aria-labelledby="next-event" className="container-page py-16 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading id="next-event" eyebrow="What's on" align="left">
            Next event
          </SectionHeading>
          <Link href="/events" className="inline-flex items-center gap-2 text-lg font-semibold text-brand hover:underline">
            All events <ArrowIcon />
          </Link>
        </div>
        <div className="mt-8">
          {nextEvent ? (
            <FeaturedEventCard event={nextEvent} />
          ) : (
            <p className="border border-line p-8 text-center text-lg text-muted">
              No upcoming events right now. Follow us to hear about the next one, or{" "}
              <Link href="/events#past" className="text-brand underline">see past events</Link>.
            </p>
          )}
        </div>
      </section>

      {/* Latest research */}
      <section aria-labelledby="latest" className="border-t border-line py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading id="latest" eyebrow="Research" align="left">
              Latest articles
            </SectionHeading>
            <Link href="/research" className="inline-flex items-center gap-2 text-lg font-semibold text-brand hover:underline">
              All research <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.id}>
                <article className="group relative flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {a.coverUrl && (
                      <Image
                        src={a.coverUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="eyebrow mt-4">{a.category}</p>
                  <h3 className="mt-1 text-2xl leading-snug font-semibold group-hover:text-brand">
                    <Link href={`/research/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted">{a.excerpt}</p>
                  <p className="mt-auto pt-3 text-sm text-muted">
                    {a.author} · <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery from past events */}
      {galleryPhotos.length > 0 && (
        <section aria-labelledby="gallery" className="pb-16 sm:pb-24">
          <div className="container-page mb-8">
            <SectionHeading id="gallery">What we do</SectionHeading>
          </div>
          <PhotoStrip photos={galleryPhotos} label="Photos from past InvestSync events" />
        </section>
      )}

      {/* Join CTA */}
      <section aria-labelledby="join" className="relative isolate overflow-hidden text-white">
        <Image src="/images/brand/shenzhen.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 to-navy-2/70" />
        <div className="container-page flex flex-col items-start gap-6 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="join" className="text-3xl font-semibold sm:text-4xl">
              CUHK(SZ)’s premier investment &amp; networking organization
            </h2>
            <p className="mt-2 text-lg text-white/85">Recruitment opens every term. Come build your track record with us.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={settings.joinUrl}
              className="bg-white px-6 py-2.5 text-lg font-semibold whitespace-nowrap text-ink transition-colors hover:bg-brand hover:text-white"
            >
              How to join
            </Link>
            <SocialLinks social={settings.social} className="text-white/85 hover:[&_a]:text-white" />
          </div>
        </div>
      </section>
    </>
  );
}