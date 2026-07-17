"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/Input";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAdmin,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <InputField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-quebrada/30 bg-arena/50 px-4 py-3 font-sans text-sm font-semibold text-quebrada"
        >
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
