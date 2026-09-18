import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LoreGraph — Understand Runeterra";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #080B12 0%, #161C29 55%, #0D1118 100%)",
          color: "#F5F2E8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#C9A96E",
              boxShadow: "0 0 24px #C9A96E",
            }}
          />
          <span style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#C9A96E" }}>
            LoreGraph
          </span>
        </div>
        <div>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 400, maxWidth: 900 }}>
            Understand Runeterra.
          </div>
          <div style={{ marginTop: 20, fontSize: 28, color: "#8F9AAD", maxWidth: 760 }}>
            Every character. Every conflict. Every connection.
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#647085" }}>Explore · Connect · Daily Lore</div>
      </div>
    ),
    { ...size },
  );
}
