/* ============================================================
   FUNDACIÓN PUENTES DE ESPERANZA — JAVASCRIPT PRINCIPAL
   main.js
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────
   UTILIDADES
   ────────────────────────────────────────────────────────── */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

/* ──────────────────────────────────────────────────────────
   NAVEGACIÓN
   ────────────────────────────────────────────────────────── */

function initNav() {
  const nav      = $('.nav');
  const toggle   = $('.nav-toggle');
  const mobileMenu = $('.nav-mobile');

  if (!nav) return;

  // Solidificar nav en scroll
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.remove('transparent');
      nav.classList.add('solid');
    } else {
      nav.classList.add('transparent');
      nav.classList.remove('solid');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburguesa
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Cerrar al clicar un link
    $$('.nav-link', mobileMenu).forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll Spy
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link[href^="#"]');

  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  sections.forEach(s => spyObserver.observe(s));
}

/* ──────────────────────────────────────────────────────────
   ANIMACIONES (Intersection Observer)
   ────────────────────────────────────────────────────────── */

function initAnimations() {
  const elements = $$('.fade-in, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────
   CONTADORES ANIMADOS
   ────────────────────────────────────────────────────────── */

function initCounters() {
  const counters = $$('[data-count]');

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(ease * target);
      el.textContent = prefix + current.toLocaleString('es-MX') + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────
   BOTÓN VOLVER ARRIBA
   ────────────────────────────────────────────────────────── */

function initBackToTop() {
  const btn = $('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ──────────────────────────────────────────────────────────
   ACORDEÓN FAQ
   ────────────────────────────────────────────────────────── */

function initFAQ() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer   = btn.nextElementSibling;

      // Cerrar todos
      $$('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const a = b.nextElementSibling;
        if (a) a.classList.remove('open');
      });

      // Abrir si estaba cerrado
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────
   FORMULARIO DE ASESORÍA
   ────────────────────────────────────────────────────────── */

function initForm() {
  const form = $('#asesoria-form');
  if (!form) return;

  const required = $$('[required]', form);
  const successMsg = $('#form-success');

  function validateField(field) {
    const group = field.closest('.form-group');
    const errMsg = group?.querySelector('.form-error-msg');
    let valid = true;
    let msg   = '';

    if (!field.value.trim()) {
      valid = false;
      msg   = 'Este campo es obligatorio.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      valid = false;
      msg   = 'Ingresa un correo electrónico válido.';
    } else if (field.name === 'whatsapp' && field.value.trim().length > 0 && !/^\+?[\d\s\-()]{7,}$/.test(field.value)) {
      valid = false;
      msg   = 'Ingresa un número de teléfono válido.';
    }

    field.classList.toggle('error', !valid);
    if (errMsg) {
      errMsg.textContent = msg;
      errMsg.classList.toggle('visible', !valid);
    }

    return valid;
  }

  required.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    required.forEach(field => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) return;

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    // Envío real a Formspree
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mvzjvqqv', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      } else {
        const data = await response.json();
        btn.disabled = false;
        btn.textContent = 'Enviar solicitud de orientación';
        alert('Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos por WhatsApp.');
        console.error('Formspree error:', data);
      }
    } catch (error) {
      btn.disabled = false;
      btn.textContent = 'Enviar solicitud de orientación';
      alert('Error de conexión. Por favor verifica tu internet e intenta de nuevo.');
      console.error('Network error:', error);
    }
  });
}

/* ──────────────────────────────────────────────────────────
   BANNER DE COOKIES
   ────────────────────────────────────────────────────────── */

function initCookies() {
  if (localStorage.getItem('cookies-accepted')) return;

  const banner = $('.cookie-banner');
  if (!banner) return;

  setTimeout(() => banner.classList.add('visible'), 1200);

  const acceptBtn = $('#cookie-accept');
  const declineBtn = $('#cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', '1');
      banner.classList.remove('visible');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'declined');
      banner.classList.remove('visible');
    });
  }
}

/* ──────────────────────────────────────────────────────────
   RENDERIZADO DINÁMICO (desde config.js)
   ────────────────────────────────────────────────────────── */

function renderImpact() {
  const container = $('#impact-grid');
  if (!container || !CONFIG?.impacto) return;

  container.innerHTML = CONFIG.impacto.map((item, i) => `
    <div class="impact-item fade-in delay-${i + 1}">
      <span
        class="impact-number"
        data-count="${item.numero}"
        data-prefix="${item.prefijo}"
        data-suffix="${item.sufijo}"
      >${item.prefijo}0${item.sufijo}</span>
      <span class="impact-label">${item.etiqueta}</span>
    </div>
  `).join('');

  initCounters();
}

