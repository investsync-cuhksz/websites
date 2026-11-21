import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-footer text-white">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo tone="light" />
        <SocialLinks social={settings.social} className="text-white/85 hover:[&_a]:text-white" />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} InvestSync · The Chinese University of Hong Kong, Shenzhen</p>
          <p className="flex gap-5">
            <Link href="/team" className="hover:text-white">Team</Link>
            <Link href="/events" className="hover:text-white">Events</Link>
            <Link href={settings.joinUrl} className="hover:text-white">Join</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
