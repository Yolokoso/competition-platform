"use client";

import { useEffect, useState } from "react";

type Props = {
  competitionTitle: string;
  onUnlocked: () => void;
};

/**
 * OGAds Content Locker integration
 *
 * TWO WAYS TO CONNECT:
 *
 * 1) DIRECT LINK (easiest)
 *    - In OGAds, create a locker and set Unlock Action = Redirect
 *    - Redirect URL: https://yourdomain.com/competitions/YOUR-SLUG?unlocked=1
 *    - Put the locker URL in NEXT_PUBLIC_OGADS_LOCKER_URL
 *
 * 2) JAVASCRIPT OVERLAY
 *    - Paste OGAds script in app/layout.tsx <head>
 *    - Set locker Load Method to "JavaScript" / onClick
 *    - Button calls window.call_locker() or window.og_load()
 *    - For unlock detection with JS mode, still use ?unlocked=1 redirect
 *      or a custom unlock callback if OGAds supports it for your locker
 */
export default function ContentLocker({ competitionTitle, onUnlocked }: Props) {
  const [loading, setLoading] = useState(false);

  // Check if user returned from OGAds with ?unlocked=1
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("unlocked") === "1") {
      onUnlocked();
      // Clean the URL so refresh doesn't re-trigger oddly
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [onUnlocked]);

  const lockerUrl = process.env.NEXT_PUBLIC_OGADS_LOCKER_URL;

  // METHOD 1: Direct link to OGAds locker
  const handleDirectLocker = () => {
    if (!lockerUrl) {
      alert(
        "OGAds locker URL not set. Add NEXT_PUBLIC_OGADS_LOCKER_URL in your .env.local or Vercel env vars."
      );
      return;
    }
    setLoading(true);
    // Send user to OGAds locker. After they complete offers,
    // OGAds should redirect them back to this page with ?unlocked=1
    window.location.href = lockerUrl;
  };

  // METHOD 2: JavaScript overlay (script must be in layout head)
  const handleJsLocker = () => {
    setLoading(true);
    // OGAds docs use call_locker() or og_load() depending on version
    const w = window as any;
    if (typeof w.call_locker === "function") {
      w.call_locker();
    } else if (typeof w.og_load === "function") {
      w.og_load();
    } else {
      setLoading(false);
      alert(
        "OGAds script not loaded. Paste their JavaScript into app/layout.tsx <head>, and set locker Load Method to JavaScript/onClick."
      );
    }
  };

  // DEMO only – remove once real OGAds is connected
  const handleDemoUnlock = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUnlocked();
    }, 1200);
  };

  const hasRealLocker = Boolean(lockerUrl);

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
              Demo mode. Set <code>NEXT_PUBLIC_OGADS_LOCKER_URL</code> to your OGAds
              locker link, or paste their script into the site head.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
