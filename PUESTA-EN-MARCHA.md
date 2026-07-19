# Puesta en marcha — sitio de Daniela Kaiser

Guía para poner el sitio en producción. Está dividida en dos partes:

- **Parte 1 — Checklist de lo que falta** (visión rápida).
- **Parte 2 — Paso a paso** (en orden, con los comandos y valores concretos).

El sitio ya está **construido y probado**: marketing, blog, reservas con
pago (Mercado Pago), panel de administración (`/admin`), SEO y seguridad.
Lo que queda es **operativo**: crear cuentas, cargar datos y desplegar.

---

## Parte 1 — Checklist de lo que falta

### A. Datos que debe entregar Daniela
- [ ] **Precios de las 3 evaluaciones** (autismo, TDAH, lenguaje) — proceso completo.
- [ ] **Plazo de entrega del informe** (p. ej. "15 días hábiles").
- [ ] **Días de atención** reales de la semana (por defecto: lunes a viernes).
- [ ] **Testimonios** reales **con autorización escrita** (o confirmar que no van por ahora).
- [ ] **Foto de perfil** (retrato) para la página "Sobre mí".
- [ ] **Lista de diplomados / formación continua** para "Sobre mí".
- [ ] **Política de cancelación y reagendamiento** (texto para los Términos).
- [ ] **Medios de pago internacionales** aceptados (para pacientes fuera de Chile).
- [ ] **Revisión legal** de Términos y Política de privacidad antes de publicar.

### B. Cuentas y servicios a crear
- [ ] **Dominio** `danielakaiser.cl` (NIC Chile) — verificar disponibilidad y registrar.
- [ ] **Supabase** (base de datos de reservas) — proyecto + correr `schema.sql`.
- [ ] **Resend** (correos de reserva y contacto) — cuenta + verificar dominio.
- [ ] **Mercado Pago** (cobro del abono) — cuenta + Access Token + webhook.
- [ ] **Vercel** (hosting) — conectar el repositorio de GitHub y desplegar.
- [ ] **Analítica** (opcional) — Plausible o Google Analytics 4.

### C. Configuración técnica
- [ ] Cargar las **variables de entorno** en Vercel (ver Parte 2, paso 6).
- [ ] Correr `supabase/schema.sql` en Supabase.
- [ ] Configurar la **URL del webhook** en Mercado Pago.
- [ ] Conectar el **dominio** en Vercel.
- [ ] **Verificación final** (reserva de prueba, pago de prueba, correos).

---

## Parte 2 — Paso a paso

### Paso 1 — Registrar el dominio
1. Entrar a **nic.cl** y buscar `danielakaiser.cl`.
2. Si está disponible, registrarlo (el pago es anual).
3. Guardar las credenciales de administración del dominio: se usarán en el paso 7 para apuntar el DNS a Vercel.

> Si el dominio no está disponible, elegir una variante (p. ej.
> `danielakaiserpsicologa.cl`) y usar esa en todos los pasos siguientes.

### Paso 2 — Crear el proyecto en Supabase (reservas)
1. Entrar a **supabase.com** → crear cuenta → **New project**.
2. Elegir región cercana (p. ej. *South America (São Paulo)*), poner una contraseña de base de datos y crear.
3. Cuando esté listo, ir a **SQL Editor** → **New query**.
4. Copiar **todo** el contenido del archivo `supabase/schema.sql` del repositorio, pegarlo y ejecutar (**Run**). Crea las tablas de reservas, bloqueos, configuración y rate limiting. Es idempotente: se puede volver a correr sin borrar datos.
5. Ir a **Project Settings → API** y copiar:
   - **Project URL** → será `SUPABASE_URL`.
   - **service_role key** (en "Project API keys") → será `SUPABASE_SERVICE_ROLE_KEY`.
   - ⚠️ La `service_role key` es secreta. Nunca se comparte ni se pone con prefijo `NEXT_PUBLIC_`.

### Paso 3 — Crear la cuenta de Resend (correos)
1. Entrar a **resend.com** → crear cuenta.
2. **API Keys → Create API Key** → copiar la clave → será `RESEND_API_KEY`.
3. **(Recomendado)** **Domains → Add Domain** → agregar `danielakaiser.cl` y crear los registros DNS que Resend indique (en el registrador del dominio). Una vez verificado, se puede enviar desde una dirección propia, p. ej. `contacto@danielakaiser.cl` → poner en `RESEND_FROM` como `Daniela Kaiser <contacto@danielakaiser.cl>`.
4. Si aún no se verifica el dominio, se puede lanzar sin `RESEND_FROM` (usa el remitente de prueba de Resend). Los correos igual llegan.

