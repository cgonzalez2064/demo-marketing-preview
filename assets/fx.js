/* ==========================================================================
   Cardumen: interaction layer
   Small, dependency-free effects on top of main.js. Each block is independent
   and checks what it needs, so removing one never breaks the rest.

   Rules followed everywhere:
   - Only transform, translate, opacity and canvas drawing are animated.
   - Nothing runs with "reduce motion" (system setting or the site's own
     accessibility panel); the page stays complete without this file.
   - Pointer effects run only with a mouse or trackpad; touch keeps native
     scrolling.
   - Work stops when its element is off screen or the tab is hidden.

   - Everything is plain JavaScript (IntersectionObserver, requestAnimationFrame
     and the Web Animations API), so it behaves the same on iPhone, Android and
     desktop. No CSS feature that only some browsers support is required.

   Packages: all four get the curtain, the rising headings, the services index,
   the moving ribbon, the school of fish and the depth on scroll. Profesional
   adds the kinetic line, the photo that follows the pointer and magnetic
   buttons. Premium adds the pointer follower, the card tilt and the depth
   effect on the cover photos.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var tier = root.classList.contains('pkg-premium') ? 3 : root.classList.contains('pkg-profesional') ? 2 : 1;

  function calm() { return reduceQuery.matches || root.classList.contains('a11y-motion'); }
  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---------- 0. Shared clock: one loop for everything tied to the scroll ---------- */
  var vh = window.innerHeight, vw = window.innerWidth;
  var scroll = { y: window.scrollY, v: 0 };          // v: smoothed px per frame
  var tasks = [], alive = [], lastWake = 0, loopId = 0, lastT = 0;
  function loop(now) {
    loopId = 0;
    var dt = clamp((now - (lastT || now)) / 16.667, 0.2, 3); lastT = now;
    var y = window.scrollY, d = y - scroll.y;
    scroll.y = y;
    scroll.v += (d / dt - scroll.v) * 0.18;
    if (Math.abs(scroll.v) < 0.02) scroll.v = 0;
    if (!calm()) for (var i = 0; i < tasks.length; i++) tasks[i](y, dt, now);
    var keep = !doc.hidden && !calm() && (now - lastWake < 500 || scroll.v !== 0 || alive.some(function (fn) { return fn(); }));
    if (keep) loopId = requestAnimationFrame(loop); else { scroll.v = 0; lastT = 0; }
  }
  function wake() { lastWake = performance.now(); if (!loopId) loopId = requestAnimationFrame(loop); }
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', function () { vh = window.innerHeight; vw = window.innerWidth; wake(); });
  doc.addEventListener('visibilitychange', wake);

  /* Motion switch: html.fx-on turns the animated layout on. It follows the
     system setting and the accessibility panel live. */
  var motionListeners = [];
  function syncMotion() {
    var on = !calm();
    if (on === root.classList.contains('fx-on')) return;
    root.classList.toggle('fx-on', on);
    motionListeners.forEach(function (fn) { fn(on); });
    if (on) wake();
  }
  new MutationObserver(syncMotion).observe(root, { attributes: true, attributeFilter: ['class'] });
  if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', syncMotion);

  /* The curtain is pure CSS (class set by a11y-boot.js); remove the class when done. */
  setTimeout(function () { root.classList.remove('fx-intro', 'fx-enter'); }, root.classList.contains('fx-intro') ? 1700 : 800);

  /* ---------- 1. Header steps aside while scrolling down ---------- */
  (function () {
    var header = doc.getElementById('siteHeader');
    if (!header) return;
    var last = window.scrollY, ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY, dy = y - last;
      if (Math.abs(dy) < 6) return;
      var away = dy > 0 && y > 480 && !doc.querySelector('dialog[open]') && !calm();
      header.classList.toggle('is-away', away);
      last = y;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  })();

  /* ---------- 2. Words: the cover headline and every section heading ---------- */
  (function () {
    each(doc.querySelectorAll('.reveal.section-head h2, .reveal.about-copy h2, .reveal.maternity-copy h2, .reveal.cta-inner h2'), function (h) { h.setAttribute('data-rise', ''); });
    var heads = doc.querySelectorAll('[data-split], [data-rise]');
    function split(el) {
      if (el.querySelector('.fx-word')) return;
      var i = 0;
      (function walk(node) {
        each(Array.prototype.slice.call(node.childNodes), function (child) {
          if (child.nodeType === 3) {
            var frag = doc.createDocumentFragment();
            child.nodeValue.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(' ')); return; }
              var outer = doc.createElement('span');
              var inner = doc.createElement('span');
              outer.className = 'fx-word d' + Math.min(i++, 12);
              inner.textContent = part;
              outer.appendChild(inner);
              frag.appendChild(outer);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) {
            walk(child);
          }
        });
      })(el);
    }
    each(heads, function (el) {
      split(el);
      new MutationObserver(function () { split(el); }).observe(el, { childList: true });
    });
  })();

  /* ---------- 3. Ribbon with the list of services: speeds up and turns with the scroll ---------- */
  (function () {
    var box = doc.querySelector('[data-marquee]');
    if (!box) return;
    var sources = doc.querySelectorAll('.services-grid .service-link, .services-grid h3 [data-i18n]');
    if (!sources.length) sources = doc.querySelectorAll('.services-grid h3');
    if (sources.length < 3) return;
    var track = doc.createElement('div');
    track.className = 'marquee-track';
    function addSet() {
      each(sources, function (src) {
        var item = doc.createElement('span');
        item.className = 'marquee-item';
        item.textContent = src.textContent;
        var key = src.getAttribute('data-i18n');
        if (key) item.setAttribute('data-i18n', key);
        track.appendChild(item);
      });
    }
    addSet();
    box.appendChild(track);
    // Repeat until one half is wider than the screen, then double it for a seamless loop.
    var guard = 0;
    while (track.scrollWidth < window.innerWidth * 1.2 && guard++ < 6) addSet();
    var half = track.children.length;
    for (var n = 0; n < half; n++) track.appendChild(track.children[n].cloneNode(true));
    function pace() { box.style.setProperty('--mq', Math.max(18, Math.round(track.scrollWidth / 2 / 70)) + 's'); }
    pace();
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(pace);

    var x = 0, dir = 1, seen = false;
    new IntersectionObserver(function (en) { seen = en[0].isIntersecting; if (seen) wake(); }).observe(box);
    alive.push(function () { return seen; });
    tasks.push(function (y, dt) {
      if (!seen) return;
      var w = track.scrollWidth / 2;
      if (!w) return;
      if (scroll.v > 0.5) dir = 1; else if (scroll.v < -0.5) dir = -1;
      x -= (0.7 + Math.min(Math.abs(scroll.v), 60) * 0.22) * dir * dt;
      if (x <= -w) x += w; else if (x > 0) x -= w;
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
    });
    motionListeners.push(function (on) { if (!on) track.style.transform = ''; });
  })();

  /* ---------- 4. Services: an index that opens in place (phone and tablet) ---------- */
  (function () {
    var grid = doc.querySelector('.services-grid');
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.service-card'));
    if (cards.length < 2) return;
    var narrow = window.matchMedia('(max-width: 899px)');
    var active = false;
    function closedHeight(card) { var h = card.querySelector('h3'); return h ? h.offsetHeight : 64; }
    function size(card, instant) {
      if (instant) card.style.transition = 'none';
      card.style.height = (card.classList.contains('is-open') ? card.scrollHeight : closedHeight(card)) + 'px';
      if (instant) { void card.offsetHeight; card.style.transition = ''; }
    }
    function open(card) {
      cards.forEach(function (c) {
        var was = c.classList.contains('is-open'), now = c === card;
        if (was === now) return;
        c.classList.toggle('is-open', now);
        size(c);
      });
      // Keep the opened title in view when the block above it collapses.
      setTimeout(function () {
        if (!active || !card.classList.contains('is-open')) return;
        var top = card.getBoundingClientRect().top;
        if (top < 72 || top > vh * 0.6) window.scrollBy({ top: top - 84, behavior: 'smooth' });
      }, 640);
    }
    function setup() {
      var want = narrow.matches && root.classList.contains('fx-on');
      if (want === active) { if (active) cards.forEach(function (c) { size(c, true); }); return; }
      active = want;
      grid.classList.toggle('is-accordion', active);
      cards.forEach(function (c, i) {
        c.classList.toggle('is-open', active && i === 0);
        if (active) size(c, true); else c.style.height = '';
      });
    }
    grid.addEventListener('click', function (e) {
      if (!active) return;
      var card = e.target.closest('.service-card');
      if (!card) return;
      if (!card.classList.contains('is-open')) {
        if (e.target.closest('a, button')) e.preventDefault();   // first tap opens, second follows the link
        open(card);
      } else if (!e.target.closest('a, button')) {
        card.classList.remove('is-open');
        size(card);
      }
    });
    // Keyboard: moving the focus into a closed block opens it.
    grid.addEventListener('focusin', function (e) {
      if (!active || !e.target.matches(':focus-visible')) return;
      var card = e.target.closest('.service-card');
      if (card && !card.classList.contains('is-open')) open(card);
    });
    motionListeners.push(setup);
    narrow.addEventListener && narrow.addEventListener('change', setup);
    window.addEventListener('resize', setup);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(setup);
    new MutationObserver(function () { setTimeout(setup, 60); }).observe(root, { attributes: true, attributeFilter: ['lang', 'data-text'] });
    each(grid.querySelectorAll('img'), function (img) { if (!img.complete) img.addEventListener('load', function () { var c = img.closest('.service-card'); if (active && c) size(c, true); }); });
    setup();
  })();

  /* ---------- 5. Bands that grow to full width while they arrive ---------- */
  (function () {
    var sel = (root.classList.contains('profile-clinica') ? '.doctors, ' : '') + '.site-footer';
    var els = Array.prototype.slice.call(doc.querySelectorAll(sel));
    if (!els.length) return;
    els.forEach(function (el) { el.setAttribute('data-grow', ''); });
    tasks.push(function () {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > vh + 40 || r.bottom < 0) return;
        var p = clamp((vh - r.top) / (vh * 0.55), 0, 1);
        p = 1 - Math.pow(1 - p, 2);
        var k = p >= 1 ? '' : 'inset(0 ' + ((1 - p) * 7).toFixed(2) + '% 0 ' + ((1 - p) * 7).toFixed(2) + '% round ' + ((1 - p) * 44).toFixed(1) + 'px ' + ((1 - p) * 44).toFixed(1) + 'px 0 0)';
        if (el._k !== k) { el._k = k; el.style.clipPath = k; el.style.webkitClipPath = k; }
      });
    });
    motionListeners.push(function (on) { if (!on) els.forEach(function (el) { el._k = ''; el.style.clipPath = ''; el.style.webkitClipPath = ''; }); });
  })();

  /* ---------- 6. Depth on scroll: cover photos, studio photo, footer wordmark ---------- */
  var heroPointer = { x: 0, y: 0, tx: 0, ty: 0 };
  (function () {
    var hero = doc.querySelector('.hero');
    var layers = [];
    each(doc.querySelectorAll('.hero-art .hero-photo'), function (el, i) { layers.push({ el: el, k: [14, 26, 18][i] || 16, s: [0.05, 0.13, 0.085][i] || 0.07 }); });
    var about = doc.querySelector('.about-art .about-photo');
    var word = doc.querySelector('.footer-word');
    var copy = doc.querySelector('.hero-copy');
    alive.push(function () { return Math.abs(heroPointer.tx - heroPointer.x) + Math.abs(heroPointer.ty - heroPointer.y) > 0.002; });
    tasks.push(function (y) {
      var r;
      if (hero && layers.length && y < hero.offsetHeight + 200) {
        heroPointer.x += (heroPointer.tx - heroPointer.x) * 0.09; heroPointer.y += (heroPointer.ty - heroPointer.y) * 0.09;
        layers.forEach(function (l) { l.el.style.translate = (heroPointer.x * l.k).toFixed(2) + 'px ' + (heroPointer.y * l.k - y * l.s).toFixed(2) + 'px'; });
      }
      if (about) {
        r = about.parentNode.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) about.style.translate = '0 ' + (((r.top + r.height / 2) / vh - 0.5) * -34).toFixed(1) + 'px';
      }
      if (word) {
        r = word.getBoundingClientRect();
        if (r.top < vh + 200) word.style.translate = '0 ' + (clamp((r.top - vh * 0.45) / vh, 0, 1) * 46).toFixed(1) + '%';
      }
    });
    motionListeners.push(function (on) {
      if (on) return;
      layers.forEach(function (l) { l.el.style.translate = ''; });
      if (about) about.style.translate = '';
      if (word) word.style.translate = '';
    });
  })();

  /* ---------- 7. Numbers count up: case results and progress bars ---------- */
  (function () {
    var nums = doc.querySelectorAll('.doctor-card .doc-meta div:first-child dd');
    var meters = doc.querySelectorAll('meter.build-meter');
    if (!('IntersectionObserver' in window) || (!nums.length && !meters.length)) return;
    function run(dur, fn) {
      var t0 = 0;
      requestAnimationFrame(function f(ts) {
        if (!t0) t0 = ts;
        var p = clamp((ts - t0) / dur, 0, 1);
        fn(1 - Math.pow(1 - p, 4), p >= 1);
        if (p < 1) requestAnimationFrame(f);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        if (calm()) return;
        if (el.tagName === 'METER') {
          var end = parseFloat(el.getAttribute('value')) || 0;
          run(1400, function (k) { el.value = end * k; });
          return;
        }
        var text = el.textContent, m = text.match(/^(\D*?)(\d+)([.,]\d+)?(.*)$/);
        if (!m || /\d/.test(m[4])) return;                    // only one clean number per line
        var target = parseFloat(m[2] + (m[3] ? '.' + m[3].slice(1) : '')), dec = m[3] ? m[3].length - 1 : 0, sep = m[3] ? m[3].charAt(0) : '';
        run(1500, function (k, done) {
          if (done) { el.textContent = text; return; }
          var v = (target * k).toFixed(dec);
          el.textContent = m[1] + (dec ? v.replace('.', sep) : v) + m[4];
        });
      });
    }, { threshold: 0.5 });
    each(nums, function (el) { io.observe(el); });
    each(meters, function (el) { io.observe(el); });
  })();

  /* ---------- 8. Page progress and leaving the page behind a wipe ---------- */
  (function () {
    var bar = doc.createElement('div');
    bar.className = 'fx-progress';
    bar.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(bar);
    tasks.push(function (y) {
      var max = doc.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0).toFixed(4) + ')';
    });
    doc.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || calm()) return;
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.target || a.hasAttribute('download') || a.origin !== location.origin) return;
      if (a.pathname === location.pathname && a.search === location.search) return;   // same page: anchors scroll
      if (/\/(admin|api)\//.test(a.pathname) || !/(\.html|\/)$/.test(a.pathname)) return;
      e.preventDefault();
      root.classList.remove('fx-intro', 'fx-enter');
      root.classList.add('fx-leave');
      setTimeout(function () { location.href = a.href; }, 340);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('fx-leave'); });
  })();

  /* ---------- 8b. Reviews on desktop: drag with momentum (phones show a stacked list) ---------- */
  (function () {
    var rail = doc.querySelector('.reviews-grid');
    if (!rail || !finePointer || !window.matchMedia('(min-width: 900px)').matches) return;
    var down = false, moved = false, startX = 0, startLeft = 0, samples = [], raf = 0;
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      stop();
      down = true; moved = false;
      startX = e.clientX; startLeft = rail.scrollLeft;
      samples = [{ x: e.clientX, t: performance.now() }];
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) < 8) return;   // hysteresis: a click stays a click
      if (!moved) { moved = true; rail.classList.add('is-dragging'); }
      rail.scrollLeft = startLeft - dx;
      samples.push({ x: e.clientX, t: performance.now() });
      if (samples.length > 5) samples.shift();
    });
    function release() {
      if (!down) return;
      down = false;
      if (!moved) return;
      var a = samples[0], b = samples[samples.length - 1];
      var velocity = b.t > a.t ? (a.x - b.x) / (b.t - a.t) * 1000 : 0;   // px/s, in scroll direction
      // Project where the gesture is going (exponential decay), then glide there.
      var rate = 0.994;
      var target = clamp(rail.scrollLeft + (velocity / 1000) * rate / (1 - rate), 0, rail.scrollWidth - rail.clientWidth);
      var from = rail.scrollLeft, t0 = performance.now(), dur = calm() ? 0 : 700;
      (function glide(now) {
        var k = dur ? clamp((now - t0) / dur, 0, 1) : 1;
        rail.scrollLeft = from + (target - from) * (1 - Math.pow(1 - k, 4));
        if (k < 1) raf = requestAnimationFrame(glide);
        else { raf = 0; rail.classList.remove('is-dragging'); }
      })(t0);
    }
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    rail.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
  })();

  /* ---------- 9. School of fish behind the headline (canvas) ---------- */
  (function () {
    var canvas = doc.querySelector('[data-school]');
    var hero = canvas && canvas.parentNode;
    if (!canvas || !canvas.getContext || calm()) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, fish = [], running = false, visible = true, raf = 0;
    var pointer = { x: -9999, y: -9999, on: false };
    var ink = '#131316', accent = '#ff5a36';

    function readColors() {
      var cs = getComputedStyle(root);
      ink = cs.getPropertyValue('--text').trim() || ink;
      accent = cs.getPropertyValue('--accent').trim() || accent;
    }
    function resize() {
      var r = hero.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var want = clamp(Math.round(w * h / 16000), 26, 84);
      while (fish.length < want) fish.push(spawn());
      fish.length = want;
    }
    function spawn() {
      var a = Math.random() * Math.PI * 2;
      return { x: Math.random() * w, y: Math.random() * h, vx: Math.cos(a) * 1.2, vy: Math.sin(a) * 1.2, s: 5 + Math.random() * 6, hot: Math.random() < 0.14 };
    }
    function step() {
      var i, j, f, o, dx, dy, d2;
      for (i = 0; i < fish.length; i++) {
        f = fish[i];
        var cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, n = 0;
        for (j = 0; j < fish.length; j++) {
          if (i === j) continue;
          o = fish[j]; dx = o.x - f.x; dy = o.y - f.y; d2 = dx * dx + dy * dy;
          if (d2 < 8100) {            // neighbours within 90 px
            cx += o.x; cy += o.y; ax += o.vx; ay += o.vy; n++;
            if (d2 < 576 && d2 > 0) { sx -= dx / d2; sy -= dy / d2; }   // keep 24 px apart
          }
        }
        if (n) {
          f.vx += (cx / n - f.x) * 0.0006 + (ax / n - f.vx) * 0.04 + sx * 0.9;
          f.vy += (cy / n - f.y) * 0.0006 + (ay / n - f.vy) * 0.04 + sy * 0.9;
        }
        if (pointer.on) {             // the school opens around the pointer
          dx = f.x - pointer.x; dy = f.y - pointer.y; d2 = dx * dx + dy * dy;
          if (d2 < 25600 && d2 > 0) { var push = (1 - d2 / 25600) * 0.9, d = Math.sqrt(d2); f.vx += dx / d * push; f.vy += dy / d * push; }
        }
        // Gentle current to the right and soft walls.
        f.vx += 0.012;
        f.vy -= clamp(scroll.v, -30, 30) * 0.012;   // the page scroll stirs the water
        if (f.y < 60) f.vy += 0.05; else if (f.y > h - 60) f.vy -= 0.05;
        var sp = Math.sqrt(f.vx * f.vx + f.vy * f.vy) || 1, max = 2.3, min = 0.9;
        if (sp > max) { f.vx = f.vx / sp * max; f.vy = f.vy / sp * max; }
        else if (sp < min) { f.vx = f.vx / sp * min; f.vy = f.vy / sp * min; }
        f.x += f.vx; f.y += f.vy;
        if (f.x > w + 20) f.x = -20; else if (f.x < -20) f.x = w + 20;
        if (f.y > h + 20) f.y = -20; else if (f.y < -20) f.y = h + 20;
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < fish.length; i++) {
        var f = fish[i], a = Math.atan2(f.vy, f.vx), s = f.s;
        ctx.save();
        ctx.translate(f.x, f.y); ctx.rotate(a);
        ctx.globalAlpha = f.hot ? 0.9 : 0.16;
        ctx.fillStyle = f.hot ? accent : ink;
        ctx.beginPath();                // a lens, the same shape as the logo
        ctx.moveTo(-s, 0);
        ctx.quadraticCurveTo(0, -s * 0.62, s, 0);
        ctx.quadraticCurveTo(0, s * 0.62, -s, 0);
        ctx.fill();
        ctx.restore();
      }
    }
    function frame() {
      raf = 0;
      if (!running) return;
      step(); draw();
      raf = requestAnimationFrame(frame);
    }
    function sync() {
      var should = visible && !doc.hidden && !calm();
      if (should && !running) { running = true; if (!raf) raf = requestAnimationFrame(frame); }
      else if (!should) { running = false; }
      canvas.classList.toggle('is-on', should);
    }

    readColors(); resize();
    new ResizeObserver(resize).observe(hero);
    new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }).observe(hero);
    doc.addEventListener('visibilitychange', sync);
    reduceQuery.addEventListener && reduceQuery.addEventListener('change', sync);
    new MutationObserver(function () { readColors(); sync(); }).observe(root, { attributes: true, attributeFilter: ['class'] });
    {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true;
      }, { passive: true });
      hero.addEventListener('pointerleave', function () { pointer.on = false; });
      hero.addEventListener('pointercancel', function () { pointer.on = false; });
      // Touch: the school opens under the finger without blocking the scroll.
      hero.addEventListener('touchmove', function (e) {
        var t = e.touches[0], r = hero.getBoundingClientRect();
        if (t) { pointer.x = t.clientX - r.left; pointer.y = t.clientY - r.top; pointer.on = true; }
      }, { passive: true });
      hero.addEventListener('touchend', function () { pointer.on = false; }, { passive: true });
    }
    sync();
  })();

  syncMotion();
  wake();
  if (tier < 2) return;

  /* ---------- 10. Kinetic line between sections (Profesional and Premium) ---------- */
  (function () {
    var before = doc.getElementById('casos') || doc.getElementById('nosotros');
    var seal = doc.querySelector('.hero-seal textPath');
    if (!before || !seal) return;
    var band = doc.createElement('div');
    band.className = 'fx-band';
    band.setAttribute('aria-hidden', 'true');
    var rows = [doc.createElement('div'), doc.createElement('div')];
    rows.forEach(function (r) { r.className = 'fx-band-row'; band.appendChild(r); });
    function fill() {
      var words = seal.textContent.split(/\s*[·•|]\s*/).filter(Boolean);
      if (!words.length) return;
      rows.forEach(function (r, n) {
        r.textContent = '';
        for (var i = 0; i < 12; i++) {
          var s = doc.createElement('span');
          s.textContent = words[(i + n * 2) % words.length];
          r.appendChild(s);
          if (i % 2 === n) { var dot = doc.createElement('em'); dot.textContent = '✺'; s.appendChild(doc.createTextNode(' ')); s.appendChild(dot); }
        }
      });
    }
    fill();
    before.parentNode.insertBefore(band, before);
    new MutationObserver(fill).observe(seal, { childList: true, characterData: true, subtree: true });
    tasks.push(function () {
      var r = band.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      var t = (vh - r.top) / (vh + r.height);
      rows[0].style.transform = 'translate3d(' + (-80 - t * vw * 0.9).toFixed(1) + 'px,0,0)';
      rows[1].style.transform = 'translate3d(' + (-vw * 1.2 + t * vw * 0.9).toFixed(1) + 'px,0,0)';
    });
  })();

  if (!finePointer) return;

  /* ---------- 11. Services index: a photo follows the pointer (desktop) ---------- */
  (function () {
    var grid = doc.querySelector('.services-grid');
    if (!grid) return;
    var wide = window.matchMedia('(min-width: 900px)');
    var peek = doc.createElement('figure');
    peek.className = 'fx-peek';
    peek.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(peek);
    var imgs = {}, current = null, on = false, tx = 0, ty = 0, x = 0, y = 0, rot = 0;
    function show(card) {
      var key = card.getAttribute('data-service'), src = card.querySelector('.service-photo');
      if (!src) return hide();
      if (!imgs[key]) {
        var im = doc.createElement('img');
        im.alt = ''; im.decoding = 'async';
        im.src = src.currentSrc || src.src;
        peek.appendChild(im);
        imgs[key] = im;
      }
      if (current && current !== imgs[key]) current.classList.remove('is-on');
      current = imgs[key];
      requestAnimationFrame(function () { if (current) current.classList.add('is-on'); });
      if (!on) { x = tx; y = ty; }
      on = true;
      peek.classList.add('is-on');
    }
    function hide() { on = false; peek.classList.remove('is-on'); }
    grid.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse' || !wide.matches || calm()) return hide();
      var card = e.target.closest('.service-card');
      tx = e.clientX; ty = e.clientY;
      if (!card || e.target.closest('.service-actions')) return hide();
      if (!on || imgs[card.getAttribute('data-service')] !== current) show(card);
      wake();
    }, { passive: true });
    grid.addEventListener('pointerleave', hide);
    window.addEventListener('scroll', hide, { passive: true });
    alive.push(function () { return on && Math.abs(tx - x) + Math.abs(ty - y) > 0.3; });
    tasks.push(function () {
      if (!on) return;
      var w = peek.offsetWidth, h = peek.offsetHeight, dx = tx - x;
      x += dx * 0.14; y += (ty - y) * 0.14;
      rot += (clamp(dx * 0.12, -9, 9) - rot) * 0.16;
      var px = clamp(x + 36, 12, vw - w - 12), py = clamp(y - h * 0.55, 12, vh - h - 12);
      peek.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg)';
    });
  })();

  /* ---------- 12. Magnetic buttons ---------- */
  each(doc.querySelectorAll('[data-magnetic]'), function (btn) {
    btn.addEventListener('pointermove', function (e) {
      if (calm()) return;
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.22;
      var y = (e.clientY - r.top - r.height / 2) * 0.34;
      btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    });
    btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    btn.addEventListener('pointerdown', function () { btn.style.transform = ''; });
  });

  if (tier < 3) return;

  /* ---------- 13. Premium: cover photos follow the pointer at different depths ---------- */
  (function () {
    var hero = doc.querySelector('.hero');
    if (!hero || !hero.querySelector('[data-depth]')) return;
    hero.addEventListener('pointermove', function (e) {
      if (calm() || e.pointerType !== 'mouse') return;
      var r = hero.getBoundingClientRect();
      heroPointer.tx = (e.clientX - r.left) / r.width - 0.5; heroPointer.ty = (e.clientY - r.top) / r.height - 0.5;
      wake();
    }, { passive: true });
    hero.addEventListener('pointerleave', function () { heroPointer.tx = 0; heroPointer.ty = 0; wake(); });
  })();

  /* ---------- 14. Premium: case cards lean towards the pointer ---------- */
  (function () {
    var grid = doc.getElementById('doctorsGrid');
    if (!grid || !root.classList.contains('profile-clinica')) return;
    var card = null, rx = 0, ry = 0, trx = 0, tryy = 0;
    function leave() { trx = 0; tryy = 0; wake(); }
    grid.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse' || calm()) return;
      var c = e.target.closest('.doctor-card');
      if (c !== card) { if (card) card.style.transform = ''; card = c; rx = 0; ry = 0; }
      if (!c) return;
      var r = c.getBoundingClientRect();
      tryy = ((e.clientX - r.left) / r.width - 0.5) * 5;
      trx = ((e.clientY - r.top) / r.height - 0.5) * -4;
      wake();
    }, { passive: true });
    grid.addEventListener('pointerleave', leave);
    alive.push(function () { return !!card && Math.abs(trx - rx) + Math.abs(tryy - ry) > 0.01; });
    tasks.push(function () {
      if (!card) return;
      rx += (trx - rx) * 0.12; ry += (tryy - ry) * 0.12;
      var rest = Math.abs(rx) + Math.abs(ry) < 0.01 && !trx && !tryy;
      card.style.transform = rest ? '' : 'perspective(1100px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    });
  })();

  /* ---------- 15. Premium: pointer follower, with a label over photos ---------- */
  (function () {
    var targets = '.area-card.has-photo, .doc-avatar.has-photo';
    var links = 'a, button, summary, label, input, select, textarea, .service-card';
    var label = doc.createElement('div');
    label.className = 'fx-cursor';
    label.setAttribute('aria-hidden', 'true');
    var dot = doc.createElement('div');
    dot.className = 'fx-dot';
    dot.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(label);
    doc.body.appendChild(dot);
    var tx = 0, ty = 0, x = 0, y = 0, dx = 0, dy = 0, on = false, started = false;
    function word() { return (root.getAttribute('lang') || 'es').slice(0, 2) === 'en' ? 'View' : 'Ver'; }
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!started) { started = true; x = dx = tx; y = dy = ty; }
      var quiet = calm();
      var hit = !quiet && e.target.closest && e.target.closest(targets);
      if (hit && e.target.closest('a.btn, button.btn, .text-link, .area-open')) hit = null;
      if (hit && !on) { x = tx; y = ty; label.textContent = word(); }
      on = !!hit;
      label.classList.toggle('is-on', on);
      dot.classList.toggle('is-on', !quiet);
      dot.classList.toggle('is-hidden', on);
      dot.classList.toggle('is-link', !on && !!(e.target.closest && e.target.closest(links)));
      wake();
    }, { passive: true });
    doc.addEventListener('pointerdown', function () { label.classList.remove('is-on'); on = false; });
    doc.addEventListener('scroll', function () { label.classList.remove('is-on'); on = false; dot.classList.remove('is-hidden'); }, { passive: true });
    doc.documentElement.addEventListener('pointerleave', function () { dot.classList.remove('is-on'); });
    alive.push(function () { return started && Math.abs(tx - dx) + Math.abs(ty - dy) > 0.3; });
    tasks.push(function () {
      if (!started) return;
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      dx += (tx - dx) * 0.32; dy += (ty - dy) * 0.32;
      label.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      dot.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
    });
  })();
})();
