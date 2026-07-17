# Sitio web — Daniela Alejandra Kaiser Ortiz

Psicóloga · Fonoaudióloga — Evaluación y acompañamiento del neurodesarrollo, online en todo Chile.

> “Cada proceso es único, acompañarlo también.”

## Stack

- **Next.js 15 (App Router)** + TypeScript estricto, Server Components por defecto (`'use client'` solo en FAB, acordeón y formulario).
- **Tailwind CSS v4** con los tokens del sistema de diseño (camanchaca, quebrada, pacífico, añañuca, arena).
- **Resend** para el formulario de contacto (Server Action).
- 100% estático (SSG); deploy pensado para Vercel.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev
```

## Variables de entorno

Ver `.env.example`. Las críticas para el lanzamiento:

| Variable | Estado |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Pendiente: verificar dominio en NIC Chile |
| `NEXT_PUBLIC_BOOKING_URL` | Pendiente: crear cuenta Encuadrado |
| `NEXT_PUBLIC_WHATSAPP` | `56966828311` (línea profesional) |
| `RESEND_API_KEY` | Pendiente: crear cuenta Resend |
| `CONTACT_TO_EMAIL` | `psicofono.danielakaiser@gmail.com` |
| `NEXT_PUBLIC_ANALYTICS` | `plausible` \| `ga4` \| `off` |

Sin `NEXT_PUBLIC_BOOKING_URL`, el CTA de agenda deriva al formulario de contacto; sin `RESEND_API_KEY`, el formulario muestra un aviso y deriva a WhatsApp.

## Sistema de reserva (`/agenda`)

"Agenda tu hora" lleva al wizard de reserva propio (`/agenda`): servicio → fecha y bloque → datos → confirmación. Con la **Fase A** las reservas persisten en Supabase con bloqueo de doble reserva:

- **Disponibilidad**: `GET /api/disponibilidad` devuelve los días ofrecidos y los cupos ya tomados (estados activos: solicitada/confirmada/pagada). El wizard deshabilita los cupos ocupados.
- **Reserva**: `submitBooking()` inserta en la tabla `reservas`; el índice único parcial (`supabase/schema.sql`) resuelve la carrera entre dos solicitudes simultáneas — la segunda recibe "esa hora acaba de ser tomada". Además avisa por correo (Resend, mejor esfuerzo).
- **Degradación**: sin `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` el sitio funciona como antes (toda la agenda visible, solicitud por correo/WhatsApp, sin bloqueo).
- Si se define `NEXT_PUBLIC_BOOKING_URL` (agenda externa), el CTA vuelve a derivar allá sin tocar código.

**Setup**: crear proyecto en supabase.com → SQL Editor → ejecutar `supabase/schema.sql` → copiar Project URL y service role key (Settings → API) a las env `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en Vercel. La tabla queda con RLS sin políticas públicas: solo el servidor accede.

**Fase B (dashboard)**: leer/gestionar la misma tabla `reservas` (confirmar/cancelar cambia `estado`, lo que libera o bloquea el cupo automáticamente) y administrar los días de atención reales.

## Estructura

Rutas de la Fase 1 en `src/app/(marketing)/`: home, `evaluaciones` (hub + autismo/tdah/lenguaje), `terapias`, `atencion-online`, `sobre-mi`, `contacto`/`gracias`, `privacidad`/`terminos`. SEO en `src/lib/seo.tsx` (Metadata + JSON-LD), constantes de marca en `src/lib/site.ts`.

La fuente de verdad del proyecto es el documento CLAUDE.md del proyecto (v3). Los datos que faltan están marcados en el sitio como `[PLACEHOLDER: …]` visibles.
