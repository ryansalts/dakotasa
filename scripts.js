/* The Dakota East Side Ice House — scripts.js */

(function () {

  /* ── Mobile nav burger ── */
  function initBurger() {
    var btn  = document.getElementById('nav-burger-btn');
    var menu = document.querySelector('.nav-links');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle('nav-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('nav-open');
        btn.classList.remove('is-open');
      }
    });

    // Close when a nav link is tapped
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('nav-open');
        btn.classList.remove('is-open');
      });
    });
  }

  /* ── Init on DOM ready ── */
  function init() {
    initBurger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
