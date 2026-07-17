import type { Metadata } from "next";
import {
  EvaluacionDetalle,
  type EvaluacionConfig,
} from "@/components/sections/EvaluacionDetalle";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evaluación de TDAH",
  description:
    "Evaluación de TDAH para niños, adolescentes y adultos con Young DIVA-5, BRIEF-2, Yellow Red y WISC-V. Entrevistas online e informe integral.",
  path: "/evaluaciones/tdah",
});

const config: EvaluacionConfig = {
  path: "/evaluaciones/tdah",
  serviceName: "Evaluación diagnóstica de TDAH",
  serviceDescription:
    "Evaluación diagnóstica de TDAH para niños, adolescentes y adultos con Young DIVA-5, BRIEF-2, Yellow Red y WISC-V. Entrevistas online e informe integral.",
  h1: "Evaluación diagnóstica de TDAH para niños, adolescentes y adultos",
  lede: "Un proceso de 3 a 4 sesiones que mira la atención y las funciones ejecutivas en serio: entrevistas online, aplicación de instrumentos estandarizados y un informe integral con orientaciones concretas.",
  paraQuien: {
    intro:
      "El TDAH se confunde fácil con flojera, desmotivación o mala conducta, y esa confusión duele. Señales que suelen motivar esta evaluación:",
    señales: [
      "A tu hijo o hija le cuesta sostener la atención en clases o tareas, aunque se esfuerza.",
      "Hay impulsividad o inquietud que interfiere en la casa o el colegio.",
      "El rendimiento es irregular: días muy buenos y días muy difíciles, sin explicación clara.",
      "El colegio sugirió una evaluación de atención o funciones ejecutivas.",
      "Eres adolescente o adulto, y la desorganización o la dificultad para concentrarte te han acompañado toda la vida.",
    ],
    cierre:
      "Evaluar no es etiquetar: es entender cómo funciona la atención de esa persona concreta, para apoyarla donde lo necesita.",
  },
  instrumentos: {
    badges: ["Young DIVA-5", "BRIEF-2", "Yellow Red (CEDETI UC)", "WISC-V"],
    texto:
      "Trabajo con instrumentos estandarizados y actualizados: entrevistas diagnósticas estructuradas, cuestionarios de funciones ejecutivas y escalas cognitivas con estandarización chilena. Un instrumento validado distingue lo que una impresión general no puede: si las dificultades de atención configuran un TDAH o responden a otra causa.",
  },
  proceso: [
    {
      title: "Entrevistas online",
      description:
        "Comenzamos por videollamada: historia escolar o laboral, contexto familiar y entrevistas diagnósticas estructuradas.",
    },
    {
      title: "Aplicación de instrumentos",
      description:
        "Cuestionarios y pruebas según la edad y el caso. Si el proceso requiere aplicación presencial, se coordina una jornada en Arica (Carlos Dittborn 0118).",
    },
    {
      title: "Análisis integral",
      description:
        "Integro los resultados con la doble mirada psicológica y fonoaudiológica: atención, funciones ejecutivas, lenguaje y emoción.",
    },
    {
      title: "Devolución e informe online",
      description:
        "Sesión de devolución por videollamada y entrega del informe. Plazo de entrega: por confirmar.",
    },
  ],
  faq: [
    {
      question: "¿Evalúas TDAH en adultos?",
      answer:
        "Sí. Trabajo con Young DIVA-5 y otros instrumentos que permiten evaluar TDAH en adolescentes y adultos, no solo en niños.",
    },
    {
      question: "¿Y si el resultado no es TDAH?",
      answer:
        "La evaluación igual entrega un perfil claro de atención, funciones ejecutivas y aprendizaje, con orientaciones concretas. A veces lo que parece TDAH tiene otra explicación, y saberlo también es una respuesta valiosa.",
    },
    {
      question: "¿Tengo que viajar a Arica?",
      answer:
        "Las entrevistas y la devolución son online. Algunas pruebas, según la edad y el caso, requieren aplicación presencial en una jornada en Arica (Carlos Dittborn 0118). Escríbeme por WhatsApp antes de reservar y te explico cómo sería el proceso para tu caso.",
    },
    {
      question: "¿Cuánto cuesta y cómo se paga?",
      answer:
        "La evaluación se cobra como proceso completo (el valor está en esta página). Reservas con un abono de $5.000 y el saldo se paga antes de comenzar. Se entrega boleta de honorarios reembolsable en Isapre y seguros complementarios.",
    },
  ],
};

export default function EvaluacionTdahPage() {
  return <EvaluacionDetalle config={config} />;
}
