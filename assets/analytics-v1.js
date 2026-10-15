(() => {
  const live = location.hostname === 'aluworldltd.com' || location.hostname === 'www.aluworldltd.com';
  let enabled = false;
  let choice;
  try { choice = localStorage.getItem('aluworld-analytics-consent'); } catch (_) {}
  const start = () => {
    if (enabled || !live) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', 'G-ZZPRHT1KS3', {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZZPRHT1KS3';
    document.head.append(script);
  };
  window.trackAluworldEvent = (name, params) => {
    if (!enabled) return;
    try { gtag('event', name, params); } catch (_) {}
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="tel:"]');
    if (link) window.trackAluworldEvent('phone_click', { contact_method: 'phone' });
  });
  const banner = document.createElement('aside');
  banner.setAttribute('aria-label', 'Analytics choice');
  banner.className = 'analytics-choice';
  banner.innerHTML = '<p>We use cookies to understand how you use our website and help us improve it. <a href="/privacy/">Privacy policy</a></p><div><button type="button" data-choice="yes">Accept cookies</button><button type="button" data-choice="no">Reject cookies</button></div>';
  banner.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]');
    if (!button) return;
    choice = button.dataset.choice;
    try { localStorage.setItem('aluworld-analytics-consent', choice); } catch (_) {}
    banner.remove();
    if (choice === 'yes') start();
    else if (enabled) location.reload();
  });
  if (choice === 'yes') start();
  if (!choice) document.body.append(banner);
  document.querySelectorAll('[data-analytics-settings]').forEach(button => {
    button.addEventListener('click', () => document.body.append(banner));
  });
})();
