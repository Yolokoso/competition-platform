"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: string;
  competitionId: string;
  competitionTitle: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function AdminEntriesPage() {
  const [key, setKey] = useState("");
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEntries = async (adminKey: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/entries?key=${encodeURIComponent(adminKey)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unauthorized");
      setEntries(data.entries || []);
    } catch (err) {
      setEntries(null);
      setError(err instanceof Error ? err.message : "Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("admin_key") : null;
    if (saved) {
      setKey(saved);
      loadEntries(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_key", key);
    loadEntries(key);
  };

  const downloadCsv = () => {
    if (!entries?.length) return;
    const header = "id,competitionTitle,name,email,createdAt\n";
    const rows = entries
      .map((e) =>
        [e.id, e.competitionTitle, e.name, e.email, e.createdAt]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `entries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Entry Admin</h1>
      <p className="mt-2 text-slate-600">
        View all emails collected from competition entries. Protected by ADMIN_KEY.
      </p>

      <form onSubmit={handleLogin} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700"
        >
          {loading ? "Loading..." : "Load entries"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {entries && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">{entries.length} total entries</p>
            <button
              onClick={downloadCsv}
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Competition</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{e.competitionTitle}</td>
                    <td className="px-4 py-3">{e.name}</td>
                    <td className="px-4 py-3 font-medium">{e.email}</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                      No entries yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
