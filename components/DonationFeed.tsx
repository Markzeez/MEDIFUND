"use client";
import { Donation, formatAddress, timeAgo } from "@/lib/mockData";

interface DonationFeedProps {
  donations: Donation[];
}

export default function DonationFeed({ donations }: DonationFeedProps) {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>
          Recent Donations
        </h3>
        <span className="tag text-xs" style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent2)", border: "1px solid rgba(99,102,241,0.2)" }}>
          {donations.length} total
        </span>
      </div>

      <div className="space-y-1" style={{ maxHeight: "340px", overflowY: "auto", paddingRight: "4px" }}>
        {donations.map((d, i) => (
          <div
            key={d.id}
            className="tx-item"
            style={{
              animation: `fadeUp 0.4s ease ${i * 0.05}s both`,
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: "10px",
              background: `hsl(${parseInt(d.id) * 47}, 60%, 25%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", flexShrink: 0,
            }}>
              {d.donor === "Anonymous" ? "🕵️" : "🏥"}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium truncate">{formatAddress(d.donor)}</span>
                <span style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: "var(--success)",
                  fontSize: "14px",
                  flexShrink: 0,
                }}>
                  +${d.amountUsd.toLocaleString()}
                </span>
              </div>
              {d.message && (
                <p className="text-xs truncate" style={{ color: "var(--muted)", marginTop: "2px" }}>
                  "{d.message}"
                </p>
              )}
              <p className="text-xs" style={{ color: "var(--muted)", marginTop: "2px" }}>
                {timeAgo(d.timestamp)} · {d.amount} ETH
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
