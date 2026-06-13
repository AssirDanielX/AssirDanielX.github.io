(function() {

  /* ── EMAILJS INIT */
  emailjs.init({ publicKey: "uQJgs979eals5AiOX" });

  /* ── THEME */
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) html.dataset.theme = saved;

  document.getElementById('themeBtn').addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', html.dataset.theme);
  });

  /* ── SIDEBAR */
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
    setTimeout(() => { if (!overlay.classList.contains('open')) overlay.style.display = 'none'; }, 300);
  }

  hamburger.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  overlay.addEventListener('click', closeSidebar);
  document.querySelectorAll('.sidebar-link').forEach(l => l.addEventListener('click', closeSidebar));

  /* ── TYPING */
  const name = "Assirdoua Daniel Bien";
  const el = document.getElementById('typedName');
  let i = 0;
  function typeNext() {
    if (i <= name.length) { el.textContent = name.slice(0, i++); setTimeout(typeNext, 65); }
  }
  setTimeout(typeNext, 600);

  /* ── SCROLL REVEAL + SKILL BARS */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const w = bar.dataset.w || 1;
          bar.style.transform = `scaleX(${w})`;
        });
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ── PROJECT FILTER */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
      });
    });
  });

  /* ── EMAILJS FORM */
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');
    btn.disabled = true;
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Envoi...';
    msg.className = 'form-msg';

    emailjs.sendForm('service_x7yq5vs', 'template_hv88k4a', this)
      .then(() => {
        msg.className = 'form-msg success';
        msg.textContent = 'Message envoyé ! Je te répondrai rapidement.';
        this.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="bx bx-send"></i> Envoyer le message';
      })
      .catch(() => {
        msg.className = 'form-msg error';
        msg.textContent = "Une erreur s'est produite. Essaie par email directement.";
        btn.disabled = false;
        btn.innerHTML = '<i class="bx bx-send"></i> Envoyer le message';
      });
  });

})();