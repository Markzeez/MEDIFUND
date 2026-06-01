"use client";
import { useState, useEffect } from "react";

interface BudgetItem {
  label: string;
  allocated: number;
  spent: number;
  color: string;
}

const BUDGET_ITEMS: BudgetItem[] = [
  { label: "Surgery & Procedure", allocated: 22000, spent: 14800, color: "#38bdf8" },
  { label: "Hospital Stay", allocated: 12000, spent: 9200, color: "#6366f1" },
  { label: "Medication", allocated: 6000, spent: 3100, color: "#34d399" },
  { label: "Rehabilitation", allocated: 5000, spent: 800, color: "#fb923c" },
  { label: "Home Care", allocated: 3000, spent: 0, color: "#a78bfa" },
  { label: "Miscellaneous", allocated: 2000, spent: 420, color: "#64748b" },
];

export default function BudgetBreakdown() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 600); }, []);

  const totalAllocated = BUDGET_ITEMS.reduce((s, i) => s + i.allocated, 0);
  const totalSpent = BUDGET_ITEMS.reduce((s, i) => s + i.spent, 0);

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>
          Budget Breakdown
        </h3>
        <span className="tag" style={{ background: "rgba(56,189,248,0.1)", color: "var(--accent)", border: "1px solid rgba(56,189,248,0.2)" }}>
          Medical Use
        </span>
      </div>

      <div className="space-y-3">
        {BUDGET_ITEMS.map((item) => {
          const pct = (item.spent / item.allocated) * 100;
          const remaining = item.allocated - item.spent;
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
                  <span style={{ color: item.color }}>
                    ${item.spent.toLocaleString()} spent
                  </span>
                  <span>/ ${item.allocated.toLocaleString()}</span>
                </div>
              </div>
              <div className="progress-bar" style={{ height: "6px" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "100px",
                    background: item.color,
                    width: mounted ? `${pct}%` : "0%",
                    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                    opacity: 0.85,
                  }}
                />
              </div>
              {remaining > 0 && (
                <p className="text-xs" style={{ color: "var(--muted)", paddingLeft: "16px" }}>
                  ${remaining.toLocaleString()} still needed
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        borderTop: "1px solid var(--border)", paddingTop: "16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <p className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Total Budget</p>
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
            ${totalAllocated.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Total Spent</p>
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--warn)" }}>
            ${totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider" style={{ color: "var(--muted)" }}>Unspent</p>
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--success)" }}>
            ${(totalAllocated - totalSpent).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
