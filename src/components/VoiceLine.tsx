/**
 * "La línea de la voz": trazo SVG fino tipo onda sonora, único gesto
 * decorativo del sitio (sección 8). Subraya el H1 del hero y reaparece
 * como divisor de secciones. La animación de dibujo vive en globals.css
 * y se desactiva con prefers-reduced-motion.
 */
export function VoiceLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 32"
      fill="none"
      aria-hidden="true"
      className={`voice-line h-6 w-full max-w-xs text-pacifico ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M4 16c10 0 12-3 20-3s10 6 20 6 12-13 22-13 12 16 22 16 10-9 20-9 10 5 20 5 12-14 22-14 12 18 22 18 10-11 20-11 10 6 20 6 12-8 22-8 12 10 22 10 10-5 20-5 10 3 20 3 12-6 22-6 12 8 22 8 10-4 20-4 8 1 16 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Divisor de secciones basado en la línea de la voz. */
export function VoiceDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <VoiceLine className="max-w-[12rem] opacity-60" />
    </div>
  );
}
