import Image from "next/image";

/** Dark image banner at the top of inner pages, like "MEET THE TEAM" on the old site. */
export function PageBanner({
  title,
  subtitle,
  image = "/images/brand/hero-bull.jpg",
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-center opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-black/60" />
      <div className="container-page py-16 text-center sm:py-24">
        <h1 className="text-4xl font-semibold tracking-[0.08em] uppercase sm:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-lg text-white/85 sm:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
