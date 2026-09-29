/**
 * KNR Product Page – Scroll Animations
 * Uses IntersectionObserver to trigger fade-up animations on scroll.
 */
(function () {
  'use strict';

  if (typeof IntersectionObserver === 'undefined') {
    /* Fallback: just show everything */
    document.querySelectorAll('.knr-animate').forEach(function (el) {
      el.classList.add('knr-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('knr-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  function observe() {
    document.querySelectorAll('.knr-animate:not(.knr-visible)').forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }

  /* Re-observe after Shopify editor changes */
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', function () {
      setTimeout(observe, 100);
    });
  }
})();
