import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Competition not found</h1>
      <p className="mt-3 text-slate-600">
        This competition may have ended or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
      >
        View all competitions
      </Link>
    </div>
  );
}
