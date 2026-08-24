import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCompetitionBySlug,
  getActiveCompetitions,
  formatEndDate,
} from "@/lib/competitions";
import CompetitionClient from "./CompetitionClient";

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
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          Active · Ends {formatEndDate(competition.endDate)}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {competition.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{competition.description}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="rounded-lg bg-slate-100 px-4 py-2">
            <span className="text-slate-500">Prize</span>
            <div className="font-semibold text-slate-900">{competition.prize}</div>
          </div>
          <div className="rounded-lg bg-slate-100 px-4 py-2">
            <span className="text-slate-500">Entries</span>
            <div className="font-semibold text-slate-900">
              {competition.entryCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <CompetitionClient competition={competition} />

      <div className="mt-10 rounded-xl border bg-slate-50 p-5">
        <h2 className="font-semibold text-slate-900">Official Rules</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {competition.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
