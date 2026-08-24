"use client";

import { useState } from "react";

type Props = {
  competitionTitle: string;
  onUnlocked: () => void;
};

/**
 * Placeholder for OGAds (or any CPA) content locker.
 * Replace the inner content with your real OGAds embed / script once you have an account.
 *
 * Typical flow:
 * 1. User clicks "Unlock Entry"
 * 2. OGAds locker shows offers
 * 3. After completion, call onUnlocked()
 */
export default function ContentLocker({ competitionTitle, onUnlocked }: Props) {
  const [loading, setLoading] = useState(false);

  // DEMO ONLY – remove this and plug in real OGAds locker
  const handleDemoUnlock = () => {
    setLoading(true);
    // Simulate offer completion delay
    setTimeout(() => {
      setLoading(false);
      onUnlocked();
    }, 1500);
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-slate-900">
        Unlock Free Entry
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Complete a short offer below to unlock your free entry for{" "}
        <strong>{competitionTitle}</strong>.
      </p>

      {/* 
        ============================================
        REPLACE THIS SECTION WITH YOUR OGADS LOCKER
        ============================================
        Example:
        <div id="ogads-locker" data-offer-id="YOUR_OFFER_ID"></div>
        + their script tag
      */}

      <div className="mt-6 space-y-3">
        <button
          onClick={handleDemoUnlock}
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Checking offers..." : "Complete Offer to Unlock (Demo)"}
        </button>
        <p className="text-xs text-slate-500">
          In production this button is replaced by the real OGAds content locker.
        </p>
      </div>
    </div>
  );
}
