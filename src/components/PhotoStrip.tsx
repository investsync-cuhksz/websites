import Image from "next/image";

/**
 * Horizontally scrolling photo strip (the old site's sliding gallery),
 * done with CSS scroll-snap so it needs no JavaScript and swipes on phones.
 */
export function PhotoStrip({ photos, label }: { photos: string[]; label: string }) {
  if (photos.length === 0) return null;
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-6"
    >
      {photos.map((src, i) => (
        <div
          key={src + i}
          className="relative aspect-[3/2] w-[82%] shrink-0 snap-center overflow-hidden bg-mist sm:w-[55%] lg:w-[40%]"
        >
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 55vw, 82vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
