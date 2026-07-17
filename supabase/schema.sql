-- Esquema del sistema de reservas (Fase A).
-- Ejecutar en Supabase: SQL Editor → pegar este archivo → Run.

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  servicio_id text not null,
  servicio_nombre text not null,
  fecha date not null,
  bloque text not null,
  nombre text not null,
  correo text not null,
  telefono text not null,
  mensaje text not null default '',
  -- Ciclo de vida de una reserva. 'solicitada' ya bloquea el cupo:
  -- con dos cupos diarios es preferible que Daniela libere manualmente
  -- una solicitud falsa a que dos familias tomen la misma hora.
  estado text not null default 'solicitada'
    check (estado in ('solicitada', 'confirmada', 'pagada', 'realizada', 'cancelada'))
);

-- Regla anti doble reserva: un solo registro activo por fecha + bloque.
-- La carrera entre dos solicitudes simultáneas la resuelve la base:
-- la segunda inserción falla con 23505 y la UI ofrece otra hora.
create unique index if not exists reservas_slot_activo
  on public.reservas (fecha, bloque)
  where estado in ('solicitada', 'confirmada', 'pagada');

create index if not exists reservas_fecha on public.reservas (fecha);

-- Fase C/blindaje: vencimiento de reservas que esperan pago del abono.
-- Solo se setea cuando hay pago online; una reserva sin pago (confirmación
-- manual) deja expira_at nulo y nunca se auto-cancela.
alter table public.reservas add column if not exists expira_at timestamptz;

-- RLS activado y sin políticas públicas: a esta tabla solo accede el
-- servidor (Server Actions / route handlers) con la service role key.
alter table public.reservas enable row level security;

-- ---------------------------------------------------------------
-- Fase B: dashboard de administración
-- ---------------------------------------------------------------

-- Fechas bloqueadas (vacaciones, jornadas presenciales en Arica).
-- bloque null = día completo bloqueado.
create table if not exists public.bloqueos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fecha date not null,
  bloque text,
  motivo text not null default ''
);

create index if not exists bloqueos_fecha on public.bloqueos (fecha);
alter table public.bloqueos enable row level security;

-- Configuración simple clave → valor (p. ej. dias_atencion: [1,2,3]).
create table if not exists public.config (
  key text primary key,
  value jsonb not null
);

alter table public.config enable row level security;
