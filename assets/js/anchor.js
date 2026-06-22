(function () {
  const offcanvas = document.querySelector('.offcanvas__area');
  const closeBtn = document.getElementById('close_offcanvas');

  function closeOffcanvas() {
    if (closeBtn) closeBtn.click();

    if (offcanvas) {
      offcanvas.classList.remove('show', 'active', 'open');
    }

    document.body.classList.remove('offcanvas-open');
    document.documentElement.classList.remove('offcanvas-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function getSmoother() {
    try {
      if (window.ScrollSmoother && typeof window.ScrollSmoother.get === 'function') {
        return window.ScrollSmoother.get();
      }
    } catch (e) {}

    return null;
  }

  function goToHash(hash) {
    if (!hash || hash === '#') return;

    const id = hash.replace('#', '');
    const targetEl = document.getElementById(id);

    if (!targetEl) {
      console.warn('No anchor target found:', hash);
      return;
    }

    const smoother = getSmoother();

    if (smoother) {
      smoother.scrollTo(targetEl, true, 'top top');

      setTimeout(() => {
        smoother.scrollTo(targetEl, false, 'top top');
      }, 250);

      return;
    }

    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();

    closeOffcanvas();

    setTimeout(() => {
      history.replaceState(null, '', href);
      goToHash(href);
    }, 250);
  });

  window.addEventListener('load', function () {
    if (window.location.hash) {
      setTimeout(() => {
        goToHash(window.location.hash);
      }, 300);
    }
  });
})();