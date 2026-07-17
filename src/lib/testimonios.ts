/**
 * Testimonios reales y autorizados por escrito (regla 10.4: nunca
 * inventar testimonios). La sección se muestra sola cuando este arreglo
 * tiene elementos; mientras esté vacío, no se renderiza nada público.
 *
 * Para agregar uno cuando llegue la autorización, copiar la forma:
 *   { cita: "…", autora: "Madre de paciente, 6 años", contexto: "Evaluación de autismo" }
 * Usar solo iniciales o descripción genérica de la autora — nunca el
 * nombre completo de un paciente ni datos identificables de un menor.
 */

export type Testimonio = {
  cita: string;
  autora: string;
  contexto?: string;
};

export const TESTIMONIOS: Testimonio[] = [
  // [PLACEHOLDER: agregar testimonios reales cuando Daniela entregue las
  // autorizaciones escritas. Daniela confirmó que hay pacientes dispuestos.]
];
