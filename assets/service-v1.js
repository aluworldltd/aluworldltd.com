/* ALUWORLD LTD — service pages (/services/*): quick-quote form and footer year.
   The form posts to Netlify exactly like the homepage quick-quote form. */
(() => {
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
