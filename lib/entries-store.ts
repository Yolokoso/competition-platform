import { promises as fs } from "fs";
import path from "path";

export type Entry = {
  id: string;
  competitionId: string;
  competitionTitle: string;
  name: string;
  email: string;
  createdAt: string;
};

const ENTRIES_PATH = path.join(process.cwd(), "data", "entries.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(ENTRIES_PATH);
  } catch {
    await fs.mkdir(path.dirname(ENTRIES_PATH), { recursive: true });
    await fs.writeFile(ENTRIES_PATH, "[]", "utf8");
  }
}

export async function getEntries(): Promise<Entry[]> {
  await ensureFile();
  const raw = await fs.readFile(ENTRIES_PATH, "utf8");
  try {
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

export async function addEntry(
  input: Omit<Entry, "id" | "createdAt">
): Promise<Entry> {
  const entries = await getEntries();

  const entry: Entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };

  entries.unshift(entry);
  await fs.writeFile(ENTRIES_PATH, JSON.stringify(entries, null, 2), "utf8");
  return entry;
}
