/* Applies the visitor's saved accessibility preferences before the first
   paint (loaded without defer in <head>), so the page never flashes at the
   wrong text size or contrast. assets/main.js manages the panel itself. */
(function(){
  try {
    var p = JSON.parse(localStorage.getItem('clinica_a11y') || '{}') || {};
    var r = document.documentElement;
    if (p.size) r.setAttribute('data-text', String(p.size).replace(/[^0-2]/g, ''));
    ['contrast', 'motion', 'links', 'spacing'].forEach(function(k){ if (p[k]) r.classList.add('a11y-' + k); });
  } catch (e) { /* storage unavailable: defaults */ }
})();
