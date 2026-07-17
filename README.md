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

"Agenda tu hora" lleva al wizard de reserva propio (`/agenda`): servicio → fecha y bloque → datos → confirmación. Hoy es solo frontend: la solicitud se envía por correo (Resend) con respaldo por WhatsApp. La capa de datos está aislada en `src/lib/booking.ts` y `src/app/actions/booking.ts` para conectar un dashboard después:

- **Disponibilidad**: reemplazar `getAvailableDays()` por un GET al API del dashboard (hoy genera días hábiles de las próximas 3 semanas con los dos bloques fijos).
- **Reserva**: reemplazar el envío de correo en `submitBooking()` por un POST del mismo JSON `BookingRequest` (el contrato ya está tipado).
- Si se define `NEXT_PUBLIC_BOOKING_URL` (agenda externa), el CTA vuelve a derivar allá sin tocar código.

## Estructura

Rutas de la Fase 1 en `src/app/(marketing)/`: home, `evaluaciones` (hub + autismo/tdah/lenguaje), `terapias`, `atencion-online`, `sobre-mi`, `contacto`/`gracias`, `privacidad`/`terminos`. SEO en `src/lib/seo.tsx` (Metadata + JSON-LD), constantes de marca en `src/lib/site.ts`.

La fuente de verdad del proyecto es el documento CLAUDE.md del proyecto (v3). Los datos que faltan están marcados en el sitio como `[PLACEHOLDER: …]` visibles.
