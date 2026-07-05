import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/data/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // A static-weight instance, not the variable font — satori's font
  // parser expects a fixed-instance TTF, and choked on the variable
  // font's tables.
  const bodoniBuffer = await readFile(
    join(process.cwd(), "src/fonts/BodoniModa-Static-Semibold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b0b",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0) 45%), radial-gradient(circle at 85% 82%, rgba(143,112,31,0.22) 0%, rgba(143,112,31,0) 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 128,
            height: 128,
            borderRadius: "50%",
            border: "2px solid rgba(212,175,55,0.8)",
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 54, color: "#D4AF37", fontFamily: "Bodoni Moda" }}>AJ</span>
        </div>
        <div
          style={{
            fontSize: 78,
            color: "#F6F1E7",
            fontFamily: "Bodoni Moda",
            letterSpacing: -1,
          }}
        >
          {business.name}
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 26,
            color: "#D4AF37",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {business.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bodoni Moda", data: bodoniBuffer, weight: 600, style: "normal" }],
    }
  );
}
