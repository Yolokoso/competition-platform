import competitionsData from "@/data/competitions.json";

export type Competition = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  prize: string;
  prizeValue: number;
  endDate: string;
  entryCount: number;
  image: string;
  active: boolean;
  rules: string[];
};

export function getAllCompetitions(): Competition[] {
  return competitionsData as Competition[];
}

export function getActiveCompetitions(): Competition[] {
  return getAllCompetitions().filter((c) => c.active);
}

export function getCompetitionBySlug(slug: string): Competition | undefined {
  return getAllCompetitions().find((c) => c.slug === slug);
}

export function formatEndDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
