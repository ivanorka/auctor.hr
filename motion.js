(function () {
  var media = window.matchMedia('(prefers-reduced-motion: reduce)');
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));

  if (media.matches || !layers.length || !window.requestAnimationFrame) return;

  var ticking = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function update() {
    var scrollY = window.scrollY || window.pageYOffset || 0;

    layers.forEach(function (layer) {
      var hero = layer.closest('.hero') || layer.parentElement;
      var rect = hero.getBoundingClientRect();

      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

      var speed = parseFloat(layer.getAttribute('data-parallax')) || 0;
      var limit = parseFloat(layer.getAttribute('data-parallax-max')) || 72;
      var distance = Math.max(0, scrollY - hero.offsetTop);
      var offset = clamp(distance * speed, -limit, limit);

      layer.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
    });

    ticking = false;
  }

  function requestUpdate() {
    if (ticking || document.hidden) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('visibilitychange', requestUpdate);
  requestUpdate();
})();
