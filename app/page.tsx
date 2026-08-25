import Link from "next/link";
import { getActiveCompetitions, formatEndDate } from "@/lib/competitions";

export default function HomePage() {
  const competitions = getActiveCompetitions();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live competitions running now
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
            Win Real Prizes.
            <br />
            <span className="text-blue-200">Enter Completely Free.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Gift cards, gadgets, premium tools and more.
            New free competitions added every week. No purchase necessary.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#competitions"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-lg shadow-black/20 transition hover:bg-blue-50 hover:scale-105"
            >
              Browse Competitions
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-blue-100/90">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free to enter
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Real prizes awarded
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Random winner selection
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Grid */}
      <section id="competitions" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Active Competitions
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Pick one and enter in under a minute
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {competitions.map((comp) => (
            <Link
              key={comp.id}
              href={`/competitions/${comp.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-brand-300"
            >
              {/* Colored top accent */}
              <div className="h-2 w-full bg-gradient-to-r from-brand-500 to-indigo-500" />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
                    {comp.title}
                  </h3>
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {comp.shortDescription}
                </p>

                <div className="mt-6 flex-1" />

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Prize
                  </div>
                  <div className="mt-1 text-lg font-bold text-brand-700">
                    {comp.prize}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ends {formatEndDate(comp.endDate)}
                  </div>
                  <div className="font-medium text-slate-700">
                    {comp.entryCount.toLocaleString()} entries
                  </div>
                </div>

                <div className="mt-5">
                  <span className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition group-hover:bg-brand-700">
                    Enter Free
                    <svg className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {competitions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-slate-500">No active competitions right now.</p>
            <p className="mt-2 text-slate-400">Check back soon — new ones are added regularly.</p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Ready to win something awesome?
          </h2>
          <p className="mt-3 text-slate-600">
            It only takes a minute to enter. Good luck!
          </p>
          <a
            href="#competitions"
            className="mt-8 inline-flex items-center rounded-2xl bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-700 hover:scale-105"
          >
            View All Competitions
          </a>
        </div>
      </section>
    </div>
  );
}
