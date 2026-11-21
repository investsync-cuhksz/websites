import type { SiteSettings } from "@/lib/types";
import { InstagramIcon, LinkedInIcon, MailIcon } from "./icons";

export function SocialLinks({
  social,
  className = "",
}: {
  social: SiteSettings["social"];
  className?: string;
}) {
  const links = [
    social.linkedin && { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    social.email && { href: `mailto:${social.email}`, label: "Email", Icon: MailIcon },
    social.instagram && { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof MailIcon }[];

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="grid size-11 place-items-center transition-colors"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
