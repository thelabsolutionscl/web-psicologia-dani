"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Tema = "light" | "dark";

/**
 * Botón para alternar tema claro/oscuro. La preferencia se guarda en
 * localStorage ("tema") y se aplica como data-theme en <html>. El script
 * en línea del layout ya fijó el tema antes del primer pintado (sin
 * parpadeo); aquí solo lo sincronizamos y permitimos cambiarlo.
 */
export function ThemeToggle() {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    const actual =
      (document.documentElement.dataset.theme as Tema | undefined) ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTema(actual);
  }, []);

  function alternar() {
    const siguiente: Tema = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {
      // Modo privado sin almacenamiento: el cambio vale para esta sesión.
    }
    setTema(siguiente);
  }

  // Antes de montar no sabemos el tema: botón accesible sin ícono para
  // evitar desajustes de hidratación.
  const esOscuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? "Activar tema claro" : "Activar tema oscuro"}
      title={esOscuro ? "Tema claro" : "Tema oscuro"}
      className="inline-flex size-11 items-center justify-center rounded-full text-quebrada/80 transition-colors hover:bg-arena/60 hover:text-enlace"
    >
      {tema === null ? (
        <span className="size-5" aria-hidden="true" />
      ) : esOscuro ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
