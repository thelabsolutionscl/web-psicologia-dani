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
    check (estado in ('solicitada', 'confirmada', 'pagada', 'realizada', 'cancelada', 'no_show'))
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

-- Recordatorio automático (cron 24 h antes): marca si ya se envió el aviso.
alter table public.reservas add column if not exists recordado boolean not null default false;

-- Nota interna del panel (privada, no se muestra al paciente).
alter table public.reservas add column if not exists notas text not null default '';

-- Migración del estado 'no_show' (no asistió) sobre tablas ya creadas:
-- recrea el CHECK para admitir el nuevo valor sin perder datos.
alter table public.reservas drop constraint if exists reservas_estado_check;
alter table public.reservas add constraint reservas_estado_check
  check (estado in ('solicitada', 'confirmada', 'pagada', 'realizada', 'cancelada', 'no_show'));

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

-- Rate limiting (anti fuerza bruta / spam) por clave (acción + IP).
-- Ventana deslizante simple con contador; atómico vía SELECT ... FOR UPDATE.
create table if not exists public.rate_limits (
  clave text primary key,
  ventana_inicio timestamptz not null default now(),
  contador int not null default 0
);

alter table public.rate_limits enable row level security;

-- Suscriptores del boletín (captación desde el blog). Sin datos clínicos:
-- solo correo y origen. RLS activo; solo el servidor escribe/lee.
create table if not exists public.suscriptores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  correo text not null unique,
  origen text not null default ''
);

alter table public.suscriptores enable row level security;

create or replace function public.check_rate_limit(
  p_clave text,
  p_max int,
  p_ventana_seg int
) returns boolean
language plpgsql
as $$
declare
  v_row public.rate_limits;
begin
  select * into v_row from public.rate_limits where clave = p_clave for update;
  if not found then
    insert into public.rate_limits (clave, ventana_inicio, contador)
      values (p_clave, now(), 1);
    return true;
  end if;
  if now() - v_row.ventana_inicio > make_interval(secs => p_ventana_seg) then
    update public.rate_limits set ventana_inicio = now(), contador = 1 where clave = p_clave;
    return true;
  end if;
  if v_row.contador >= p_max then
    return false;
  end if;
  update public.rate_limits set contador = contador + 1 where clave = p_clave;
  return true;
end;
$$;
