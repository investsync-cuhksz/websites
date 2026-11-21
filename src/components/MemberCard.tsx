import Image from "next/image";
import type { TeamMember } from "@/lib/types";
import { initials } from "@/lib/format";
import { LinkedInIcon } from "./icons";

export function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={`Photo of ${member.name}`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="grid h-full place-items-center bg-gradient-to-br from-navy to-navy-2 text-4xl font-semibold tracking-wider text-white/90 sm:text-5xl"
          >
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 pt-3">
        <div className="min-w-0">
          <h3 className="text-base leading-snug font-semibold tracking-[0.08em] uppercase sm:text-lg">
            {member.name}
          </h3>
          <p className="text-base font-semibold text-brand">{member.role}</p>
        </div>
        {member.linkedinUrl && (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center text-ink transition-colors hover:text-brand"
          >
            <LinkedInIcon className="size-[1.1rem]" />
          </a>
        )}
      </div>
    </article>
  );
}
