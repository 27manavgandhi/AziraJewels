import { business } from "@/data/business";

/** Strips everything except leading + and digits, as wa.me requires. */
function toWhatsAppDigits(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/** Builds a wa.me deep link that opens a chat with the message pre-filled. */
export function getWhatsAppLink(phone: string = business.whatsapp.phone, message: string = business.whatsapp.message): string {
  return `https://wa.me/${toWhatsAppDigits(phone)}?text=${encodeURIComponent(message)}`;
}

/** Builds a tel: link for one-tap dialing. */
export function getTelLink(phone: string): string {
  return `tel:${phone}`;
}

/** Builds a mailto: link. */
export function getMailtoLink(email: string = business.email): string {
  return `mailto:${email}`;
}
