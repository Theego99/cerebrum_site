/* Studio Cerebrum — slideshow + fixed corner mark.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Slideshow --------------------------------------------------------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var nEl = document.querySelector('.counter .n');
  var prev = document.querySelector('.prev');
  var next = document.querySelector('.next');
  var slideshow = document.querySelector('.slideshow');
  var frame = document.querySelector('[data-frame]');
  var curtain = document.querySelector('[data-curtain]');

  if (slides.length) {
    var i = 0;
    var n = slides.length;
    var busy = false;
    var FADE = 340;        // keep in sync with the .curtain CSS transition
    var MAX_WAIT = 2500;   // never stay black longer than this, even on a slow photo

    function paint(idx) {
      i = (idx + n) % n;
      slides.forEach(function (s, k) {
        var active = k === i;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      if (nEl) nEl.textContent = i + 1;
    }

    // Advance via the black curtain: fade to black, swap the slide behind it,
    // then fade back once the new image has actually loaded.
    function go(idx) {
      var target = ((idx % n) + n) % n;
      if (busy || target === i) return;

      if (reduce || !curtain) { paint(target); return; }  // motion-free path

      busy = true;
      curtain.classList.add('is-on');                     // fade to black
      setTimeout(function () {                             // once black, swap
        paint(target);
        var img = slides[target].querySelector('img');
        var done = false;
        var reveal = function () {
          if (done) return;
          done = true;
          curtain.classList.remove('is-on');              // fade back in
          setTimeout(function () { busy = false; }, FADE);
        };
        if (img && img.complete && img.naturalWidth > 0) reveal();
        else if (img) {
          img.addEventListener('load', reveal, { once: true });
          img.addEventListener('error', reveal, { once: true });
          setTimeout(reveal, MAX_WAIT);
        } else { reveal(); }
      }, FADE);
    }

    if (prev) prev.addEventListener('click', function () { go(i - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(i + 1); restart(); });
    if (frame) frame.addEventListener('click', function () { go(i + 1); restart(); });

    // Arrow-key navigation (ignored while typing in a field — there are none, but safe).
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') { go(i - 1); restart(); }
      else if (e.key === 'ArrowRight') { go(i + 1); restart(); }
    });

    // Slow auto-advance (8s): disabled under reduced motion, paused on hover/focus.
    var timer = null;
    function start() { if (!reduce && !timer && n > 1) timer = setInterval(function () { go(i + 1); }, 8000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    if (slideshow) {
      slideshow.addEventListener('mouseenter', stop);
      slideshow.addEventListener('mouseleave', start);
      slideshow.addEventListener('focusin', stop);
      slideshow.addEventListener('focusout', start);
    }
    // Pause when the tab is hidden.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    // Preload all slide images up front so a transition reveals a loaded photo.
    slides.forEach(function (s) {
      var img = s.querySelector('img');
      if (!img) return;
      img.loading = 'eager';
      if (!img.complete) { var pre = new Image(); pre.src = img.currentSrc || img.src; }
    });

    paint(0);
    start();
  }

  /* ---- Fixed corner mark: reveal once the hero has scrolled away --------- */
  var mark = document.querySelector('[data-mark]');
  var hero = document.querySelector('.hero');

  if (mark && hero) {
    mark.removeAttribute('hidden');

    function updateMark(visible) {
      mark.classList.toggle('is-visible', visible);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        // Reveal the mark once the hero has fully scrolled out of view.
        updateMark(!entries[0].isIntersecting);
      }, { rootMargin: '0px', threshold: 0 });
      io.observe(hero);
    } else {
      // Fallback: simple scroll threshold.
      var onScroll = function () { updateMark(window.pageYOffset > hero.offsetHeight * 0.6); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
})();
