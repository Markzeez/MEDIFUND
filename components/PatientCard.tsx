"use client";

export default function PatientCard() {
  return (
    <div className="card p-6 space-y-4">
      {/* Patient Banner */}
      <div style={{
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(56,189,248,0.1))",
        border: "1px solid var(--border)",
        padding: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent2), var(--accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", flexShrink: 0,
        }}>
          🧑‍⚕️
        </div>
        <div>
          <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>
            Maria van der Berg
          </h4>
          <p className="text-sm" style={{ color: "var(--muted)", marginTop: "2px" }}>
            Cardiac surgery · Rotterdam, NL
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {["Urgent", "Verified"].map((tag) => (
              <span key={tag} className="tag" style={{
                background: tag === "Urgent" ? "rgba(251,146,60,0.1)" : "rgba(52,211,153,0.1)",
                color: tag === "Urgent" ? "var(--warn)" : "var(--success)",
                border: `1px solid ${tag === "Urgent" ? "rgba(251,146,60,0.25)" : "rgba(52,211,153,0.25)"}`,
                fontSize: "11px",
              }}>
                {tag === "Verified" ? "✓ " : "⚡ "}{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div>
        <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: "8px" }}>
          About this Campaign
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Maria was diagnosed with a severe aortic valve stenosis requiring immediate open-heart surgery.
          As a single mother of two, she faces significant financial challenges covering the costs not
          reimbursed by her insurance. Every contribution directly funds her treatment and recovery.
        </p>
      </div>

      {/* Timeline */}
      <div>
        <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.95rem", marginBottom: "12px" }}>
          Treatment Timeline
        </h4>
        {[
          { date: "Jun 5, 2026", label: "Pre-op Consultation", done: true },
          { date: "Jun 18, 2026", label: "Aortic Valve Replacement", done: false, current: true },
          { date: "Jul 4, 2026", label: "Hospital Discharge", done: false },
          { date: "Aug–Oct 2026", label: "Cardiac Rehabilitation", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 mb-3">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                background: item.done ? "var(--success)" : item.current ? "var(--accent)" : "var(--surface2)",
                border: `2px solid ${item.done ? "var(--success)" : item.current ? "var(--accent)" : "var(--border)"}`,
                boxShadow: item.current ? "0 0 0 4px rgba(56,189,248,0.2)" : "none",
                marginTop: "3px",
              }} />
              {i < 3 && <div style={{ width: 2, height: 24, background: "var(--border)", marginTop: "4px" }} />}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: item.current ? "var(--accent)" : "var(--text)" }}>
                {item.label}
                {item.current && <span className="ml-2 text-xs" style={{ color: "var(--warn)" }}>UPCOMING</span>}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
