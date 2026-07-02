/**
 * ============================================================
 * FUNDACIÓN PUENTES DE ESPERANZA — ARCHIVO DE CONFIGURACIÓN
 * ============================================================
 * Este es el ÚNICO archivo que necesitas editar para actualizar
 * el contenido del sitio. No modifiques el HTML directamente.
 * ============================================================
 */

const CONFIG = {

  // ──────────────────────────────────────────────
  // INFORMACIÓN INSTITUCIONAL
  // ──────────────────────────────────────────────
  org: {
    name: "Proyecto Puentes de Esperanza",
    tagline: "Acompañamos. Apoyamos. Construimos futuros. Juntos, sin fronteras.",
    mision: "Brindar orientación, acompañamiento y asistencia jurídica gratuita a personas migrantes, solicitantes de refugio, refugiadas y personas en contexto de movilidad humana, garantizando el pleno ejercicio de sus derechos.",
    vision: "Ser una organización de referencia en México en la defensa y promoción de los derechos de las personas en movilidad, contribuyendo a la construcción de una sociedad más justa, inclusiva y sin fronteras.",
    valores: [
      { icono: "⚖️", titulo: "Justicia", descripcion: "Actuamos con imparcialidad y compromiso irrenunciable con los derechos humanos." },
      { icono: "🤝", titulo: "Dignidad", descripcion: "Reconocemos y respetamos la humanidad de cada persona que acompañamos." },
      { icono: "💡", titulo: "Transparencia", descripcion: "Rendimos cuentas a quienes confiaron en nosotros y a la sociedad." },
      { icono: "🌍", titulo: "Solidaridad", descripcion: "Construimos comunidad y apoyo mutuo sin distinción de origen." },
      { icono: "🔒", titulo: "Confidencialidad", descripcion: "Protegemos la información y la identidad de quienes atendemos." },
      { icono: "📚", titulo: "Profesionalismo", descripcion: "Brindamos orientación especializada, actualizada y de calidad." }
    ]
  },

  // ──────────────────────────────────────────────
  // CONTACTO
  // ──────────────────────────────────────────────
  contacto: {
    email: "puentes.esperanza.fundacion@gmail.com",
    whatsapp: "525574300159",          // número sin + ni espacios
    whatsappTexto: "Hola, necesito orientación sobre mi situación migratoria.",
    horario: "Lunes a Viernes · 9:00 – 17:00 hrs",
    direccion: "Ciudad de México, México",
    ciudad: "Ciudad de México",
    redes: {
      facebook:  "https://www.facebook.com/profile.php?id=61591408145259",
      instagram: "https://www.instagram.com/puentes.esperanza.fundacion",
      twitter:   "",
      linkedin:  "",
      youtube:   ""
    }
  },

  // ──────────────────────────────────────────────
  // CONTADORES DE IMPACTO
  // ──────────────────────────────────────────────
  impacto: [
    { numero: 500,  prefijo: "+", sufijo: "",  etiqueta: "Personas atendidas" },
    { numero: 100,  prefijo: "+", sufijo: "",  etiqueta: "Procedimientos acompañados" },
    { numero: 20,   prefijo: "+", sufijo: "",  etiqueta: "Talleres impartidos" },
    { numero: 100,  prefijo: "",  sufijo: "%", etiqueta: "Compromiso con tus derechos" }
  ],

  // ──────────────────────────────────────────────
  // SERVICIOS
  // ──────────────────────────────────────────────
  servicios: [
    {
      icono: "⚖️",
      titulo: "Asesoría Jurídica",
      descripcion: "Orientación legal especializada en derecho migratorio y de refugio, adaptada a tu situación particular."
    },
    {
      icono: "🏠",
      titulo: "Refugio",
      descripcion: "Acompañamiento integral en el proceso de solicitud de reconocimiento de la condición de refugiado ante COMAR."
    },
    {
      icono: "🌐",
      titulo: "Derechos Humanos",
      descripcion: "Defensa y promoción de los derechos fundamentales de personas migrantes y refugiadas en México."
    },
    {
      icono: "🚶",
      titulo: "Migración",
      descripcion: "Información y acompañamiento en trámites migratorios, regularización y documentación."
    },
    {
      icono: "📖",
      titulo: "Capacitación",
      descripcion: "Talleres y formación para comunidades, organizaciones y servidores públicos sobre movilidad humana."
    },
    {
      icono: "❤️",
      titulo: "Atención Humanitaria",
      descripcion: "Apoyo inmediato a personas en situación de vulnerabilidad: orientación, canalización y seguimiento."
    },
    {
      icono: "📢",
      titulo: "Incidencia",
      descripcion: "Trabajo con instituciones, academia y sociedad civil para mejorar políticas públicas en materia migratoria."
    }
  ],

  // ──────────────────────────────────────────────
  // EQUIPO
  // ──────────────────────────────────────────────
  equipo: [
    {
      nombre: "Nombre del Coordinador/a",
      cargo: "Coordinación General",
      descripcion: "Especialista en derecho migratorio y derechos humanos con amplia trayectoria en atención a personas en movilidad.",
      foto: "assets/images/equipo-placeholder.svg"
    }
  ],

  // ──────────────────────────────────────────────
  // CENTRO DE AYUDA — PREGUNTAS FRECUENTES
  // ──────────────────────────────────────────────
  faq: [
    {
      categoria: "Refugio",
      preguntas: [
        {
          pregunta: "¿Qué es la condición de refugiado?",
          respuesta: "La condición de refugiado es el reconocimiento oficial de que una persona necesita protección internacional porque en su país de origen enfrenta persecución por motivos de raza, religión, nacionalidad, género, pertenencia a determinado grupo social u opiniones políticas. En México, este reconocimiento lo otorga la Comisión Mexicana de Ayuda a Refugiados (COMAR)."
        },
        {
          pregunta: "¿Qué es la COMAR?",
          respuesta: "La Comisión Mexicana de Ayuda a Refugiados (COMAR) es la institución del gobierno mexicano encargada de recibir, procesar y resolver las solicitudes de reconocimiento de la condición de refugiado. Depende de la Secretaría de Gobernación. Tiene oficinas en Ciudad de México, Tijuana, Tapachula, Guadalajara, Monterrey y otras ciudades."
        },
        {
          pregunta: "¿Cómo puedo solicitar refugio en México?",
          respuesta: "Debes presentarte personalmente ante la COMAR dentro de los 30 días hábiles siguientes a tu ingreso al territorio mexicano o al momento en que surgieron las causas de tu solicitud. Ahí llenarás un formulario y te harán una entrevista. Es importante contar con acompañamiento jurídico para este proceso. Contáctanos y te orientamos."
        },
        {
          pregunta: "¿Puedo trabajar mientras espero la resolución de mi solicitud?",
          respuesta: "Sí. Una vez que hayas ingresado tu solicitud ante la COMAR, recibirás una constancia que te permite trabajar legalmente en México mientras se resuelve tu caso. Esta constancia debe renovarse periódicamente."
        }
      ]
    },
    {
      categoria: "Migración",
      preguntas: [
        {
          pregunta: "¿Cuáles son mis derechos como persona migrante en México?",
          respuesta: "Toda persona en México, independientemente de su situación migratoria, tiene derechos fundamentales: derecho a la vida, a la integridad personal, a la salud, a la educación (en el caso de niñas, niños y adolescentes), al debido proceso, a no ser detenida arbitrariamente y a recibir información sobre sus derechos. La Ley de Migración y la Ley sobre Refugiados garantizan estos derechos."
        },
        {
          pregunta: "¿Qué hago si fui detenido por el Instituto Nacional de Migración?",
          respuesta: "Tienes derecho a ser informado sobre los motivos de tu detención, a comunicarte con tu consulado, a tener un intérprete si no hablas español, y a recibir asesoría jurídica. Comunícate con nosotros de inmediato; podemos acompañarte en este proceso."
        }
      ]
    }
  ],

  // ──────────────────────────────────────────────
  // NOTICIAS (máximo 6 noticias recientes)
  // ──────────────────────────────────────────────
  noticias: [
    {
      titulo: "Nueva jornada de orientación jurídica gratuita",
      fecha: "2025-06-15",
      resumen: "Realizamos nuestra jornada mensual de orientación donde atendimos a más de 40 personas en situación de movilidad humana.",
      imagen: "assets/images/noticia-placeholder.svg",
      enlace: "#"
    }
  ],

  // ──────────────────────────────────────────────
  // TRANSPARENCIA
  // ──────────────────────────────────────────────
  transparencia: [
    {
      categoria: "Informes de actividades",
      archivos: [
        { nombre: "Informe Anual 2024", archivo: "documents/informe-2024.pdf" }
      ]
    },
    {
      categoria: "Convenios y alianzas",
      archivos: []
    },
    {
      categoria: "Donantes",
      archivos: []
    }
  ],

  // ──────────────────────────────────────────────
  // TESTIMONIOS (siempre anónimos)
  // ──────────────────────────────────────────────
  testimonios: [
    {
      texto: "Llegué sin saber nada sobre el proceso de refugio. Gracias al equipo de Puentes de Esperanza entendí mis derechos y hoy tengo mi condición reconocida. Me dieron esperanza cuando más lo necesitaba.",
      persona: "M.A., persona refugiada",
      pais: "Venezuela"
    },
    {
      texto: "El acompañamiento fue humanizado desde el primer momento. No me sentí un número ni un caso; me sentí una persona.",
      persona: "K.R., solicitante de refugio",
      pais: "Honduras"
    },
    {
      texto: "Puentes de Esperanza es exactamente lo que su nombre dice: un puente hacia un futuro digno.",
      persona: "J.T., persona migrante",
      pais: "Cuba"
    }
  ]

};

// Exportar para uso en módulos (si se usa bundler futuro)
if (typeof module !== 'undefined') module.exports = CONFIG;
