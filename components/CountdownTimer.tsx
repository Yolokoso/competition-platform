"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function calculateTimeLeft(endDate: string): TimeLeft {
  const difference = new Date(endDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

type Props = {
  endDate: string;
  size?: "sm" | "md" | "lg";
};

export default function CountdownTimer({ endDate, size = "md" }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.total <= 0) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-center text-sm font-semibold text-red-700">
        This competition has ended
      </div>
    );
  }

  const isUrgent = timeLeft.days < 3;

  const boxClass =
    size === "lg"
      ? "min-w-[70px] px-3 py-3 text-2xl"
      : size === "sm"
      ? "min-w-[48px] px-2 py-1.5 text-sm"
      : "min-w-[58px] px-2.5 py-2 text-lg";

  const labelClass = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div className={`rounded-2xl p-4 ${isUrgent ? "bg-red-50 border border-red-200" : "bg-slate-50 border border-slate-200"}`}>
      <div className={`mb-2 text-center text-xs font-semibold uppercase tracking-wider ${isUrgent ? "text-red-600" : "text-slate-500"}`}>
        {isUrgent ? "Ending Soon!" : "Time Remaining"}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="text-center">
          <div className={`${boxClass} rounded-xl font-bold tabular-nums ${isUrgent ? "bg-red-100 text-red-800" : "bg-white text-slate-900 shadow-sm"}`}>
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className={`mt-1 font-medium ${labelClass} ${isUrgent ? "text-red-600" : "text-slate-500"}`}>Days</div>
        </div>

        <div className={`text-xl font-bold ${isUrgent ? "text-red-400" : "text-slate-300"}`}>:</div>

        <div className="text-center">
          <div className={`${boxClass} rounded-xl font-bold tabular-nums ${isUrgent ? "bg-red-100 text-red-800" : "bg-white text-slate-900 shadow-sm"}`}>
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className={`mt-1 font-medium ${labelClass} ${isUrgent ? "text-red-600" : "text-slate-500"}`}>Hours</div>
        </div>

        <div className={`text-xl font-bold ${isUrgent ? "text-red-400" : "text-slate-300"}`}>:</div>

        <div className="text-center">
          <div className={`${boxClass} rounded-xl font-bold tabular-nums ${isUrgent ? "bg-red-100 text-red-800" : "bg-white text-slate-900 shadow-sm"}`}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className={`mt-1 font-medium ${labelClass} ${isUrgent ? "text-red-600" : "text-slate-500"}`}>Mins</div>
        </div>

        <div className={`text-xl font-bold ${isUrgent ? "text-red-400" : "text-slate-300"}`}>:</div>

        <div className="text-center">
          <div className={`${boxClass} rounded-xl font-bold tabular-nums ${isUrgent ? "bg-red-100 text-red-800" : "bg-white text-slate-900 shadow-sm"}`}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className={`mt-1 font-medium ${labelClass} ${isUrgent ? "text-red-600" : "text-slate-500"}`}>Secs</div>
        </div>
      </div>
    </div>
  );
}
