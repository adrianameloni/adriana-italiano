(function () {
  'use strict';

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  if (menuToggle && siteNav) {
    const setOpen = function (isOpen) {
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      siteNav.setAttribute('data-open', isOpen ? 'true' : 'false');
    };
    menuToggle.addEventListener('click', function () {
      setOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 850) setOpen(false);
    });
  }
})();
