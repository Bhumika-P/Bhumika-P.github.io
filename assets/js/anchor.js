(function () {
  // 1) Find the swiper instance that controls your main slider.
  // Many templates attach it to a variable; we can also grab it from the DOM.
  const sliderEl = document.querySelector('.swiper.portfolio__main-slider, .swiper_portfolio_main-slider, .swiper');
  const wrapper = document.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Try to get Swiper instance from element (Swiper v6+ attaches it here)
  const swiper = sliderEl && sliderEl.swiper ? sliderEl.swiper : null;

  // Fallback: search any swiper on the page that has our slides
  const activeSwiper =
    swiper ||
    (window.Swiper && Array.from(document.querySelectorAll('.swiper')).map(s => s.swiper).find(Boolean)) ||
    null;

  if (!activeSwiper) {
    console.warn('Swiper instance not found. Paste your Swiper init code and I’ll hook it up.');
    return;
  }

  const offcanvas = document.querySelector('.offcanvas__area');
  const closeBtn = document.getElementById('close_offcanvas');

  function closeOffcanvas() {
    if (closeBtn) closeBtn.click();
    offcanvas?.classList.remove('show', 'active', 'open');
    document.body.classList.remove('offcanvas-open');
    document.documentElement.classList.remove('offcanvas-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function slideToHash(hash) {
    if (!hash) return;

    const id = hash.replace('#', '');

    // only direct children, NOT nested swiper slides
    const slides = Array.from(wrapper.children).filter(el =>
      el.classList.contains('swiper-slide')
    );

    const index = slides.findIndex(s => s.id === id);

    if (index >= 0) {
      activeSwiper.slideTo(index, 600);
    } else {
      console.warn('No main slide with id:', id);
    }
  }

  // Handle clicks inside offcanvas
  offcanvas?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    closeOffcanvas();

    // Wait a beat so the close animation finishes
    setTimeout(() => {
      history.replaceState(null, '', href);
      slideToHash(href);
    }, 150);
  });

  // Also support direct links like /index.html#work
  window.addEventListener('load', () => {
    if (window.location.hash) {
      setTimeout(() => slideToHash(window.location.hash), 50);
    }
  });
})();