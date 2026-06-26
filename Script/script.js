/* ════════════════════════════════
   PORTFOLIO — main.js
════════════════════════════════ */
(function () {

  /* ── THEME ─────────────────────────────────── */
  const html  = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) html.dataset.theme = saved;

  document.getElementById('themeBtn').addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', html.dataset.theme);
  });

  /* ── SIDEBAR MOBILE ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    overlay.style.display = 'block';
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!overlay.classList.contains('open')) overlay.style.display = 'none';
    }, 320);
  }

  hamburger.addEventListener('click', () =>
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
  );
  overlay.addEventListener('click', closeSidebar);
  document.querySelectorAll('.sidebar-link').forEach(l =>
    l.addEventListener('click', closeSidebar)
  );

  /* ── TYPING ANIMATION ──────────────────────── */
  const fullName = 'Assirdoua Daniel Bien';
  const nameEl   = document.getElementById('typedName');
  let   charIdx  = 0;

  function typeNext() {
    if (charIdx <= fullName.length) {
      nameEl.textContent = fullName.slice(0, charIdx++);
      setTimeout(typeNext, 65);
    }
  }
  setTimeout(typeNext, 600);

  /* ── SCROLL REVEAL + SKILL BARS ────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.transform = `scaleX(${bar.dataset.w || 1})`;
      });
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── PROJECT FILTER ────────────────────────── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
      });
    });
  });

  /* ── EMAILJS FORM ──────────────────────────── */
  emailjs.init({ publicKey: 'uQJgs979eals5AiOX' });

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMsg   = document.getElementById('formMsg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Envoi...';
      formMsg.className = 'form-msg';

      emailjs.sendForm('service_x7yq5vs', 'template_hv88k4a', this)
        .then(() => {
          formMsg.className = 'form-msg success';
          formMsg.textContent = 'Message envoyé ! Je te répondrai rapidement.';
          form.reset();
        })
        .catch(() => {
          formMsg.className = 'form-msg error';
          formMsg.textContent = "Une erreur s'est produite. Écris-moi directement à dannerworld1@gmail.com";
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bx bx-send"></i> Envoyer le message';
        });
    });
  }

})();


function fitDesignCards() {
  document.querySelectorAll('.design-card').forEach(card => {
    const img = card.querySelector('.design-img');
    if (!img) return;

    function applyRatio() {
      const w = card.offsetWidth;
      const ratio = img.naturalHeight / img.naturalWidth;
      card.style.height = (w * ratio) + 'px';
    }

    if (img.complete && img.naturalWidth > 0) {
      applyRatio();
    } else {
      img.addEventListener('load', applyRatio);
    }
  });
}

fitDesignCards();
window.addEventListener('resize', fitDesignCards);
