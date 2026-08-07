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
  if (form && window.fetch) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      status.className = 'contact-form__status';
      status.textContent = 'Sending your message…';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
        credentials: 'same-origin'
      }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          if (!response.ok) throw new Error(data.message || 'Your message could not be sent. Please try again.');
          return data;
        });
      }).then(function () {
        form.reset();
        status.className = 'contact-form__status is-success';
        status.textContent = 'Thank you. Your message has been sent.';
      }).catch(function (error) {
        status.className = 'contact-form__status is-error';
        status.textContent = error.message;
      }).finally(function () {
        submit.disabled = false;
      });
    });
  }
})();
