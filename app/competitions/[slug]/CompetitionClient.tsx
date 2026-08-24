"use client";

import { useState } from "react";
import ContentLocker from "@/components/ContentLocker";
import EntryForm from "@/components/EntryForm";
import type { Competition } from "@/lib/competitions";

type Props = {
  competition: Competition;
};

export default function CompetitionClient({ competition }: Props) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="space-y-6">
      {!unlocked ? (
        <ContentLocker
          competitionTitle={competition.title}
          onUnlocked={() => setUnlocked(true)}
        />
      ) : (
        <EntryForm
          competitionId={competition.id}
          competitionTitle={competition.title}
        />
      )}
    </div>
  );
}
