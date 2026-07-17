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

-- RLS activado y sin políticas públicas: a esta tabla solo accede el
-- servidor (Server Actions / route handlers) con la service role key.
-- El dashboard (Fase B) agregará políticas para el usuario autenticado.
alter table public.reservas enable row level security;
