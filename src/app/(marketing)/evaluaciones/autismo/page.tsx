import type { Metadata } from "next";
import {
  EvaluacionDetalle,
  type EvaluacionConfig,
} from "@/components/sections/EvaluacionDetalle";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evaluación de autismo",
  description:
    "Evaluación diagnóstica de autismo desde los 2 años con ADOS-2, ADI-R y mirada integral: entrevistas online, jornada presencial en Arica e informe completo.",
  path: "/evaluaciones/autismo",
});

const config: EvaluacionConfig = {
  path: "/evaluaciones/autismo",
  serviceName: "Evaluación diagnóstica de autismo",
  serviceDescription:
    "Evaluación diagnóstica de autismo desde los 2 años, con ADOS-2, ADI-R, AMSE y M-CHAT-R/F. Entrevistas online, jornada presencial de observación en Arica e informe integral.",
  h1: "Evaluación diagnóstica de autismo para niños, niñas, adolescentes y adultos",
  lede: "Desde los 2 años y en cualquier etapa de la vida. Un proceso de 3 a 4 sesiones que combina entrevistas online, una jornada presencial de observación en Arica y un informe que integra la mirada psicológica y fonoaudiológica.",
  paraQuien: {
    intro:
      "Muchas familias llegan a esta evaluación con preguntas que llevan tiempo dando vueltas. Algunas señales que suelen motivar la consulta:",
    señales: [
      "Tu hijo o hija se comunica o juega de una forma distinta a la de otros niños de su edad.",
      "El jardín o el colegio sugirió una evaluación del desarrollo.",
      "Hay poca respuesta al nombre, poco contacto visual o rutinas muy difíciles de flexibilizar.",
      "El lenguaje tardó en aparecer, o se perdieron palabras que ya usaba.",
      "Eres adolescente o adulto y te reconoces en descripciones del espectro autista, y quieres una respuesta seria.",
    ],
    cierre:
      "Consultar no significa adelantar un diagnóstico: significa mirar con calma lo que está pasando, con instrumentos serios y sin alarmismo.",
  },
  instrumentos: {
    badges: ["ADOS-2", "ADI-R", "AMSE", "M-CHAT-R/F"],
    texto:
      "Estoy certificada en los instrumentos de referencia internacional para la evaluación del autismo. ¿Por qué importa? Porque un instrumento estandarizado compara las observaciones con criterios validados en miles de casos, y eso hace que el resultado sea confiable para tu familia, el colegio y otros profesionales. La Ley TEA 21.545 hizo más necesario que nunca contar con evaluaciones bien hechas.",
  },
  proceso: [
    {
      title: "Entrevistas online",
      description:
        "Comenzamos por videollamada: historia del desarrollo, preocupaciones de la familia y aplicación de entrevistas estructuradas como el ADI-R.",
    },
    {
      title: "Jornada presencial en Arica",
      description:
        "Una jornada de observación directa (ADOS-2) en Carlos Dittborn 0118, Arica, la sede de jornadas presenciales de evaluación.",
    },
    {
      title: "Análisis integral",
      description:
        "Integro los resultados de todos los instrumentos con la doble mirada psicológica y fonoaudiológica.",
    },
    {
      title: "Devolución e informe online",
      description:
        "Sesión de devolución por videollamada y entrega del informe. Plazo de entrega: por confirmar.",
    },
  ],
  faq: [
    {
      question: "¿Desde qué edad se puede evaluar?",
      answer:
        "Desde los 2 años. También evalúo adolescentes y adultos que buscan una respuesta en esta etapa de su vida.",
    },
    {
      question: "¿Y si el resultado no es autismo?",
      answer:
        "El proceso igual entrega respuestas: un perfil claro de fortalezas y necesidades de apoyo, y orientaciones concretas para la familia y el colegio. Ninguna evaluación seria promete un diagnóstico de antemano.",
    },
    {
      question: "¿Tengo que viajar a Arica?",
      answer:
        "Las entrevistas y la devolución son online. La observación directa con ADOS-2 sí requiere presencialidad, y se concentra en una sola jornada en Arica (Carlos Dittborn 0118). Si viajar es difícil para tu familia, escríbeme por WhatsApp antes de reservar y conversamos honestamente tu situación.",
    },
    {
      question: "¿Qué incluye el informe?",
      answer:
        "Un informe integral que une la mirada psicológica y la fonoaudiológica: resultados, conclusiones y orientaciones. Sirve de insumo para el colegio y otros especialistas.",
    },
    {
      question: "¿Cuánto cuesta y cómo se paga?",
      answer:
        "La evaluación se cobra como proceso completo (el valor está en esta página). Reservas con un abono de $5.000 y el saldo se paga antes de comenzar. Se entrega boleta de honorarios reembolsable en Isapre y seguros complementarios.",
    },
  ],
};

export default function EvaluacionAutismoPage() {
  return <EvaluacionDetalle config={config} />;
}
