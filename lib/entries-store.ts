import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type Entry = {
  id: string;
  competitionId: string;
  competitionTitle: string;
  name: string;
  email: string;
  createdAt: string;
};

/**
 * SQLite database lives as a local file on the server.
 * Nothing is exposed to the public internet — only your Node process reads/writes it.
 *
 * Works on: local, Railway, Render, VPS, Docker
 * Does NOT work on: Vercel serverless (read-only / ephemeral filesystem)
 */
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "entries.db");

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY,
      competition_id TEXT NOT NULL,
      competition_title TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_entries_created_at
      ON entries (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_entries_email
      ON entries (email);
  `);

  return db;
}

function rowToEntry(row: {
  id: string;
  competition_id: string;
  competition_title: string;
  name: string;
  email: string;
  created_at: string;
}): Entry {
  return {
    id: row.id,
    competitionId: row.competition_id,
    competitionTitle: row.competition_title,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
  };
}

export function getEntries(): Entry[] {
  const database = getDb();
  const rows = database
    .prepare(
      `SELECT id, competition_id, competition_title, name, email, created_at
       FROM entries
       ORDER BY created_at DESC`
    )
    .all() as Array<{
    id: string;
    competition_id: string;
    competition_title: string;
    name: string;
    email: string;
    created_at: string;
  }>;

  return rows.map(rowToEntry);
}

export function addEntry(
  input: Omit<Entry, "id" | "createdAt">
): Entry {
  const database = getDb();
  const entry: Entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    competitionId: input.competitionId,
    competitionTitle: input.competitionTitle,
    name: input.name,
    email: input.email,
  };

  database
    .prepare(
      `INSERT INTO entries (id, competition_id, competition_title, name, email, created_at)
       VALUES (@id, @competitionId, @competitionTitle, @name, @email, @createdAt)`
    )
    .run(entry);

  return entry;
}
