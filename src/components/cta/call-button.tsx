import { Phone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { getTelLink } from "@/lib/whatsapp";

interface CallButtonProps {
  label?: string;
  phone: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export function CallButton({
  label = "Call Now",
  phone,
  variant = "outline",
  size,
  className,
}: CallButtonProps) {
  return (
    <Button href={getTelLink(phone)} variant={variant} size={size} className={className}>
      <Phone className="h-[1.05em] w-[1.05em]" aria-hidden="true" />
      {label}
    </Button>
  );
}
