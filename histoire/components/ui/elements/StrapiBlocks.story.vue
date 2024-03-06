<script setup>
const content = ref([
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "Términos y Condiciones de Talently",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: 'La utilización de la plataforma Talently.tech ("Plataforma Talently") está sujeta a los siguientes Términos y Condiciones. Pueden tener implicaciones en sus derechos y responsabilidades. Si no está de acuerdo con estos Términos y Condiciones, le solicitamos que se abstenga de utilizar Talently.',
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "1. Descripción del Servicio:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Talently opera como un motor de búsqueda de talento tech que facilita la conexión entre empresas y candidatos previamente curados y técnicamente validados. Con una sólida base de talento tech latinoamericano en crecimiento, nos enorgullece ofrecer una amplia diversidad de perfiles validados técnicamente para satisfacer las diversas necesidades de nuestros clientes. Para asegurar un proceso eficiente y preciso, implementamos tecnologías avanzadas y contamos con un equipo de soporte especializado dedicado a brindar asistencia y asegurar que tanto empresas como candidatos experimenten un flujo transparente a lo largo de su interacción en la plataforma.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Contamos con dos tipos de suscripciones: Lite y Pro.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [{ bold: true, text: "Propuesta de Valor:", type: "text" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Nuestro compromiso es proporcionar una base de talento respaldada por la calidad de nuestros perfiles y la eficacia de nuestros procesos, en aras de fomentar conexiones exitosas entre talento y oportunidades laborales.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [{ bold: true, text: "2. Perfiles Aceptados:", type: "text" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "En suscripciones Lite tenemos disponibilidad de perfiles tech, lo cual incluye pero no se limita a Front-end, Back-end, Data, Devops, Web3, QA, y Mobile. En suscripción PRO también consideramos perfiles como UX/UI Designers, Product Managers, Product Owners, IT management (CTO, Tech Lead, Arquitecto de Software), y otros como Cloud Engineers y Data Analysts/Bi, en menor medida.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Es importante destacar que nos reservamos el derecho de rechazar ofertas que no cumplan con los estándares mínimos del mercado. Nos referimos a salarios inadecuadamente bajos o condiciones de búsqueda excepcionalmente particulares.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "3. Proceso de Admisión de Ofertas:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Nuestro riguroso proceso de admisión asegura que las ofertas que se publiquen en nuestra plataforma cumplan con los más altos estándares de calidad. Evaluamos meticulosamente la coherencia interna entre la oferta y las necesidades del mercado, garantizando así que solo las ofertas que complementan nuestro ecosistema de talento tech sean aceptadas. Buscamos construir una comunidad donde la excelencia y la alineación estratégica sean fundamentales.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [{ bold: true, text: "4. Envío de Candidatos:", type: "text" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Nos comprometemos a ofrecer el envío de perfiles de candidatos cualificados y alineados con las vacantes de las empresas. Gracias a nuestras avanzadas recomendaciones de inteligencia artificial, proporcionamos opciones de candidatos que cumplen con los requisitos específicos de cada empresa de manera inmediata. Esta rapidez y precisión son fundamentales para agilizar el proceso de contratación y satisfacer las necesidades dinámicas del mercado laboral tech.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "En nuestro proceso de evaluación técnica, los candidatos realizan un test basado en una evaluación de opción múltiple. Esta evaluación tiene como objetivo validar técnica y objetivamente las habilidades de los usuarios en relación con el lenguaje o tecnología específica que describen en su perfil. Los puntajes obtenidos durante este proceso pueden ser utilizados como guía de referencia para evaluar las competencias técnicas de los perfiles, sin embargo, es importante destacar que estos resultados no son determinantes de manera exclusiva.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Las preguntas formuladas durante la evaluación se orientan a",
        type: "text",
      },
    ],
  },
  {
    type: "list",
    format: "unordered",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "Conocimientos básicos en la sintaxis del lenguaje o tecnología a ser evaluada",
            type: "text",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Conocimientos de aplicación práctica del lenguaje o tecnología a ser evaluada",
            type: "text",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Conceptos teóricos en relación al uso de funciones, métodos y aplicaciones propias del lenguaje en cuestión.",
            type: "text",
          },
        ],
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "4.1 Envío de Candidatos en Suscripción PRO:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "En nuestra suscripción PRO asignamos un Tech Recruiter Specialist (TRS) dedicado a cada empresa cliente. Este TRS no solo se basa en nuestras avanzadas recomendaciones de inteligencia artificial, sino que también realiza un proceso de sourcing para identificar y enviar candidatos calificados y alineados con los requisitos específicos de cada vacante. Inicialmente se enviará una terna de candidatos.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "5. Derecho de Cancelar su Suscripción:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Nos reservamos el derecho de cancelar su suscripción de manera inmediata en caso de incumplimiento de cualquiera de sus obligaciones bajo estos Términos y Condiciones.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Puede anular su suscripción en cualquier momento antes del proceso de pago directamente a través de la Plataforma Talently. En caso de que no se solicite la cancelación antes de la fecha de cobro, esta se llevará a cabo de forma automática y no se efectuarán reembolsos.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "6. Soporte de la Plataforma de Talently:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "En nuestro compromiso de brindar una experiencia excepcional, contamos con un equipo de soporte dedicado y accesible. Estamos aquí para atender cualquier pregunta, proporcionar asistencia técnica o resolver cualquier inquietud que puedan tener nuestros usuarios, ya sean talentos o empresas. Nuestro objetivo es asegurar una experiencia fluida y satisfactoria en cada paso de su interacción con nuestra plataforma.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "En determinadas ocasiones, podremos restringir su acceso a Talently para llevar a cabo labores de reparación, mantenimiento o para introducir nuevas aplicaciones o servicios. Durante estas restricciones temporales, trabajaremos diligentemente para restablecer el servicio tan pronto como sea viable.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      {
        bold: true,
        text: "7. Política de Devolución en Suscripción PRO:",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Entendemos la importancia de la satisfacción y transparencia en nuestros servicios. Por lo tanto, ofrecemos una política de devolución que respalda a las empresas. Si, por alguna razón, el Tech Recruiter Specialist (TRS) no ha enviado ningún candidato dentro de la primera semana desde la publicación de la oferta, brindamos la opción de solicitar un reembolso. Cualquier solicitud de devolución debe realizarse dentro de la segunda semana posterior a la publicación de la oferta para garantizar una experiencia justa y satisfactoria para todas las partes involucradas. Esta política subraya nuestro compromiso con la entrega de resultados concretos y la creación de relaciones sólidas con nuestras empresas asociadas.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [{ bold: true, text: "8. Uso Aceptable:", type: "text" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Los usuarios y empresas están obligados a utilizar Talently.tech de manera ética. Cualquier infracción de estos términos puede dar lugar a la suspensión o cancelación de la cuenta. Se espera que los usuarios ejerzan un juicio responsable y respeten los principios éticos fundamentales al interactuar con nuestra plataforma. Nos reservamos el derecho de tomar medidas adecuadas en caso de conducta inapropiada, abuso o cualquier actividad que viole nuestros estándares y políticas. La integridad y el cumplimiento son fundamentales para mantener un entorno positivo y seguro para todos los usuarios de Talently.tech.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Es fundamental destacar que la revisión de los candidatos debe ocurrir exclusivamente a través de la plataforma designada. En otras palabras, si se le envían candidatos, estos serán proporcionados a través de ese medio específico. La intención es asegurar una gestión eficiente y transparente del proceso de selección. Por lo tanto, es responsabilidad del destinatario revisar y evaluar los perfiles directamente en la plataforma, evitando posibles malentendidos o inconvenientes derivados de la revisión fuera de dicho entorno.",
        type: "text",
      },
    ],
  },
  { type: "paragraph", children: [{ text: "", type: "text" }] },
  {
    type: "paragraph",
    children: [
      { bold: true, text: "9. Cambios en los Términos:", type: "text" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Nos reservamos el derecho de realizar cambios en estos términos y condiciones en cualquier momento. Notificaremos a los usuarios sobre cambios significativos.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Al utilizar nuestros servicios, aceptas estos términos y condiciones. Para obtener más detalles sobre nuestra política de privacidad y otros aspectos, visita nuestras páginas correspondientes.",
        type: "text",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Fecha de última actualización: [20/02/24]",
        type: "text",
      },
    ],
  },
]);
</script>

<template>
  <Story
    title="elements/StrapiBlocks"
    icon="vscode-icons:file-type-vue"
    autoPropsDisabled
  >
    <UStrapiBlocks :content="content" class="text-sm p-6" />
  </Story>
</template>
