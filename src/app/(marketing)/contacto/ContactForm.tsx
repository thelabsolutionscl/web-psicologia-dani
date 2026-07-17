"use client";

import { useActionState } from "react";
import { sendContact, type ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { InputField, SelectField, TextareaField } from "@/components/ui/Input";
import { MOTIVOS_CONTACTO } from "@/lib/site";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContact,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Honeypot antispam: oculto para personas, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa">Empresa</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <InputField
        label="Nombre"
        name="nombre"
        type="text"
        autoComplete="name"
        required
        defaultValue={state.values?.nombre}
        error={state.fieldErrors?.nombre}
      />
      <InputField
        label="Correo electrónico"
        name="correo"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.values?.correo}
        error={state.fieldErrors?.correo}
      />
      <InputField
        label="Teléfono (opcional)"
        name="telefono"
        type="tel"
        autoComplete="tel"
        defaultValue={state.values?.telefono}
        error={state.fieldErrors?.telefono}
      />
      <SelectField
        label="Motivo de tu consulta"
        name="motivo"
        required
        options={MOTIVOS_CONTACTO}
        defaultValue={state.values?.motivo ?? ""}
        error={state.fieldErrors?.motivo}
      />
      <TextareaField
        label="Mensaje"
        name="mensaje"
        required
        defaultValue={state.values?.mensaje}
        error={state.fieldErrors?.mensaje}
        placeholder="Cuéntame brevemente qué te trae por aquí. No incluyas información clínica sensible: eso lo conversamos en sesión."
      />

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-anahuaca/40 bg-anahuaca/5 px-4 py-3 font-sans text-sm font-semibold text-anahuaca"
        >
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
