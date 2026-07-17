/**
 * Testimonios reales y autorizados por escrito (regla 10.4: nunca
 * inventar testimonios). La sección se muestra sola cuando este arreglo
 * tiene elementos; mientras esté vacío, no se renderiza nada público.
 *
 * Para agregar uno cuando llegue la autorización, copiar la forma:
 *   { cita: "…", autora: "Patricia", contexto: "Proceso de psicoterapia" }
 * Requiere autorización escrita de la persona. Usar nombre de pila (o
 * iniciales) — nunca el apellido ni datos que identifiquen a un paciente,
 * y con especial cuidado si es o pudo ser menor de edad.
 */

export type Testimonio = {
  cita: string;
  autora: string;
  contexto?: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    cita: "Gracias por acompañarme durante este proceso, por creer en mí cuando me costaba hacerlo, por entregarme tanto cariño y paciencia. Llegué en un momento muy difícil de mi vida, con muchos miedos e inseguridades, y gracias a tu calidez, tu escucha y tu forma de guiarme fui aprendiendo a mirarme con más compasión, a aprender herramientas y estrategias que voy a poder usar a lo largo de mi vida, y pude volver a reconocerme. Sé que estará ese lugar seguro al que volver cuando lo necesite, y también te agradezco por eso.",
    autora: "Patricia",
    contexto: "Proceso de psicoterapia",
  },
  {
    cita: "Me he sentido muy bien, confío más en mí, me dan ganas de decir lo que siento y no me guardo las cosas. Me siento optimista e inspirada a recibir las oportunidades o dificultades con optimismo y no con angustia, aunque todo esto lleve un proceso y tenga que seguir trabajándolo. Noté el cambio cuando recibí el temario de la PAES: lo tomé bien, no me angustié ni pensé en negativo, solo sentí que tenía que estudiar y prepararme. Muchas gracias por todo.",
    autora: "V.",
    contexto: "Proceso de psicoterapia",
  },
  {
    cita: "Quisiera agradecer el tiempo dedicado para mejorar mi estado anímico mediante la sesión de radiestesia. En una palabra diría plenitud: volví a sentirme con energía y con la capacidad para continuar avanzando hacia mis objetivos. ¡Muchas gracias!",
    autora: "Felipe",
    contexto: "Sesión de radiestesia",
  },
];
