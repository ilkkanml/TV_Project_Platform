const allowedBackendAreas = [
  "user-account",
  "subscription-license",
  "device-activation",
  "payment-status",
  "reseller-credit",
  "app-version-check",
  "remote-config",
  "temporary-encrypted-profile-transfer"
];

const cardStyle = {
  padding: "16px",
  border: "1px solid #334155",
  borderRadius: "16px",
  background: "#1f2937",
  color: "#e5e7eb"
};

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "Arial, Helvetica, sans-serif"
      }}
    >
      <section
        style={{
          maxWidth: "896px",
          margin: "0 auto",
          padding: "32px",
          border: "1px solid #334155",
          borderRadius: "24px",
          background: "#111827"
        }}
      >
        <p style={{ color: "#94a3b8", letterSpacing: "0.2em" }}>
          Core Media Player Ecosystem
        </p>
        <h1 style={{ color: "#ffffff", fontSize: "40px" }}>
          TV Project Platform
        </h1>
        <p style={{ color: "#cbd5e1", fontSize: "18px", lineHeight: 1.7 }}>
          Account, device, license, app version, remote config, and temporary
          encrypted profile transfer center for the Nexora ecosystem.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px"
          }}
        >
          {allowedBackendAreas.map((item) => (
            <div key={item} style={cardStyle}>
              {item}
            </div>
          ))}
        </div>
        <p style={{ color: "#94a3b8", marginTop: "24px" }}>
          Platform boundary is protected by the ecosystem integration contract.
        </p>
      </section>
    </main>
  );
}
