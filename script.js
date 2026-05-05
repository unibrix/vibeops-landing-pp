const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--mx', `${event.clientX}px`);
    root.style.setProperty('--my', `${event.clientY}px`);
  }, { passive: true });

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const updateParallax = () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const y = window.scrollY;
    parallaxItems.forEach((el) => {
      if (isMobile) {
        el.style.transform = '';
        return;
      }
      const speed = Number(el.dataset.parallax || 0);
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

(function () {
  var KEY = 'vibeops_consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var stored;
  try { stored = localStorage.getItem(KEY); } catch (e) { stored = null; }
  if (stored !== 'granted' && stored !== 'denied') banner.hidden = false;

  banner.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-consent]');
    if (!btn) return;
    var choice = btn.dataset.consent === 'accept' ? 'granted' : 'denied';
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: choice,
        ad_user_data: choice,
        ad_personalization: choice,
        analytics_storage: choice
      });
    }
    banner.hidden = true;
  });
})();

if (new URLSearchParams(window.location.search).get('thanks') === '1') {
  const card = document.querySelector('#access .access-card');
  if (card) {
    card.innerHTML = '<div><p class="eyebrow">Thanks</p><h2>You are on the list.</h2><p>We will follow up shortly with the checklist and audit option. In the meantime, reply to that email with your repo link if you want a deeper look.</p><p><a class="btn primary" href="/">Back to VibeOps</a></p></div>';
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
