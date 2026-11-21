// Dates are always shown in China time, whatever the visitor's machine says.
const TZ = "Asia/Shanghai";

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export function formatTimeRange(start: string, end: string | null): string {
  return end ? `${formatTime(start)}–${formatTime(end)}` : formatTime(start);
}

/** Parts for a calendar-style date badge. */
export function dateBadge(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso);
  const part = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...o }).format(d);
  return {
    day: part({ day: "numeric" }),
    month: part({ month: "short" }).toUpperCase(),
    year: part({ year: "numeric" }),
  };
}

/**
 * Academic year an event belongs to, e.g. "2026/27".
 * A new year starts in August (China time).
 */
export function academicYearOf(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date(iso));
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value);
  const start = month >= 8 ? year : year - 1;
  return `${start}/${String((start + 1) % 100).padStart(2, "0")}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}
