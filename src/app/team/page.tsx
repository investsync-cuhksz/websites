import type { Metadata } from "next";
import { MemberCard } from "@/components/MemberCard";
import { PageBanner } from "@/components/PageBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { getTeamByDepartment } from "@/lib/data";

export const metadata: Metadata = { title: "Team" };
export const revalidate = 3600;

export default async function TeamPage() {
  const departments = await getTeamByDepartment();

  return (
    <>
      <PageBanner title="Meet the Team" subtitle="The students who run InvestSync this year." />

      {departments.length > 1 && (
        <nav aria-label="Departments" className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur sm:top-[4.5rem]">
          <ul className="container-page no-scrollbar flex gap-6 overflow-x-auto py-3 text-base whitespace-nowrap">
            {departments.map((d) => (
              <li key={d.id}>
                <a href={`#${d.id}`} className="hover:text-brand">
                  {d.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="container-page py-16 sm:py-20">
        <SectionHeading id="board-of-directors">Board of Directors</SectionHeading>
        {departments.length === 0 && (
          <p className="mt-10 text-center text-lg text-muted">The team list is being updated. Check back soon.</p>
        )}
        <div className="mt-14 space-y-16 sm:space-y-20">
          {departments.map((d) => (
            <section key={d.id} aria-labelledby={d.id}>
              <h3
                id={d.id}
                className="scroll-mt-32 border-b border-line pb-3 text-center text-2xl font-semibold tracking-[0.08em] uppercase sm:scroll-mt-36 sm:text-3xl"
              >
                {d.name}
              </h3>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
                {d.members.map((m) => (
                  <li key={m.id}>
                    <MemberCard member={m} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
