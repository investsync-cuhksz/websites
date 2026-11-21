/** Centered serif heading with the short rule underneath, as on the old site. */
export function SectionHeading({
  id,
  children,
  eyebrow,
  align = "center",
}: {
  id?: string;
  children: React.ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 id={id} className="scroll-mt-36 sm:scroll-mt-40 text-3xl font-semibold tracking-[0.06em] uppercase sm:text-[2.75rem] sm:leading-tight">
        {children}
      </h2>
      <span aria-hidden className={`mt-4 block h-0.5 w-12 bg-ink ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
