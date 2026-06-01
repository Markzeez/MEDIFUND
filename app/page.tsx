"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MOCK_DONATIONS, CAMPAIGN_GOAL, Donation } from "@/lib/mockData";
import StatsBar from "@/components/StatsBar";
import BudgetBreakdown from "@/components/BudgetBreakdown";
import DonationFeed from "@/components/DonationFeed";
import PatientCard from "@/components/PatientCard";

// Lazy load panel requiring wallet (client-only)
const DonatePanel = dynamic(() => import("@/components/DonatePanel"), { ssr: false });
const Providers = dynamic(() => import("@/components/ThirdwebProvider"), { ssr: false });

export default function Home() {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);

  const raised = donations.reduce((s, d) => s + d.amountUsd, 0);

  function handleNewDonation(amountUsd: number, message: string, donor: string) {
    const newDonation: Donation = {
      id: Date.now().toString(),
      donor,
      amount: parseFloat((amountUsd / 3080).toFixed(4)),
      amountUsd,
      timestamp: new Date(),
      message: message || undefined,
      txHash: "0x" + Math.random().toString(16).slice(2, 10),
    };
    setDonations((prev) => [newDonation, ...prev]);
  }

  return (
    <Providers>
      <div className="noise-bg" />
      {/* Ambient orbs */}
      <div className="glow-orb" style={{ width: 500, height: 500, top: "-150px", left: "-100px", background: "rgba(99,102,241,0.08)" }} />
      <div className="glow-orb" style={{ width: 400, height: 400, bottom: "-100px", right: "-80px", background: "rgba(56,189,248,0.06)" }} />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {/* ── NAV ── */}
        <nav style={{
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
          background: "rgba(4,6,15,0.7)",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="flex items-center gap-3">
              <div style={{
                width: 36, height: 36, borderRadius: "10px",
                background: "linear-gradient(135deg, var(--accent2), var(--accent))",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              }}>
                🫀
              </div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.15rem" }}>MediFund</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="tag hidden sm:inline-flex" style={{ background: "rgba(52,211,153,0.1)", color: "var(--success)", border: "1px solid rgba(52,211,153,0.2)", fontSize: "12px" }}>
                🔒 On-Chain Verified
              </span>
              <span className="tag hidden sm:inline-flex" style={{ background: "rgba(56,189,248,0.1)", color: "var(--accent)", border: "1px solid rgba(56,189,248,0.2)", fontSize: "12px" }}>
                Sepolia Testnet
              </span>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 24px" }}>
          <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent2)" }}>
              Medical Aid Campaign
            </p>
            <h1 style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 700,
              margin: "0 auto 16px",
            }}>
              Help Maria Get Her Heart Surgery
            </h1>
            <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Every contribution is recorded on the blockchain — transparent, traceable, and fully auditable.
              See exactly where funds go.
            </p>
          </div>

          {/* ── MAIN GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* Full-width stats */}
            <StatsBar
              raised={raised}
              goal={CAMPAIGN_GOAL}
              donorCount={donations.length}
              daysLeft={19}
            />

            {/* Two-col: Patient info + Donate */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              <PatientCard />
              <div className="space-y-5">
                <DonatePanel onDonate={handleNewDonation} />
              </div>
            </div>

            {/* Two-col: Budget + Feed */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              <BudgetBreakdown />
              <DonationFeed donations={donations} />
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", paddingTop: "40px", paddingBottom: "24px", borderTop: "1px solid var(--border)", marginTop: "32px" }}>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Powered by{" "}
              <span style={{ color: "var(--accent)" }}>thirdweb</span>
              {" "}·{" "}
              All transactions are public on Ethereum Sepolia testnet
              {" "}·{" "}
              <span style={{ color: "var(--accent2)" }}>MediFund</span> does not take platform fees
            </p>
          </div>
        </div>
      </div>
    </Providers>
  );
}
