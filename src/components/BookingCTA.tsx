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
  onClick,
}: {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "invertido";
  className?: string;
  /** Solo desde componentes cliente (p. ej. para registrar el clic). */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const href = BOOKING_URL || "/agenda";
  return (
    <ButtonLink href={href} variant={variant} className={className} onClick={onClick}>
      {label}
    </ButtonLink>
  );
}
