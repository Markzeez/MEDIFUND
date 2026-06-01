"use client";
import { useState } from "react";
import { ConnectButton, useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareTransaction, toWei } from "thirdweb";
import { client, chain, FUND_CONTRACT_ADDRESS } from "@/lib/thirdweb";

const PRESETS = [25, 50, 100, 250];
const ETH_PRICE = 3080; // mock; in production fetch from oracle/coingecko

interface DonatePanelProps {
  onDonate: (amountUsd: number, message: string, donor: string) => void;
}

export default function DonatePanel({ onDonate }: DonatePanelProps) {
  const account = useActiveAccount();
  const { mutate: sendTx, isPending } = useSendTransaction();
  const [usdAmount, setUsdAmount] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [success, setSuccess] = useState(false);

  const ethAmount = usdAmount ? (parseFloat(usdAmount) / ETH_PRICE).toFixed(6) : "0";

  async function handleDonate() {
    if (!account || !usdAmount) return;
    const eth = parseFloat(usdAmount) / ETH_PRICE;
    const tx = prepareTransaction({
      to: FUND_CONTRACT_ADDRESS,
      chain,
      client,
      value: toWei(eth.toFixed(18)),
    });
    sendTx(tx, {
      onSuccess: () => {
        onDonate(
          parseFloat(usdAmount),
          message,
          anonymous ? "Anonymous" : (account.address || "Unknown")
        );
        setUsdAmount("");
        setMessage("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      },
    });
  }

  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>
          Make a Donation
        </h3>
        <div className="flex items-center gap-2">
          <div className="pulse-dot" />
          <span className="text-xs" style={{ color: "var(--success)" }}>Live</span>
        </div>
      </div>

      {/* Wallet connection */}
      <div className="connect-btn-wrapper">
        <ConnectButton client={client} chain={chain} />
      </div>

      {account && (
        <>
          {/* Preset amounts */}
          <div>
            <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>Quick Select</p>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setUsdAmount(p.toString())}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    border: `1px solid ${usdAmount === p.toString() ? "var(--accent)" : "var(--border)"}`,
                    background: usdAmount === p.toString() ? "rgba(56,189,248,0.1)" : "var(--surface2)",
                    color: usdAmount === p.toString() ? "var(--accent)" : "var(--text)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  ${p}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>Custom Amount (USD)</p>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>$</span>
              <input
                className="input-field"
                style={{ paddingLeft: "28px" }}
                type="number"
                min="1"
                placeholder="Enter amount"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
              />
            </div>
            {usdAmount && (
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                ≈ {ethAmount} ETH
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: "var(--muted)" }}>Message (optional)</p>
            <textarea
              className="input-field"
              rows={2}
              placeholder="Leave a word of support..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: "none" }}
            />
          </div>

          {/* Anonymous toggle */}
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div
              onClick={() => setAnonymous(!anonymous)}
              style={{
                width: "40px", height: "22px", borderRadius: "100px",
                background: anonymous ? "var(--accent2)" : "var(--surface2)",
                border: "1px solid var(--border)",
                transition: "background 0.2s",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute", top: "2px",
                left: anonymous ? "20px" : "2px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: "white", transition: "left 0.2s",
              }} />
            </div>
            <span className="text-sm" style={{ color: "var(--muted)" }}>Donate anonymously</span>
          </label>

          <button
            className="btn-primary w-full"
            disabled={!usdAmount || parseFloat(usdAmount) <= 0 || isPending}
            onClick={handleDonate}
          >
            {isPending ? "Confirming on chain…" : `Donate $${usdAmount || "0"}`}
          </button>

          {success && (
            <div style={{
              background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: "10px", padding: "12px 16px",
              color: "var(--success)", fontSize: "14px", textAlign: "center",
            }}>
              ✓ Transaction sent! Thank you for your support.
            </div>
          )}
        </>
      )}

      {!account && (
        <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
          Connect your wallet above to donate
        </p>
      )}
    </div>
  );
}
