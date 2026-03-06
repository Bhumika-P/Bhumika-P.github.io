(function () {
  const offcanvas = document.querySelector('.offcanvas__area');
  const closeBtn = document.getElementById('close_offcanvas');

  // Main portfolio swiper elements (from your screenshots)
  const mainSliderEl = document.querySelector('.swiper.portfolio__main-slider');
  const mainWrapper = document.querySelector('.swiper-wrapper.portfolio__main-wrapper') ||
                      mainSliderEl?.querySelector('.swiper-wrapper');

  if (!offcanvas || !mainWrapper) return;

  function closeOffcanvas() {
    // Let the template close itself
    if (closeBtn) closeBtn.click();

    // Minimal fallback cleanup
    offcanvas.classList.remove('show', 'active', 'open');
    document.body.classList.remove('offcanvas-open');
    document.documentElement.classList.remove('offcanvas-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function getMainSwiper() {
    // Swiper instance often attaches here
    if (mainSliderEl && mainSliderEl.swiper) return mainSliderEl.swiper;

    // Some Axtra builds store it globally
    if (typeof window.pp_main !== 'undefined' && window.pp_main) return window.pp_main;

    return null;
  }

  function getSmoother() {
    // If ScrollSmoother is active, native scroll/anchors won’t work reliably
    try {
      if (window.ScrollSmoother && typeof window.ScrollSmoother.get === 'function') {
        return window.ScrollSmoother.get();
      }
    } catch (e) {}
    return null;
  }

  function goToHash(hash) {
    if (!hash) return;

    const id = hash.replace('#', '');
    const targetEl = document.getElementById(id);
    if (!targetEl) {
      console.warn('No element found with id:', id);
      return;
    }

    // 1) If this id is on a TOP-LEVEL swiper slide, move swiper
    const swiper = getMainSwiper();
    if (swiper) {
      const slides = Array.from(mainWrapper.children).filter(el =>
        el.classList.contains('swiper-slide')
      );

      const index = slides.findIndex(slide => slide.id === id);
      if (index >= 0) {
        swiper.slideTo(index, 600);
        return;
      }
    }

    // 2) Fallback (for non-slide anchors): use ScrollSmoother if present
    const smoother = getSmoother();
    if (smoother) {
      smoother.scrollTo(targetEl, true, 'top top');
      // one small retry after layout settles
      setTimeout(() => smoother.scrollTo(targetEl, false, 'top top'), 250);
      return;
    }

    // 3) Final fallback: native scroll
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Click handling inside the offcanvas
  offcanvas.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    closeOffcanvas();

    // Give the menu time to close so we can see the slide change
    setTimeout(() => {
      history.replaceState(null, '', href);
      goToHash(href);
    }, 250);
  });

  // Support direct loads like index.html#contact
  window.addEventListener('load', () => {
    if (window.location.hash) {
      setTimeout(() => goToHash(window.location.hash), 100);
    }
  });
})();