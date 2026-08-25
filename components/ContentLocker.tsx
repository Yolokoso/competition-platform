"use client";

import { useEffect, useState } from "react";

type Props = {
  competitionTitle: string;
  onUnlocked: () => void;
  /** Per-competition OGAds locker URL. Falls back to NEXT_PUBLIC_OGADS_LOCKER_URL */
  lockerUrl?: string;
};

/**
 * OGAds Content Locker integration
 *
 * RECOMMENDED METHOD: Direct Link + Redirect
 * 1. In OGAds create a content locker
 * 2. Set Unlock Action = Redirect
 * 3. Redirect URL example:
 *    https://yourdomain.com/competitions/amazon-100-gift-card?unlocked=1
 * 4. Put the locker link in competitions.json as "lockerUrl"
 *    OR set NEXT_PUBLIC_OGADS_LOCKER_URL as a global fallback
 *
 * ALTERNATE: JavaScript overlay
 * - Paste OGAds script in app/layout.tsx <head>
 * - Set locker Load Method to JavaScript / onClick
 * - Button calls window.call_locker() or window.og_load()
 */
export default function ContentLocker({
  competitionTitle,
  onUnlocked,
  lockerUrl,
}: Props) {
  const [loading, setLoading] = useState(false);

  // Returned from OGAds redirect with ?unlocked=1
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("unlocked") === "1") {
      onUnlocked();
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [onUnlocked]);

  const resolvedLockerUrl =
    lockerUrl || process.env.NEXT_PUBLIC_OGADS_LOCKER_URL || "";

  const handleDirectLocker = () => {
    if (!resolvedLockerUrl) {
      alert(
        "No OGAds locker URL set. Add lockerUrl in data/competitions.json for this competition, or set NEXT_PUBLIC_OGADS_LOCKER_URL in env."
      );
      return;
    }
    setLoading(true);
    window.location.href = resolvedLockerUrl;
  };

  const handleJsLocker = () => {
    setLoading(true);
    const w = window as any;
    if (typeof w.call_locker === "function") {
      w.call_locker();
    } else if (typeof w.og_load === "function") {
      w.og_load();
    } else {
      setLoading(false);
      alert(
        "OGAds script not loaded. Paste their JavaScript into app/layout.tsx <head>."
      );
    }
  };

  // DEMO only
  const handleDemoUnlock = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUnlocked();
    }, 1200);
  };

  const hasRealLocker = Boolean(resolvedLockerUrl);

  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-900">Unlock Free Entry</h3>
      <p className="mt-2 text-sm text-slate-600">
        Complete a short offer below to unlock your free entry for{" "}
        <strong>{competitionTitle}</strong>.
      </p>

      <div className="mt-6 space-y-3">
        {hasRealLocker ? (
          <button
            onClick={handleDirectLocker}
            disabled={loading}
            className="w-full rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Opening offers..." : "Complete Offer to Unlock"}
          </button>
        ) : (
          <>
            <button
              onClick={handleDemoUnlock}
              disabled={loading}
              className="w-full rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? "Checking offers..." : "Complete Offer to Unlock (Demo)"}
            </button>
            <button
              onClick={handleJsLocker}
              disabled={loading}
              className="w-full rounded-xl border border-brand-400 bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-60"
            >
              Try JS Locker (if script installed)
            </button>
            <p className="text-xs text-slate-500">
              Demo mode. Add <code>lockerUrl</code> in competitions.json or set{" "}
              <code>NEXT_PUBLIC_OGADS_LOCKER_URL</code>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