function renderServicios() {
  const container = $('#services-grid');
  if (!container || !CONFIG?.servicios) return;

  const svgIcons = {
    '⚖️': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3L2 7l10 4 10-4-10-4z"/><path d="M2 17l10 4 10-4"/><path d="M2 12l10 4 10-4"/></svg>',
    '🏠': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    '🌐': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    '🚶': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
    '📖': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
    '❤️': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    '📢': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>',
  };

  container.innerHTML = CONFIG.servicios.map((s, i) => {
    const icon = svgIcons[s.icono] || svgIcons['⚖️'];
    return `
    <article class="service-card fade-in delay-${(i % 3) + 1}" role="article">
      <div class="service-icon-wrap">${icon}</div>
      <h3 class="service-title">${s.titulo}</h3>
      <p class="service-description">${s.descripcion}</p>
      <span class="service-cta">Solicitar orientación →</span>
    </article>`;
  }).join('');

  initAnimations();
}

function renderTestimonios() {
  const container = $('#testimonials-grid');
  if (!container || !CONFIG?.testimonios) return;

  container.innerHTML = CONFIG.testimonios.map((t, i) => `
    <article class="testimonial-card fade-in delay-${i + 1}">
      <span class="testimonial-quote" aria-hidden="true">"</span>
      <p class="testimonial-text">${t.texto}</p>
      <div class="testimonial-person">
        <div class="testimonial-avatar" aria-hidden="true">${getInitials(t.persona)}</div>
        <div class="testimonial-meta">
          <span class="testimonial-name">${t.persona}</span>
          <span class="testimonial-country">🌍 ${t.pais}</span>
        </div>
      </div>
    </article>
  `).join('');

  initAnimations();
}

function renderEquipo() {
  const container = $('#team-grid');
  if (!container) return;

  // Perfiles genéricos institucionales — sin inventar nombres reales
  const perfilesGenericos = [
    {
      icono: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true"><path d="M12 3L2 7l10 4 10-4-10-4z"/><path d="M2 17l10 4 10-4"/><path d="M2 12l10 4 10-4"/></svg>',
      cargo: 'Coordinación General',
      desc: 'Especialistas en derecho migratorio y derechos humanos con amplia trayectoria en atención a personas en movilidad.'
    },
    {
      icono: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
      cargo: 'Atención Humanitaria',
      desc: 'Equipo dedicado al acompañamiento directo y atención inmediata de personas en contexto de movilidad humana.'
    },
    {
      icono: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
      cargo: 'Vinculación Institucional',
      desc: 'Área de relaciones con organismos nacionales e internacionales, alianzas estratégicas y trabajo en red.'
    },
    {
      icono: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
      cargo: 'Voluntariado',
      desc: 'Red de profesionales voluntarios que contribuyen con su tiempo y conocimiento a nuestra labor humanitaria.'
    },
  ];

  // Usa config si tiene datos reales, si no usa genéricos
  const equipo = (CONFIG?.equipo && CONFIG.equipo.length > 0 && CONFIG.equipo[0].nombre !== 'Nombre del Coordinador/a')
    ? CONFIG.equipo.map((m, i) => `
      <article class="team-card fade-in delay-${i + 1}">
        <div class="team-photo-placeholder" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20v-2a8 8 0 0116 0v2"/></svg>
        </div>
        <h3 class="team-name">${m.nombre}</h3>
        <p class="team-cargo">${m.cargo}</p>
        <p class="team-desc">${m.descripcion}</p>
      </article>`)
    : perfilesGenericos.map((p, i) => `
      <article class="team-card fade-in delay-${i + 1}">
        <div class="team-photo-placeholder" aria-hidden="true">${p.icono}</div>
        <h3 class="team-name" style="font-size:var(--text-base);">Equipo</h3>
        <p class="team-cargo">${p.cargo}</p>
        <p class="team-desc">${p.desc}</p>
      </article>`);

  container.innerHTML = equipo.join('');
  initAnimations();
}

