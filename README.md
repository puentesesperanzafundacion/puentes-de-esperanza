# Fundación Puentes de Esperanza — Sitio Oficial

## Descripción

Sitio web institucional de la Fundación Puentes de Esperanza. Construido con HTML5, CSS3 y JavaScript Vanilla. Sin frameworks ni dependencias externas.

---

## 🗂️ Estructura del proyecto

```
/
├── index.html              # Página principal (all-in-one)
├── centro-de-ayuda.html    # FAQ + guías + procedimientos
├── biblioteca.html         # Recursos descargables
├── transparencia.html      # Informes + rendición de cuentas
├── css/
│   ├── main.css            # Variables + reset + base
│   ├── components.css      # Componentes reutilizables
│   └── sections.css        # Secciones específicas
├── js/
│   ├── config.js           # ← ÚNICO ARCHIVO A EDITAR
│   └── main.js             # Lógica + renderizado dinámico
├── assets/
│   ├── icons/favicon.svg
│   └── images/
├── documents/              # PDFs descargables
├── robots.txt
├── sitemap.xml
├── manifest.json
└── README.md
```

---

## ✏️ Cómo actualizar contenido

**Solo necesitas editar `js/config.js`**. Allí puedes modificar:

- Información institucional (misión, visión, valores)
- Datos de contacto (email, WhatsApp, horario)
- Contadores de impacto
- Servicios
- Equipo
- FAQ / Centro de ayuda
- Noticias
- Testimonios
- Transparencia

---

## 🚀 Publicar el sitio

### GitHub Pages
1. Sube todos los archivos a un repositorio público en GitHub
2. Ve a Settings → Pages → Source: main branch / root
3. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Netlify
1. Arrastra la carpeta del proyecto a [netlify.com](https://netlify.com)
2. ¡Listo! Dominio gratuito `.netlify.app`

### Cloudflare Pages
1. Conecta tu repositorio de GitHub en [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sin configuración de build necesaria (sitio estático)

---

## 🔧 Funciones implementadas

- ✅ Menú fijo con scroll spy
- ✅ Menú responsive (hamburguesa)
- ✅ Hero animado
- ✅ Contadores animados (Intersection Observer)
- ✅ Acordeón FAQ accesible (ARIA)
- ✅ Botón flotante de WhatsApp
- ✅ Botón volver arriba
- ✅ Formulario con validación en tiempo real
- ✅ Banner de cookies
- ✅ Animaciones de entrada (fade-in)
- ✅ SEO completo (meta tags, OG, Twitter Cards, JSON-LD)
- ✅ WCAG AA (teclado, ARIA, contraste, focus visible)
- ✅ Lazy loading y Intersection Observer
- ✅ Responsive (móvil, tablet, laptop, 4K)
- ✅ Preparado para modo oscuro
- ✅ Skip link de accesibilidad
- ✅ CSS Variables (fácil personalización)
- ✅ robots.txt + sitemap.xml + manifest.json

---

## 🌐 Dominio personalizado

Para usar `puentesdeesperanza.org` u otro dominio:
1. Adquiere el dominio en Namecheap, GoDaddy, etc.
2. Configura los DNS apuntando a GitHub Pages / Netlify / Cloudflare
3. Actualiza las URLs en `index.html` (canonical, OG, JSON-LD) y en `sitemap.xml`

---

## 📋 Próximos pasos recomendados

- [ ] Conectar formulario a Google Sheets (con Google Apps Script o Formspree)
- [ ] Agregar imágenes reales del equipo y actividades
- [ ] Configurar el número de WhatsApp real en `config.js`
- [ ] Publicar el dominio y actualizar las URLs canónicas
- [ ] Agregar el logotipo oficial (reemplazar el SVG inline del nav)
- [ ] Completar la sección de equipo en `config.js`
- [ ] Añadir primeras noticias

---

## 📞 Contacto del proyecto

puentes.esperanza.fundacion@gmail.com
