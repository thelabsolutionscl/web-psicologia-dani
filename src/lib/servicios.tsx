import {
  Activity,
  Baby,
  BookOpen,
  Brain,
  CloudRain,
  Compass,
  Flame,
  Flower2,
  HandHeart,
  Handshake,
  Heart,
  HeartHandshake,
  HeartPulse,
  House,
  Leaf,
  MessageCircle,
  MessagesSquare,
  Mic,
  Moon,
  Mountain,
  Presentation,
  Puzzle,
  Scale,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  Sprout,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import type { ServicioConfig } from "@/components/sections/ServicioDetalle";
import { PRECIOS } from "@/lib/site";

/**
 * Contenido de las páginas de servicio (bajo /servicios). Cada entrada
 * alimenta <ServicioDetalle/>. Textos definidos por Daniela (ajustes 2026).
 */
export const SERVICIOS: Record<string, ServicioConfig> = {
  psicoterapia: {
    slug: "psicoterapia",
    emoji: "🧠",
    eyebrow: "Psicoterapia",
    title: "Un espacio para comprender, sanar y crecer",
    lede: "Acompaño a niñas, niños, adolescentes, adultos y familias desde un enfoque integrativo, basado en evidencia y centrado en la persona.",
    areasTitulo: "¿A quién acompaño?",
    areas: [
      {
        icon: Smile,
        title: "Niños y adolescentes",
        description:
          "Regulación emocional, ansiedad y autoestima, conducta y habilidades sociales, neurodiversidad, dificultades escolares y trauma infantil.",
      },
      {
        icon: Users,
        title: "Adultos",
        description:
          "Ansiedad y estrés, crisis vitales, duelo y procesos de pérdida, autoestima, trauma y desarrollo personal.",
      },
      {
        icon: HeartHandshake,
        title: "Familias",
        description:
          "Crianza respetuosa, orientación parental, comunicación familiar, límites y convivencia, y acompañamiento en neurodiversidad.",
      },
    ],
    areasCols: "sm:grid-cols-3",
    enfoqueTitulo: "Mi enfoque integrativo",
    pilares: [
      {
        icon: Brain,
        title: "Basado en evidencia",
        description: "Estrategias con respaldo científico actualizado.",
      },
      {
        icon: Puzzle,
        title: "Mirada integral",
        description:
          "Considera las dimensiones emocional, cognitiva, relacional y del desarrollo.",
      },
      {
        icon: Heart,
        title: "Acompañamiento personalizado",
        description:
          "Cada proceso es único; se adapta a tu historia, necesidades y objetivos.",
      },
      {
        icon: Shield,
        title: "Espacio seguro",
        description: "Un lugar de confianza para expresarte, ser escuchado/a y crecer.",
      },
    ],
    destacado: {
      title: "Acompañamiento especializado en duelo",
      description:
        "Un acompañamiento respetuoso del ritmo de cada persona — cada duelo es único —, en sesiones online que dan lugar al dolor y también a la reconstrucción.",
      badges: ["Certificación CESIST 2025", "Clínica del Duelo 2025"],
    },
    modalidad:
      "Sesiones online para todo Chile, con horarios de tarde y cupos limitados.",
    faq: [
      {
        question: "¿La terapia infantil funciona online?",
        answer:
          "Sí, con un encuadre adaptado a la edad y un trabajo cercano con la familia: parte del proceso es con el niño o la niña y parte con los adultos que lo acompañan.",
      },
      {
        question: "¿Cuánto cuesta y cómo se paga?",
        answer:
          "Cada sesión vale $45.000. Reservas con un abono de $5.000 y el saldo se paga antes de la sesión, con boleta reembolsable en Isapre y seguros complementarios.",
      },
    ],
    serviceName: "Psicoterapia online",
    serviceDescription:
      "Psicoterapia infanto-juvenil, de adultos y acompañamiento en duelo, online en todo Chile.",
  },

  fonoaudiologia: {
    slug: "fonoaudiologia",
    emoji: "💬",
    eyebrow: "Fonoaudiología",
    title: "Comunicación, lenguaje y aprendizaje en cada etapa",
    lede: "Evaluación e intervención en habla, lenguaje, comunicación y aprendizaje para niñas, niños, adolescentes y adultos, promoviendo el desarrollo de habilidades comunicativas en cada etapa de la vida.",
    areas: [
      {
        icon: MessageCircle,
        title: "Habla y articulación",
        description:
          "Dificultades en la pronunciación de sonidos y claridad del habla.",
      },
      {
        icon: BookOpen,
        title: "Lenguaje oral y escrito",
        description:
          "Retrasos del lenguaje, comprensión, expresión y desarrollo del lenguaje.",
      },
      {
        icon: MessagesSquare,
        title: "Comunicación",
        description:
          "Habilidades comunicativas, pragmática, interacción social y comunicación funcional.",
      },
      {
        icon: BookOpen,
        title: "Aprendizaje",
        description:
          "Conciencia fonológica, lectoescritura y apoyo en dificultades académicas.",
      },
      {
        icon: Activity,
        title: "Voz y deglución",
        description:
          "Trastornos de la voz, cuidados vocales y dificultades de deglución.",
      },
      {
        icon: Puzzle,
        title: "Neurodiversidad",
        description:
          "Apoyo comunicativo en TEA, TDAH y otras condiciones del neurodesarrollo.",
      },
    ],
    enfoqueTitulo: "Cómo trabajo",
    pilares: [
      {
        icon: Compass,
        title: "Enfoque integral y personalizado",
        description:
          "Cada proceso se adapta a las necesidades, fortalezas y objetivos de la persona.",
      },
      {
        icon: Users,
        title: "En todas las etapas",
        description: "Niñas, niños, adolescentes, adultos y personas mayores.",
      },
      {
        icon: ShieldCheck,
        title: "Basado en evidencia",
        description:
          "Estrategias efectivas y actualizadas para potenciar la comunicación y el aprendizaje.",
      },
      {
        icon: Handshake,
        title: "Trabajo colaborativo",
        description:
          "Coordinación con familias, escuelas y otros profesionales para favorecer el desarrollo integral.",
      },
    ],
    modalidad:
      "Atención online para todo Chile. Las evaluaciones que requieren observación directa se coordinan en una jornada presencial en Arica.",
    serviceName: "Fonoaudiología",
    serviceDescription:
      "Evaluación e intervención fonoaudiológica en habla, lenguaje, comunicación y aprendizaje, online en todo Chile.",
  },

  "orientacion-familiar": {
    slug: "orientacion-familiar",
    emoji: "👨‍👩‍👧",
    eyebrow: "Orientación Familiar",
    title: "Fortalecer los vínculos y la convivencia familiar",
    lede: "Acompañamiento a madres, padres y cuidadores para fortalecer los vínculos, la parentalidad positiva, el desarrollo infantil y la convivencia familiar.",
    areas: [
      {
        icon: HeartHandshake,
        title: "Parentalidad positiva",
        description: "Estrategias para criar con respeto, conexión y límites claros.",
      },
      {
        icon: Sprout,
        title: "Desarrollo infantil",
        description:
          "Orientación sobre etapas del desarrollo, autonomía y habilidades socioemocionales.",
      },
      {
        icon: MessagesSquare,
        title: "Convivencia familiar",
        description:
          "Mejora de la comunicación, resolución de conflictos y clima familiar.",
      },
      {
        icon: Puzzle,
        title: "Neurodiversidad",
        description:
          "Acompañamiento a familias de niños y niñas con TEA, TDAH y otras condiciones del neurodesarrollo.",
      },
      {
        icon: Compass,
        title: "Transiciones y desafíos",
        description:
          "Separaciones, nuevos hermanos, adolescencia y otros cambios importantes.",
      },
    ],
    enfoqueTitulo: "Por qué acompañarte aquí",
    pilares: [
      {
        icon: Heart,
        title: "Fortalecemos vínculos",
        description: "Promovemos relaciones más seguras, afectivas y respetuosas.",
      },
      {
        icon: HandHeart,
        title: "Acompañamiento personalizado",
        description: "Cada familia es única; adaptamos las estrategias a sus necesidades.",
      },
      {
        icon: ShieldCheck,
        title: "Basado en evidencia",
        description: "Enfoques actualizados en crianza y desarrollo infantil.",
      },
      {
        icon: Users,
        title: "Para todos los cuidadores",
        description:
          "Madres, padres, abuelos, tutores y cuidadores significativos.",
      },
    ],
    modalidad:
      "Sesiones por videollamada para todo Chile, flexibles, confidenciales y adaptadas a tu realidad familiar.",
    serviceName: "Orientación familiar",
    serviceDescription:
      "Acompañamiento a madres, padres y cuidadores en parentalidad positiva, desarrollo infantil y convivencia familiar, online en todo Chile.",
  },

  perinatal: {
    slug: "perinatal",
    emoji: "🤰",
    eyebrow: "Psicología Perinatal y Lactancia Materna",
    title: "Acompañamiento en el camino a la maternidad",
    lede: "Acompañamiento durante el embarazo, el posparto, la maternidad, la paternidad y la lactancia, promoviendo el bienestar emocional de la madre, el bebé y la familia.",
    areas: [
      {
        icon: Baby,
        title: "Embarazo",
        description:
          "Acompañamiento emocional en cada etapa: cambios, miedos, ansiedades y preparación.",
      },
      {
        icon: Heart,
        title: "Posparto",
        description:
          "Apoyo en la adaptación física y emocional, prevención y abordaje de la depresión posparto.",
      },
      {
        icon: HeartHandshake,
        title: "Maternidad y paternidad",
        description:
          "Acompañamiento en la transición a la maternidad y paternidad: vínculo, roles y nuevas dinámicas.",
      },
      {
        icon: Flower2,
        title: "Lactancia",
        description:
          "Apoyo emocional en la lactancia materna: dudas, desafíos y proceso de destete.",
      },
      {
        icon: Moon,
        title: "Duelo perinatal",
        description:
          "Acompañamiento en pérdidas gestacionales o neonatales desde una mirada respetuosa.",
      },
      {
        icon: Sprout,
        title: "Vínculo temprano",
        description:
          "Fortalecimiento del vínculo madre-bebé y adaptación emocional a la nueva etapa familiar.",
      },
      {
        icon: HeartPulse,
        title: "Ansiedad y miedos",
        description:
          "Acompañamiento en ansiedad prenatal, miedos al parto, crianza y bienestar emocional general.",
      },
      {
        icon: Users,
        title: "Red de apoyo familiar",
        description:
          "Orientación para fortalecer la comunicación, roles y apoyo dentro de la familia y la pareja.",
      },
    ],
    enfoqueTitulo: "Cómo te acompaño",
    pilares: [
      {
        icon: HandHeart,
        title: "Escucha y contención",
        description: "Un espacio seguro para expresar lo que sientes, sin juicios.",
      },
      {
        icon: Puzzle,
        title: "Enfoque integral",
        description: "Considero tus emociones, tu historia y tus necesidades únicas.",
      },
      {
        icon: Sprout,
        title: "Bienestar emocional",
        description: "Promuevo tu bienestar para que disfrutes cada etapa del proceso.",
      },
      {
        icon: Heart,
        title: "Acompañamiento respetuoso",
        description: "Respeto tu ritmo, tus decisiones y tu historia.",
      },
    ],
    modalidad:
      "Sesiones online para todo Chile, con horarios de tarde y cupos limitados.",
    serviceName: "Psicología perinatal y lactancia materna",
    serviceDescription:
      "Acompañamiento psicológico en embarazo, posparto, maternidad, paternidad y lactancia, online en todo Chile.",
  },

  "terapia-integral": {
    slug: "terapia-integral",
    emoji: "🌿",
    eyebrow: "Terapia Integral y Desarrollo Personal",
    title: "Un espacio para reconectarte contigo",
    lede: "Un espacio para el autoconocimiento y el crecimiento personal que integra herramientas de distintas disciplinas, adaptadas a tus necesidades y objetivos.",
    areasTitulo: "Herramientas que integro",
    areas: [
      {
        icon: Sparkles,
        title: "Psicología Transpersonal",
        description:
          "Exploramos tu propósito de vida, valores y conexión profunda contigo mismo.",
      },
      {
        icon: Compass,
        title: "Terapia Gestalt",
        description:
          "Toma de conciencia del aquí y ahora para integrar emociones, pensamientos y acciones.",
      },
      {
        icon: Brain,
        title: "Programación Neurolingüística (PNL)",
        description:
          "Herramientas para transformar patrones mentales y potenciar tu comunicación.",
      },
      {
        icon: Leaf,
        title: "Mindfulness",
        description:
          "Prácticas para cultivar presencia, reducir el estrés y mejorar tu bienestar.",
      },
      {
        icon: Compass,
        title: "Radiestesia",
        description:
          "Herramienta de exploración y equilibrio energético para apoyar procesos personales.",
      },
      {
        icon: Sparkles,
        title: "Armonización de Chakras",
        description:
          "Equilibrio energético para favorecer el bienestar físico, emocional y espiritual.",
      },
      {
        icon: Heart,
        title: "Liberación Emocional",
        description:
          "Técnicas para identificar, liberar y transformar emociones que limitan tu bienestar.",
      },
      {
        icon: Zap,
        title: "EFT Tapping",
        description:
          "Método para liberar bloqueos emocionales y reducir estrés y ansiedad.",
      },
      {
        icon: Flower2,
        title: "Flores de Bach",
        description:
          "Apoyo emocional natural que ayuda a recuperar el equilibrio y la armonía interna.",
      },
    ],
    enfoqueTitulo: "Mi enfoque",
    pilares: [
      {
        icon: Puzzle,
        title: "Integral",
        description: "Considero tu cuerpo, emociones, mente y espíritu en cada proceso.",
      },
      {
        icon: HandHeart,
        title: "Personalizado",
        description: "Cada camino es único; acompaño desde tus necesidades y objetivos.",
      },
      {
        icon: Heart,
        title: "Respetuoso",
        description: "Un espacio seguro para ti, sin juicios, a tu ritmo y tiempo.",
      },
      {
        icon: Sprout,
        title: "Transformador",
        description:
          "Te acompaño a desarrollar herramientas para una vida más consciente y plena.",
      },
    ],
    modalidad:
      "Sesiones online para todo Chile, cómodas, flexibles y confidenciales.",
    aviso:
      "La terapia integral y las prácticas complementarias (radiestesia, Flores de Bach, mindfulness, entre otras) están orientadas al bienestar y al desarrollo personal. No constituyen un diagnóstico ni un tratamiento psicológico, fonoaudiológico o médico, y no reemplazan la atención clínica que cada uno de esos ámbitos requiere.",
    serviceName: "Terapia integral y desarrollo personal",
    serviceDescription:
      "Acompañamiento complementario de bienestar y crecimiento personal, online en todo Chile.",
  },

  capacitaciones: {
    slug: "capacitaciones",
    emoji: "🎓",
    eyebrow: "Capacitaciones y Asesorías",
    title: "Prácticas inclusivas y neuroafirmativas para equipos",
    lede: "Acompañamiento a equipos educativos y de salud en el desarrollo de prácticas inclusivas y neuroafirmativas, con herramientas basadas en evidencia para comprender, acompañar y potenciar el desarrollo de personas neurodivergentes y sus familias.",
    intro:
      "Desde mi experiencia en inclusión educativa, brindo relatorías y capacitaciones a instituciones públicas y privadas que desean fortalecer sus prácticas inclusivas desde un enfoque de derechos, participación y basado en evidencia.",
    areasTitulo: "Áreas de capacitación",
    areas: [
      {
        icon: Puzzle,
        title: "Neurodiversidad e infancias",
        description:
          "Comprensión y valoración de las neurodivergencias (TEA, TDAH, TDL y otras) en distintos contextos.",
      },
      {
        icon: Users,
        title: "Inclusión y accesibilidad",
        description:
          "Diseño universal, ajustes razonables y eliminación de barreras para la participación.",
      },
      {
        icon: MessagesSquare,
        title: "Comunicación y convivencia",
        description:
          "Comunicación respetuosa, gestión de conflictos y promoción de climas inclusivos.",
      },
      {
        icon: Compass,
        title: "Estrategias inclusivas",
        description:
          "Prácticas y metodologías para apoyar el aprendizaje y la participación de todas las personas.",
      },
      {
        icon: Heart,
        title: "Bienestar socioemocional",
        description:
          "Autorregulación, habilidades socioemocionales y cuidado de los equipos y comunidades.",
      },
      {
        icon: Scale,
        title: "Normativa y enfoque de derechos",
        description:
          "Marco legal de inclusión, convenciones y buenas prácticas institucionales.",
      },
    ],
    enfoqueTitulo: "Modalidades",
    pilares: [
      {
        icon: Presentation,
        title: "Talleres y capacitaciones",
        description: "Presenciales, online o mixtas.",
      },
      {
        icon: Mic,
        title: "Charlas y conferencias",
        description: "Sensibilización y formación en terreno.",
      },
      {
        icon: Handshake,
        title: "Asesorías y acompañamiento",
        description: "Procesos de mejora continua e implementación.",
      },
      {
        icon: Sparkles,
        title: "Diseño a medida",
        description: "Contenidos adaptados a las necesidades de cada institución.",
      },
    ],
    precio: PRECIOS.capacitacionPrimeraReunion,
    precioNota: "primera reunión (diagnóstico / levantamiento de necesidades)",
    modalidad:
      "Dirigido a municipios, centros de salud, establecimientos educativos, organizaciones sociales, empresas y cualquier institución que promueva entornos más inclusivos. Las sesiones posteriores se ajustan a la duración, alcance y objetivos del servicio requerido.",
    ctaLabel: "Solicitar orientación",
    serviceName: "Capacitaciones y asesorías",
    serviceDescription:
      "Capacitaciones y asesorías en inclusión, neurodiversidad y desarrollo, para equipos educativos y de salud.",
  },

  "primeros-auxilios": {
    slug: "primeros-auxilios",
    emoji: "🫶",
    eyebrow: "Primeros Auxilios Psicológicos",
    title: "Contención y apoyo inmediato en situaciones de crisis",
    lede: "Formación e intervención para reconocer, contener y acompañar a personas en situaciones de crisis o eventos estresantes, con herramientas prácticas basadas en evidencia y un enfoque humano.",
    intro:
      "Los primeros auxilios psicológicos (PAP) buscan reducir el impacto emocional producido por una situación crítica y promover la seguridad y la calma en los primeros momentos después del evento.",
    areasTitulo: "Atención en situaciones de crisis",
    areas: [
      {
        icon: House,
        title: "Terremotos",
        description: "Contención tras sismos y sus réplicas.",
      },
      {
        icon: Waves,
        title: "Tsunamis y marejadas",
        description: "Apoyo emocional frente a eventos costeros.",
      },
      {
        icon: Flame,
        title: "Incendios",
        description: "Acompañamiento ante pérdidas y evacuaciones.",
      },
      {
        icon: CloudRain,
        title: "Aluviones y temporales",
        description: "Contención frente a lluvias, vientos y aluviones.",
      },
      {
        icon: Mountain,
        title: "Erupciones volcánicas",
        description: "Apoyo en emergencias volcánicas y evacuaciones.",
      },
      {
        icon: Heart,
        title: "Duelo y emergencias psicosociales",
        description:
          "Acompañamiento en duelo, eventos traumáticos y crisis psicosociales.",
      },
    ],
    enfoqueTitulo: "Cómo ayudan los PAP",
    pilares: [
      {
        icon: HandHeart,
        title: "Escuchar, apoyar y conectar",
        description: "Estar presente puede marcar la diferencia.",
      },
      {
        icon: Activity,
        title: "En los primeros momentos",
        description: "Se entregan justo después del evento, cuando más se necesitan.",
      },
      {
        icon: ShieldCheck,
        title: "Reducir el impacto",
        description: "Su objetivo es reducir el impacto emocional y promover la seguridad.",
      },
      {
        icon: Users,
        title: "Al alcance de todas las personas",
        description: "No se requiere ser terapeuta para brindar contención básica.",
      },
    ],
    modalidad:
      "Contención, escucha activa y orientación para brindar apoyo inicial oportuno, empático y respetuoso, cuidando la dignidad y los recursos de cada persona. Disponible como intervención y como formación para comunidades, equipos e instituciones.",
    ctaLabel: "Solicitar orientación",
    serviceName: "Primeros auxilios psicológicos",
    serviceDescription:
      "Contención y apoyo psicológico inmediato en situaciones de crisis, duelo y emergencias, y formación para equipos y comunidades.",
  },
};

export const SERVICIO_SLUGS = Object.keys(SERVICIOS);

/** Tarjetas para el hub /servicios y otros índices. */
export const SERVICIOS_INDEX = [
  {
    title: "🧠 Psicoterapia",
    description:
      "Psicoterapia infanto-juvenil, de adultos y familias, y acompañamiento especializado en duelo.",
    href: "/servicios/psicoterapia",
  },
  {
    title: "🧩 Evaluación Diagnóstica y Neurodesarrollo",
    description:
      "Evaluación de autismo, TDAH, lenguaje y otras condiciones del neurodesarrollo, con instrumentos estandarizados.",
    href: "/evaluaciones",
  },
  {
    title: "💬 Fonoaudiología",
    description:
      "Habla, lenguaje, comunicación, aprendizaje, voz y deglución en cada etapa de la vida.",
    href: "/servicios/fonoaudiologia",
  },
  {
    title: "👨‍👩‍👧 Orientación Familiar",
    description:
      "Parentalidad positiva, desarrollo infantil y convivencia familiar para madres, padres y cuidadores.",
    href: "/servicios/orientacion-familiar",
  },
  {
    title: "🤰 Psicología Perinatal y Lactancia Materna",
    description:
      "Embarazo, posparto, maternidad, paternidad y lactancia, cuidando el bienestar de la madre, el bebé y la familia.",
    href: "/servicios/perinatal",
  },
  {
    title: "🌿 Terapia Integral y Desarrollo Personal",
    description:
      "Autoconocimiento y crecimiento personal integrando herramientas complementarias de bienestar.",
    href: "/servicios/terapia-integral",
  },
  {
    title: "🫶 Primeros Auxilios Psicológicos",
    description:
      "Contención y apoyo inmediato en crisis, duelo y emergencias psicosociales, e intervención en situaciones críticas.",
    href: "/servicios/primeros-auxilios",
  },
  {
    title: "📋 IVADEC-CIF (MINSAL – COMPIN)",
    description:
      "Aplicación del Instrumento de Valoración y Desempeño en Comunidad e informe técnico para la certificación de discapacidad.",
    href: "/servicios/ivadec",
  },
  {
    title: "🎓 Capacitaciones y Asesorías",
    description:
      "Formación en inclusión y prácticas neuroafirmativas para equipos educativos y de salud.",
    href: "/servicios/capacitaciones",
  },
];
