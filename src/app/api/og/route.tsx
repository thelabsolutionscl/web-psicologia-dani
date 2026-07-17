import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "@/lib/site";

/**
 * Imagen Open Graph de marca generada al vuelo (1200×630).
 * Se consume desde buildMetadata: /api/og?title=...&eyebrow=...
 * Colores derivados del logo de marca (crema, ciruela, vino).
 */
export const runtime = "nodejs";

const CAMANCHACA = "#F8F2ED";
const QUEBRADA = "#33222A";
const ACENTO = "#8A2F45"; // vino (anahuaca): acento de marca en la tarjeta OG
const ARENA = "#EBE0D8";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || SITE_NAME).slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") || "").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: CAMANCHACA,
          padding: "72px 80px",
          borderLeft: `20px solid ${ACENTO}`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                color: ACENTO,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              color: QUEBRADA,
              fontSize: title.length > 60 ? 60 : 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {/* La línea de la voz */}
          <svg width="420" height="40" viewBox="0 0 420 40" style={{ marginTop: 36 }}>
            <path
              d="M4 20c14 0 16-12 28-12s14 22 26 22 14-26 26-26 14 30 26 30 14-18 26-18 14 8 26 8 14-14 26-14 14 18 26 18 14-10 26-10 12 4 24 4"
              stroke={ACENTO}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `2px solid ${ARENA}`,
            paddingTop: 28,
          }}
        >
          <div style={{ color: QUEBRADA, fontSize: 34, fontWeight: 700 }}>
            {SITE_NAME}
          </div>
          <div style={{ color: ACENTO, fontSize: 26, marginTop: 4 }}>
            Psicóloga · Fonoaudióloga
          </div>
          <div
            style={{
              color: QUEBRADA,
              fontSize: 24,
              fontStyle: "italic",
              marginTop: 12,
              opacity: 0.8,
              display: "flex",
            }}
          >
            {`“${TAGLINE}”`}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
