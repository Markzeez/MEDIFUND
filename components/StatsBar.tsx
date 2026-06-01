"use client";
import { useEffect, useState } from "react";

interface StatsBarProps {
  raised: number;
  goal: number;
  donorCount: number;
  daysLeft: number;
}

function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{current.toLocaleString()}{suffix}</span>;
}

export default function StatsBar({ raised, goal, donorCount, daysLeft }: StatsBarProps) {
  const pct = Math.min((raised / goal) * 100, 100);
  const remaining = Math.max(goal - raised, 0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 300); }, []);

  return (
    <div className="card p-6 space-y-6">
      {/* Header row */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>Total Raised</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1, color: "var(--accent)" }}>
            {mounted ? <AnimatedNumber target={raised} prefix="$" /> : "$0"}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>Goal</p>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: "1.8rem", fontWeight: 700 }}>${goal.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: mounted ? `${pct}%` : "0%" }} />
        </div>
        <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{pct.toFixed(1)}% funded</span>
          <span>${remaining.toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Donors", value: donorCount, suffix: "" },
          { label: "Remaining", value: remaining, prefix: "$" },
          { label: "Days Left", value: daysLeft, suffix: "d" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card text-center">
            <p style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)" }}>
              {mounted ? (
                <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              ) : (
                `${stat.prefix || ""}0${stat.suffix || ""}`
              )}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
