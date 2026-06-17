import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site.config";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/brand/logo-mrb-white.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background:
            "linear-gradient(135deg, #00112b 0%, #001b43 55%, #022873 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={430} alt="" />
        <div
          style={{
            marginTop: 50,
            color: "#dbe4f3",
            fontSize: 42,
            maxWidth: 860,
            lineHeight: 1.25,
            fontWeight: 500,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            height: 8,
            width: 180,
            background: "#056cf2",
            borderRadius: 9999,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
