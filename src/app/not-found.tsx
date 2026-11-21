import Image from "next/image";
import Link from "next/link";

// Shown for any URL without a page, including pages still being built
// (/research, /join, /archives).
export default function NotFound() {
  return (
    <section className="container-page py-16 text-center sm:py-20">
      <Image
        src="/images/brand/under-construction.webp"
        alt="Illustration of a website being built"
        width={580}
        height={460}
        priority
        className="mx-auto h-auto w-full max-w-sm sm:max-w-md"
      />
      <p className="eyebrow mt-8">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">This page isn’t here yet</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        It may still be under construction, or the link is out of date.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border-2 border-ink px-6 py-2 text-lg font-semibold hover:border-brand hover:bg-brand hover:text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
