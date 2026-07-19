"use client";

import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { rangoEnZonaLocal } from "@/lib/timezone";

/**
 * Muestra la equivalencia del bloque (hora de Chile) en la zona horaria
 * del navegador. Solo aparece para quien está fuera de Chile; se calcula
 * en useEffect para no depender del reloj del servidor.
 */
export function HoraLocal({
  fecha,
  bloque,
}: {
  fecha: string;
  bloque: string;
}) {
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTexto(rangoEnZonaLocal(fecha, bloque, tz));
    } catch {
      setTexto(null);
    }
  }, [fecha, bloque]);

  if (!texto) return null;
  return (
    <p className="mt-3 flex items-start gap-2 rounded-lg bg-arena/40 px-3 py-2 font-sans text-sm text-quebrada/90">
      <Globe className="mt-0.5 size-4 shrink-0 text-enlace" aria-hidden="true" />
      <span>
        En tu zona horaria equivale a <strong className="font-semibold">{texto}</strong>.
      </span>
    </p>
  );
}