### Paso 4 — Crear la cuenta de Mercado Pago (cobro del abono)
1. Entrar a **mercadopago.cl** → crear/usar la cuenta de Daniela.
2. Ir a **Tus integraciones → Crear aplicación** (tipo: pagos online / Checkout Pro).
3. En **Credenciales**:
   - Para probar: copiar el **Access Token de prueba** → `MP_ACCESS_TOKEN`, y poner `MP_MODE=sandbox`.
   - Para cobrar de verdad: copiar el **Access Token de producción** → `MP_ACCESS_TOKEN`, y poner `MP_MODE=prod`.
4. En **Webhooks / Notificaciones**, configurar la URL:
   `https://danielakaiser.cl/api/pagos/webhook` (evento: **Pagos**).
5. Copiar la **clave secreta** del webhook → `MP_WEBHOOK_SECRET` (opcional pero recomendado: valida que las notificaciones vengan de Mercado Pago).

> Sin `MP_ACCESS_TOKEN`, el sitio funciona igual: la reserva queda como
> solicitud y Daniela confirma manualmente desde `/admin`. El pago online
> se activa solo cuando se cargan estas credenciales.

### Paso 5 — Desplegar en Vercel
1. Entrar a **vercel.com** → **Add New → Project** → importar el repositorio
   `thelabsolutionscl/web-psicologia-dani` desde GitHub.
2. Framework: **Next.js** (se detecta solo). No cambiar el build command.
3. Antes de desplegar, cargar las variables de entorno (paso 6).
4. **Deploy**.

### Paso 6 — Cargar las variables de entorno en Vercel
En **Project → Settings → Environment Variables**, agregar (referencia: `.env.example`):

