import { FaWhatsapp } from "react-icons/fa";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  label?: string;
  phone?: string;
  message?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * The #2 CTA. Kept dark/charcoal (not brand-gold) so the WhatsApp icon's
 * own recognizable green reads clearly — familiarity matters more than
 * palette purity for a one-tap action people need to recognize instantly.
 */
export function WhatsAppButton({
  label = "Chat on WhatsApp",
  phone,
  message,
  variant = "dark",
  size,
  className,
}: WhatsAppButtonProps) {
  return (
    <Button href={getWhatsAppLink(phone, message)} external variant={variant} size={size} className={className}>
      <FaWhatsapp className="h-[1.15em] w-[1.15em] text-[#25D366]" aria-hidden="true" />
      {label}
    </Button>
  );
}
