import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} — Orange County bounce house rentals`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(165deg, #f8f6f1 0%, #eef6f8 55%, #e8f4f6 100%)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: 64,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <span
            style={{
              color: "#1a6974",
              fontFamily:
                'ui-rounded, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Orange County
          </span>
          <span
            style={{
              color: "#162032",
              fontFamily:
                'ui-rounded, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            {siteConfig.name}
          </span>
          <span
            style={{
              color: "#3d4a59",
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
              fontSize: 26,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
