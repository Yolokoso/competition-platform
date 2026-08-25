import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCompetitionBySlug,
  getActiveCompetitions,
} from "@/lib/competitions";
import CompetitionClient from "./CompetitionClient";
import CountdownTimer from "@/components/CountdownTimer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const competitions = getActiveCompetitions();
  return competitions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = getCompetitionBySlug(slug);
  if (!comp) return { title: "Competition not found" };

  return {
    title: comp.title,
    description: comp.shortDescription,
    openGraph: {
      title: comp.title,
      description: comp.shortDescription,
      type: "website",
    },
  };
}

export default async function CompetitionPage({ params }: Props) {
  const { slug } = await params;
  const competition = getCompetitionBySlug(slug);

  if (!competition || !competition.active) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      {/* Status badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Active Competition
      </div>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {competition.title}
      </h1>

      <p className="mt-3 text-lg text-slate-600 leading-relaxed">
        {competition.description}
      </p>

      {/* Prize + Entries */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Prize</div>
          <div className="mt-1 font-bold text-brand-700">{competition.prize}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Entries</div>
          <div className="mt-1 font-bold text-slate-900">
            {competition.entryCount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Countdown - creates urgency */}
      <div className="mt-8 mb-8">
        <CountdownTimer endDate={competition.endDate} size="lg" />
      </div>

      {/* Locker → Form flow */}
      <CompetitionClient competition={competition} />

      {/* Rules */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-slate-900">Official Rules</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {competition.rules.map((rule, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand-500 font-bold">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
