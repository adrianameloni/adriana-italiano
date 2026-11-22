(function () {
  'use strict';

  const lang = document.documentElement.lang === 'it' ? 'it' : 'he';
  const labels = {
    he: {
      greeting: 'שלום אדריאנה,',
      name: 'שמי',
      contact: 'אפשר לחזור אליי ב',
      interest: 'אני מעוניינת/מעוניין ב',
      message: 'פרטים נוספים',
      subject: 'פנייה חדשה בנושא שיעורי איטלקית',
      invalid: 'יש להזין פרטי קשר כדי לשלוח פנייה.'
    },
    it: {
      greeting: 'Buongiorno Adriana,',
      name: 'mi chiamo',
      contact: 'Puoi ricontattarmi a',
      interest: 'Sono interessato/a a',
      message: 'Messaggio',
      subject: 'Richiesta di lezioni di italiano',
      invalid: 'Inserisci un recapito prima di inviare la richiesta.'
    }
  }[lang];

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

  const config = window.ADRIANA_SITE_CONFIG || {};
  const whatsapp = String(config.whatsapp || '').replace(/[^0-9]/g, '');
  const email = String(config.email || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const form = document.querySelector('[data-contact-form]');
  const enabled = Boolean(whatsapp || emailValid);

  document.querySelectorAll('[data-contact-ready]').forEach(function (element) {
    element.hidden = !enabled;
  });
  document.querySelectorAll('[data-contact-pending]').forEach(function (element) {
    element.hidden = enabled;
  });

  const whatsappLink = document.querySelector('[data-whatsapp-link]');
  const emailLink = document.querySelector('[data-email-link]');
  if (whatsappLink) {
    whatsappLink.hidden = !whatsapp;
    if (whatsapp) whatsappLink.href = 'https://wa.me/' + whatsapp;
  }
  if (emailLink) {
    emailLink.hidden = !emailValid;
    if (emailValid) emailLink.href = 'mailto:' + email;
  }

  if (form && enabled) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.namedItem('studentName').value.trim();
      const contact = form.elements.namedItem('studentContact').value.trim();
      const interestSelect = form.elements.namedItem('studentInterest');
      const interest = interestSelect.options[interestSelect.selectedIndex].text.trim();
      const message = form.elements.namedItem('studentMessage').value.trim();
      const parts = [
        labels.greeting,
        labels.name + ' ' + name + '.',
        labels.contact + ': ' + contact + '.',
        labels.interest + ': ' + interest + '.'
      ];
      if (message) parts.push(labels.message + ': ' + message);
      const body = parts.join('\n');

      if (whatsapp) {
        window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(body), '_blank', 'noopener,noreferrer');
      } else if (emailValid) {
        window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(labels.subject) + '&body=' + encodeURIComponent(body);
      }
    });
  }
})();
