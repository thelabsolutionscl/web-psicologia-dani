import { ButtonLink } from "@/components/ui/Button";
import { BOOKING_URL } from "@/lib/site";

/**
 * Único CTA de agenda del sitio (regla 10.6). Si existe
 * NEXT_PUBLIC_BOOKING_URL (agenda externa, p. ej. Encuadrado) deriva
 * allá; si no, usa el sistema de reserva propio en /agenda.
 */
export function BookingCTA({
  label = "Agenda tu hora",
  variant = "primary",
  className = "",
}: {
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const href = BOOKING_URL || "/agenda";
  return (
    <ButtonLink href={href} variant={variant} className={className}>
      {label}
    </ButtonLink>
  );
}
