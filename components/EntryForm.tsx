"use client";

import { useState } from "react";

type Props = {
  competitionId: string;
  competitionTitle: string;
};

export default function EntryForm({ competitionId, competitionTitle }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In production: send to your API / email service / Google Sheet / etc.
    // For now we just simulate success.
    await new Promise((r) => setTimeout(r, 800));

    console.log("New entry:", { competitionId, name, email });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <h3 className="text-lg font-semibold text-green-900">You're in!</h3>
        <p className="mt-2 text-sm text-green-800">
          Your entry for <strong>{competitionTitle}</strong> has been recorded.
          Good luck!
        </p>
        <p className="mt-4 text-xs text-green-700">
          We'll email the winner after the competition ends.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Complete Your Entry</h3>
      <p className="mt-1 text-sm text-slate-600">
        Just two fields – you're almost done.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="jane@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit My Free Entry"}
        </button>
      </div>
    </form>
  );
}
