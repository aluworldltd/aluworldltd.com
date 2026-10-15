/* ALUWORLD LTD — service pages (/services/*): menu, Services dropdown, quick-quote form, footer year.
   The form posts to Netlify exactly like the homepage quick-quote form. */
(() => {
  /* Menu (phones and tablets) */
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.matchMedia('(min-width: 1101px)').addEventListener?.('change', (event) => {
    if (event.matches) setMenu(false);
  });

  /* Services dropdown: opens on hover with a mouse; the arrow button opens it on touch screens. */
  document.querySelectorAll('.has-menu').forEach((item) => {
    const toggle = item.querySelector('.nav-sub-toggle');
    const setOpen = (open) => {
      item.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setOpen(!item.classList.contains('open'));
    });
    document.addEventListener('click', (event) => {
      if (!item.contains(event.target)) setOpen(false);
    });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && item.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  });

  const form = document.querySelector('form[name="quick-quote"]');
  if (form) {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const originalButtonText = button.innerHTML;

    const showStatus = (message, type) => {
      status.textContent = message;
      status.className = 'form-status is-visible ' + type;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      if (!form.checkValidity()) {
        form.reportValidity();
        showStatus('Please complete all required fields before sending your request.', 'is-error');
        return;
      }

      if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
        showStatus('Preview test successful. On the live Netlify site, this request will be delivered.', 'is-success');
        return;
      }

      button.disabled = true;
      button.textContent = 'Sending…';

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (!response.ok) throw new Error('Submission failed');

        window.trackAluworldEvent?.('generate_lead', {
          form_name: form.getAttribute('name'),
          site_visit_requested: 'no'
        });
        form.reset();
        showStatus('Thanks! We\'ll follow up within one business day with your free quote.', 'is-success');
      } catch (error) {
        showStatus('We could not send your request. Please call (647) 504-4338 or email aluworldltd@gmail.com.', 'is-error');
      } finally {
        button.disabled = false;
        button.innerHTML = originalButtonText;
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
