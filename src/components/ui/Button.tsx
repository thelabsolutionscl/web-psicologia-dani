import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "invertido";

/* Targets táctiles ≥ 44 px (min-h-11) y foco visible vía :focus-visible global. */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-sans text-base font-semibold transition-colors";

const variants: Record<Variant, string> = {
  // anahuaca: reservado a botones primarios (sección 8)
  primary: "bg-anahuaca text-white hover:bg-anahuaca/90",
  secondary: "bg-pacifico text-white hover:bg-pacifico/90",
  outline:
    "border border-pacifico text-enlace hover:bg-pacifico hover:text-white",
  // Para fondos oscuros (banda CtaFinal): superficie clara FIJA (no cambia
  // con el tema, porque la banda es oscura en claro y en oscuro).
  invertido: "bg-[#f8f2ed] text-anahuaca hover:bg-[#fff]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
