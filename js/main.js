(function () {
  'use strict';

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Font size preference works for all three languages and all site typography.
  const minimum = 0.90;
  const maximum = 1.50;
  const step = 0.10;
  let fontScale = 1.10;
  try {
    const stored = Number(window.localStorage.getItem('adriana-font-scale'));
    if (Number.isFinite(stored) && stored >= minimum && stored <= maximum) fontScale = stored;
  } catch (error) { /* Storage can be unavailable in private browsing. */ }
  const decreaseFont = document.querySelector('[data-font-decrease]');
  const increaseFont = document.querySelector('[data-font-increase]');
  const fontIndicator = document.querySelector('[data-font-indicator]');
  const updateFontSize = function () {
    document.documentElement.style.setProperty('--font-scale', fontScale.toFixed(2));
    if (fontIndicator) fontIndicator.textContent = Math.round(fontScale * 100) + '%';
    if (decreaseFont) decreaseFont.disabled = fontScale <= minimum + 0.001;
    if (increaseFont) increaseFont.disabled = fontScale >= maximum - 0.001;
    try { window.localStorage.setItem('adriana-font-scale', fontScale.toFixed(2)); }
    catch (error) { /* Site remains usable without storage. */ }
  };
  if (decreaseFont) decreaseFont.addEventListener('click', function () {
    fontScale = Math.max(minimum, Math.round((fontScale - step) * 100) / 100);
    updateFontSize();
  });
  if (increaseFont) increaseFont.addEventListener('click', function () {
    fontScale = Math.min(maximum, Math.round((fontScale + step) * 100) / 100);
    updateFontSize();
  });
  updateFontSize();

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
