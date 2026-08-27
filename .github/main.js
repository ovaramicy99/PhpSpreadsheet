// NEXORA — shared behavior

document.addEventListener('DOMContentLoaded', () => {
  /* Theme switcher */
  const themeTrigger = document.querySelector('.theme-trigger');
  const themeMenu = document.querySelector('.theme-menu');
  if (themeTrigger && themeMenu) {
    themeTrigger.addEventListener('click', () => {
      const open = themeMenu.classList.toggle('open');
      themeTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!themeTrigger.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.remove('open');
        themeTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.querySelectorAll('.theme-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const t = opt.dataset.theme;
        if (t) {
          document.documentElement.setAttribute('data-theme', t);
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        try { localStorage.setItem('nexora-theme', t || ''); } catch (e) {}
        themeMenu.classList.remove('open');
        themeTrigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Mark active nav link by current page */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* Games page — filter chips */
  const chips = document.querySelectorAll('.filter-chip');
  const gameCards = document.querySelectorAll('.game-card');
  if (chips.length && gameCards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const genre = chip.dataset.genre;
        gameCards.forEach(card => {
          const match = genre === 'all' || card.dataset.genre === genre;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Auth page — tab switching */
  const tabs = document.querySelectorAll('.auth-tab');
  const panels = document.querySelectorAll('.form-panel');
  function activateAuthPanel(targetId) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.target === targetId));
    panels.forEach(p => p.classList.toggle('active', p.id === targetId));
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateAuthPanel(tab.dataset.target));
  });
  document.querySelectorAll('[data-switch]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateAuthPanel(link.dataset.switch);
    });
  });

  /* Auth page — basic client-side validation (demo only, no backend) */
  function validateField(input, test, msg) {
    const field = input.closest('.field');
    const errorEl = field.querySelector('.field-error');
    const ok = test(input.value.trim());
    field.classList.toggle('invalid', !ok);
    if (errorEl && msg) errorEl.textContent = msg;
    return ok;
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#login-email');
      const pass = loginForm.querySelector('#login-password');
      const okEmail = validateField(email, v => /^\S+@\S+\.\S+$/.test(v), 'Masukkan alamat email yang valid.');
      const okPass = validateField(pass, v => v.length >= 6, 'Kata sandi minimal 6 karakter.');
      const success = loginForm.querySelector('.form-success');
      if (okEmail && okPass) {
        success.textContent = 'Berhasil masuk — ini demo front-end, tidak ada akun yang benar-benar dibuat.';
        success.classList.add('show');
      } else {
        success.classList.remove('show');
      }
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const tag = registerForm.querySelector('#reg-tag');
      const email = registerForm.querySelector('#reg-email');
      const pass = registerForm.querySelector('#reg-password');
      const confirm = registerForm.querySelector('#reg-confirm');
      const okTag = validateField(tag, v => v.length >= 3, 'Gamertag minimal 3 karakter.');
      const okEmail = validateField(email, v => /^\S+@\S+\.\S+$/.test(v), 'Masukkan alamat email yang valid.');
      const okPass = validateField(pass, v => v.length >= 6, 'Kata sandi minimal 6 karakter.');
      const okConfirm = validateField(confirm, v => v === pass.value.trim() && v.length > 0, 'Kata sandi tidak cocok.');
      const success = registerForm.querySelector('.form-success');
      if (okTag && okEmail && okPass && okConfirm) {
        success.textContent = 'Akun berhasil dibuat — ini demo front-end, tidak ada data yang benar-benar disimpan.';
        success.classList.add('show');
      } else {
        success.classList.remove('show');
      }
    });
  }
});
