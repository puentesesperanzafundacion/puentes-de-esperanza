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

  // Re-inicializar contadores para los nuevos elementos
  initCounters();
}

function renderServicios() {
  const container = $('#services-grid');
  if (!container || !CONFIG?.servicios) return;

  container.innerHTML = CONFIG.servicios.map((s, i) => `
    <article class="service-card fade-in delay-${(i % 4) + 1}" role="article">
      <span class="service-icon" aria-hidden="true">${s.icono}</span>
      <h3 class="service-title">${s.titulo}</h3>
      <p class="service-description">${s.descripcion}</p>
    </article>
  `).join('');

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
  if (!container || !CONFIG?.equipo) return;

  container.innerHTML = CONFIG.equipo.map((m, i) => `
    <article class="team-card fade-in delay-${i + 1}">
      <div class="team-photo-placeholder" aria-hidden="true">👤</div>
      <h3 class="team-name">${m.nombre}</h3>
      <p class="team-cargo">${m.cargo}</p>
      <p class="team-desc">${m.descripcion}</p>
    </article>
  `).join('');

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
  if (!container || !CONFIG?.noticias) return;

  if (CONFIG.noticias.length === 0) {
    container.innerHTML = `<p class="transparency-empty">Próximamente publicaremos noticias y actualizaciones.</p>`;
    return;
  }

  container.innerHTML = CONFIG.noticias.map((n, i) => `
    <a class="news-card fade-in delay-${i + 1}" href="${n.enlace}" aria-label="Leer: ${n.titulo}">
      <div class="news-image">
        <div style="width:100%;height:100%;background:var(--grad-institucional);display:flex;align-items:center;justify-content:center;font-size:3rem;">📰</div>
      </div>
      <div class="news-body">
        <time class="news-date" datetime="${n.fecha}">${formatDate(n.fecha)}</time>
        <h3 class="news-title">${n.titulo}</h3>
        <p class="news-excerpt">${n.resumen}</p>
        <span class="news-read-more">Leer más →</span>
      </div>
    </a>
  `).join('');

  initAnimations();
}

function renderTransparencia() {
  const container = $('#transparency-container');
  if (!container || !CONFIG?.transparencia) return;

  container.innerHTML = CONFIG.transparencia.map(cat => `
    <div class="transparency-cat">
      <h3 class="transparency-cat-title">${cat.categoria}</h3>
      ${cat.archivos.length === 0
        ? `<p class="transparency-empty">Próximamente disponible.</p>`
        : `<div class="resource-grid">
            ${cat.archivos.map(f => `
              <a class="resource-card" href="${f.archivo}" download aria-label="Descargar ${f.nombre}">
                <span class="resource-icon" aria-hidden="true">📄</span>
                <div>
                  <div class="resource-info-title">${f.nombre}</div>
                  <div class="resource-info-type">PDF</div>
                </div>
              </a>
            `).join('')}
          </div>`
      }
    </div>
  `).join('');
}

function renderWhatsApp() {
  const links = $$('[data-whatsapp]');
  if (!CONFIG?.contacto?.whatsapp) return;

  const num  = CONFIG.contacto.whatsapp;
  const text = encodeURIComponent(CONFIG.contacto.whatsappTexto || '');
  const url  = `https://wa.me/${num}?text=${text}`;

  links.forEach(el => el.setAttribute('href', url));
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

  container.innerHTML = CONFIG.org.valores.map((v, i) => `
    <div class="valor-item fade-in delay-${i + 1}">
      <span class="valor-icon" aria-hidden="true">${v.icono}</span>
      <div>
        <p class="valor-name">${v.titulo}</p>
        <p class="valor-desc">${v.descripcion}</p>
      </div>
    </div>
  `).join('');

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