function renderFAQ() {
  const container = $('#faq-container');
  if (!container || !CONFIG?.faq) return;

  container.innerHTML = CONFIG.faq.map(cat => `
    <section class="faq-category" aria-label="${cat.categoria}">
      <h3 class="faq-cat-title">${cat.categoria}</h3>
      <div class="faq-list">
        ${cat.preguntas.map((p, i) => `
          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              aria-controls="faq-answer-${cat.categoria}-${i}"
              id="faq-btn-${cat.categoria}-${i}"
            >
              ${p.pregunta}
              <span class="faq-icon" aria-hidden="true">+</span>
            </button>
            <div
              class="faq-answer"
              role="region"
              id="faq-answer-${cat.categoria}-${i}"
              aria-labelledby="faq-btn-${cat.categoria}-${i}"
            >
              <p class="faq-answer-inner">${p.respuesta}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');

  initFAQ();
}

function renderNoticias() {
  const container = $('#news-grid');
  if (!container) return;

  const noticias = CONFIG?.noticias || [];

  // Cards de noticias reales
  const realCards = noticias.map((n, i) => `
    <a class="news-card fade-in delay-${i + 1}" href="${n.enlace}" aria-label="Leer: ${n.titulo}">
      <div class="news-image">
        <div class="news-image-inner">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.7" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <span class="news-category">Actividades</span>
      </div>
      <div class="news-body">
        <time class="news-date" datetime="${n.fecha}">${formatDate(n.fecha)}</time>
        <h3 class="news-title">${n.titulo}</h3>
        <p class="news-excerpt">${n.resumen}</p>
        <span class="news-read-more">Leer más →</span>
      </div>
    </a>`).join('');

  // Placeholders visuales para completar grid de 3
  const placeholders = [
    { titulo: 'Próximamente: Guías sobre refugio en México', sub: 'Recursos y orientación' },
    { titulo: 'Próximamente: Talleres y actividades', sub: 'Formación y comunidad' },
  ];
  const needed = Math.max(0, 3 - noticias.length);
  const placeholderCards = placeholders.slice(0, needed).map((p, i) => `
    <div class="news-card placeholder fade-in delay-${noticias.length + i + 1}" aria-hidden="true">
      <div class="news-image">
        <div class="news-image-inner" style="background:rgba(240,90,40,0.15);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(240,90,40,0.5)" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
        <span class="news-category" style="background:rgba(240,90,40,0.15);color:var(--color-primary);">Próximamente</span>
      </div>
      <div class="news-body">
        <div class="news-date">En preparación</div>
        <h3 class="news-title" style="color:var(--color-muted);">${p.titulo}</h3>
        <p class="news-excerpt" style="color:var(--color-muted-light);">${p.sub}</p>
      </div>
    </div>`).join('');

  container.innerHTML = realCards + placeholderCards;
  initAnimations();
}

function renderTransparencia() {
  const container = $('#transparency-container');
  if (!container || !CONFIG?.transparencia) return;

  const docIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
  const catIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;

  // Categorías pendientes a mostrar visualmente
  const categoriasPendientes = [
    'Estados financieros',
    'Documentos institucionales',
    'Convenios y alianzas',
    'Convocatorias',
  ];

  const catsConfig = CONFIG.transparencia.map(cat => `
    <div class="transparency-cat">
      <h3 class="transparency-cat-title">${catIcon} ${cat.categoria}</h3>
      ${cat.archivos.length === 0
        ? `<div class="transparency-coming-card">
            ${docIcon}
            <div>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-muted);">Próximamente disponible</div>
              <div style="font-size:var(--text-xs);color:var(--color-muted-light);margin-top:2px;">Se publicará conforme esté disponible</div>
            </div>
          </div>`
        : `<div class="resource-grid">
            ${cat.archivos.map(f => `
              <a class="resource-card" href="${f.archivo}" download aria-label="Descargar ${f.nombre}">
                <div class="resource-icon">${docIcon}</div>
                <div>
                  <div class="resource-info-title">${f.nombre}</div>
                  <div class="resource-info-type">PDF · Descargar</div>
                </div>
              </a>`).join('')}
          </div>`
      }
    </div>`).join('');

  const catsPendientes = categoriasPendientes
    .filter(c => !CONFIG.transparencia.find(t => t.categoria === c))
    .map(c => `
    <div class="transparency-cat">
      <h3 class="transparency-cat-title">${catIcon} ${c}</h3>
      <div class="transparency-coming-card">
        ${docIcon}
        <div>
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-muted);">Próximamente disponible</div>
          <div style="font-size:var(--text-xs);color:var(--color-muted-light);margin-top:2px;">Se publicará conforme esté disponible</div>
        </div>
      </div>
    </div>`).join('');

  container.innerHTML = catsConfig + catsPendientes;
}

