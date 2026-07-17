import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export type ServiceCard = {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
};

/** Tarjetas de servicios (Home y hub de evaluaciones). */
export function ServiceGrid({ services }: { services: ServiceCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {services.map((service) => (
        <Card key={service.href} className="flex flex-col">
          {/* Bricolage queda reservada a H1/H2 (sección 8); los h3 van en Figtree */}
          <h3 className="font-sans text-lg font-bold text-quebrada">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-base text-quebrada/90">
            {service.description}
          </p>
          <Link
            href={service.href}
            className="mt-5 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-pacifico hover:underline"
          >
            {service.linkLabel ?? "Conocer más"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Card>
      ))}
    </div>
  );
}
