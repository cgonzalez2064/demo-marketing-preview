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

   Packages: Express and Starter get the essentials (header, ribbon, carousel).
   Profesional adds the school of fish and magnetic buttons. Premium adds the
   cursor label and the depth effect on the cover photos.
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

  /* ---------- 2. Headline words (keeps the effect after a language change) ---------- */
  (function () {
    var heads = doc.querySelectorAll('[data-split]');
    if (!heads.length) return;
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
              outer.className = 'fx-word d' + Math.min(i++, 14);
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

  /* ---------- 3. Ribbon with the list of services ---------- */
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
  })();

  /* ---------- 4. Reviews: drag with momentum (mouse); touch scrolls natively ---------- */
  (function () {
    var rail = doc.querySelector('.reviews-grid');
    if (!rail || !finePointer) return;
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

  if (tier < 2) return;

  /* ---------- 5. School of fish behind the headline (canvas) ---------- */
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
    if (finePointer) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true;
      }, { passive: true });
      hero.addEventListener('pointerleave', function () { pointer.on = false; });
    }
    sync();
  })();

  if (!finePointer) return;

  /* ---------- 6. Magnetic buttons ---------- */
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

  /* ---------- 7. Cover photos follow the pointer at different depths ---------- */
  (function () {
    var art = doc.querySelector('[data-depth]');
    var hero = art && art.closest('.hero');
    if (!art) return;
    var layers = [];
    each(art.querySelectorAll('.hero-photo'), function (el, i) { layers.push({ el: el, k: [14, 26, 18][i] || 16 }); });
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    function tick() {
      x += (tx - x) * 0.09; y += (ty - y) * 0.09;
      layers.forEach(function (l) { l.el.style.translate = (x * l.k).toFixed(2) + 'px ' + (y * l.k).toFixed(2) + 'px'; });
      raf = (Math.abs(tx - x) + Math.abs(ty - y) > 0.002) ? requestAnimationFrame(tick) : 0;
    }
    hero.addEventListener('pointermove', function (e) {
      if (calm()) return;
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
  })();

  /* ---------- 8. Cursor label over photos and the reviews row ---------- */
  (function () {
    var targets = '.service-media, .area-card.has-photo, .doc-avatar.has-photo, .reviews-grid';
    var dot = doc.createElement('div');
    dot.className = 'fx-cursor';
    dot.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(dot);
    var tx = 0, ty = 0, x = 0, y = 0, raf = 0, on = false;
    function label(el) {
      var en = (root.getAttribute('lang') || 'es').slice(0, 2) === 'en';
      if (el.classList.contains('reviews-grid')) return en ? 'Drag' : 'Arrastre';
      return en ? 'View' : 'Ver';
    }
    function tick() {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      dot.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      raf = on || Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    }
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      var hit = !calm() && e.target.closest && e.target.closest(targets);
      if (hit && e.target.closest('a.btn, button.btn, .text-link, .service-open, .area-open')) hit = null;
      if (hit && !on) { x = tx; y = ty; dot.textContent = label(hit); }
      on = !!hit;
      dot.classList.toggle('is-on', on);
      if (on && !raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    doc.addEventListener('pointerdown', function () { dot.classList.remove('is-on'); on = false; });
    doc.addEventListener('scroll', function () { dot.classList.remove('is-on'); on = false; }, { passive: true });
  })();
})();