function renderWhatsApp() {
  const links = $$('[data-whatsapp]');
  if (!CONFIG?.contacto?.whatsapp) return;

  const num  = CONFIG.contacto.whatsapp;
  const text = encodeURIComponent(CONFIG.contacto.whatsappTexto || '');
  const url  = `https://wa.me/${num}?text=${text}`;

  links.forEach(el => el.setAttribute('href', url));
}

function renderSocial() {
  const container = $('#footer-social');
  if (!container || !CONFIG?.contacto?.redes) return;

  const redes = CONFIG.contacto.redes;
  const iconos = {
    facebook:  { svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>', label: 'Facebook' },
    instagram: { svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>', label: 'Instagram' },
    twitter:   { svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>', label: 'Twitter / X' },
    linkedin:  { svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>', label: 'LinkedIn' },
    youtube:   { svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>', label: 'YouTube' }
  };

  const links = Object.entries(redes)
    .filter(([, url]) => url)
    .map(([red, url]) => {
      const icono = iconos[red];
      if (!icono) return '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${icono.label}">${icono.svg}</a>`;
    }).join('');

  container.innerHTML = links || '<span style="font-size:var(--text-sm);color:rgba(255,255,255,0.4);">Próximamente en redes sociales</span>';
}

function renderContactInfo() {
  const emailEls    = $$('[data-email]');
  const horarioEls  = $$('[data-horario]');
  const dirEls      = $$('[data-direccion]');

  emailEls.forEach(el => {
    el.textContent = CONFIG.contacto.email;
    el.href        = `mailto:${CONFIG.contacto.email}`;
  });

  horarioEls.forEach(el => el.textContent = CONFIG.contacto.horario);
  dirEls.forEach(el => el.textContent = CONFIG.contacto.direccion);
}

function renderValores() {
  const container = $('#valores-grid');
  if (!container || !CONFIG?.org?.valores) return;

  // SVG icons institucionales (misma familia visual, stroke-width=2)
  const svgIcons = {
    '⚖️': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3L2 7l10 4 10-4-10-4z"/><path d="M2 17l10 4 10-4"/><path d="M2 12l10 4 10-4"/></svg>',
    '🤝': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    '💡': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    '🌍': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    '🔒': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    '📚': '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
  };

  container.innerHTML = CONFIG.org.valores.map((v, i) => {
    const icon = svgIcons[v.icono] || svgIcons['💡'];
    return `
    <div class="valor-item fade-in delay-${(i % 6) + 1}">
      <div class="valor-icon-wrap">${icon}</div>
      <p class="valor-name">${v.titulo}</p>
      <p class="valor-desc">${v.descripcion}</p>
    </div>`;
  }).join('');

  initAnimations();
}

function renderMisionVision() {
  const mEl = $('#mision-text');
  const vEl = $('#vision-text');

  if (mEl && CONFIG?.org?.mision) mEl.textContent = CONFIG.org.mision;
  if (vEl && CONFIG?.org?.vision) vEl.textContent = CONFIG.org.vision;
}

/* ──────────────────────────────────────────────────────────
   TABS CENTRO DE AYUDA
   ────────────────────────────────────────────────────────── */

function initHelpTabs() {
  const tabs     = $$('.help-tab');
  const contents = $$('[data-tab-content]');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab);
      });

      contents.forEach(c => {
        c.style.display = c.dataset.tabContent === target ? 'block' : 'none';
      });
    });
  });
}

/* ──────────────────────────────────────────────────────────
   INICIO
   ────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración global
  if (CONFIG?.org?.name) {
    document.title = `${CONFIG.org.name} — Asistencia jurídica a migrantes y refugiados`;
  }

  // Navegación
  initNav();

  // Renderizado dinámico
  renderImpact();
  renderServicios();
  renderTestimonios();
  renderEquipo();
  renderFAQ();
  renderNoticias();
  renderTransparencia();
  renderWhatsApp();
  renderContactInfo();
  renderSocial();
  renderValores();
  renderMisionVision();

  // UI
  initAnimations();
  initBackToTop();
  initCookies();
  initHelpTabs();
  initForm();

  // Scroll suave para anclas internas
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // alto del nav
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
