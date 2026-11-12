(function(){
  "use strict";
  var root = document.documentElement;
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = mqReduce.matches || root.classList.contains('a11y-motion');

  /* ============================================================
     I18N — Spanish (default) / English dictionary + toggle.
     Every key that appears in cms/content/schema.php is editable in the
     Content Manager (/admin); values edited there are published into
     index.html as an inert JSON block (#siteContent) and merged below.
     tools/extract-defaults.mjs regenerates cms/content/defaults.php from
     this object, so this is the single source of the approved copy.
     ============================================================ */
  var I18N = {
    es: {
      "meta.title": "Cardumen · Agencia de marketing y publicidad en Guatemala",
      "meta.description": "Agencia de marketing en Guatemala: estrategia, redes sociales, publicidad digital, branding, sitios web y video, con reportes mensuales de resultados.",
      "og.locale": "es_GT",
      "brand.aria": "Cardumen, ir al inicio",
      "lang.toggle_aria": "Cambiar idioma a inglés",
      "lang.switch_to": "English",
      "menu.open_aria": "Abrir menú",
      "menu.close_aria": "Cerrar menú",
      "mobilenav.aria": "Menú principal",
      "skip": "Saltar al contenido",
      "backtotop.aria": "Volver arriba",
      "a11y.new_tab": " (se abre en una pestaña nueva)",
      "a11y.open_aria": "Opciones de accesibilidad",
      "a11y.close": "Listo",
      "a11y.size_small": "Texto normal",
      "a11y.size_medium": "Texto grande",
      "a11y.size_large": "Texto muy grande",
      "actions.call": "Llamar",
      "actions.whatsapp": "WhatsApp",
      "actions.directions": "Cómo llegar",
      "actions.aria": "Acciones rápidas",
      "whatsapp.aria": "Escríbanos por WhatsApp (se abre en una pestaña nueva)",
      "contact.map_aria": "Abrir la ubicación de la oficina en Google Maps (se abre en una pestaña nueva)",
      "nav.services": "Servicios",
      "nav.maternity": "Caso destacado",
      "nav.facilities": "Estudio",
      "nav.patients": "Cómo trabajamos",
      "nav.insurance": "Inversión",
      "nav.contact": "Contacto",
      "nav.emergency": "Llamar",
      "hero.eyebrow": "Agencia de marketing y publicidad",
      "hero.title": "Estrategia, creatividad y datos para <em>hacer crecer</em> su marca",
      "hero.desc": "Planificamos, producimos y medimos el marketing de empresas guatemaltecas. Un solo equipo se ocupa de la estrategia, el contenido y la publicidad, y le presenta resultados cada mes.",
      "hero.cta1": "Agendar una reunión",
      "hero.cta2": "Escribir por WhatsApp",
      "hero.status": "Agenda abierta para nuevos proyectos",
      "hero.badge1": "Diagnóstico inicial sin costo",
      "hero.badge2": "Reportes mensuales",
      "hero.badge3": "Contratos sin plazo forzoso",
      "quick.emergency": "Llamar a la agencia",
      "quick.whatsapp": "WhatsApp directo",
      "quick.visits": "Horario de atención",
      "quick.directions": "Cómo llegar",
      "quick.aria": "Información rápida",
      "stat1.value": "12",
      "stat1.label": "años de trayectoria",
      "stat2.value": "140",
      "stat2.label": "marcas atendidas",
      "stat3.value": "26",
      "stat3.label": "especialistas en el equipo",
      "stat4.value": "9",
      "stat4.label": "sectores de experiencia",
      "services.eyebrow": "Servicios",
      "services.title": "Todo su marketing, con un mismo equipo",
      "services.desc": "Cada servicio puede contratarse por separado o integrarse en un plan mensual. En ambos casos trabajamos con objetivos definidos, un calendario aprobado por usted y un reporte de resultados.",
      "services.cta": "Consultar por WhatsApp",
      "services.more": "Ver más",
      "services.more_aria": "Ver más sobre {name}",
      "services.call": "Llamar",
      "services.close": "Cerrar",
      "service1.title": "Estrategia de marketing",
      "service1.desc": "Diagnóstico, objetivos, público y plan de acción con presupuesto y calendario.",
      "service1.more": "Antes de publicar o invertir en publicidad, definimos hacia dónde va su marca. Revisamos su situación actual, su competencia y el comportamiento de sus clientes.\n\nEl resultado es un plan de marketing con objetivos medibles, canales recomendados, presupuesto y calendario trimestral.\n\nEl plan es suyo: puede ejecutarlo con nuestro equipo o con el de su empresa.",
      "service2.title": "Redes sociales",
      "service2.desc": "Planificación, diseño, redacción y publicación de contenido, con atención a su comunidad.",
      "service2.more": "Administramos sus perfiles con un calendario mensual que usted aprueba antes de publicar.\n\nEl servicio incluye la línea gráfica, la redacción, la programación de publicaciones y la respuesta a comentarios y mensajes en horario hábil.\n\nCada mes recibe un reporte con alcance, interacción y las publicaciones que mejor funcionaron.",
      "service3.title": "Publicidad digital",
      "service3.desc": "Campañas en buscadores y redes sociales, con seguimiento de conversiones y costo por resultado.",
      "service3.more": "Planificamos y administramos campañas en buscadores, redes sociales y video, según donde se encuentre su público.\n\nConfiguramos la medición de conversiones para saber cuántos contactos o ventas genera cada campaña y a qué costo.\n\nLa inversión publicitaria se paga directamente a cada plataforma, con su propia cuenta, y usted conserva el acceso y el historial.",
      "service4.title": "Branding e identidad",
      "service4.desc": "Nombre, logotipo, paleta, tipografía y manual de marca para aplicar su identidad con consistencia.",
      "service4.more": "Construimos o renovamos la identidad de su marca a partir de una etapa de investigación: a quién le habla, qué la distingue y cómo quiere ser percibida.\n\nLe presentamos propuestas de logotipo, colores y tipografía, y las aplicamos en piezas reales antes de decidir.\n\nAl finalizar recibe los archivos editables y un manual de marca.",
      "service5.title": "Sitios web y páginas de campaña",
      "service5.desc": "Sitios rápidos y fáciles de administrar, diseñados para convertir visitas en contactos.",
      "service5.more": "Diseñamos sitios web y páginas de campaña con una estructura clara, textos orientados a la acción y formularios que llegan a su correo o a su CRM.\n\nCada sitio se entrega optimizado para teléfonos, con medición de visitas y conversiones.\n\nTambién revisamos sitios existentes y proponemos mejoras por prioridad.",
      "service6.title": "SEO y contenidos",
      "service6.desc": "Posicionamiento en buscadores con mejoras técnicas, artículos y contenido útil para su público.",
      "service6.more": "Mejoramos la visibilidad de su sitio en los buscadores con una auditoría técnica, una investigación de palabras clave y un plan de contenidos.\n\nRedactamos artículos y páginas que responden a lo que sus clientes buscan.\n\nEl posicionamiento orgánico es un trabajo constante: le informamos cada mes el avance en posiciones y visitas.",
      "service7.title": "Producción audiovisual",
      "service7.desc": "Fotografía de producto, video para redes y piezas publicitarias producidas en estudio o en locación.",
      "service7.more": "Contamos con estudio propio y equipo de producción para fotografía de producto, retratos corporativos y video.\n\nPlanificamos cada sesión con un guion y una lista de tomas, para aprovechar el tiempo y obtener material para varios meses.\n\nEntregamos las piezas editadas en los formatos de cada red social.",
      "service8.title": "Correo y automatización",
      "service8.desc": "Boletines, secuencias automáticas y segmentación de su base de contactos.",
      "service8.more": "Diseñamos boletines y secuencias automáticas para dar seguimiento a sus contactos: bienvenida, recordatorios y recompra.\n\nOrdenamos y segmentamos su base de datos para enviar a cada grupo el mensaje que le corresponde.\n\nMedimos aperturas, clics y ventas atribuidas a cada envío.",
      "service9.title": "Analítica y reportes",
      "service9.desc": "Tableros con los indicadores de su marketing, actualizados y explicados en lenguaje claro.",
      "service9.more": "Configuramos la medición de su sitio, sus campañas y sus redes en un solo tablero.\n\nDefinimos con usted los indicadores que importan para su negocio y dejamos fuera los que solo distraen.\n\nCada mes revisamos los resultados en una reunión y acordamos los ajustes.",
      "service10.title": "Relaciones públicas e influencia",
      "service10.desc": "Gestión de medios, comunicados y colaboraciones con creadores de contenido afines a su marca.",
      "service10.more": "Preparamos comunicados y gestionamos la relación con medios para lanzamientos y noticias de su empresa.\n\nIdentificamos creadores de contenido afines a su público, negociamos las colaboraciones y supervisamos las publicaciones.\n\nCada colaboración se formaliza por escrito y se reporta con sus resultados.",
      "service11.title": "Eventos y activaciones",
      "service11.desc": "Lanzamientos, ferias y activaciones de marca, desde el concepto hasta el montaje.",
      "service11.more": "Diseñamos y producimos lanzamientos de producto, presencia en ferias y activaciones en puntos de venta.\n\nNos ocupamos del concepto, los materiales, el personal y la logística, con un presupuesto detallado.\n\nDocumentamos el evento en fotografía y video para sus redes.",
      "maternity.eyebrow": "Caso destacado",
      "maternity.title": "Café Nubarrón: de la tostaduría a la <em>tienda en línea</em>",
      "maternity.desc": "Una tostaduría de café de especialidad vendía solo en su local. En seis meses renovamos su identidad, lanzamos su tienda en línea y organizamos sus campañas. Hoy la venta en línea representa una tercera parte de sus ingresos.",
      "maternity.cta": "Solicitar una propuesta",
      "projects.cta": "Descargar el caso en PDF",
      "projects.cta_aria": "Descargar el caso de estudio en PDF",
      "mfeat1.title": "Ventas en línea: +68 %",
      "mfeat1.desc": "Crecimiento de las ventas de la tienda en línea entre el primer y el sexto mes.",
      "mfeat2.title": "Costo por compra: −34 %",
      "mfeat2.desc": "Reducción del costo publicitario por compra tras reorganizar las campañas.",
      "mfeat3.title": "Suscriptores: 2,400",
      "mfeat3.desc": "Clientes inscritos al boletín mensual, que genera una de cada cinco compras.",
      "mfeat4.title": "Identidad renovada",
      "mfeat4.desc": "Nuevo empaque, fotografía de producto y manual de marca para todos los puntos de venta.",
      "bag.title": "Prepare su primera reunión",
      "bag.desc": "Marque lo que ya tiene a la mano. Con esta información, el diagnóstico es más preciso.",
      "bag1": "Objetivo principal para este año",
      "bag2": "Presupuesto mensual aproximado",
      "bag3": "Acceso a sus redes sociales y a su sitio web",
      "bag4": "Logotipo y manual de marca, si existen",
      "bag5": "Resultados de campañas anteriores",
      "bag6": "Descripción de su cliente ideal",
      "bag7": "Tres competidores de referencia",
      "bag8": "Fechas importantes de su negocio",
      "bag9": "",
      "bag10": "",
      "bag.note": "Si le falta algún punto, lo definimos juntos en la reunión.",
      "bag.progress": "{n} de {total} listos",
      "about.eyebrow": "Quiénes somos",
      "about.title": "Un equipo que responde por los resultados",
      "about.desc": "Cardumen es una agencia guatemalteca de marketing y publicidad. Reunimos en un mismo equipo a estrategas, diseñadores, redactores, productores y analistas, para que su marca tenga un solo interlocutor. Trabajamos con objetivos acordados por escrito, calendarios que usted aprueba y reportes que explican qué funcionó, qué no y qué proponemos hacer.",
      "about.art_caption": "Estrategia, contenido y medición en un mismo equipo.",
      "about.mission_title": "Nuestro propósito",
      "about.mission_desc": "Ayudar a las empresas a crecer con un marketing ordenado, creativo y medible.",
      "about.vision_title": "Nuestro compromiso",
      "about.vision_desc": "Informar con claridad, cumplir los plazos acordados y recomendar solo lo que su negocio necesita.",
      "why.title": "Por qué elegirnos",
      "why1": "Objetivos por escrito",
      "why2": "Un ejecutivo de cuenta asignado",
      "why3": "Calendario aprobado por usted",
      "why4": "Reporte mensual de resultados",
      "why5": "Sus cuentas siempre a su nombre",
      "why6": "Producción propia",
      "projects.eyebrow": "El estudio",
      "projects.title": "Producimos el contenido en casa",
      "projects.desc": "Contamos con estudio y equipo propios para fotografía, video y diseño. Eso nos permite cumplir los calendarios y mantener la misma calidad en cada pieza.",
      "projects.view_details": "Ver fotos",
      "proj1.tag": "Estudio",
      "proj1.title": "Fotografía de producto",
      "proj1.desc": "Set con iluminación controlada para catálogo, comercio electrónico y redes sociales.",
      "proj2.tag": "Video",
      "proj2.title": "Producción de video",
      "proj2.desc": "Cámaras, iluminación y audio para anuncios, testimonios y video corporativo.",
      "proj3.tag": "Redes",
      "proj3.title": "Contenido para redes",
      "proj3.desc": "Formatos verticales grabados y editados para cada plataforma.",
      "proj4.tag": "Audio",
      "proj4.title": "Cabina de pódcast",
      "proj4.desc": "Grabación de pódcast y locuciones con tratamiento acústico.",
      "proj5.tag": "Diseño",
      "proj5.title": "Mesa de diseño",
      "proj5.desc": "Identidad de marca, empaque y piezas publicitarias, del boceto al archivo final.",
      "proj6.tag": "Estrategia",
      "proj6.title": "Sala de planificación",
      "proj6.desc": "Sesiones de trabajo con clientes para definir objetivos, públicos y calendarios.",
      "amen.title": "Capacidades del equipo",
      "amen1.title": "Investigación de mercado",
      "amen1.desc": "Encuestas, entrevistas y análisis de competencia.",
      "amen2.title": "Redacción publicitaria",
      "amen2.desc": "Textos para anuncios, sitios web y redes sociales.",
      "amen3.title": "Diseño gráfico",
      "amen3.desc": "Piezas digitales e impresas con su línea gráfica.",
      "amen4.title": "Animación",
      "amen4.desc": "Gráficos en movimiento para video y anuncios.",
      "amen5.title": "Fotografía",
      "amen5.desc": "Producto, gastronomía, espacios y retrato.",
      "amen6.title": "Edición de video",
      "amen6.desc": "Edición, color y subtítulos en cada formato.",
      "amen7.title": "Compra de medios",
      "amen7.desc": "Planificación y compra de publicidad digital.",
      "amen8.title": "Medición",
      "amen8.desc": "Etiquetas, conversiones y tableros de control.",
      "amen9.title": "Desarrollo web",
      "amen9.desc": "Sitios, tiendas en línea y páginas de campaña.",
      "amen10.title": "Automatización",
      "amen10.desc": "Correo, formularios y seguimiento de contactos.",
      "amen11.title": "Atención a la comunidad",
      "amen11.desc": "Respuesta a mensajes y comentarios en horario hábil.",
      "amen12.title": "Capacitación",
      "amen12.desc": "Talleres para equipos de ventas y mercadeo.",
      "projects.modal_close": "Cerrar",
      "projects.modal_prev": "Foto anterior",
      "projects.modal_next": "Foto siguiente",
      "projects.modal_dots_aria": "Elegir foto",
      "projects.modal_goto_slide": "Ir a la foto {n}",
      "projects.modal_image_of": "Foto {n} de {total}",
      "projects.modal_photo_alt": "Foto {n} de {title}",
      "projects.modal_placeholder_note": "Aún no hay fotografías de este espacio.",
      "process.eyebrow": "Cómo trabajamos",
      "process.title": "Un proceso claro, de la primera reunión al reporte",
      "process1.title": "Diagnóstico",
      "process1.desc": "Revisamos su marca, sus canales y sus resultados actuales, y escuchamos sus objetivos.",
      "process2.title": "Plan y propuesta",
      "process2.desc": "Le presentamos un plan con objetivos, acciones, calendario y costos por escrito.",
      "process3.title": "Producción y ejecución",
      "process3.desc": "Producimos el contenido, lanzamos las campañas y atendemos sus canales.",
      "process4.title": "Medición y ajustes",
      "process4.desc": "Cada mes revisamos los resultados con usted y ajustamos el plan.",
      "patients.eyebrow": "Clientes",
      "patients.title": "Información para nuestros clientes",
      "patients.desc": "Lo que conviene saber antes de contratar, durante la primera reunión y en el trabajo de cada mes. Si tiene dudas, llámenos en horario de atención.",
      "patients.tab1": "Antes de contratar",
      "patients.tab2": "Primera reunión",
      "patients.tab3": "Trabajo mensual",
      "patients.tabs_aria": "Información para clientes",
      "visits.title": "Horario de atención",
      "visits.hours_text": "Lun–Vie 8:30–17:30",
      "visits.open": "Abierto ahora",
      "visits.closed": "Cerrado en este momento",
      "visits.next": "Abrimos: {time}",
      "visits.until": "Hasta las {time}",
      "guide1": "Defina un objetivo concreto: más contactos, más ventas en línea o mayor reconocimiento.",
      "guide2": "Considere por separado los honorarios de la agencia y la inversión en publicidad.",
      "guide3": "Solicite que las cuentas publicitarias y los perfiles queden a nombre de su empresa.",
      "guide4": "Pregunte qué incluye el plan y qué se cotiza aparte.",
      "guide5": "Pida ver reportes de ejemplo para conocer cómo se le informará.",
      "guide6": "Los resultados orgánicos toman de tres a seis meses; la publicidad muestra datos desde las primeras semanas.",
      "guide7": "",
      "guide8": "",
      "guide9": "",
      "guide10": "",
      "visit1": "La primera reunión dura alrededor de 45 minutos y puede ser presencial o por videollamada.",
      "visit2": "Participan un estratega y el ejecutivo de cuenta que le atenderá.",
      "visit3": "Revisamos sus canales actuales y le compartimos las primeras observaciones.",
      "visit4": "No es necesario preparar una presentación: basta con la información de la lista.",
      "visit5": "En un plazo de cinco días hábiles recibe la propuesta por escrito.",
      "visit6": "",
      "visit7": "",
      "visit8": "",
      "mat1": "Cada mes le enviamos el calendario de contenido para su aprobación antes de publicar.",
      "mat2": "Su ejecutivo de cuenta responde en horario hábil, en un plazo máximo de un día.",
      "mat3": "El reporte mensual se entrega en los primeros cinco días hábiles del mes.",
      "mat4": "Revisamos los resultados con usted en una reunión mensual y acordamos los ajustes.",
      "mat5": "Puede ajustar o cancelar su plan con 30 días de aviso.",
      "mat6": "",
      "ext.title": "Contactos directos",
      "ext1.label": "Cuentas nuevas",
      "ext2.label": "Atención a clientes",
      "ext3.label": "Producción",
      "ext4.label": "Facturación",
      "insurance.eyebrow": "Inversión",
      "insurance.title": "Formas de trabajar con nosotros",
      "insurance.desc": "Puede contratar un plan mensual, un proyecto con alcance y precio definidos o una asesoría por horas. Antes de iniciar, recibe una propuesta por escrito con lo que incluye cada opción.",
      "insurance.insurers_title": "Sectores en los que trabajamos",
      "insurance.insurers_desc": "Conocemos el público, las temporadas y la regulación publicitaria de estos sectores.",
      "insurance.missing": "¿Su sector no aparece? Conversemos.",
      "banks.title": "Modalidades",
      "pay.title": "Formas de pago",
      "pay1": "Factura mensual con crédito de 15 días",
      "pay2": "Transferencia o depósito bancario",
      "pay3": "Tarjeta de crédito o débito",
      "pay4": "Proyectos: 50 % al iniciar y 50 % al entregar",
      "pay5": "Descuento por contrato anual",
      "pay6": "",
      "pay7": "",
      "pay8": "",
      "ctabanner.title": "¿Conversamos sobre su marca?",
      "ctabanner.desc": "Agende una reunión de diagnóstico sin costo o escríbanos por WhatsApp. Le respondemos en horario de atención.",
      "ctabanner.cta": "Llamar ahora",
      "contact.eyebrow": "Contacto",
      "contact.title": "Cuéntenos sobre su proyecto",
      "contact.desc": "Escríbanos o llámenos para agendar una reunión, solicitar una propuesta o resolver sus dudas. Le respondemos en horario de atención.",
      "contact.label_address": "Dirección",
      "contact.label_phone": "Teléfonos",
      "contact.label_email": "Correo",
      "contact.label_hours": "Horario",
      "contact.label_social": "Redes sociales",
      "contact.hours_value": "Lunes a viernes 8:30–17:30",
      "contact.map_open": "Abrir en Google Maps",
      "contact.vcard": "Guardar contacto",
      "contact.vcard_aria": "Guardar el contacto de Cardumen en su teléfono (archivo vCard)",
      "contact.waze": "Abrir en Waze",
      "contact.map_load": "Ver mapa aquí",
      "contact.map_note": "Al mostrar el mapa, Google recibe su dirección IP.",
      "contact.map_frame": "Mapa de la ubicación de la oficina",
      "contact.phone_main": "Principal",
      "contact.phone_direct": "Directo",
      "form.title": "Envíenos un mensaje",
      "form.privacy_hint": "Por su privacidad, no incluya contraseñas ni datos bancarios en este formulario.",
      "form.name_label": "Nombre completo",
      "form.name_err": "Ingrese su nombre completo.",
      "form.phone_label": "Teléfono",
      "form.phone_err": "Ingrese un número de teléfono válido.",
      "form.email_label": "Correo electrónico",
      "form.email_err": "Ingrese un correo electrónico válido.",
      "form.service_label": "¿En qué podemos ayudarle?",
      "form.opt_placeholder": "Seleccione una opción",
      "form.opt_maternity": "Plan mensual de marketing",
      "form.opt_surgery": "Redes sociales",
      "form.opt_emergency": "Publicidad digital",
      "form.opt_specialist": "Branding o identidad de marca",
      "form.opt_lab": "Sitio web o tienda en línea",
      "form.opt_insurance": "Producción de foto o video",
      "form.opt_other": "Otro",
      "form.service_err": "Seleccione una opción.",
      "form.message_label": "Su mensaje",
      "form.message_err": "Escriba un poco más (mínimo 10 caracteres).",
      "form.optional": "(opcional)",
      "form.choose": "Seleccione una opción",
      "form.err_required": "Complete este campo.",
      "form.err_choose": "Elija una opción.",
      "form.err_number": "Ingrese un número válido.",
      "form.err_date": "Elija una fecha válida.",
      "form.consent_label": "Acepto que usen mis datos solo para responder a mi solicitud, según el Aviso de Privacidad.",
      "form.consent_err": "Necesitamos su autorización para responderle.",
      "form.hp_label": "No completar este campo",
      "form.submit": "Enviar mensaje",
      "form.note": "Usaremos sus datos únicamente para responder a su solicitud. Consulte nuestro <a href=\"privacy-notice.html\">Aviso de Privacidad</a>.",
      "form.fallback": "¿Prefiere no usar el formulario? Comuníquese por <a href=\"tel:+50200000000\">teléfono</a>, <a href=\"mailto:hola@cardumen.example\">correo</a> o <a href=\"https://wa.me/50200000000\" target=\"_blank\" rel=\"noopener noreferrer\">WhatsApp</a>.",
      "form.status_sending": "Enviando…",
      "form.status_ok": "¡Gracias! Recibimos su mensaje y le contactaremos pronto.",
      "form.status_invalid": "Revise los campos marcados antes de enviar.",
      "form.status_error": "Hubo un problema al enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp.",
      "form.status_rate_limited": "Ha enviado varias solicitudes en poco tiempo. Espere unos minutos e intente de nuevo.",
      "form.status_offline": "Parece que no tiene conexión a internet. Revise su conexión e intente de nuevo.",
      "form.status_timeout": "El envío tardó demasiado. Revise su conexión e intente de nuevo.",
      "form.status_verifying": "Verificando que no es un robot…",
      "form.status_captcha": "No pudimos completar la verificación anti-spam. Recargue la página e intente de nuevo, o escríbanos por WhatsApp.",
      "form.status_turnstile": "Complete la verificación de seguridad y vuelva a enviar.",
      "form.captcha_idle": "Protegido contra spam con verificación automática.",
      "form.captcha_pending": "Verificación anti-spam en curso…",
      "form.captcha_ok": "Verificación anti-spam completa.",
      "form.captcha_error": "No se pudo cargar la verificación anti-spam. Recargue la página.",
      "faq.eyebrow": "Preguntas frecuentes",
      "faq.title": "Preguntas frecuentes",
      "faq.q1": "¿Cuánto cuesta trabajar con la agencia?",
      "faq.a1": "Los planes mensuales inician en Q 4,500 más IVA. Los proyectos puntuales, como una identidad de marca o un sitio web, se cotizan según su alcance. La inversión en publicidad se paga aparte, directamente a cada plataforma.",
      "faq.q2": "¿Existe un plazo mínimo de contrato?",
      "faq.a2": "No hay plazo forzoso. Recomendamos evaluar los resultados después de tres meses, y puede ajustar o cancelar su plan con 30 días de aviso.",
      "faq.q3": "¿En cuánto tiempo se ven resultados?",
      "faq.a3": "La publicidad pagada genera datos desde las primeras semanas. El crecimiento orgánico en redes y buscadores suele tomar de tres a seis meses de trabajo constante.",
      "faq.q4": "¿Quién es el dueño de las cuentas y del contenido?",
      "faq.a4": "Su empresa. Los perfiles, las cuentas publicitarias, los archivos de diseño y el material producido quedan a su nombre y se le entregan si termina el servicio.",
      "faq.q5": "¿Cuánto debería invertir en publicidad?",
      "faq.a5": "Depende de su objetivo y de su sector. En el diagnóstico le presentamos una recomendación con el resultado esperado para distintos niveles de inversión.",
      "faq.q6": "¿Cómo se aprueban las publicaciones?",
      "faq.a6": "Cada mes recibe el calendario con los textos y los diseños. Nada se publica sin su aprobación, y puede solicitar cambios dentro del plazo acordado.",
      "faq.q7": "¿Trabajan con empresas fuera de la capital?",
      "faq.a7": "Sí. Atendemos a clientes de todo el país por videollamada, y coordinamos visitas para las sesiones de fotografía y video.",
      "faq.q8": "¿Qué recibo en el reporte mensual?",
      "faq.a8": "Un resumen de los indicadores acordados, las acciones realizadas, lo que funcionó y lo que no, y las recomendaciones para el mes siguiente.",
      "a11y.title": "Accesibilidad",
      "a11y.desc": "Ajuste el sitio a su comodidad. Sus preferencias se guardan en este dispositivo.",
      "a11y.text_size": "Tamaño del texto",
      "a11y.contrast": "Alto contraste",
      "a11y.motion": "Reducir animaciones",
      "a11y.links": "Subrayar enlaces",
      "a11y.spacing": "Texto más espaciado",
      "a11y.reset": "Restablecer",
      "footer.about_desc": "Agencia de marketing y publicidad en la Ciudad de Guatemala. Estrategia, contenido, publicidad digital y medición de resultados.",
      "footer.links_heading": "Navegación",
      "footer.services_heading": "Servicios",
      "footer.contact_heading": "Contacto",
      "footer.privacy_link": "Aviso de Privacidad",
      "footer.rights": "Todos los derechos reservados.",
      "footer.made_by": "Sitio administrado por TeraDevs",
      "notice.text": "",
      "notice.close": "Cerrar aviso",
      "notice.label": "Aviso",
      "doctors.eyebrow": "Casos",
      "doctors.title": "Trabajo reciente y sus resultados",
      "doctors.desc": "Busque por marca, sector o servicio. Cada caso resume el reto, lo que hicimos y el resultado obtenido.",
      "doctors.cta": "WhatsApp",
      "doctors.search_label": "Buscar caso",
      "doctors.search_ph": "Marca, sector o servicio",
      "doctors.filter_aria": "Filtrar por sector",
      "doctors.all": "Todos",
      "doctors.empty": "No encontramos casos con esa búsqueda.",
      "doctors.license": "Resultado",
      "doctors.hours": "Servicios",
      "doctors.insurers": "Periodo",
      "doctors.request": "Solicitar algo similar",
      "doctors.wa_msg": "Hola, vi el caso de {name} ({specialty}) en el sitio de {site} y quisiera algo similar para mi empresa.",
      "doctors.results": "{n} casos",
      "doctors.result1": "1 caso",
      "appt.eyebrow": "Reunión",
      "appt.title": "",
      "appt.desc": "Elija el servicio de su interés y la fecha que prefiere. Le llamaremos para confirmar la hora y si la reunión será presencial o por videollamada.",
      "appt.submit": "Solicitar reunión",
      "appt.ok": "Gracias. Recibimos su solicitud y le llamaremos para confirmar la fecha y la hora de la reunión.",
      "appt.specialty_label": "Servicio o sector de interés",
      "appt.doctor_label": "Caso de referencia",
      "appt.doctor_any": "Ninguno en particular",
      "appt.date_label": "Fecha preferida",
      "appt.time_label": "Horario preferido",
      "appt.time_morning": "Mañana",
      "appt.time_afternoon": "Tarde",
      "appt.time_any": "Cualquiera",
      "req.name_label": "Nombre completo",
      "req.phone_label": "Teléfono",
      "req.email_label": "Correo electrónico",
      "req.notes_label": "Comentarios",
      "req.health_notice": "Por su privacidad, no incluya contraseñas ni datos bancarios: solo lo necesario para atender su solicitud.",
      "pkg.eyebrow": "Planes",
      "pkg.title": "Planes mensuales de referencia",
      "pkg.desc": "Tres puntos de partida que ajustamos a su empresa. Todos incluyen un ejecutivo de cuenta, calendario mensual y reporte de resultados.",
      "pkg.from": "Desde",
      "pkg.cta": "Solicitar propuesta",
      "pkg.note": "Precios de referencia en quetzales, sin IVA. No incluyen la inversión en publicidad, que se paga directamente a cada plataforma. Le confirmamos el precio en una propuesta por escrito.",
      "pkg.includes": "Incluye",
      "pkg.pdf": "Descargar el detalle de planes en PDF",
      "comp.title": "",
      "labprep.eyebrow": "Resultados",
      "labprep.title": "Avance de las metas de este trimestre",
      "labprep.desc": "Así se ve un reporte de avance: cada cuenta tiene una meta acordada y un porcentaje de cumplimiento que actualizamos cada mes.",
      "labprep.time": "Avance",
      "inshow.title": "",
      "insck.title": "",
      "insck.desc": "Indíquenos su sitio web o su red social principal y la inversión mensual que considera. Un estratega revisará sus canales y le contactará con sus observaciones, sin compromiso.",
      "insck.submit": "Solicitar diagnóstico",
      "insck.ok": "Gracias. Un estratega revisará sus canales y le contactará con el diagnóstico.",
      "insck.insurer_label": "Sector de su empresa",
      "insck.other": "Otro sector",
      "insck.policy_label": "Inversión mensual estimada (Q)",
      "insck.holder_label": "Nombre de la empresa",
      "insck.service_label": "Servicio de interés",
      "reviews.eyebrow": "Testimonios",
      "reviews.title": "Lo que dicen nuestros clientes",
      "reviews.based": "Calificación promedio (ejemplo)",
      "reviews.cta": "Deje su opinión en Google",
      "reviews.stars_aria": "{n} de 5 estrellas",
      "reviews.count_text": "{n} opiniones",
      "ctabanner.directions": "Cómo llegar a la oficina",
      "actions.emergency": "Llamar",
      "svcpage.back": "Volver al inicio",
      "svcpage.doctors": "Casos relacionados",
      "svcpage.request_title": "¿Le interesa este servicio?",
      "svcpage.request_desc": "Solicite una propuesta en línea, escríbanos por WhatsApp o llámenos.",
      "svcpage.more_services": "Otros servicios",
      "services.page": "Ver página de {name}",
      "nav.doctors": "Casos",
      "doctor1.specialty": "",
      "doctor1.license": "",
      "doctor1.hours": "",
      "doctor1.bio": "",
      "doctor2.specialty": "",
      "doctor2.license": "",
      "doctor2.hours": "",
      "doctor2.bio": "",
      "doctor3.specialty": "",
      "doctor3.license": "",
      "doctor3.hours": "",
      "doctor3.bio": "",
      "doctor4.specialty": "",
      "doctor4.license": "",
      "doctor4.hours": "",
      "doctor4.bio": "",
      "doctor5.specialty": "",
      "doctor5.license": "",
      "doctor5.hours": "",
      "doctor5.bio": "",
      "doctor6.specialty": "",
      "doctor6.license": "",
      "doctor6.hours": "",
      "doctor6.bio": "",
      "doctor7.specialty": "",
      "doctor7.license": "",
      "doctor7.hours": "",
      "doctor7.bio": "",
      "doctor8.specialty": "",
      "doctor8.license": "",
      "doctor8.hours": "",
      "doctor8.bio": "",
      "doctor9.specialty": "",
      "doctor9.license": "",
      "doctor9.hours": "",
      "doctor9.bio": "",
      "doctor10.specialty": "",
      "doctor10.license": "",
      "doctor10.hours": "",
      "doctor10.bio": "",
      "doctor11.specialty": "",
      "doctor11.license": "",
      "doctor11.hours": "",
      "doctor11.bio": "",
      "doctor12.specialty": "",
      "doctor12.license": "",
      "doctor12.hours": "",
      "doctor12.bio": "",
      "pkg1.name": "",
      "pkg1.badge": "",
      "pkg1.desc": "",
      "pkg1.includes": "",
      "comp1": "",
      "review1.text": "",
      "review1.when": "",
      "pkg2.name": "",
      "pkg2.badge": "",
      "pkg2.desc": "",
      "pkg2.includes": "",
      "comp2": "",
      "review2.text": "",
      "review2.when": "",
      "pkg3.name": "",
      "pkg3.badge": "",
      "pkg3.desc": "",
      "pkg3.includes": "",
      "comp3": "",
      "review3.text": "",
      "review3.when": "",
      "pkg4.name": "",
      "pkg4.badge": "",
      "pkg4.desc": "",
      "pkg4.includes": "",
      "comp4": "",
      "review4.text": "",
      "review4.when": "",
      "pkg5.name": "",
      "pkg5.badge": "",
      "pkg5.desc": "",
      "pkg5.includes": "",
      "comp5": "",
      "review5.text": "",
      "review5.when": "",
      "pkg6.name": "",
      "pkg6.badge": "",
      "pkg6.desc": "",
      "pkg6.includes": "",
      "comp6": "",
      "review6.text": "",
      "review6.when": "",
      "exam1.name": "",
      "exam1.prep": "",
      "exam1.time": "",
      "exam2.name": "",
      "exam2.prep": "",
      "exam2.time": "",
      "exam3.name": "",
      "exam3.prep": "",
      "exam3.time": "",
      "exam4.name": "",
      "exam4.prep": "",
      "exam4.time": "",
      "exam5.name": "",
      "exam5.prep": "",
      "exam5.time": "",
      "exam6.name": "",
      "exam6.prep": "",
      "exam6.time": "",
      "exam7.name": "",
      "exam7.prep": "",
      "exam7.time": "",
      "exam8.name": "",
      "exam8.prep": "",
      "exam8.time": "",
      "exam9.name": "",
      "exam9.prep": "",
      "exam9.time": "",
      "exam10.name": "",
      "exam10.prep": "",
      "exam10.time": "",
      "inshow1": "",
      "inshow2": "",
      "inshow3": "",
      "inshow4": "",
      "inshow5": "",
      "whatsapp.message": "Hola, quisiera información sobre los servicios de Cardumen.",
      "brand.tagline": "Agencia de marketing",
      "nav.packages": "Planes",
      "profile.specialty": "Especialidad",
      "demo.banner": "Datos ficticios.",
      "demo.banner_cta": "Solicitar cotización",
      "demo.form_ok": "Vista previa: así se confirma el envío. En el sitio en producción, la solicitud se registra en el panel y se notifica por correo.",
      "demo.preview_label": "Vista previa",
      "demo.view_aria": "Ver otro paquete",
      "demo.view_clinic": "Agencia",
      "demo.view_practice": "Consultora",
      "brand.aria@consultorio": "Cardumen Consultoría, ir al inicio",
      "contact.map_aria@consultorio": "Abrir la ubicación del estudio en Google Maps (se abre en una pestaña nueva)",
      "contact.vcard_aria@consultorio": "Guardar el contacto de Cardumen Consultoría en su teléfono (archivo vCard)",
      "contact.map_frame@consultorio": "Mapa de la ubicación del estudio",
      "ctabanner.directions@consultorio": "Cómo llegar al estudio",
      "nav.doctors@consultorio": "La consultora",
      "doctors.wa_msg@consultorio": "Hola, quisiera agendar una reunión con {name} ({specialty}).",
      "form.opt_surgery@consultorio": "Redes sociales",
      "form.opt_emergency@consultorio": "Publicidad digital",
      "form.opt_specialist@consultorio": "Identidad de marca",
      "form.opt_lab@consultorio": "Contenido y fotografía",
      "form.opt_maternity@consultorio": "Diagnóstico y plan de marketing",
      "req.name_label@consultorio": "Nombre completo",
      "appt.specialty_label@consultorio": "Servicio",
      "insck.service_label@consultorio": "Servicio",
      "demo.packages": "← Ver paquetes",
      "demo.sum_express": "Express · Q4,800 + IVA · plazo: 2 semanas",
      "demo.sum_starter": "Starter · Q6,800 + IVA · plazo: 3 semanas",
      "demo.sum_profesional": "Profesional · Q10,500 + IVA · plazo: 4 a 5 semanas",
      "demo.sum_premium": "Premium · desde Q19,500 + IVA · plazo: 6 a 8 semanas",
      "doctors.license@consultorio": "Experiencia",
      "doctors.hours@consultorio": "Atención",
      "doctors.insurers@consultorio": "Áreas",
      "profile.specialty@consultorio": "Cargo",
      "svcpage.doctors@consultorio": "A cargo",
      "projects.cta_aria@consultorio": "Descargar la presentación de servicios en PDF",
      "form.opt_insurance@consultorio": "Capacitación",
      "hero.seal": "Estrategia · Contenido · Publicidad · Medición ·"
    },
    en: {
      "meta.title": "Cardumen · Marketing and advertising agency in Guatemala",
      "meta.description": "Marketing agency in Guatemala City: strategy, social media, digital advertising, branding, websites and video production, with monthly performance reports.",
      "og.locale": "en_US",
      "brand.aria": "Cardumen, go to home",
      "lang.toggle_aria": "Switch language to Spanish",
      "lang.switch_to": "Español",
      "menu.open_aria": "Open menu",
      "menu.close_aria": "Close menu",
      "mobilenav.aria": "Main menu",
      "skip": "Skip to content",
      "backtotop.aria": "Back to top",
      "a11y.new_tab": " (opens in a new tab)",
      "a11y.open_aria": "Accessibility options",
      "a11y.close": "Done",
      "a11y.size_small": "Normal text",
      "a11y.size_medium": "Large text",
      "a11y.size_large": "Extra large text",
      "actions.call": "Call",
      "actions.whatsapp": "WhatsApp",
      "actions.directions": "Directions",
      "actions.aria": "Quick actions",
      "whatsapp.aria": "Message us on WhatsApp (opens in a new tab)",
      "contact.map_aria": "Open the office location in Google Maps (opens in a new tab)",
      "nav.services": "Services",
      "nav.maternity": "Featured case",
      "nav.facilities": "Studio",
      "nav.patients": "How we work",
      "nav.insurance": "Investment",
      "nav.contact": "Contact",
      "nav.emergency": "Call",
      "hero.eyebrow": "Marketing and advertising agency",
      "hero.title": "Strategy, creativity and data to <em>grow</em> your brand",
      "hero.desc": "We plan, produce and measure marketing for Guatemalan companies. One team handles strategy, content and advertising, and reports results to you every month.",
      "hero.cta1": "Book a meeting",
      "hero.cta2": "Message us on WhatsApp",
      "hero.status": "Now booking new projects",
      "hero.badge1": "Free initial assessment",
      "hero.badge2": "Monthly reports",
      "hero.badge3": "No lock-in contracts",
      "quick.emergency": "Call the agency",
      "quick.whatsapp": "WhatsApp",
      "quick.visits": "Office hours",
      "quick.directions": "Directions",
      "quick.aria": "Quick information",
      "stat1.value": "12",
      "stat1.label": "years in business",
      "stat2.value": "140",
      "stat2.label": "brands served",
      "stat3.value": "26",
      "stat3.label": "specialists on the team",
      "stat4.value": "9",
      "stat4.label": "industries of experience",
      "services.eyebrow": "Services",
      "services.title": "All your marketing, with one team",
      "services.desc": "Each service can be hired on its own or combined in a monthly plan. Either way, we work with defined goals, a calendar you approve and a results report.",
      "services.cta": "Ask on WhatsApp",
      "services.more": "Learn more",
      "services.more_aria": "Learn more about {name}",
      "services.call": "Call",
      "services.close": "Close",
      "service1.title": "Marketing strategy",
      "service1.desc": "Assessment, goals, audience and an action plan with a budget and calendar.",
      "service1.more": "Before publishing or investing in advertising, we define where your brand is going. We review your current situation, your competitors and how your customers behave.\n\nThe result is a marketing plan with measurable goals, recommended channels, a budget and a quarterly calendar.\n\nThe plan is yours: you can run it with our team or with your own.",
      "service2.title": "Social media",
      "service2.desc": "Content planning, design, copywriting and publishing, with community management.",
      "service2.more": "We manage your profiles with a monthly calendar that you approve before anything is published.\n\nThe service includes visual guidelines, copywriting, post scheduling and replies to comments and messages during business hours.\n\nEvery month you receive a report with reach, engagement and the posts that performed best.",
      "service3.title": "Digital advertising",
      "service3.desc": "Search and social media campaigns, with conversion tracking and cost per result.",
      "service3.more": "We plan and manage campaigns on search engines, social media and video, depending on where your audience is.\n\nWe set up conversion tracking to know how many leads or sales each campaign generates, and at what cost.\n\nAd spend is paid directly to each platform from your own account, and you keep the access and the history.",
      "service4.title": "Branding and identity",
      "service4.desc": "Name, logo, palette, typography and a brand manual to apply your identity consistently.",
      "service4.more": "We build or refresh your brand identity starting with research: who it speaks to, what sets it apart and how it wants to be perceived.\n\nWe present logo, colour and typography proposals and apply them to real pieces before you decide.\n\nAt the end you receive the editable files and a brand manual.",
      "service5.title": "Websites and landing pages",
      "service5.desc": "Fast, easy-to-manage websites designed to turn visits into leads.",
      "service5.more": "We design websites and landing pages with a clear structure, action-oriented copy and forms that reach your inbox or your CRM.\n\nEvery site is delivered optimised for phones, with visit and conversion tracking.\n\nWe also review existing sites and propose improvements by priority.",
      "service6.title": "SEO and content",
      "service6.desc": "Search engine positioning with technical improvements, articles and content that is useful to your audience.",
      "service6.more": "We improve your site's visibility in search engines with a technical audit, keyword research and a content plan.\n\nWe write articles and pages that answer what your customers search for.\n\nOrganic positioning is ongoing work: every month we report progress in rankings and visits.",
      "service7.title": "Photo and video production",
      "service7.desc": "Product photography, social video and advertising pieces produced in the studio or on location.",
      "service7.more": "We have our own studio and production crew for product photography, corporate portraits and video.\n\nWe plan every session with a script and a shot list, to make the most of the time and obtain material for several months.\n\nWe deliver the edited pieces in the formats each social network requires.",
      "service8.title": "Email and automation",
      "service8.desc": "Newsletters, automated sequences and segmentation of your contact list.",
      "service8.more": "We design newsletters and automated sequences to follow up with your contacts: welcome, reminders and repeat purchase.\n\nWe organise and segment your database so each group receives the right message.\n\nWe measure opens, clicks and sales attributed to each send.",
      "service9.title": "Analytics and reporting",
      "service9.desc": "Dashboards with your marketing indicators, kept up to date and explained in plain language.",
      "service9.more": "We set up tracking for your site, campaigns and social media in a single dashboard.\n\nTogether we define the indicators that matter to your business and leave out the ones that only distract.\n\nEvery month we review the results in a meeting and agree on adjustments.",
      "service10.title": "PR and influencer marketing",
      "service10.desc": "Media relations, press releases and collaborations with content creators who fit your brand.",
      "service10.more": "We prepare press releases and manage media relations for your company's launches and news.\n\nWe identify content creators who match your audience, negotiate the collaborations and supervise the posts.\n\nEvery collaboration is formalised in writing and reported with its results.",
      "service11.title": "Events and activations",
      "service11.desc": "Launches, trade shows and brand activations, from concept to set-up.",
      "service11.more": "We design and produce product launches, trade-show presence and point-of-sale activations.\n\nWe take care of the concept, materials, staff and logistics, with a detailed budget.\n\nWe document the event in photo and video for your social media.",
      "maternity.eyebrow": "Featured case",
      "maternity.title": "Café Nubarrón: from the roastery to an <em>online shop</em>",
      "maternity.desc": "A specialty coffee roastery sold only from its shop. In six months we refreshed its identity, launched its online shop and organised its campaigns. Today online sales account for a third of its revenue.",
      "maternity.cta": "Request a proposal",
      "projects.cta": "Download the case study (PDF)",
      "projects.cta_aria": "Download the case study as a PDF",
      "mfeat1.title": "Online sales: +68%",
      "mfeat1.desc": "Growth in online shop sales between the first and the sixth month.",
      "mfeat2.title": "Cost per purchase: −34%",
      "mfeat2.desc": "Reduction in advertising cost per purchase after reorganising the campaigns.",
      "mfeat3.title": "Subscribers: 2,400",
      "mfeat3.desc": "Customers subscribed to the monthly newsletter, which drives one in five purchases.",
      "mfeat4.title": "Refreshed identity",
      "mfeat4.desc": "New packaging, product photography and a brand manual for every point of sale.",
      "bag.title": "Prepare for your first meeting",
      "bag.desc": "Tick what you already have at hand. With this information, the assessment is more accurate.",
      "bag1": "Main goal for this year",
      "bag2": "Approximate monthly budget",
      "bag3": "Access to your social media and website",
      "bag4": "Logo and brand manual, if any",
      "bag5": "Results of previous campaigns",
      "bag6": "Description of your ideal customer",
      "bag7": "Three reference competitors",
      "bag8": "Key dates for your business",
      "bag9": "",
      "bag10": "",
      "bag.note": "If any item is missing, we will define it together in the meeting.",
      "bag.progress": "{n} of {total} ready",
      "about.eyebrow": "About us",
      "about.title": "A team accountable for results",
      "about.desc": "Cardumen is a Guatemalan marketing and advertising agency. We bring strategists, designers, copywriters, producers and analysts together in one team, so your brand has a single point of contact. We work with goals agreed in writing, calendars you approve and reports that explain what worked, what did not and what we propose to do next.",
      "about.art_caption": "Strategy, content and measurement in one team.",
      "about.mission_title": "Our purpose",
      "about.mission_desc": "To help companies grow with marketing that is organised, creative and measurable.",
      "about.vision_title": "Our commitment",
      "about.vision_desc": "To report clearly, meet the agreed deadlines and recommend only what your business needs.",
      "why.title": "Why choose us",
      "why1": "Goals in writing",
      "why2": "A dedicated account manager",
      "why3": "A calendar you approve",
      "why4": "Monthly results report",
      "why5": "Your accounts always in your name",
      "why6": "In-house production",
      "projects.eyebrow": "The studio",
      "projects.title": "We produce the content in house",
      "projects.desc": "We have our own studio and equipment for photography, video and design. That lets us keep to calendars and maintain the same quality in every piece.",
      "projects.view_details": "View photos",
      "proj1.tag": "Studio",
      "proj1.title": "Product photography",
      "proj1.desc": "A set with controlled lighting for catalogues, e-commerce and social media.",
      "proj2.tag": "Video",
      "proj2.title": "Video production",
      "proj2.desc": "Cameras, lighting and audio for ads, testimonials and corporate video.",
      "proj3.tag": "Social",
      "proj3.title": "Social content",
      "proj3.desc": "Vertical formats filmed and edited for each platform.",
      "proj4.tag": "Audio",
      "proj4.title": "Podcast booth",
      "proj4.desc": "Podcast and voice-over recording with acoustic treatment.",
      "proj5.tag": "Design",
      "proj5.title": "Design desk",
      "proj5.desc": "Brand identity, packaging and advertising pieces, from sketch to final file.",
      "proj6.tag": "Strategy",
      "proj6.title": "Planning room",
      "proj6.desc": "Working sessions with clients to define goals, audiences and calendars.",
      "amen.title": "Team capabilities",
      "amen1.title": "Market research",
      "amen1.desc": "Surveys, interviews and competitor analysis.",
      "amen2.title": "Copywriting",
      "amen2.desc": "Copy for ads, websites and social media.",
      "amen3.title": "Graphic design",
      "amen3.desc": "Digital and print pieces in your visual style.",
      "amen4.title": "Motion graphics",
      "amen4.desc": "Animated graphics for video and ads.",
      "amen5.title": "Photography",
      "amen5.desc": "Product, food, spaces and portrait.",
      "amen6.title": "Video editing",
      "amen6.desc": "Editing, colour and subtitles in every format.",
      "amen7.title": "Media buying",
      "amen7.desc": "Planning and buying of digital advertising.",
      "amen8.title": "Measurement",
      "amen8.desc": "Tags, conversions and dashboards.",
      "amen9.title": "Web development",
      "amen9.desc": "Websites, online shops and landing pages.",
      "amen10.title": "Automation",
      "amen10.desc": "Email, forms and lead follow-up.",
      "amen11.title": "Community management",
      "amen11.desc": "Replies to messages and comments during business hours.",
      "amen12.title": "Training",
      "amen12.desc": "Workshops for sales and marketing teams.",
      "projects.modal_close": "Close",
      "projects.modal_prev": "Previous photo",
      "projects.modal_next": "Next photo",
      "projects.modal_dots_aria": "Choose photo",
      "projects.modal_goto_slide": "Go to photo {n}",
      "projects.modal_image_of": "Photo {n} of {total}",
      "projects.modal_photo_alt": "Photo {n} of {title}",
      "projects.modal_placeholder_note": "There are no photos of this space yet.",
      "process.eyebrow": "How we work",
      "process.title": "A clear process, from the first meeting to the report",
      "process1.title": "Assessment",
      "process1.desc": "We review your brand, channels and current results, and listen to your goals.",
      "process2.title": "Plan and proposal",
      "process2.desc": "We present a plan with goals, actions, a calendar and costs in writing.",
      "process3.title": "Production and execution",
      "process3.desc": "We produce the content, launch the campaigns and look after your channels.",
      "process4.title": "Measurement and adjustments",
      "process4.desc": "Every month we review the results with you and adjust the plan.",
      "patients.eyebrow": "Clients",
      "patients.title": "Information for our clients",
      "patients.desc": "What is useful to know before hiring, during the first meeting and in the month-to-month work. If you have questions, call us during office hours.",
      "patients.tab1": "Before hiring",
      "patients.tab2": "First meeting",
      "patients.tab3": "Monthly work",
      "patients.tabs_aria": "Information for clients",
      "visits.title": "Office hours",
      "visits.hours_text": "Mon–Fri 8:30–17:30",
      "visits.open": "Open now",
      "visits.closed": "Closed right now",
      "visits.next": "Opens: {time}",
      "visits.until": "Until {time}",
      "guide1": "Set a specific goal: more leads, more online sales or greater awareness.",
      "guide2": "Consider agency fees and advertising spend separately.",
      "guide3": "Ask for ad accounts and profiles to be registered in your company's name.",
      "guide4": "Ask what the plan includes and what is quoted separately.",
      "guide5": "Ask to see sample reports to understand how you will be informed.",
      "guide6": "Organic results take three to six months; advertising shows data from the first weeks.",
      "guide7": "",
      "guide8": "",
      "guide9": "",
      "guide10": "",
      "visit1": "The first meeting lasts about 45 minutes and can be in person or by video call.",
      "visit2": "A strategist and the account manager who will look after you take part.",
      "visit3": "We review your current channels and share our first observations.",
      "visit4": "There is no need to prepare a presentation: the information on the list is enough.",
      "visit5": "Within five working days you receive the proposal in writing.",
      "visit6": "",
      "visit7": "",
      "visit8": "",
      "mat1": "Every month we send you the content calendar for approval before publishing.",
      "mat2": "Your account manager replies during business hours, within one day at most.",
      "mat3": "The monthly report is delivered within the first five working days of the month.",
      "mat4": "We review the results with you in a monthly meeting and agree on adjustments.",
      "mat5": "You can adjust or cancel your plan with 30 days' notice.",
      "mat6": "",
      "ext.title": "Direct contacts",
      "ext1.label": "New accounts",
      "ext2.label": "Client service",
      "ext3.label": "Production",
      "ext4.label": "Billing",
      "insurance.eyebrow": "Investment",
      "insurance.title": "Ways to work with us",
      "insurance.desc": "You can hire a monthly plan, a project with a defined scope and price or consulting by the hour. Before starting, you receive a written proposal with what each option includes.",
      "insurance.insurers_title": "Industries we work in",
      "insurance.insurers_desc": "We know the audience, the seasons and the advertising rules of these industries.",
      "insurance.missing": "Is your industry not listed? Let's talk.",
      "banks.title": "Engagement models",
      "pay.title": "Payment options",
      "pay1": "Monthly invoice with 15-day terms",
      "pay2": "Bank transfer or deposit",
      "pay3": "Credit or debit card",
      "pay4": "Projects: 50% up front and 50% on delivery",
      "pay5": "Discount for annual contracts",
      "pay6": "",
      "pay7": "",
      "pay8": "",
      "ctabanner.title": "Shall we talk about your brand?",
      "ctabanner.desc": "Book a free assessment meeting or message us on WhatsApp. We reply during office hours.",
      "ctabanner.cta": "Call now",
      "contact.eyebrow": "Contact",
      "contact.title": "Tell us about your project",
      "contact.desc": "Write or call us to book a meeting, request a proposal or ask your questions. We reply during office hours.",
      "contact.label_address": "Address",
      "contact.label_phone": "Phones",
      "contact.label_email": "Email",
      "contact.label_hours": "Hours",
      "contact.label_social": "Social media",
      "contact.hours_value": "Monday to Friday 8:30–17:30",
      "contact.map_open": "Open in Google Maps",
      "contact.vcard": "Save contact",
      "contact.vcard_aria": "Save Cardumen's contact on your phone (vCard file)",
      "contact.waze": "Open in Waze",
      "contact.map_load": "Show map here",
      "contact.map_note": "Showing the map sends your IP address to Google.",
      "contact.map_frame": "Map of the office location",
      "contact.phone_main": "Main",
      "contact.phone_direct": "Direct",
      "form.title": "Send us a message",
      "form.privacy_hint": "For your privacy, do not include passwords or bank details in this form.",
      "form.name_label": "Full name",
      "form.name_err": "Enter your full name.",
      "form.phone_label": "Phone",
      "form.phone_err": "Enter a valid phone number.",
      "form.email_label": "Email address",
      "form.email_err": "Enter a valid email address.",
      "form.service_label": "How can we help?",
      "form.opt_placeholder": "Choose an option",
      "form.opt_maternity": "Monthly marketing plan",
      "form.opt_surgery": "Social media",
      "form.opt_emergency": "Digital advertising",
      "form.opt_specialist": "Branding or brand identity",
      "form.opt_lab": "Website or online shop",
      "form.opt_insurance": "Photo or video production",
      "form.opt_other": "Other",
      "form.service_err": "Choose an option.",
      "form.message_label": "Your message",
      "form.message_err": "Please write a little more (at least 10 characters).",
      "form.optional": "(optional)",
      "form.choose": "Choose an option",
      "form.err_required": "Complete this field.",
      "form.err_choose": "Choose an option.",
      "form.err_number": "Enter a valid number.",
      "form.err_date": "Choose a valid date.",
      "form.consent_label": "I agree that my details are used only to answer my request, as described in the Privacy Notice.",
      "form.consent_err": "We need your permission to reply.",
      "form.hp_label": "Leave this field empty",
      "form.submit": "Send message",
      "form.note": "We'll only use your details to answer your request. See our <a href=\"privacy-notice.html\">Privacy Notice</a>.",
      "form.fallback": "Prefer not to use the form? Contact us by <a href=\"tel:+50200000000\">phone</a>, <a href=\"mailto:hola@cardumen.example\">e-mail</a> or <a href=\"https://wa.me/50200000000\" target=\"_blank\" rel=\"noopener noreferrer\">WhatsApp</a>.",
      "form.status_sending": "Sending…",
      "form.status_ok": "Thank you! We received your message and will contact you soon.",
      "form.status_invalid": "Please check the highlighted fields before sending.",
      "form.status_error": "There was a problem sending your message. Try again or message us on WhatsApp.",
      "form.status_rate_limited": "You've sent several requests in a short time. Please wait a few minutes and try again.",
      "form.status_offline": "You seem to be offline. Check your connection and try again.",
      "form.status_timeout": "Sending took too long. Check your connection and try again.",
      "form.status_verifying": "Checking that you're not a robot…",
      "form.status_captcha": "We couldn't complete the anti-spam check. Reload the page and try again, or message us on WhatsApp.",
      "form.status_turnstile": "Complete the security check and send again.",
      "form.captcha_idle": "Protected against spam with an automatic check.",
      "form.captcha_pending": "Anti-spam check in progress…",
      "form.captcha_ok": "Anti-spam check complete.",
      "form.captcha_error": "The anti-spam check couldn't load. Reload the page.",
      "faq.eyebrow": "FAQ",
      "faq.title": "Frequently asked questions",
      "faq.q1": "How much does it cost to work with the agency?",
      "faq.a1": "Monthly plans start at Q 4,500 plus VAT. One-off projects, such as a brand identity or a website, are quoted according to their scope. Advertising spend is paid separately, directly to each platform.",
      "faq.q2": "Is there a minimum contract term?",
      "faq.a2": "There is no lock-in period. We recommend evaluating results after three months, and you can adjust or cancel your plan with 30 days' notice.",
      "faq.q3": "How long does it take to see results?",
      "faq.a3": "Paid advertising produces data from the first weeks. Organic growth on social media and search engines usually takes three to six months of steady work.",
      "faq.q4": "Who owns the accounts and the content?",
      "faq.a4": "Your company. The profiles, ad accounts, design files and produced material are in your name and are handed over if the service ends.",
      "faq.q5": "How much should I invest in advertising?",
      "faq.a5": "It depends on your goal and your industry. In the assessment we present a recommendation with the expected result for different levels of spend.",
      "faq.q6": "How are posts approved?",
      "faq.a6": "Every month you receive the calendar with the copy and designs. Nothing is published without your approval, and you can request changes within the agreed time frame.",
      "faq.q7": "Do you work with companies outside the capital?",
      "faq.a7": "Yes. We serve clients across the country by video call, and we arrange visits for photo and video sessions.",
      "faq.q8": "What do I receive in the monthly report?",
      "faq.a8": "A summary of the agreed indicators, the actions carried out, what worked and what did not, and recommendations for the following month.",
      "a11y.title": "Accessibility",
      "a11y.desc": "Adjust the site to suit you. Your preferences are saved on this device.",
      "a11y.text_size": "Text size",
      "a11y.contrast": "High contrast",
      "a11y.motion": "Reduce motion",
      "a11y.links": "Underline links",
      "a11y.spacing": "More text spacing",
      "a11y.reset": "Reset",
      "footer.about_desc": "Marketing and advertising agency in Guatemala City. Strategy, content, digital advertising and performance measurement.",
      "footer.links_heading": "Navigation",
      "footer.services_heading": "Services",
      "footer.contact_heading": "Contact",
      "footer.privacy_link": "Privacy Notice",
      "footer.rights": "All rights reserved.",
      "footer.made_by": "Site managed by TeraDevs",
      "notice.text": "",
      "notice.close": "Close notice",
      "notice.label": "Notice",
      "doctors.eyebrow": "Case studies",
      "doctors.title": "Recent work and its results",
      "doctors.desc": "Search by brand, industry or service. Each case summarises the challenge, what we did and the result.",
      "doctors.cta": "WhatsApp",
      "doctors.search_label": "Search case studies",
      "doctors.search_ph": "Brand, industry or service",
      "doctors.filter_aria": "Filter by industry",
      "doctors.all": "All",
      "doctors.empty": "No case studies match that search.",
      "doctors.license": "Result",
      "doctors.hours": "Services",
      "doctors.insurers": "Period",
      "doctors.request": "Request something similar",
      "doctors.wa_msg": "Hello, I saw the {name} case ({specialty}) on the {site} website and would like something similar for my company.",
      "doctors.results": "{n} case studies",
      "doctors.result1": "1 case study",
      "appt.eyebrow": "Meeting",
      "appt.title": "",
      "appt.desc": "Choose the service you are interested in and your preferred date. We will call you to confirm the time and whether the meeting will be in person or by video call.",
      "appt.submit": "Request a meeting",
      "appt.ok": "Thank you. We received your request and will call you to confirm the date and time of the meeting.",
      "appt.specialty_label": "Service or industry of interest",
      "appt.doctor_label": "Reference case",
      "appt.doctor_any": "None in particular",
      "appt.date_label": "Preferred date",
      "appt.time_label": "Preferred time",
      "appt.time_morning": "Morning",
      "appt.time_afternoon": "Afternoon",
      "appt.time_any": "Any",
      "req.name_label": "Full name",
      "req.phone_label": "Phone",
      "req.email_label": "Email",
      "req.notes_label": "Comments",
      "req.health_notice": "For your privacy, do not include passwords or bank details: only what we need to handle your request.",
      "pkg.eyebrow": "Plans",
      "pkg.title": "Reference monthly plans",
      "pkg.desc": "Three starting points that we adjust to your company. All include an account manager, a monthly calendar and a results report.",
      "pkg.from": "From",
      "pkg.cta": "Request a proposal",
      "pkg.note": "Reference prices in quetzales, before VAT. They do not include advertising spend, which is paid directly to each platform. We confirm the price in a written proposal.",
      "pkg.includes": "Includes",
      "pkg.pdf": "Download the plan details as a PDF",
      "comp.title": "",
      "labprep.eyebrow": "Results",
      "labprep.title": "Progress on this quarter's goals",
      "labprep.desc": "This is what a progress report looks like: each account has an agreed goal and a completion percentage that we update every month.",
      "labprep.time": "Progress",
      "inshow.title": "",
      "insck.title": "",
      "insck.desc": "Tell us your website or main social profile and the monthly investment you have in mind. A strategist will review your channels and contact you with observations, with no obligation.",
      "insck.submit": "Request an assessment",
      "insck.ok": "Thank you. A strategist will review your channels and contact you with the assessment.",
      "insck.insurer_label": "Your company's industry",
      "insck.other": "Another industry",
      "insck.policy_label": "Estimated monthly investment (Q)",
      "insck.holder_label": "Company name",
      "insck.service_label": "Service of interest",
      "reviews.eyebrow": "Testimonials",
      "reviews.title": "What our clients say",
      "reviews.based": "Average rating (example)",
      "reviews.cta": "Leave a review on Google",
      "reviews.stars_aria": "{n} out of 5 stars",
      "reviews.count_text": "{n} reviews",
      "ctabanner.directions": "Directions to the office",
      "actions.emergency": "Call",
      "svcpage.back": "Back to home",
      "svcpage.doctors": "Related case studies",
      "svcpage.request_title": "Interested in this service?",
      "svcpage.request_desc": "Request a proposal online, message us on WhatsApp or call us.",
      "svcpage.more_services": "Other services",
      "services.page": "{name} page",
      "nav.doctors": "Work",
      "doctor1.specialty": "",
      "doctor1.license": "",
      "doctor1.hours": "",
      "doctor1.bio": "",
      "doctor2.specialty": "",
      "doctor2.license": "",
      "doctor2.hours": "",
      "doctor2.bio": "",
      "doctor3.specialty": "",
      "doctor3.license": "",
      "doctor3.hours": "",
      "doctor3.bio": "",
      "doctor4.specialty": "",
      "doctor4.license": "",
      "doctor4.hours": "",
      "doctor4.bio": "",
      "doctor5.specialty": "",
      "doctor5.license": "",
      "doctor5.hours": "",
      "doctor5.bio": "",
      "doctor6.specialty": "",
      "doctor6.license": "",
      "doctor6.hours": "",
      "doctor6.bio": "",
      "doctor7.specialty": "",
      "doctor7.license": "",
      "doctor7.hours": "",
      "doctor7.bio": "",
      "doctor8.specialty": "",
      "doctor8.license": "",
      "doctor8.hours": "",
      "doctor8.bio": "",
      "doctor9.specialty": "",
      "doctor9.license": "",
      "doctor9.hours": "",
      "doctor9.bio": "",
      "doctor10.specialty": "",
      "doctor10.license": "",
      "doctor10.hours": "",
      "doctor10.bio": "",
      "doctor11.specialty": "",
      "doctor11.license": "",
      "doctor11.hours": "",
      "doctor11.bio": "",
      "doctor12.specialty": "",
      "doctor12.license": "",
      "doctor12.hours": "",
      "doctor12.bio": "",
      "pkg1.name": "",
      "pkg1.badge": "",
      "pkg1.desc": "",
      "pkg1.includes": "",
      "comp1": "",
      "review1.text": "",
      "review1.when": "",
      "pkg2.name": "",
      "pkg2.badge": "",
      "pkg2.desc": "",
      "pkg2.includes": "",
      "comp2": "",
      "review2.text": "",
      "review2.when": "",
      "pkg3.name": "",
      "pkg3.badge": "",
      "pkg3.desc": "",
      "pkg3.includes": "",
      "comp3": "",
      "review3.text": "",
      "review3.when": "",
      "pkg4.name": "",
      "pkg4.badge": "",
      "pkg4.desc": "",
      "pkg4.includes": "",
      "comp4": "",
      "review4.text": "",
      "review4.when": "",
      "pkg5.name": "",
      "pkg5.badge": "",
      "pkg5.desc": "",
      "pkg5.includes": "",
      "comp5": "",
      "review5.text": "",
      "review5.when": "",
      "pkg6.name": "",
      "pkg6.badge": "",
      "pkg6.desc": "",
      "pkg6.includes": "",
      "comp6": "",
      "review6.text": "",
      "review6.when": "",
      "exam1.name": "",
      "exam1.prep": "",
      "exam1.time": "",
      "exam2.name": "",
      "exam2.prep": "",
      "exam2.time": "",
      "exam3.name": "",
      "exam3.prep": "",
      "exam3.time": "",
      "exam4.name": "",
      "exam4.prep": "",
      "exam4.time": "",
      "exam5.name": "",
      "exam5.prep": "",
      "exam5.time": "",
      "exam6.name": "",
      "exam6.prep": "",
      "exam6.time": "",
      "exam7.name": "",
      "exam7.prep": "",
      "exam7.time": "",
      "exam8.name": "",
      "exam8.prep": "",
      "exam8.time": "",
      "exam9.name": "",
      "exam9.prep": "",
      "exam9.time": "",
      "exam10.name": "",
      "exam10.prep": "",
      "exam10.time": "",
      "inshow1": "",
      "inshow2": "",
      "inshow3": "",
      "inshow4": "",
      "inshow5": "",
      "whatsapp.message": "Hello, I would like information about Cardumen's services.",
      "brand.tagline": "Marketing agency",
      "nav.packages": "Plans",
      "profile.specialty": "Specialty",
      "demo.banner": "Fictional data.",
      "demo.banner_cta": "Request a quote",
      "demo.form_ok": "Preview: this is how the form confirms a message. On the real site, the request reaches the panel and the inbox.",
      "demo.preview_label": "Preview",
      "demo.view_aria": "See another package",
      "demo.view_clinic": "Agency",
      "demo.view_practice": "Consultant",
      "brand.aria@consultorio": "Cardumen Consultoría, go to home",
      "contact.map_aria@consultorio": "Open the studio location in Google Maps (opens in a new tab)",
      "contact.vcard_aria@consultorio": "Save Cardumen Consultoría's contact on your phone (vCard file)",
      "contact.map_frame@consultorio": "Map of the studio location",
      "ctabanner.directions@consultorio": "Directions to the studio",
      "nav.doctors@consultorio": "The consultant",
      "doctors.wa_msg@consultorio": "Hello, I would like to book a meeting with {name} ({specialty}).",
      "form.opt_surgery@consultorio": "Social media",
      "form.opt_emergency@consultorio": "Digital advertising",
      "form.opt_specialist@consultorio": "Brand identity",
      "form.opt_lab@consultorio": "Content and photography",
      "form.opt_maternity@consultorio": "Assessment and marketing plan",
      "req.name_label@consultorio": "Full name",
      "appt.specialty_label@consultorio": "Service",
      "insck.service_label@consultorio": "Service",
      "demo.packages": "← All packages",
      "demo.sum_express": "Express · Q4,800 + VAT · lead time: 2 weeks",
      "demo.sum_starter": "Starter · Q6,800 + VAT · lead time: 3 weeks",
      "demo.sum_profesional": "Profesional · Q10,500 + VAT · lead time: 4 to 5 weeks",
      "demo.sum_premium": "Premium · from Q19,500 + VAT · lead time: 6 to 8 weeks",
      "doctors.license@consultorio": "Experience",
      "doctors.hours@consultorio": "Availability",
      "doctors.insurers@consultorio": "Areas",
      "profile.specialty@consultorio": "Role",
      "svcpage.doctors@consultorio": "In charge",
      "projects.cta_aria@consultorio": "Download the services overview as a PDF",
      "form.opt_insurance@consultorio": "Training",
      "hero.seal": "Strategy · Content · Advertising · Measurement ·"
    }
  };

  /* ============================================================
     CONTENT MANAGER OVERRIDES — text, contact details and photo alt
     text edited in /admin arrive as an inert JSON block (#siteContent).
     ============================================================ */
  var SITE_CONTENT = (function(){
    var el = document.getElementById('siteContent');
    if (!el) return {};
    try {
      var data = JSON.parse(el.textContent);
      return (data && typeof data === 'object') ? data : {};
    } catch (e) { return {}; }
  })();
  /* Profile variants of fixed texts ("key@consultorio"), as the server renders them. */
  (function(){
    var m = /(?:^|\s)profile-(\w+)/.exec(root.className);
    if (!m) return;
    var suffix = '@' + m[1];
    ['es', 'en'].forEach(function(lang){
      Object.keys(I18N[lang]).forEach(function(k){
        if (k.slice(-suffix.length) === suffix) I18N[lang][k.slice(0, -suffix.length)] = I18N[lang][k];
      });
    });
  })();
  /* Only these keys may carry markup (built and escaped server-side). */
  var HTML_OVERRIDE_KEYS = { 'hero.title': true, 'maternity.title': true, 'form.fallback': true };
  if (SITE_CONTENT.i18n && typeof SITE_CONTENT.i18n === 'object'){
    ['es', 'en'].forEach(function(lang){
      var overrides = SITE_CONTENT.i18n[lang];
      if (!overrides || typeof overrides !== 'object') return;
      Object.keys(overrides).forEach(function(key){
        var val = overrides[key];
        if (typeof val !== 'string') return;
        if (val.indexOf('<') !== -1 && !HTML_OVERRIDE_KEYS[key]) return;
        I18N[lang][key] = val;
      });
    });
  }
  var SITE_IMAGES = (SITE_CONTENT.images && typeof SITE_CONTENT.images === 'object') ? SITE_CONTENT.images : {};

  // Nothing is stored until the visitor actually sets something (empty values remove the key).
  function store(key, val){ try { if (val === undefined) return localStorage.getItem(key); if (val === '{}' || val === '[]') localStorage.removeItem(key); else localStorage.setItem(key, val); } catch (e) { return null; } return null; }

  var LANG_KEY = 'clinica_lang';
  var currentLang = (function(){
    var saved = store(LANG_KEY);
    /* Packages without the English version stay in Spanish, whatever was chosen elsewhere on this domain. */
    if (root.hasAttribute('data-es-only')) return 'es';
    return (saved === 'es' || saved === 'en') ? saved : 'es';
  })();
  var WHATSAPP_NUMBER = (typeof SITE_CONTENT.whatsapp === 'string' && /^\d{8,15}$/.test(SITE_CONTENT.whatsapp))
    ? SITE_CONTENT.whatsapp : (root.getAttribute('data-wa') || '50256192730');

  /** Name of the clinic or practice, as published (Perfil del sitio → Nombre). */
  function siteName(){ var el = document.querySelector('.brand-name'); return (el && el.textContent.trim()) || document.title.split(' · ')[0]; }
  function t(key){ return (I18N[currentLang] && I18N[currentLang][key]) || I18N.es[key] || key; }

  /* Shareable preview (static hosting, no PHP): the form answers itself so
     prospects can try it, and says plainly that nothing was sent. */
  var PREVIEW = document.documentElement.getAttribute('data-preview') === '1';
  function handlerFetch(url, opts){
    if (!PREVIEW) return fetch(url, opts);
    var reply = function(o){ return new Response(JSON.stringify(o), { status: 200, headers: { 'Content-Type': 'application/json' } }); };
    if (url.indexOf('challenge=1') !== -1){
      return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode('preview0')).then(function(h){
        var hex = Array.prototype.map.call(new Uint8Array(h), function(b){ return ('0' + b.toString(16)).slice(-2); }).join('');
        return reply({ algorithm: 'SHA-256', challenge: hex, salt: 'preview', maxnumber: 10, signature: 'preview' });
      });
    }
    return new Promise(function(r){ setTimeout(r, 600); }).then(function(){ return reply({ ok: true }); });
  }
  function okKey(k){ return PREVIEW ? 'demo.form_ok' : (k || 'form.status_ok'); }
  function fmt(s, vars){ return String(s).replace(/\{(\w+)\}/g, function(m, k){ return vars[k] !== undefined ? vars[k] : m; }); }
  /* Shareable preview: messages say which package the visitor was looking at. */
  var PKG = (root.className.match(/\bpkg-(\w+)/) || [])[1] || '';
  function waUrl(text){
    if (PREVIEW && PKG) text = '[Demo ' + PKG.charAt(0).toUpperCase() + PKG.slice(1) + '] ' + text;
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  var langToggle = document.getElementById('langToggle');
  var langListeners = [];

  function applyLang(lang){
    var dict = I18N[lang] || I18N.es;
    currentLang = lang;
    root.lang = (lang === 'es') ? 'es-GT' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var val = dict[el.getAttribute('data-i18n')];
      if (val === undefined) return;
      if (val.indexOf('<') !== -1) el.innerHTML = val; else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var val = dict[el.getAttribute('data-i18n-html')];
      if (val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
      el.getAttribute('data-i18n-attr').split(';').forEach(function(pair){
        var parts = pair.split(':');
        if (parts.length !== 2) return;
        var val = dict[parts[1].trim()];
        if (val !== undefined) el.setAttribute(parts[0].trim(), val);
      });
    });
    /* Service pages keep their own title (the home page's title is for the home page). */
    if (dict['meta.title'] && document.body.getAttribute('data-page') !== 'service') document.title = dict['meta.title'];
    [['metaDescription', 'meta.description'], ['ogTitle', 'meta.title'], ['ogDescription', 'meta.description'], ['twTitle', 'meta.title'], ['twDescription', 'meta.description'], ['ogLocale', 'og.locale']].forEach(function(p){
      var el = document.getElementById(p[0]);
      if (el && dict[p[1]]) el.setAttribute('content', dict[p[1]]);
    });
    if (langToggle){
      langToggle.querySelector('span').textContent = (lang === 'es') ? 'EN' : 'ES';
    }
    /* WhatsApp links: the general message, or one per service. */
    document.querySelectorAll('[data-wa]').forEach(function(a){
      var key = a.getAttribute('data-wa');
      var text = dict['whatsapp.message'];
      if (key){
        var name = dict[key] || '';
        text = (lang === 'es' ? 'Hola, quisiera información sobre ' : 'Hello, I\'d like information about ') + name.toLowerCase() + (lang === 'es' ? ' en ' : ' at ') + siteName() + '.';
      }
      a.setAttribute('href', waUrl(text));
    });
    if (!root.hasAttribute('data-es-only')) store(LANG_KEY, lang);
    langListeners.forEach(function(fn){ fn(lang); });
  }

  document.querySelectorAll('[data-lang-toggle]').forEach(function(b){
    b.addEventListener('click', function(){
      var next = currentLang === 'es' ? 'en' : 'es';
      // A soft cross-fade between languages where the browser supports it.
      if (document.startViewTransition && !root.classList.contains('a11y-motion') && !mqReduce.matches) document.startViewTransition(function(){ applyLang(next); });
      else applyLang(next);
    });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Header: translucent material once content scrolls under it ---------- */
  var header = document.getElementById('siteHeader');
  var ticking = false;
  function onScroll(){
    ticking = false;
    var sy = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', sy > 8);
    if (backToTop) backToTop.classList.toggle('show', sy > 900);
  }
  window.addEventListener('scroll', function(){ if (!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- Cards: a soft light follows the pointer (mouse only) ---------- */
  if (window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.addEventListener('pointermove', function(e){
      var c = e.target.closest && e.target.closest('.service-card, .mv-card, .ins-card, .review-card, .stat, .doctor-card, .pkg-card');
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ---------- Sheets (native <dialog>): menu, accessibility, gallery ----------
     A <dialog> opened with showModal() already traps focus, makes the page
     behind it inert and closes with Escape. Each sheet enters and leaves
     along the same path (spatial consistency); closing waits for the exit
     transition, but a new open interrupts it immediately. */
  function sheet(dialog, opener){
    if (!dialog || typeof dialog.showModal !== 'function') return null;
    var closingTimer = null;
    var returnFocus = null;
    function open(from){
      returnFocus = from || opener || document.activeElement;
      clearTimeout(closingTimer);
      dialog.classList.remove('is-closing');
      /* A popover grows from its trigger, wherever banners above the header put it. */
      if (opener && dialog.classList.contains('sheet-pop')){
        var r = opener.getBoundingClientRect();
        dialog.style.setProperty('--pop-top', Math.round(Math.max(r.bottom, 0) + 8) + 'px');
        dialog.style.setProperty('--pop-right', Math.round(Math.max(window.innerWidth - r.right - 8, 16)) + 'px');
      }
      if (!dialog.open) dialog.showModal();
      if (opener) opener.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function(){ dialog.classList.add('is-open'); });
      root.classList.add('has-sheet');
    }
    function close(){
      if (!dialog.open) return;
      dialog.classList.remove('is-open');
      dialog.classList.add('is-closing');
      if (opener) opener.setAttribute('aria-expanded', 'false');
      var done = function(){ dialog.classList.remove('is-closing'); if (dialog.open) dialog.close(); root.classList.remove('has-sheet'); if (returnFocus && returnFocus.focus) returnFocus.focus(); };
      if (reduceMotion) done(); else closingTimer = setTimeout(done, 260);
    }
    dialog.addEventListener('cancel', function(e){ e.preventDefault(); close(); });
    /* A tap on the dimmed backdrop (the <dialog> box itself) closes it. */
    dialog.addEventListener('click', function(e){ if (e.target === dialog) close(); });
    dialog.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click', close); });
    if (opener) opener.addEventListener('click', function(){ dialog.open && !dialog.classList.contains('is-closing') ? close() : open(opener); });
    return { open: open, close: close, el: dialog };
  }

  var menu = sheet(document.getElementById('mobileNav'), document.getElementById('menuToggle'));
  if (menu){
    menu.el.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(){ menu.close(); }); });
    window.matchMedia('(min-width: 1200px)').addEventListener('change', function(e){ if (e.matches) menu.close(); });
  }

  /* ---------- Accessibility preferences ---------- */
  var A11Y_KEY = 'clinica_a11y';
  var a11y = (function(){ try { return JSON.parse(store(A11Y_KEY) || '{}') || {}; } catch (e) { return {}; } })();
  var a11ySheet = sheet(document.getElementById('a11yPanel'), document.getElementById('a11yToggle'));
  function applyA11y(){
    root.setAttribute('data-text', a11y.size || '0');
    ['contrast', 'motion', 'links', 'spacing'].forEach(function(k){ root.classList.toggle('a11y-' + k, !!a11y[k]); });
    reduceMotion = mqReduce.matches || !!a11y.motion;
    root.classList.toggle('js-motion', !reduceMotion);
    document.querySelectorAll('[data-a11y]').forEach(function(sw){ sw.setAttribute('aria-checked', a11y[sw.getAttribute('data-a11y')] ? 'true' : 'false'); });
    document.querySelectorAll('[data-text-size]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-text-size') === String(a11y.size || '0'))); });
    store(A11Y_KEY, JSON.stringify(a11y));
  }
  document.querySelectorAll('[data-a11y]').forEach(function(sw){
    sw.addEventListener('click', function(){ var k = sw.getAttribute('data-a11y'); a11y[k] = !a11y[k]; applyA11y(); });
  });
  document.querySelectorAll('[data-text-size]').forEach(function(b){
    b.addEventListener('click', function(){ a11y.size = b.getAttribute('data-text-size'); applyA11y(); });
  });
  var a11yReset = document.getElementById('a11yReset');
  if (a11yReset) a11yReset.addEventListener('click', function(){ a11y = {}; applyA11y(); });
  applyA11y();
  mqReduce.addEventListener && mqReduce.addEventListener('change', applyA11y);

  /* ---------- Reveal on scroll (content is visible without JS) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion){
    root.classList.add('js-reveal');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Stats: count up once, from 0 to the published number ---------- */
  var statEls = document.querySelectorAll('[data-count]');
  function countUp(el){
    var text = el.textContent;
    var m = text.match(/^(\D*)(\d+)(.*)$/);
    if (!m || reduceMotion || m[2] === '24') return;
    var target = parseInt(m[2], 10), start = null, dur = 900;
    function frame(ts){
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = m[1] + Math.round(target * eased) + m[3];
      if (p < 1) requestAnimationFrame(frame); else el.textContent = text;
    }
    requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window && statEls.length){
    var sio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ countUp(en.target); sio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    statEls.forEach(function(el){ sio.observe(el); });
  }

  /* ---------- Active section in the desktop navigation ---------- */
  var navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length){
    var byId = {};
    navLinks.forEach(function(a){ byId[a.getAttribute('href').slice(1)] = a; });
    var nio = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (!en.isIntersecting) return;
        navLinks.forEach(function(a){ a.removeAttribute('aria-current'); });
        var a = byId[en.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function(id){ var s = document.getElementById(id); if (s) nio.observe(s); });
  }

  /* ---------- Visiting hours: live status in Guatemala time (UTC−6, no DST) ---------- */
  var visitEls = Array.prototype.slice.call(document.querySelectorAll('#visitStatus, [data-visit-status]'));
  function visitStatus(){
    visitEls.forEach(function(visitEl){
      var windows = (visitEl.getAttribute('data-windows') || '').split(',').map(function(w){
        var m = w.trim().match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
        return m ? [(+m[1]) * 60 + (+m[2]), (+m[3]) * 60 + (+m[4]), m[1] + ':' + m[2], m[3] + ':' + m[4]] : null;
      }).filter(Boolean);
      if (!windows.length){ visitEl.hidden = true; return; }
      var now = new Date(Date.now() - 6 * 3600 * 1000);
      var mins = now.getUTCHours() * 60 + now.getUTCMinutes();
      var open = null, next = null;
      windows.forEach(function(w){
        if (mins >= w[0] && mins < w[1]) open = w;
        if (mins < w[0] && (!next || w[0] < next[0])) next = w;
      });
      if (!open && !next) next = windows.slice().sort(function(a, b){ return a[0] - b[0]; })[0];
      visitEl.setAttribute('data-state', open ? 'open' : 'closed');
      var label = visitEl.querySelector('[data-role="label"]');
      var detail = visitEl.querySelector('[data-role="detail"]');
      var detailText = open ? fmt(t('visits.until'), { time: open[3] }) : fmt(t('visits.next'), { time: next[2] });
      if (detail){ label.textContent = t(open ? 'visits.open' : 'visits.closed'); detail.textContent = detailText; }
      else if (label) label.textContent = open ? t('visits.open') : detailText;
    });
  }
  visitStatus();
  setInterval(visitStatus, 60000);
  langListeners.push(visitStatus);

  /* ---------- Patients: tabs (WAI-ARIA pattern) with a sliding indicator ---------- */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist){
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var indicator = tablist.querySelector('.tab-indicator');
    var moveIndicator = function(tab){
      if (!indicator) return;
      indicator.style.width = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    };
    var select = function(tab, focus){
      tabs.forEach(function(tb){
        var on = tb === tab;
        tb.setAttribute('aria-selected', String(on));
        tb.tabIndex = on ? 0 : -1;
        document.getElementById(tb.getAttribute('aria-controls')).hidden = !on;
      });
      moveIndicator(tab);
      if (focus) tab.focus();
    };
    tabs.forEach(function(tab, i){
      /* Feedback on press, not on release. */
      tab.addEventListener('pointerdown', function(){ select(tab, false); });
      tab.addEventListener('click', function(){ select(tab, false); });
      tab.addEventListener('keydown', function(e){
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n){ e.preventDefault(); select(n, true); }
      });
    });
    var current = function(){ return tabs.filter(function(tb){ return tb.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]; };
    window.addEventListener('resize', function(){ moveIndicator(current()); });
    langListeners.push(function(){ requestAnimationFrame(function(){ moveIndicator(current()); }); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ moveIndicator(current()); });
    requestAnimationFrame(function(){ moveIndicator(current()); });
  }

  /* ---------- Hospital bag checklist, saved only on this device ---------- */
  var BAG_KEY = 'clinica_bag';
  var bag = document.getElementById('bagList');
  if (bag){
    var saved = (function(){ try { return JSON.parse(store(BAG_KEY) || '[]') || []; } catch (e) { return []; } })();
    var boxes = Array.prototype.slice.call(bag.querySelectorAll('input[type="checkbox"]'));
    var progress = document.getElementById('bagProgress');
    var ring = document.getElementById('bagRing');
    var update = function(){
      var done = boxes.filter(function(b){ return b.checked; });
      if (progress) progress.textContent = fmt(t('bag.progress'), { n: done.length, total: boxes.length });
      if (ring){ ring.style.setProperty('--p', boxes.length ? done.length / boxes.length : 0); ring.toggleAttribute('data-empty', done.length === 0); }
      store(BAG_KEY, JSON.stringify(done.map(function(b){ return b.value; })));
    };
    boxes.forEach(function(b){ b.checked = saved.indexOf(b.value) !== -1; b.addEventListener('change', update); });
    update();
    langListeners.push(update);
  }

  /* ---------- "Get a quote" buttons pick the matching form option ---------- */
  document.querySelectorAll('[data-preselect]').forEach(function(a){
    a.addEventListener('click', function(){
      var sel = document.getElementById('service');
      var val = a.getAttribute('data-preselect');
      if (sel && sel.querySelector('option[value="' + val + '"]')) sel.value = val;
    });
  });

  /* ---------- Facilities gallery: native scroll-snap carousel in a sheet ----------
     Native scrolling gives 1:1 tracking, momentum projection and rubber-band
     edges for free; the buttons and dots only ask it to scroll. */
  var gallery = sheet(document.getElementById('galleryModal'));
  if (gallery){
    var slidesEl = document.getElementById('gallerySlides');
    var dotsEl = document.getElementById('galleryDots');
    var titleEl = document.getElementById('galleryTitle');
    var tagEl = document.getElementById('galleryTag');
    var descEl = document.getElementById('galleryDesc');
    var noteEl = document.getElementById('galleryNote');
    var liveEl = document.getElementById('galleryLive');
    var prev = document.getElementById('galleryPrev');
    var next = document.getElementById('galleryNext');
    var index = 0, count = 0;
    var go = function(i){
      i = Math.max(0, Math.min(count - 1, i));
      var w = slidesEl.clientWidth;
      slidesEl.scrollTo({ left: i * w, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    var sync = function(){
      var i = Math.round(slidesEl.scrollLeft / Math.max(1, slidesEl.clientWidth));
      if (i === index && dotsEl.childNodes.length) return;
      index = i;
      Array.prototype.forEach.call(dotsEl.children, function(d, k){ d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      prev.disabled = i <= 0;
      next.disabled = i >= count - 1;
      liveEl.textContent = count > 1 ? fmt(t('projects.modal_image_of'), { n: i + 1, total: count }) : '';
    };
    slidesEl.addEventListener('scroll', function(){ requestAnimationFrame(sync); }, { passive: true });
    prev.addEventListener('click', function(){ go(index - 1); });
    next.addEventListener('click', function(){ go(index + 1); });
    slidesEl.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight'){ e.preventDefault(); go(index + 1); }
      if (e.key === 'ArrowLeft'){ e.preventDefault(); go(index - 1); }
    });
    document.querySelectorAll('.area-card[data-project]').forEach(function(card){
      var btn = card.querySelector('.area-open');
      if (!btn) return;
      btn.addEventListener('click', function(){
        var pid = card.getAttribute('data-project');
        var title = t(pid + '.title');
        var paths = (card.getAttribute('data-images') || '').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        tagEl.textContent = t(pid + '.tag');
        titleEl.textContent = title;
        descEl.textContent = t(pid + '.desc');
        slidesEl.innerHTML = '';
        dotsEl.innerHTML = '';
        if (!paths.length){
          var ph = document.createElement('div');
          var art = card.querySelector('.area-art');
          ph.className = 'gallery-slide is-placeholder ' + (art ? art.className : '');
          ph.innerHTML = art ? art.innerHTML : '';
          slidesEl.appendChild(ph);
        }
        paths.forEach(function(p, k){
          var meta = SITE_IMAGES[p] || {};
          var alt = (meta.alt && (meta.alt[currentLang] || meta.alt.es)) || fmt(t('projects.modal_photo_alt'), { n: k + 1, title: title });
          var slide = document.createElement('div');
          slide.className = 'gallery-slide';
          var img = document.createElement('img');
          img.src = p;
          if (meta.srcset){ img.srcset = meta.srcset; img.sizes = '(max-width: 760px) 100vw, 760px'; }
          img.alt = alt;
          img.decoding = 'async';
          if (k > 0) img.loading = 'lazy';
          slide.appendChild(img);
          slidesEl.appendChild(slide);
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', fmt(t('projects.modal_goto_slide'), { n: k + 1 }));
          dot.addEventListener('click', function(){ go(k); });
          dotsEl.appendChild(dot);
        });
        count = Math.max(1, paths.length);
        noteEl.hidden = paths.length > 0;
        dotsEl.hidden = prev.hidden = next.hidden = paths.length < 2;
        index = -1;
        gallery.open(btn);
        slidesEl.scrollLeft = 0;
        sync();
      });
    });
  }

  /* ---------- Service details: a sheet anchored to the card that opened it ---------- */
  var serviceSheet = sheet(document.getElementById('serviceModal'));
  if (serviceSheet){
    var sHero = document.getElementById('serviceHero');
    var sIcon = document.getElementById('serviceIcon');
    var sTitle = document.getElementById('serviceTitle');
    var sText = document.getElementById('serviceText');
    var sWa = document.getElementById('serviceWa');
    var openService = function(card, btn){
      var key = card.getAttribute('data-service');
      var photo = card.querySelector('.service-photo');
      var icon = card.querySelector('.service-icon');
      sHero.innerHTML = '';
      if (photo){
        var img = photo.cloneNode(false);
        img.removeAttribute('loading');
        img.className = '';
        img.sizes = '(max-width: 760px) 100vw, 640px';
        sHero.appendChild(img);
      }
      sIcon.innerHTML = icon ? icon.innerHTML : '';
      sIcon.className = 'service-icon' + (key === 'service1' ? ' is-emergency' : '');
      sTitle.textContent = t(key + '.title');
      sText.innerHTML = '';
      [t(key + '.desc')].concat(String(t(key + '.more') || '').split(/\n\s*\n/)).forEach(function(par){
        par = par.trim();
        if (!par) return;
        var p = document.createElement('p');
        p.textContent = par;
        sText.appendChild(p);
      });
      sWa.setAttribute('data-wa', key + '.title');
      sWa.setAttribute('href', waUrl((currentLang === 'es' ? 'Hola, quisiera información sobre ' : 'Hello, I\'d like information about ') + t(key + '.title').toLowerCase() + (currentLang === 'es' ? ' en ' : ' at ') + siteName() + '.'));
      serviceSheet.open(btn);
      sText.scrollTop = 0;
    };
    var labelServices = function(){
      document.querySelectorAll('.service-card[data-service]').forEach(function(card){
        var btn = card.querySelector('.service-open');
        if (btn) btn.setAttribute('aria-label', fmt(t('services.more_aria'), { name: t(card.getAttribute('data-service') + '.title') }));
      });
    };
    document.querySelectorAll('.service-card[data-service]').forEach(function(card){
      var btn = card.querySelector('.service-open');
      if (btn) btn.addEventListener('click', function(){ openService(card, btn); });
    });
    langListeners.push(labelServices);
  }

  /* ---------- Map: loaded only when the visitor asks (no Google request before) ---------- */
  var mapBox = document.getElementById('mapBox');
  var mapLoad = document.getElementById('mapLoad');
  if (mapBox && mapLoad){
    mapLoad.addEventListener('click', function(){
      if (mapBox.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = mapBox.getAttribute('data-src');
      f.title = t('contact.map_frame');
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      f.addEventListener('load', function(){ mapBox.classList.add('is-loaded'); f.focus(); });
      mapBox.appendChild(f);
    });
  }

  /* ---------- Save contact: a correct vCard built on the device ---------- */
  var vcardBtn = document.getElementById('vcardBtn');
  if (vcardBtn){
    vcardBtn.addEventListener('click', function(){
      var d = {};
      try { d = JSON.parse(vcardBtn.getAttribute('data-vcard') || '{}'); } catch (e) { return; }
      var esc = function(v){ return String(v || '').replace(/([\\,;])/g, '\\$1').replace(/\n/g, '\\n'); };
      var lines = ['BEGIN:VCARD', 'VERSION:3.0', 'KIND:org', 'FN:' + esc(d.name), 'ORG:' + esc(d.name)];
      (d.tel || []).forEach(function(n, i){ lines.push('TEL;TYPE=' + (i === 0 ? 'WORK,VOICE' : 'CELL,VOICE') + ':' + n); });
      if (d.email) lines.push('EMAIL;TYPE=WORK:' + d.email);
      lines.push('ADR;TYPE=WORK:;;' + esc(d.street) + ';' + esc(d.city) + ';;;Guatemala');
      if (d.url) lines.push('URL:' + d.url);
      lines.push('END:VCARD');
      var blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/vcard;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = siteName().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.vcf';
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });
  }

  /* ---------- Photos fade in once loaded (no pop-in on slow connections) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.service-photo, .area-photo, .about-photo, .maternity-img, .hero-photo img'), function(img){
    if (img.complete && img.naturalWidth) return;
    img.classList.add('is-loading');
    function done(){ img.classList.remove('is-loading'); }
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });

  /* ---------- Gentle parallax on the large photos (transform only, rAF-batched) ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var mqWide = window.matchMedia('(min-width: 900px)');
  var plxTicking = false;
  function parallax(){
    plxTicking = false;
    var vh = window.innerHeight;
    parallaxEls.forEach(function(el){
      if (reduceMotion || !mqWide.matches){ el.style.transform = ''; return; }
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var offset = (r.top + r.height / 2 - vh / 2) * -0.06;
      el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
    });
  }
  if (parallaxEls.length){
    window.addEventListener('scroll', function(){ if (!plxTicking){ plxTicking = true; requestAnimationFrame(parallax); } }, { passive: true });
    window.addEventListener('resize', parallax);
    requestAnimationFrame(parallax);
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop){
    backToTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var skip = document.getElementById('inicio');
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  applyLang(currentLang);
  requestAnimationFrame(onScroll);

  /* ============================================================
     Contact form — client-side validation (a UX convenience only;
     assets/contact-handler.php re-validates everything server-side),
     honeypot + minimum-completion-time anti-spam signals, and a
     defensive fetch() that handles non-JSON responses, HTTP status
     categories, timeouts, duplicate submits, offline errors, and
     field-specific errors returned by the server. Field values are
     preserved on any failure and cleared only after a confirmed
     success.
     ============================================================ */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var summary = document.getElementById('formSummary');

  /* Minimum-completion-time signal: stamped once, invisible, never an
     expectation placed on the visitor — purely a server-side anti-spam
     input alongside the honeypot. */
  var loadedAtField = document.getElementById('formLoadedAt');
  if (loadedAtField) loadedAtField.value = String(Date.now());

  /* ------------------------------------------------------------
     Captcha, two layers (verified again in assets/contact-handler.php):
     1. Built-in, always on: the handler issues a signed, single-use
        challenge and the browser finds the matching number with the
        Web Crypto API (SHA-256) in the background while the visitor
        types. Invisible: the visitor never has to do anything.
     2. Optional Cloudflare Turnstile, only when the page carries a
        site key (the owner enables it in the Content Manager). It
        stays hidden unless Cloudflare needs the visitor to click.
     ------------------------------------------------------------ */
  var captchaInput = document.getElementById('formCaptchaAnswer');
  var captchaText = document.getElementById('formCaptchaText');
  var captchaNote = document.getElementById('formCaptcha');
  var captchaJob = null;      /* Promise of the current answer */
  var captchaIssued = 0;      /* when the current challenge was requested */
  var CAPTCHA_FRESH_MS = 25 * 60 * 1000; /* the server accepts 30 min */

  function setCaptchaState(state){
    if (captchaNote) captchaNote.setAttribute('data-state', state);
    if (captchaText){
      captchaText.setAttribute('data-i18n', 'form.captcha_' + state);
      captchaText.textContent = t('form.captcha_' + state);
    }
  }

  function hexToBytes(hex){
    var out = new Uint8Array(hex.length / 2);
    for (var i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }

  function sameBytes(buf, target){
    var a = new Uint8Array(buf);
    for (var i = 0; i < target.length; i++) if (a[i] !== target[i]) return false;
    return true;
  }

  function solveCaptcha(){
    if (!captchaInput) return Promise.resolve();
    if (!window.crypto || !window.crypto.subtle || typeof TextEncoder === 'undefined' || typeof fetch === 'undefined'){
      setCaptchaState('error');
      return Promise.reject(new Error('captcha_unsupported'));
    }
    captchaInput.value = '';
    captchaIssued = Date.now();
    setCaptchaState('pending');
    return handlerFetch('assets/contact-handler.php?challenge=1', { headers: { 'Accept': 'application/json' }, cache: 'no-store', credentials: 'same-origin' })
      .then(function(res){
        if (!res.ok) throw new Error('captcha_challenge_' + res.status);
        return res.json();
      })
      .then(function(c){
        if (!c || c.algorithm !== 'SHA-256' || typeof c.salt !== 'string' || typeof c.challenge !== 'string') throw new Error('captcha_bad_challenge');
        var enc = new TextEncoder();
        var target = hexToBytes(c.challenge);
        var BATCH = 1000;
        var search = function(start){
          if (start > c.maxnumber) throw new Error('captcha_unsolved');
          var end = Math.min(start + BATCH, c.maxnumber + 1);
          var jobs = [];
          for (var n = start; n < end; n++) jobs.push(window.crypto.subtle.digest('SHA-256', enc.encode(c.salt + n)));
          return Promise.all(jobs).then(function(hashes){
            for (var i = 0; i < hashes.length; i++) if (sameBytes(hashes[i], target)) return start + i;
            return search(end);
          });
        };
        return search(0).then(function(number){
          captchaInput.value = btoa(JSON.stringify({ algorithm: c.algorithm, challenge: c.challenge, number: number, salt: c.salt, signature: c.signature }));
          setCaptchaState('ok');
        });
      })
      .catch(function(err){
        setCaptchaState('error');
        captchaJob = null;
        throw err;
      });
  }

  /* The current answer, or a new one when there is none or it is getting old. */
  function ensureCaptcha(){
    if (!captchaJob || Date.now() - captchaIssued > CAPTCHA_FRESH_MS) captchaJob = solveCaptcha();
    return captchaJob;
  }

  function startCaptcha(){
    ensureCaptcha().catch(function(){ /* shown in the note; retried on submit */ });
    loadTurnstile();
  }

  /* Optional Cloudflare Turnstile. */
  var tsBox = document.getElementById('formTurnstile');
  var tsSiteKey = tsBox ? (tsBox.getAttribute('data-sitekey') || '') : '';
  var tsWidget = null;
  var tsToken = '';
  var tsWaiters = [];
  var tsLoading = false;

  function tsSettle(){
    var w = tsWaiters; tsWaiters = [];
    w.forEach(function(fn){ fn(); });
  }

  function loadTurnstile(){
    if (!tsSiteKey || tsLoading) return;
    tsLoading = true;
    window.clinicaTurnstileReady = function(){
      if (!window.turnstile) return;
      tsWidget = window.turnstile.render(tsBox, {
        sitekey: tsSiteKey,
        action: 'contact',
        appearance: 'interaction-only',
        language: currentLang === 'en' ? 'en' : 'es',
        callback: function(token){ tsToken = token; tsSettle(); },
        'expired-callback': function(){ tsToken = ''; },
        'error-callback': function(){ tsToken = ''; tsSettle(); }
      });
    };
    var sc = document.createElement('script');
    sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=clinicaTurnstileReady';
    sc.async = true;
    sc.defer = true;
    document.head.appendChild(sc);
  }

  /* Resolves with true when Turnstile is off or has a token; false after waiting. */
  function turnstileReady(){
    if (!tsSiteKey) return Promise.resolve(true);
    loadTurnstile();
    if (tsToken) return Promise.resolve(true);
    return new Promise(function(resolve){
      var timer = setTimeout(function(){ resolve(!!tsToken); }, 20000);
      tsWaiters.push(function(){ clearTimeout(timer); resolve(!!tsToken); });
    });
  }

  function resetTurnstile(){
    tsToken = '';
    if (tsWidget !== null && window.turnstile) {
      try { window.turnstile.reset(tsWidget); } catch (e) { /* widget gone */ }
    }
  }

  /* Start as soon as the visitor shows interest in the form (or it scrolls into view). */
  var contactFormEl = document.getElementById('contactForm');
  if (contactFormEl && captchaInput){
    var started = false;
    var kick = function(){ if (!started){ started = true; startCaptcha(); } };
    contactFormEl.addEventListener('focusin', kick);
    contactFormEl.addEventListener('pointerdown', kick);
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        if (entries.some(function(e){ return e.isIntersecting; })){ io.disconnect(); kick(); }
      }, { rootMargin: '300px' });
      io.observe(contactFormEl);
    }
  }

  if (form){
    /* The questions come from the Content Manager (Sitio web → Formulario de
       contacto): each .field holds one question — an input, select or
       textarea, or a group of radio buttons / checkboxes. */
    var questionFields = function(){
      return Array.prototype.filter.call(form.querySelectorAll('.field'), function(f){
        return !f.classList.contains('hp-field') && f.querySelector('input[name],select[name],textarea[name]');
      });
    };
    var fieldName = function(field){
      return field.querySelector('input[name],select[name],textarea[name]').name.replace(/\[\]$/, '');
    };
    var controlsOf = function(field){ return field.querySelectorAll('input[name],select[name],textarea[name]'); };
    var fieldValid = function(field){
      var controls = controlsOf(field);
      if (controls[0].type === 'checkbox'){
        if (!field.hasAttribute('data-required')) return true;
        return Array.prototype.some.call(controls, function(c){ return c.checked; });
      }
      return controls[0].checkValidity(); /* a radio's validity covers its whole group */
    };
    var markField = function(field, ok){
      field.classList.toggle('invalid', !ok);
      Array.prototype.forEach.call(controlsOf(field), function(c){ c.setAttribute('aria-invalid', ok ? 'false' : 'true'); });
    };
    var fieldByName = function(name){
      var found = null;
      questionFields().forEach(function(f){ if (!found && fieldName(f) === name) found = f; });
      return found;
    };
    /* Dates that must be from today on (the page is static: today is set here). */
    var today = new Date();
    var todayIso = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    Array.prototype.forEach.call(form.querySelectorAll('input[type="date"][data-future]'), function(d){ d.min = todayIso; });

    var submitBtn = form.querySelector('button[type="submit"]');
    var submitting = false;

    var validateAll = function(){
      var valid = true;
      var firstInvalid = null;
      questionFields().forEach(function(field){
        var ok = fieldValid(field);
        markField(field, ok);
        if (!ok){
          valid = false;
          if (!firstInvalid) firstInvalid = controlsOf(field)[0];
        }
      });
      return { valid: valid, firstInvalid: firstInvalid };
    }

    var showSummary = function(message){
      if (!summary) return;
      summary.textContent = message;
      summary.hidden = false;
    }
    var hideSummary = function(){
      if (!summary) return;
      summary.hidden = true;
      summary.textContent = '';
    }

    var setStatus = function(message, kind){
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status show' + (kind ? ' ' + kind : '');
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (submitting) return; /* duplicate-submission guard */

      hideSummary();

      var result = validateAll();

      /* Honeypot check — if this hidden field has a value, silently drop
         as bot spam without hitting the network or alarming the (bot)
         "user" that anything was detected. */
      var hp = document.getElementById('website');
      if (hp && hp.value){
        setStatus(t('form.status_ok'), 'ok');
        form.reset();
        if (loadedAtField) loadedAtField.value = String(Date.now());
        return;
      }

      if (!result.valid){
        showSummary(t('form.status_invalid'));
        setStatus(t('form.status_invalid'), 'error');
        if (result.firstInvalid) result.firstInvalid.focus();
        return;
      }

      if (typeof navigator !== 'undefined' && navigator.onLine === false){
        setStatus(t('form.status_offline'), 'error');
        return;
      }

      submitting = true;
      if (submitBtn) submitBtn.disabled = true;
      var done = function(){
        submitting = false;
        if (submitBtn) submitBtn.disabled = false;
      };
      if (captchaInput && !captchaInput.value) setStatus(t('form.status_verifying'), '');

      ensureCaptcha()
        .then(function(){ return turnstileReady(); })
        .then(function(ok){
          if (!ok){ setStatus(t('form.status_turnstile'), 'error'); done(); return; }
          send(false);
        }, function(){
          setStatus(t('form.status_captcha'), 'error');
          done();
        });

      function send(retried){
      setStatus(t('form.status_sending'), '');
      var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var timeoutId = controller ? setTimeout(function(){ controller.abort(); }, 15000) : null;

      var formData = new FormData(form);
      formData.append('lang', currentLang === 'en' ? 'en' : 'es'); /* reply in the visitor's language */
      handlerFetch('assets/contact-handler.php', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
        signal: controller ? controller.signal : undefined
      })
        .then(function(res){
          if (timeoutId) clearTimeout(timeoutId);
          var contentType = res.headers.get('Content-Type') || '';
          var parse = contentType.indexOf('application/json') !== -1
            ? res.json().catch(function(){ return null; })
            : Promise.resolve(null);
          return parse.then(function(data){ return { res: res, data: data }; });
        })
        .then(function(result){
          var res = result.res, data = result.data;

          if (res.ok && data && data.ok){
            setStatus(t(okKey()), 'ok');
            hideSummary();
            form.reset();
            questionFields().forEach(function(f){ markField(f, true); });
            if (loadedAtField) loadedAtField.value = String(Date.now());
            /* Each captcha answer works once: prepare the next one. */
            captchaJob = null;
            resetTurnstile();
            ensureCaptcha().catch(function(){});
            return;
          }

          if (res.status === 400 && data && data.error === 'captcha_failed'){
            /* Expired or already used answer (e.g. the page was open for
               hours): solve a fresh one and try once more on our own. */
            captchaJob = null;
            resetTurnstile();
            if (!retried){
              ensureCaptcha()
                .then(function(){ return turnstileReady(); })
                .then(function(ok){
                  if (!ok){ setStatus(t('form.status_turnstile'), 'error'); done(); return; }
                  send(true);
                }, function(){ setStatus(t('form.status_captcha'), 'error'); done(); });
              return 'pending';
            }
            setStatus(t('form.status_captcha'), 'error');
            return;
          }

          if (res.status === 429){
            setStatus(t('form.status_rate_limited'), 'error');
            return;
          }

          if (res.status === 422 && data && Array.isArray(data.fields) && data.fields.length){
            var firstBad = null;
            data.fields.forEach(function(name){
              var bad = fieldByName(String(name));
              if (!bad) return;
              markField(bad, false);
              if (!firstBad) firstBad = controlsOf(bad)[0];
            });
            showSummary(t('form.status_invalid'));
            setStatus(t('form.status_invalid'), 'error');
            if (firstBad) firstBad.focus();
            return;
          }

          if (res.status >= 500){
            setStatus(t('form.status_error'), 'error');
            return;
          }

          /* Any other non-success status (403 origin check, unexpected
             field rejected, malformed/non-JSON response, etc.) — generic,
             non-revealing error message. Values are preserved either way. */
          setStatus(t('form.status_error'), 'error');
        })
        .catch(function(err){
          if (timeoutId) clearTimeout(timeoutId);
          if (err && err.name === 'AbortError'){
            setStatus(t('form.status_timeout'), 'error');
          } else if (typeof navigator !== 'undefined' && navigator.onLine === false){
            setStatus(t('form.status_offline'), 'error');
          } else {
            setStatus(t('form.status_error'), 'error');
          }
        })
        .then(function(outcome){
          if (outcome !== 'pending') done();
        });
      }
    });

    questionFields().forEach(function(field){
      Array.prototype.forEach.call(controlsOf(field), function(input){
        var check = function(){ markField(field, fieldValid(field)); };
        input.addEventListener('blur', check);
        /* choices: re-check as soon as one is picked */
        if (input.type === 'radio' || input.type === 'checkbox') input.addEventListener('change', check);
      });
    });
  }
  /* ============================================================
     HOSPITAL MODULES (cms/src/HospitalModules.php) — every block is
     optional: each part below does nothing when its markup is absent.
     ============================================================ */
  var todayYmd = (function(){ var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); })();
  var fold = function(s){
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
  };

  /* ---------- Featured notice: hidden after its end date; closing hides it for this visit ---------- */
  var notice = document.getElementById('siteNotice');
  if (notice){
    var until = notice.getAttribute('data-until') || '';
    var noticeKey = 'clinica_notice_closed';
    var noticeSig = String((I18N.es['notice.text'] || notice.textContent || '').length) + ':' + until;
    var closed = false;
    try { closed = sessionStorage.getItem(noticeKey) === noticeSig; } catch (e) { /* storage blocked */ }
    if ((until && until < todayYmd) || closed) notice.hidden = true;
    var noticeClose = document.getElementById('noticeClose');
    if (noticeClose) noticeClose.addEventListener('click', function(){
      notice.hidden = true;
      try { sessionStorage.setItem(noticeKey, noticeSig); } catch (e) { /* storage blocked */ }
      var main = document.getElementById('main');
      if (main) main.focus({ preventScroll: true });
    });
  }

  /* ---------- Texts made of several pieces (package lists, service page paragraphs) ---------- */
  var applyPieces = function(){
    document.querySelectorAll('[data-split-i18n]').forEach(function(ul){
      var val = t(ul.getAttribute('data-split-i18n'));
      if (!val || val === ul.getAttribute('data-split-i18n')) return;
      var items = val.split(/[;\n]+/).map(function(s){ return s.trim(); }).filter(Boolean);
      ul.innerHTML = '';
      items.forEach(function(text){
        var li = document.createElement('li');
        li.innerHTML = '<svg aria-hidden="true"><use href="#i-check"/></svg>';
        var span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);
        ul.appendChild(li);
      });
    });
    document.querySelectorAll('[data-i18n-paras]').forEach(function(box){
      var val = t(box.getAttribute('data-i18n-paras'));
      if (!val || val === box.getAttribute('data-i18n-paras')) return;
      box.innerHTML = '';
      val.split(/\n\s*\n/).forEach(function(par){
        par = par.trim();
        if (!par) return;
        var p = document.createElement('p');
        p.textContent = par;
        box.appendChild(p);
      });
    });
    document.querySelectorAll('[data-stars]').forEach(function(s){ s.setAttribute('aria-label', fmt(t('reviews.stars_aria'), { n: s.getAttribute('data-stars') })); });
    document.querySelectorAll('[data-reviews-count]').forEach(function(s){ s.textContent = fmt(t('reviews.count_text'), { n: s.getAttribute('data-reviews-count') }); });
    /* «Pedir cita» by WhatsApp: a message naming the doctor and the specialty. */
    document.querySelectorAll('[data-wa-doc]').forEach(function(a){
      var k = a.getAttribute('data-wa-doc');
      a.setAttribute('href', waUrl(fmt(t('doctors.wa_msg'), { site: siteName(), name: a.getAttribute('data-doc-name') || '', specialty: t(k + '.specialty') === k + '.specialty' ? '' : t(k + '.specialty') })));
    });
  };
  langListeners.push(applyPieces);
  if (currentLang !== 'es') applyPieces();

  /* ---------- Doctors: search by name or specialty, filter by specialty ---------- */
  var docGrid = document.getElementById('doctorsGrid');
  if (docGrid){
    var docSearch = document.getElementById('docSearch');
    var docFilter = document.getElementById('docFilter');
    var docEmpty = document.getElementById('docEmpty');
    var docCount = document.getElementById('docCount');
    var activeSpec = '';
    var docTimer = null;
    /* Changing the filter is animated with the Web Animations API so it works in
       every browser: cards that leave fade out in place, the ones that stay glide
       to their new position, new ones rise in one after another and the grid
       changes height smoothly. A new choice while it runs starts from where the
       cards are on screen. */
    var flipToken = 0;
    var FLIP_EASE = 'cubic-bezier(.22, 1, .36, 1)';
    var docMatches = function(card){
      var q = fold(docSearch ? docSearch.value : '');
      var okSpec = !activeSpec || card.getAttribute('data-spec') === activeSpec;
      var okText = !q || q.split(' ').every(function(w){ return (card.getAttribute('data-search') || '').indexOf(w) !== -1; });
      return okSpec && okText;
    };
    var filterDoctors = function(announce){
      var calm = document.documentElement.classList.contains('a11y-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      var cards = Array.prototype.slice.call(docGrid.children);
      var filtered = !!(activeSpec || fold(docSearch ? docSearch.value : ''));
      if (calm || !docGrid.animate || !docGrid.getAnimations){ applyDocFilter(announce); docGrid.classList.toggle('is-filtered', filtered); return; }
      var token = ++flipToken;
      var leaving = cards.filter(function(c){ return !c.hidden && !docMatches(c); });
      var move = function(){
        if (token !== flipToken) return;
        var first = [];
        cards.forEach(function(c){ first.push(c.hidden || leaving.indexOf(c) !== -1 ? null : c.getBoundingClientRect()); });
        var h0 = docGrid.getBoundingClientRect().height;
        cards.concat([docGrid]).forEach(function(c){ c.getAnimations().forEach(function(a){ if (a.id === 'case-flip') a.cancel(); }); });
        applyDocFilter(announce);
        docGrid.classList.toggle('is-filtered', filtered);
        var h1 = docGrid.getBoundingClientRect().height, entering = 0;
        cards.forEach(function(c, i){
          if (c.hidden) return;
          var a = first[i], b = c.getBoundingClientRect(), anim;
          if (a){
            var dx = a.left - b.left, dy = a.top - b.top;
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
            anim = c.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 640, easing: FLIP_EASE });
          } else {
            anim = c.animate([{ opacity: 0, transform: 'translateY(34px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 620, delay: 70 + Math.min(entering++, 6) * 60, easing: FLIP_EASE, fill: 'backwards' });
          }
          anim.id = 'case-flip';
        });
        if (Math.abs(h0 - h1) > 1) docGrid.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }], { duration: 640, easing: FLIP_EASE }).id = 'case-flip';
      };
      if (!leaving.length){ move(); return; }
      leaving.forEach(function(c){
        c.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.93)' }], { duration: 210, easing: 'cubic-bezier(.4, 0, 1, 1)', fill: 'forwards' }).id = 'case-flip';
      });
      setTimeout(move, 200);
    };
    var applyDocFilter = function(announce){
      var q = fold(docSearch ? docSearch.value : '');
      var shown = 0;
      Array.prototype.forEach.call(docGrid.children, function(card){
        var okSpec = !activeSpec || card.getAttribute('data-spec') === activeSpec;
        var okText = !q || q.split(' ').every(function(w){ return (card.getAttribute('data-search') || '').indexOf(w) !== -1; });
        card.hidden = !(okSpec && okText);
        if (!card.hidden){ shown++; card.classList.add('in'); }
      });
      if (docEmpty) docEmpty.hidden = shown !== 0;
      if (docCount && announce) docCount.textContent = shown === 1 ? t('doctors.result1') : fmt(t('doctors.results'), { n: shown });
    };
    if (docSearch) docSearch.addEventListener('input', function(){
      clearTimeout(docTimer);
      docTimer = setTimeout(function(){ filterDoctors(true); }, 180);
    });
    if (docFilter) docFilter.addEventListener('click', function(e){
      var b = e.target.closest ? e.target.closest('.chip-btn') : null;
      if (!b) return;
      activeSpec = b.getAttribute('data-filter') || '';
      Array.prototype.forEach.call(docFilter.querySelectorAll('.chip-btn'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      filterDoctors(true);
    });
  }

  /* ---------- Appointment: preselect specialty / doctor (cards, service pages, ?caso= / ?servicio=) ---------- */
  var apptForm = document.getElementById('appointmentForm');
  var apptSpec = document.getElementById('apptSpecialty');
  var apptDoc = document.getElementById('apptDoctor');
  var preselectAppointment = function(doctor, spec){
    if (!apptForm) return false;
    if (apptDoc && doctor && apptDoc.querySelector('option[value="' + doctor + '"]')){
      apptDoc.value = doctor;
      spec = spec || apptDoc.options[apptDoc.selectedIndex].getAttribute('data-spec');
    }
    if (apptSpec && spec && apptSpec.querySelector('option[value="' + spec + '"]')) apptSpec.value = spec;
    return true;
  };
  if (apptForm){
    document.querySelectorAll('[data-appt-doctor],[data-appt-spec]').forEach(function(a){
      a.addEventListener('click', function(e){
        if (!preselectAppointment(a.getAttribute('data-appt-doctor'), a.getAttribute('data-appt-spec'))) return;
        e.preventDefault();
        var target = document.getElementById('reunion');
        if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        setTimeout(function(){ var f = document.getElementById('apptDate'); if (f) f.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
      });
    });
    /* Picking a doctor also picks the specialty. */
    if (apptDoc) apptDoc.addEventListener('change', function(){
      var o = apptDoc.options[apptDoc.selectedIndex];
      var s = o ? o.getAttribute('data-spec') : '';
      if (s && apptSpec && apptSpec.querySelector('option[value="' + s + '"]')) apptSpec.value = s;
    });
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('caso') || params.get('servicio')) preselectAppointment(params.get('caso'), params.get('servicio'));
    } catch (e) { /* old browser */ }
  }

  /* ---------- Request forms (appointment, insurance check) ----------
     Same handler, anti-spam and captcha as the contact form; stored in
     «Prospectos» with their kind. */
  Array.prototype.forEach.call(document.querySelectorAll('form.lead-form'), function(lf){
    var stamp = lf.querySelector('[data-loaded-at]');
    if (stamp) stamp.value = String(Date.now());
    var statusEl = lf.querySelector('[data-form-status]');
    var btn = lf.querySelector('button[type="submit"]');
    var busy = false;
    var kicked = false;
    var kickOff = function(){ if (!kicked){ kicked = true; startCaptcha(); } };
    lf.addEventListener('focusin', kickOff);
    lf.addEventListener('pointerdown', kickOff);
    Array.prototype.forEach.call(lf.querySelectorAll('input[type="date"][data-future]'), function(d){ d.min = todayYmd; });
    var fields = function(){ return Array.prototype.filter.call(lf.querySelectorAll('.field'), function(f){ return f.querySelector('input[name],select[name],textarea[name]'); }); };
    var ctl = function(f){ return f.querySelector('input[name],select[name],textarea[name]'); };
    var valid = function(f){ return ctl(f).checkValidity(); };
    var mark = function(f, ok){ f.classList.toggle('invalid', !ok); ctl(f).setAttribute('aria-invalid', ok ? 'false' : 'true'); };
    var say = function(msg, kind){ if (!statusEl) return; statusEl.textContent = msg; statusEl.className = 'form-status show' + (kind ? ' ' + kind : ''); };
    fields().forEach(function(f){ ctl(f).addEventListener('blur', function(){ mark(f, valid(f)); }); ctl(f).addEventListener('change', function(){ if (f.classList.contains('invalid')) mark(f, valid(f)); }); });
    var finish = function(){ busy = false; if (btn) btn.disabled = false; };
    var post = function(retried){
      say(t('form.status_sending'), '');
      var fd = new FormData(lf);
      fd.set('captcha', captchaInput ? captchaInput.value : '');
      if (tsToken) fd.set('cf-turnstile-response', tsToken);
      fd.append('lang', currentLang === 'en' ? 'en' : 'es');
      handlerFetch('assets/contact-handler.php', { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
        .then(function(res){ return res.json().catch(function(){ return null; }).then(function(data){ return { res: res, data: data }; }); })
        .then(function(r){
          if (r.res.ok && r.data && r.data.ok){
            say(t(okKey(lf.getAttribute('data-ok'))), 'ok');
            lf.reset();
            fields().forEach(function(f){ mark(f, true); });
            if (stamp) stamp.value = String(Date.now());
            captchaJob = null; resetTurnstile(); ensureCaptcha().catch(function(){});
            finish();
            return;
          }
          if (r.res.status === 400 && r.data && r.data.error === 'captcha_failed' && !retried){
            captchaJob = null; resetTurnstile();
            ensureCaptcha().then(turnstileReady).then(function(ok){ if (ok) post(true); else { say(t('form.status_turnstile'), 'error'); finish(); } }, function(){ say(t('form.status_captcha'), 'error'); finish(); });
            return;
          }
          if (r.res.status === 422 && r.data && Array.isArray(r.data.fields)){
            var first = null;
            r.data.fields.forEach(function(name){
              var c = lf.querySelector('[name="' + String(name).replace(/[^a-z_]/g, '') + '"]');
              var f = c && c.closest('.field');
              if (f){ mark(f, false); if (!first) first = c; }
            });
            say(t('form.status_invalid'), 'error');
            if (first) first.focus();
          } else if (r.res.status === 429){
            say(t('form.status_rate_limited'), 'error');
          } else {
            say(t('form.status_error'), 'error');
          }
          finish();
        })
        .catch(function(){ say(t(navigator.onLine === false ? 'form.status_offline' : 'form.status_error'), 'error'); finish(); });
    };
    lf.addEventListener('submit', function(e){
      e.preventDefault();
      if (busy) return;
      var hp = lf.querySelector('input[name="website"]');
      if (hp && hp.value){ say(t(lf.getAttribute('data-ok') || 'form.status_ok'), 'ok'); lf.reset(); return; }
      var first = null;
      fields().forEach(function(f){ var ok = valid(f); mark(f, ok); if (!ok && !first) first = ctl(f); });
      if (first){ say(t('form.status_invalid'), 'error'); first.focus(); return; }
      busy = true;
      if (btn) btn.disabled = true;
      kickOff();
      if (captchaInput && !captchaInput.value) say(t('form.status_verifying'), '');
      ensureCaptcha().then(turnstileReady).then(function(ok){
        if (!ok){ say(t('form.status_turnstile'), 'error'); finish(); return; }
        post(false);
      }, function(){ say(t('form.status_captcha'), 'error'); finish(); });
    });
  });
})();