| Variable | Valor | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://danielakaiser.cl` | Sí |
| `NEXT_PUBLIC_WHATSAPP` | `56966828311` | Sí |
| `SUPABASE_URL` | (del paso 2) | Sí (reservas) |
| `SUPABASE_SERVICE_ROLE_KEY` | (del paso 2) | Sí (reservas) |
| `ADMIN_PASSWORD` | una contraseña **larga y única** | Sí (panel) |
| `RESEND_API_KEY` | (del paso 3) | Sí (correos) |
| `CONTACT_TO_EMAIL` | correo donde recibir las solicitudes | Sí |
| `RESEND_FROM` | `Daniela Kaiser <contacto@danielakaiser.cl>` | Opcional |
| `MP_ACCESS_TOKEN` | (del paso 4) | Para cobrar online |
| `MP_MODE` | `sandbox` (pruebas) / `prod` (real) | Con MP |
| `MP_WEBHOOK_SECRET` | (del paso 4) | Opcional |
| `NEXT_PUBLIC_ANALYTICS` | `plausible`, `ga4` u `off` | Opcional |
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXX` (solo si `ga4`) | Opcional |
| `CRON_SECRET` | una cadena larga y única | Recordatorios |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN de Sentry (monitoreo de errores) | Opcional |

> **Recordatorio 24 h antes:** Vercel Cron llama a diario a
> `/api/cron/recordatorios` (ver `vercel.json`) y envía el aviso a las
> reservas cuya sesión es al día siguiente. Vercel adjunta el header
> `Authorization: Bearer $CRON_SECRET` automáticamente, así que basta con
> definir `CRON_SECRET` en las variables. Sin `CRON_SECRET` el endpoint
> queda abierto: conviene definirlo en producción. Requiere Supabase y
> Resend configurados.

> **Dejar vacía** `NEXT_PUBLIC_BOOKING_URL`: el sitio usa su propio sistema
> de reservas interno (`/agenda`). Esa variable es de una integración
> externa antigua (Encuadrado) que ya no se usa.

Tras cargar las variables, **redesplegar** (Deployments → Redeploy) para que tomen efecto.

### Paso 7 — Conectar el dominio
1. En Vercel: **Project → Settings → Domains → Add** → escribir `danielakaiser.cl`.
2. Vercel mostrará los registros DNS a crear (un registro A o CNAME).
3. En NIC Chile (o el registrador), crear esos registros DNS.
4. Esperar la propagación (minutos a unas horas). Vercel emite el certificado HTTPS automáticamente.

### Paso 8 — Cargar los datos de Daniela en el código
Cuando Daniela entregue los datos, editar estos archivos (son ediciones de una o dos líneas):

- **Precios** → `src/lib/site.ts`, objeto `PRECIOS.evaluaciones`:
  ```
  evaluaciones: {
    autismo:  "$XXX.XXX",
    tdah:     "$XXX.XXX",
    lenguaje: "$XXX.XXX",
  }
  ```
- **Días de atención (texto)** → `src/lib/site.ts`, `HORARIO.dias` (p. ej. `"lunes a viernes"`).
  Los días reales de la agenda también se gestionan desde `/admin/disponibilidad`.
- **Plazo del informe** → en `src/app/(marketing)/evaluaciones/autismo/page.tsx`,
  `.../tdah/page.tsx` y `.../lenguaje/page.tsx` (buscar `Plazo de entrega`).
- **Testimonios** → `src/lib/testimonios.ts`, agregar al arreglo (con iniciales o
  descripción genérica, nunca el nombre del paciente):
  ```
  { cita: "…", autora: "Madre de paciente, 6 años", contexto: "Evaluación de autismo" }
  ```
- **Foto de perfil** → guardar la imagen en `public/images/` y reemplazar el
  placeholder en `src/app/(marketing)/sobre-mi/page.tsx`.
- **Diplomados** → `src/app/(marketing)/sobre-mi/page.tsx` (placeholder de formación).
- **Política de cancelación** y **revisión legal** → `src/app/(marketing)/terminos/page.tsx`
  y `src/app/(marketing)/privacidad/page.tsx`.
- **Medios de pago internacionales** → `src/app/(marketing)/atencion-online/page.tsx`.

> Mientras un precio o dato siga como `[PLACEHOLDER: ...]`, el sitio muestra
> automáticamente "Valor por confirmar" / "Días por confirmar" (no se ve el
> corchete). Así se puede lanzar y completar después.

### Paso 9 — Verificación final (antes de anunciar)
- [ ] Abrir el sitio en el dominio y revisar que carga con HTTPS.
- [ ] Hacer una **reserva de prueba** en `/agenda` y confirmar que:
  - llega el correo a `CONTACT_TO_EMAIL`,
  - la reserva aparece en `/admin`.
- [ ] Con `MP_MODE=sandbox`, hacer un **pago de prueba** y confirmar que:
  - vuelve a `/agenda/pago` con "hora confirmada",
  - la reserva pasa a "confirmada" en `/admin`.
- [ ] Entrar a `/admin` con `ADMIN_PASSWORD` y probar confirmar/cancelar una reserva.
- [ ] Enviar el **formulario de contacto** y confirmar que llega el correo.
- [ ] Cuando todo funcione en sandbox, cambiar `MP_MODE=prod` y el Access Token de producción, y redesplegar.

---

## Notas
- El panel de administración está en `/admin` (no indexable). Se entra con `ADMIN_PASSWORD`.
- Los días y los bloqueos de agenda se gestionan desde `/admin/disponibilidad`.
- Desde `/admin` se puede **exportar reservas y suscriptores a CSV** (botones "Exportar…") para respaldo o contabilidad; abren directo en Excel (UTF-8). El panel incluye **buscador**, **paginación** del historial y una métrica de **abonos recibidos en el mes**.
- **Seguridad:** además de los headers habituales, el sitio envía una **Content-Security-Policy** que restringe orígenes de scripts, imágenes y conexiones (compatible con la generación estática y con el redireccionamiento de Mercado Pago).
- El **boletín** del blog guarda los correos en la tabla `suscriptores` (Supabase). Sin base configurada, avisa por correo a `CONTACT_TO_EMAIL`. Para enviar campañas se conecta luego un proveedor (p. ej. Resend Broadcasts o Mailchimp) con esa lista.
- **Monitoreo de errores:** con `NEXT_PUBLIC_SENTRY_DSN` se activa el reporte a Sentry (instalar `@sentry/nextjs` y completar el gancho en `src/lib/monitoring.ts`). Sin DSN, los errores quedan en los logs de Vercel.
- **Tema claro/oscuro:** el sitio respeta la preferencia del sistema y ofrece un botón (sol/luna) en el encabezado para alternarlo; la elección se recuerda en el navegador. El tema claro es el original, sin cambios.
- Cada `git push` a `main` dispara un despliegue automático en Vercel y el CI (typecheck + lint + **pruebas** + build). Las pruebas unitarias se corren en local con `npm test`.
- Sin Supabase configurado, el sitio degrada con elegancia: toda la agenda se ve disponible y las reservas llegan por correo/WhatsApp, sin bloqueo de cupos.
