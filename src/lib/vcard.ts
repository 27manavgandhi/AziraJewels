import { business } from "@/data/business";

/** Escapes text per vCard 3.0 (RFC 2426) — commas, semicolons, backslashes, newlines. */
function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Folds a base64 PHOTO payload to 75-char lines per RFC 2426 §5.8.1. */
function foldBase64(label: string, base64: string): string {
  const chunkSize = 74; // 75 total minus 1 leading space on continuation lines
  const lines: string[] = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    lines.push(base64.slice(i, i + chunkSize));
  }
  return `${label}${lines[0]}\r\n${lines
    .slice(1)
    .map((l) => ` ${l}`)
    .join("\r\n")}`;
}

/**
 * Fetches the bundled logo and returns it as a base64 string, or null if
 * unavailable (e.g. offline) — the vCard still works fine without a photo.
 */
async function getLogoBase64(): Promise<string | null> {
  try {
    const res = await fetch("/logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? null);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Builds a vCard 3.0 string for the business. Uses Apple's item-grouping
 * extension (item1.TEL / item1.X-ABLabel) so iOS Contacts shows a custom
 * label per number ("Nitin Sahni", "Anuj Sahni", "Office") — other clients
 * degrade gracefully and simply show the numbers without custom labels.
 */
export async function buildVCard(): Promise<string> {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`N:;${escapeVCardValue(business.name)};;;`);
  lines.push(`FN:${escapeVCardValue(business.name)}`);
  lines.push(`ORG:${escapeVCardValue(business.name)}`);
  lines.push(`TITLE:${escapeVCardValue(business.category)}`);

  business.owners.forEach((owner, index) => {
    const item = `item${index + 1}`;
    lines.push(`${item}.TEL;TYPE=CELL,VOICE:${owner.phone}`);
    lines.push(`${item}.X-ABLabel:${escapeVCardValue(owner.name)}`);
  });

  const officeItem = `item${business.owners.length + 1}`;
  lines.push(`${officeItem}.TEL;TYPE=WORK,VOICE:${business.landline.raw}`);
  lines.push(`${officeItem}.X-ABLabel:Office`);

  lines.push(`EMAIL;TYPE=WORK,INTERNET:${escapeVCardValue(business.email)}`);

  const addr = business.address;
  lines.push(
    `ADR;TYPE=WORK:;;${escapeVCardValue(`${addr.line1}, ${addr.line2}`)};${escapeVCardValue(
      addr.city
    )};${escapeVCardValue(addr.state)};${addr.postalCode};${escapeVCardValue(addr.country)}`
  );

  lines.push(`URL:${business.website}`);

  const hoursNote = business.hours.map((h) => `${h.label}: ${h.hours}`).join(" · ");
  lines.push(
    `NOTE:${escapeVCardValue(
      `${business.category} — WhatsApp available on ${business.whatsapp.phone}. Hours: ${hoursNote}. Saved via digital visiting card.`
    )}`
  );

  const logoBase64 = await getLogoBase64();
  if (logoBase64) {
    lines.push(foldBase64("PHOTO;ENCODING=b;TYPE=PNG:", logoBase64));
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

/**
 * Triggers a one-tap download of the vCard. On iOS Safari this opens the
 * "Add Contact" sheet directly; on Android/desktop it downloads a .vcf
 * file the user then opens with their contacts app.
 */
export async function downloadVCard(): Promise<void> {
  const vcard = await buildVCard();
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${business.name}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke on a delay — some browsers need the object URL to survive
  // past the synchronous click-handling for the download to start.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
