import type { Metadata } from "next";
import {
  EvaluacionDetalle,
  type EvaluacionConfig,
} from "@/components/sections/EvaluacionDetalle";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evaluación de lenguaje",
  description:
    "Evaluación de lenguaje infantil con CELF-5 e IDETEL, y una mirada que une fonoaudiología y psicología. Entrevistas online e informe integral.",
  path: "/evaluaciones/lenguaje",
});

const config: EvaluacionConfig = {
  path: "/evaluaciones/lenguaje",
  serviceName: "Evaluación de lenguaje",
  serviceDescription:
    "Evaluación de lenguaje y comunicación infantil con CELF-5 e IDETEL, integrando la mirada fonoaudiológica y psicológica en un mismo proceso.",
  h1: "Evaluación de lenguaje y comunicación para niños y niñas",
  lede: "Un proceso de 3 a 4 sesiones que evalúa cómo tu hijo o hija comprende, se expresa y se comunica, con la ventaja de una sola especialista que es fonoaudióloga y psicóloga a la vez.",
  paraQuien: {
    intro:
      "“Habla poco”, “no se le entiende”, “entiende todo pero no habla”: si alguna de estas frases te suena, esta evaluación es para tu familia. Señales frecuentes:",
    señales: [
      "Tu hijo o hija habla menos —o de forma menos clara— que otros niños de su edad.",
      "Le cuesta seguir instrucciones o comprender lo que se le dice.",
      "Se frustra al no poder expresar lo que quiere o siente.",
      "El jardín o el colegio sugirió una evaluación fonoaudiológica.",
      "Dudas si lo que ves es un tema de lenguaje, de desarrollo o emocional — y no sabes por dónde partir.",
    ],
    cierre:
      "Esa última duda es la más común, y es justo la que esta evaluación responde: aquí no tienes que elegir entre fonoaudióloga o psicóloga, porque la mirada es una sola.",
  },
  instrumentos: {
    badges: ["CELF-5", "IDETEL", "PROMPT Nivel I"],
    texto:
      "Uso instrumentos estandarizados de referencia para evaluar el lenguaje infantil. Un instrumento validado permite saber si lo que observas corresponde al rango esperado para la edad o si necesita apoyo, y de qué tipo. Y como el lenguaje nunca va solo, el análisis integra también lo cognitivo y lo emocional.",
  },
  proceso: [
    {
      title: "Entrevistas online",
      description:
        "Comenzamos por videollamada: historia del desarrollo, contexto familiar y escolar, y preocupaciones concretas.",
    },
    {
      title: "Aplicación de instrumentos",
      description:
        "Evaluación del lenguaje según la edad y el caso. Si el proceso requiere aplicación presencial, se coordina una jornada en Arica (Carlos Dittborn 0118).",
    },
    {
      title: "Análisis integral",
      description:
        "Integro lo comunicativo con lo cognitivo y lo emocional: una sola mirada sobre el desarrollo completo.",
    },
    {
      title: "Devolución e informe online",
      description:
        "Sesión de devolución por videollamada y entrega del informe. Plazo de entrega: por confirmar.",
    },
  ],
  faq: [
    {
      question: "¿Fonoaudióloga o psicóloga? ¿A quién debo consultar primero?",
      answer:
        "A veces la respuesta es ambas, y por eso esta evaluación existe: soy fonoaudióloga y psicóloga, así que el proceso mira el lenguaje, la cognición y la emoción sin que tengas que coordinar dos especialistas.",
    },
    {
      question: "¿Qué pasa después de la evaluación?",
      answer:
        "Recibes una devolución clara y un informe con orientaciones concretas: qué apoyar, cómo y con quién. El informe sirve de insumo para el jardín, el colegio y otros especialistas.",
    },
    {
      question: "¿Tengo que viajar a Arica?",
      answer:
        "Las entrevistas y la devolución son online. Algunas pruebas, según la edad y el caso, requieren aplicación presencial en una jornada en Arica (Carlos Dittborn 0118). Escríbeme por WhatsApp antes de reservar y lo conversamos.",
    },
    {
      question: "¿Cuánto cuesta y cómo se paga?",
      answer:
        "La evaluación se cobra como proceso completo (el valor está en esta página). Reservas con un abono de $5.000 y el saldo se paga antes de comenzar. Se entrega boleta de honorarios reembolsable en Isapre y seguros complementarios.",
    },
  ],
};

export default function EvaluacionLenguajePage() {
  return <EvaluacionDetalle config={config} />;
}
