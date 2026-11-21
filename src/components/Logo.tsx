import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="InvestSync home">
      <Image
        src="/images/brand/logo-icon.png"
        alt=""
        width={108}
        height={116}
        className={`h-9 w-auto sm:h-10 ${tone === "light" ? "brightness-0 invert" : ""}`}
        priority
      />
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="text-[1.35rem] font-semibold tracking-wide [font-variant:small-caps] sm:text-2xl">
          InvestSync
        </span>
        <span className="mt-0.5 text-[0.55rem] tracking-[0.12em] uppercase opacity-80 sm:text-[0.6rem]">
          Student Investment Organization
        </span>
      </span>
    </Link>
  );
}
