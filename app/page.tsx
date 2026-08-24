import Link from "next/link";
import { getActiveCompetitions, formatEndDate } from "@/lib/competitions";

export default function HomePage() {
  const competitions = getActiveCompetitions();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Free Competitions & Giveaways
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Enter for free. Win real prizes. New competitions added regularly.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((comp) => (
          <Link
            key={comp.id}
            href={`/competitions/${comp.slug}`}
            className="group block rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-300"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
                {comp.title}
              </h2>
              <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Active
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {comp.shortDescription}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-medium text-brand-600">{comp.prize}</span>
              <span className="text-slate-500">
                Ends {formatEndDate(comp.endDate)}
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              {comp.entryCount.toLocaleString()} entries so far
            </div>
          </Link>
        ))}
      </div>

      {competitions.length === 0 && (
        <p className="text-center text-slate-500">No active competitions right now. Check back soon.</p>
      )}
    </div>
  );
}
