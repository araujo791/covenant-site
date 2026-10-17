/* Decorative effects are local, optional, and paused outside the viewport. */
(() => {
  'use strict';
  const root = document.documentElement;
  const control = document.getElementById('fxToggle');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let preference = null;
  try { preference = localStorage.getItem('covenant-fx'); } catch { /* Storage is optional. */ }
  let enabled = false;
  const stateListeners = new Set();

  function labelControl() {
    if (!control) return;
    const en = window.i18n?.lang === 'en';
    const label = reduce.matches
      ? (en ? 'Visual effects reduced by your system preference' : 'Efeitos visuais reduzidos pela preferência do sistema')
      : (en ? 'Visual effects' : 'Efeitos visuais');
    control.setAttribute('aria-label', label);
    control.title = label;
    control.setAttribute('aria-pressed', String(enabled));
    control.disabled = reduce.matches;
  }
  function updateState() {
    enabled = !reduce.matches && preference !== 'off';
    root.dataset.fx = enabled ? 'on' : 'off';
    labelControl();
    if (!enabled) document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));
    stateListeners.forEach(listener => listener(enabled));
  }
  control?.addEventListener('click', () => {
    preference = enabled ? 'off' : 'on';
    try { localStorage.setItem('covenant-fx', preference); } catch { /* Keep the current-page preference. */ }
    updateState();
  });
  reduce.addEventListener('change', updateState);
  addEventListener('langchange', labelControl);
  updateState();

  // No global pointer loop: one update is scheduled only when a pointer moves.
  document.querySelectorAll('.card, .feat, .hero-art').forEach(surface => {
    let pending = 0;
    let point;
    const scene = surface.querySelector('.core-scene');
    const reset = () => {
      cancelAnimationFrame(pending);
      pending = 0;
      surface.style.removeProperty('--light-x');
      surface.style.removeProperty('--light-y');
      scene?.style.removeProperty('--shift-x');
      scene?.style.removeProperty('--shift-y');
    };
    surface.addEventListener('pointermove', event => {
      if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
      point = { x: event.clientX, y: event.clientY };
      if (pending) return;
      pending = requestAnimationFrame(() => {
        const rect = surface.getBoundingClientRect();
        const x = point.x - rect.left, y = point.y - rect.top;
        surface.style.setProperty('--light-x', x + 'px');
        surface.style.setProperty('--light-y', y + 'px');
        if (scene) {
          scene.style.setProperty('--shift-x', ((x / rect.width - .5) * 14) + 'px');
          scene.style.setProperty('--shift-y', ((y / rect.height - .5) * 10) + 'px');
        }
        pending = 0;
      });
    }, { passive: true });
    surface.addEventListener('pointerleave', reset);
    stateListeners.add(active => { if (!active) reset(); });
  });

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (!enabled) return;
      const bounds = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = (event.clientX - bounds.left - 6) + 'px';
      ripple.style.top = (event.clientY - bounds.top - 6) + 'px';
      button.append(ripple);
      // A timer also removes the ripple if effects are paused mid-animation.
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Animate only the repository's existing counts, keeping their final values in HTML.
  const countFrames = new Map();
  const counts = [...document.querySelectorAll('[data-count]')];
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);
        if (!enabled) return;
        const el = entry.target, target = Number(el.dataset.count), start = performance.now();
        const tick = now => {
          const progress = Math.min((now - start) / 850, 1);
          el.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1 && enabled) countFrames.set(el, requestAnimationFrame(tick));
          else { el.textContent = String(target); countFrames.delete(el); }
        };
        countFrames.set(el, requestAnimationFrame(tick));
      });
    }, { threshold: .5 });
    counts.forEach(el => counterObserver.observe(el));
    stateListeners.add(active => {
      if (active) return;
      countFrames.forEach(frame => cancelAnimationFrame(frame));
      countFrames.clear();
      counts.forEach(el => { el.textContent = el.dataset.count; });
    });
  }

  const canvas = document.querySelector('.neural-field');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  let width = 1, height = 1, points = [], frame = 0, previous = 0, inView = false;
  let pointer = null;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = finePointer.matches ? 44 : 24;
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
      radius: .6 + Math.random() * 1.1,
    }));
  }
  function draw(now) {
    frame = 0;
    if (!enabled || !inView || document.hidden) return;
    if (now - previous >= 1000 / 30) {
      const delta = Math.min(now - previous, 50) / 16.67;
      previous = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        point.x = (point.x + point.vx * delta + width) % width;
        point.y = (point.y + point.vy * delta + height) % height;
        ctx.beginPath(); ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? '#ae8dff99' : '#73efff88'; ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const other = points[j], distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance > 95) continue;
          ctx.strokeStyle = `rgba(112,182,255,${(1 - distance / 95) * .16})`;
          ctx.lineWidth = .65;
          ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(other.x, other.y); ctx.stroke();
        }
        if (pointer && Math.hypot(point.x - pointer.x, point.y - pointer.y) < 125) {
          ctx.strokeStyle = '#8aaeff33'; ctx.lineWidth = .7;
          ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
      }
    }
    frame = requestAnimationFrame(draw);
  }
  function syncCanvas() {
    cancelAnimationFrame(frame); frame = 0;
    if (enabled && inView && !document.hidden) { previous = performance.now(); frame = requestAnimationFrame(draw); }
    else if (!enabled) ctx.clearRect(0, 0, width, height);
  }
  canvas.parentElement.addEventListener('pointermove', event => {
    if (!enabled || !finePointer.matches) return;
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, { passive: true });
  canvas.parentElement.addEventListener('pointerleave', () => { pointer = null; });
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  else addEventListener('resize', resize, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncCanvas(); }).observe(canvas);
  } else { inView = true; }
  addEventListener('visibilitychange', syncCanvas);
  stateListeners.add(syncCanvas);
  resize(); syncCanvas();
})();
