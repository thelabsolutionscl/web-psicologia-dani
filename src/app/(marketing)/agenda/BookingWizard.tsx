"use client";

import { CalendarClock, Check, ChevronLeft, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { submitBooking, type BookingState } from "@/app/actions/booking";
import { Button } from "@/components/ui/Button";
import { InputField, TextareaField } from "@/components/ui/Input";
import {
  BLOQUES,
  bookingWhatsappHref,
  getAvailableDays,
  SERVICIOS,
  type BookingRequest,
  type DayOption,
  type ServiceOption,
} from "@/lib/booking";
import { PRECIOS } from "@/lib/site";

const slotKey = (fecha: string, bloque: string) => `${fecha}|${bloque}`;

const PASOS = ["Servicio", "Fecha y hora", "Tus datos", "Confirmación"];

function Stepper({ actual }: { actual: number }) {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="Pasos de la reserva">
      {PASOS.map((paso, i) => (
        <li
          key={paso}
          aria-current={i === actual ? "step" : undefined}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-sans text-sm font-semibold ${
            i === actual
              ? "border-pacifico bg-pacifico text-white"
              : i < actual
                ? "border-pacifico/40 bg-white text-pacifico"
                : "border-arena bg-white text-quebrada/70"
          }`}
        >
          {i < actual ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <span aria-hidden="true">{i + 1}.</span>
          )}
          {paso}
        </li>
      ))}
    </ol>
  );
}

function OpcionBoton({
  seleccionado,
  deshabilitado = false,
  onClick,
  children,
}: {
  seleccionado: boolean;
  deshabilitado?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={seleccionado}
      disabled={deshabilitado}
      className={`min-h-11 w-full rounded-xl border px-4 py-3 text-left font-sans text-base transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        seleccionado
          ? "border-pacifico bg-pacifico/10 font-semibold text-quebrada"
          : "border-arena bg-white text-quebrada hover:border-pacifico/50"
      }`}
    >
      {children}
    </button>
  );
}

export function BookingWizard() {
  const [paso, setPaso] = useState(0);
  const [servicio, setServicio] = useState<ServiceOption | null>(null);
  const [fecha, setFecha] = useState<string | null>(null);
  const [bloque, setBloque] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [resultado, setResultado] = useState<BookingState | null>(null);
  const [enviando, startTransition] = useTransition();

  /* Disponibilidad real desde /api/disponibilidad (cupos ya tomados);
     si el API no responde, se muestran los días locales sin descuento. */
  const [dias, setDias] = useState<DayOption[]>([]);
  const [ocupados, setOcupados] = useState<Set<string>>(new Set());
  const [cargando, setCargando] = useState(true);

  const cargarDisponibilidad = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/disponibilidad", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data: {
        dias: DayOption[];
        ocupados: { fecha: string; bloque: string }[];
      } = await res.json();
      setDias(data.dias);
      setOcupados(
        new Set(data.ocupados.map((o) => slotKey(o.fecha, o.bloque))),
      );
    } catch {
      setDias(getAvailableDays(new Date()));
      setOcupados(new Set());
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarDisponibilidad();
  }, [cargarDisponibilidad]);

  const diaSeleccionado = dias.find((d) => d.fecha === fecha);
  const diaCompleto = (f: string) =>
    BLOQUES.every((b) => ocupados.has(slotKey(f, b)));

  const solicitud: BookingRequest | null =
    servicio && fecha && bloque
      ? {
          servicioId: servicio.id,
          servicioNombre: servicio.nombre,
          fecha,
          bloque,
          nombre,
          correo,
          telefono,
          mensaje,
        }
      : null;

  function enviar() {
    if (!solicitud) return;
    startTransition(async () => {
      const estado = await submitBooking(solicitud);
      setResultado(estado);
      if (estado.ok || estado.soloWhatsapp) {
        setPaso(3);
      } else if (estado.conflicto) {
        // El cupo lo ganó otra persona: volver a fecha/hora con datos frescos.
        setBloque(null);
        setPaso(1);
        void cargarDisponibilidad();
      }
    });
  }

  /* Paso 4: confirmación */
  if (paso === 3 && solicitud && resultado) {
    return (
      <div className="rounded-2xl border border-arena bg-white p-6 sm:p-8">
        <Check className="size-10 text-pacifico" aria-hidden="true" />
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
          {resultado.ok
            ? "Tu solicitud quedó registrada"
            : "Un paso más: confirma por WhatsApp"}
        </h2>
        <dl className="mt-5 space-y-2 font-sans text-base">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">Servicio:</dt>
            <dd>{solicitud.servicioNombre}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">Fecha:</dt>
            <dd>
              {diaSeleccionado?.etiqueta} · {solicitud.bloque} (hora de Chile
              continental)
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-base text-quebrada/90">
          {resultado.ok
            ? `Te contactaré por WhatsApp o correo para confirmar la hora y coordinar el abono de ${PRECIOS.abonoReserva}. La hora queda tomada solo con la confirmación.`
            : `El registro por correo aún no está habilitado, pero tu reserva no se pierde: envíala por WhatsApp con un toque y te confirmo la hora y el abono de ${PRECIOS.abonoReserva} por ahí.`}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={bookingWhatsappHref(solicitud)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-pacifico px-6 py-2.5 font-sans text-base font-semibold text-white hover:bg-pacifico/90"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {resultado.ok ? "Adelantar por WhatsApp" : "Enviar por WhatsApp"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-arena bg-white p-6 sm:p-8">
      <Stepper actual={paso} />

      {/* Paso 1: servicio */}
      {paso === 0 && (
        <fieldset className="mt-6">
          <legend className="font-sans text-lg font-bold">
            ¿Qué hora necesitas?
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICIOS.map((s) => (
              <OpcionBoton
                key={s.id}
                seleccionado={servicio?.id === s.id}
                onClick={() => setServicio(s)}
              >
                <span className="block font-semibold">{s.nombre}</span>
                <span className="mt-1 block text-sm text-quebrada/80">
                  {s.detalle}
                </span>
                <span className="mt-1 block text-sm font-semibold text-pacifico">
                  {s.precio}
                </span>
              </OpcionBoton>
            ))}
          </div>
          <div className="mt-6">
            <Button
              type="button"
              disabled={!servicio}
              onClick={() => setPaso(1)}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuar
            </Button>
          </div>
        </fieldset>
      )}

      {/* Paso 2: fecha y bloque */}
      {paso === 1 && (
        <div className="mt-6">
          <p className="flex items-center gap-2 font-sans text-lg font-bold">
            <CalendarClock className="size-5 text-pacifico" aria-hidden="true" />
            Elige fecha y bloque
          </p>
          <p className="mt-2 font-sans text-sm text-quebrada/80">
            Dos cupos diarios, en hora de Chile continental. Los días
            definitivos de atención están por confirmar: toda hora se confirma
            personalmente antes del abono.
          </p>
          {resultado?.conflicto ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-quebrada/30 bg-arena/50 px-4 py-3 font-sans text-sm font-semibold text-quebrada"
            >
              {resultado.error}
            </p>
          ) : null}
          {cargando ? (
            <p className="mt-4 font-sans text-sm text-quebrada/80">
              Cargando disponibilidad…
            </p>
          ) : (
            <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {dias.map((d) => {
                const completo = diaCompleto(d.fecha);
                return (
                  <OpcionBoton
                    key={d.fecha}
                    seleccionado={fecha === d.fecha}
                    deshabilitado={completo}
                    onClick={() => {
                      setFecha(d.fecha);
                      if (bloque && ocupados.has(slotKey(d.fecha, bloque))) {
                        setBloque(null);
                      }
                    }}
                  >
                    {d.etiqueta}
                    {completo ? " — sin cupos" : ""}
                  </OpcionBoton>
                );
              })}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            {BLOQUES.map((b) => {
              const tomado = fecha ? ocupados.has(slotKey(fecha, b)) : false;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={bloque === b}
                  disabled={tomado}
                  onClick={() => setBloque(b)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-5 font-sans text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    bloque === b
                      ? "border-pacifico bg-pacifico text-white"
                      : "border-arena bg-white text-quebrada hover:border-pacifico/50"
                  }`}
                >
                  {b} h{tomado ? " — tomado" : ""}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPaso(0)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              Volver
            </Button>
            <Button
              type="button"
              disabled={!fecha || !bloque}
              onClick={() => setPaso(2)}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Paso 3: datos */}
      {paso === 2 && servicio && diaSeleccionado && bloque && (
        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            enviar();
          }}
          noValidate
        >
          <p className="rounded-xl bg-camanchaca px-4 py-3 font-sans text-sm text-quebrada">
            <strong className="font-semibold">{servicio.nombre}</strong> ·{" "}
            {diaSeleccionado.etiqueta} · {bloque} h (Chile continental)
          </p>
          <InputField
            label="Nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={resultado?.fieldErrors?.nombre}
          />
          <InputField
            label="Correo electrónico"
            name="correo"
            type="email"
            autoComplete="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={resultado?.fieldErrors?.correo}
          />
          <InputField
            label="Teléfono (para confirmarte por WhatsApp)"
            name="telefono"
            type="tel"
            autoComplete="tel"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            error={resultado?.fieldErrors?.telefono}
          />
          <TextareaField
            label="Comentario (opcional)"
            name="mensaje"
            rows={3}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Por ejemplo: la edad de tu hijo o hija, o qué te gustaría conversar primero."
          />
          <p className="font-sans text-sm text-quebrada/80">
            La hora se confirma con un abono de {PRECIOS.abonoReserva}; el
            saldo se paga antes de la sesión. Boleta de honorarios
            reembolsable en Isapre y seguros complementarios.
          </p>
          {resultado?.error ? (
            <p
              role="alert"
              className="rounded-lg border border-quebrada/30 bg-arena/50 px-4 py-3 font-sans text-sm font-semibold text-quebrada"
            >
              {resultado.error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => setPaso(1)}>
              <ChevronLeft className="size-4" aria-hidden="true" />
              Volver
            </Button>
            <Button type="submit" disabled={enviando}>
              {enviando ? "Enviando…" : "Solicitar esta hora"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
