(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (element) { element.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (element) { observer.observe(element); });
  }

  var dialog = document.getElementById('contact-dialog');
  var openers = document.querySelectorAll('.js-contact-open');
  var closeButton = dialog && dialog.querySelector('[data-contact-close]');
  var lastTrigger = null;

  function openContact(event) {
    lastTrigger = event.currentTarget;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    var firstField = dialog.querySelector('input:not([type="checkbox"])');
    if (firstField) window.setTimeout(function () { firstField.focus(); }, 0);
  }

  function closeContact() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  openers.forEach(function (button) { button.addEventListener('click', openContact); });
  if (closeButton) closeButton.addEventListener('click', closeContact);
  if (dialog) {
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) closeContact();
    });
    dialog.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-form-status');
  var isCroatian = document.documentElement.lang.toLowerCase().indexOf('hr') === 0;
  var messages = isCroatian ? {
    sending: 'Šaljemo poruku…',
    success: 'Hvala. Vaša je poruka poslana.',
    invalid: 'Provjerite obavezna polja i pokušajte ponovno.',
    limited: 'Poslano je previše poruka. Pokušajte ponovno kasnije.',
    unavailable: 'Kontakt usluga trenutačno nije dostupna. Pokušajte ponovno kasnije.',
    failed: 'Poruku nije moguće poslati. Pokušajte ponovno.'
  } : {
    sending: 'Sending your message…',
    success: 'Thank you. Your message has been sent.',
    invalid: 'Please complete all required fields with valid information.',
    limited: 'Too many messages were submitted. Please try again later.',
    unavailable: 'The contact service is temporarily unavailable. Please try again later.',
    failed: 'Your message could not be sent. Please try again.'
  };

  function responseError(response, data) {
    if (!isCroatian && data.message) return data.message;
    if (response.status === 400) return messages.invalid;
    if (response.status === 429) return messages.limited;
    if (response.status === 502 || response.status === 503) return messages.unavailable;
    return messages.failed;
  }

  if (form && window.fetch) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      status.className = 'contact-form__status';
      status.textContent = messages.sending;

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
        credentials: 'same-origin'
      }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          if (!response.ok) throw new Error(responseError(response, data));
          return data;
        });
      }).then(function () {
        form.reset();
        status.className = 'contact-form__status is-success';
        status.textContent = messages.success;
      }).catch(function (error) {
        status.className = 'contact-form__status is-error';
        status.textContent = error.message;
      }).finally(function () {
        submit.disabled = false;
      });
    });
  }
})();
