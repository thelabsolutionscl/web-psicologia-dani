import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { VoiceLine } from "@/components/VoiceLine";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-sm font-semibold tracking-wide text-enlace uppercase">
        Error 404
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
        Página no encontrada
      </h1>
      <div className="mt-4 flex justify-center">
        <VoiceLine />
      </div>
      <p className="mt-4 max-w-md text-base text-quebrada/90">
        La página que buscas no existe o cambió de dirección. Puedes volver al
        inicio o revisar los{" "}
        <Link href="/evaluaciones" className="text-enlace underline">
          servicios de evaluación
        </Link>
        .
      </p>
      <div className="mt-6">
        <ButtonLink href="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
      </div>
    </main>
  );
}
