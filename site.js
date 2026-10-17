/* Shared interactions. No framework, pointer loops, or background canvas. */
(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const english = () => window.i18n?.lang === 'en';
  const text = (pt, en) => english() ? en : pt;

  const iconPaths = {
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/><path d="M10 10h4v4h-4z"/>',
    chart: '<path d="M3 3v18h18M7 14l4-5 4 3 6-8"/>',
    box: '<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm-9 5 9 5 9-5M12 13v9M7 6l9 5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    memory: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 17v3m4-3v3m4-3v3m4-3v3M6 10v4m4-4v4m4-4v4m4-4v4"/>',
    disk: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="11" r="5"/><path d="m12 11 5 7M6 18h.01"/>',
    fan: '<circle cx="12" cy="12" r="2"/><path d="M10 10C4 6 12 0 14 4c1 2-1 4-1 6m1 1c7-3 9 6 5 7-3 0-4-3-6-4m-2 0c-1 7-10 4-8 0 1-2 4-2 7-2"/>',
    energy: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
    clean: '<path d="m14 3 7 7M16 5 7 14m-3 0 6 6M7 11l6 6-5 5-6-6 5-5Z"/>',
    sliders: '<path d="M4 3v18M12 3v18M20 3v18M1 8h6m2 8h6m2-10h6"/>',
  };
  function icon(name) {
    return '<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">' + iconPaths[name] + '</svg>';
  }
  document.querySelectorAll('.card-icon').forEach((el, i) => {
    el.innerHTML = icon(['grid', 'grid', 'box', 'chart', 'box'][i % 5]);
    el.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('.feat-ico').forEach((el, i) => {
    el.innerHTML = icon(['chart', 'chip', 'memory', 'disk', 'fan', 'energy', 'clean', 'sliders'][i]);
    el.setAttribute('aria-hidden', 'true');
  });

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
  }

  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const closeMenu = () => {
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (!e.target.closest('#nav')) closeMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links?.classList.contains('open')) { closeMenu(); toggle.focus(); }
  });
  matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);

  const tabs = [...document.querySelectorAll('.opt-tab')];
  const tabPanels = [...document.querySelectorAll('.opt-panel')];
  const tabList = document.getElementById('optTabs');
  if (tabList) {
    tabList.setAttribute('role', 'tablist');
    tabList.classList.add('tabs-ready');
    function selectTab(tab, focus = false) {
      tabs.forEach(t => {
        const selected = t === tab;
        t.classList.toggle('active', selected);
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      tabPanels.forEach(panel => {
        const selected = panel.id === 'panel-' + tab.dataset.tab;
        panel.classList.toggle('active', selected);
        panel.hidden = !selected;
        if (selected) panel.classList.add('visible');
      });
      if (focus) tab.focus();
    }
    tabs.forEach((tab, i) => {
      tab.id = 'tab-' + tab.dataset.tab;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'panel-' + tab.dataset.tab);
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', e => {
        let next;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { e.preventDefault(); selectTab(tabs[next], true); }
      });
    });
    tabPanels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', panel.id.replace('panel-', 'tab-'));
      panel.tabIndex = 0;
    });
    selectTab(tabs[0]);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(btn.dataset.copy); ok = true; } catch { /* Report failure in the control. */ }
      btn.textContent = ok ? text('Copiado ✓', 'Copied ✓') : text('Não foi possível copiar', 'Could not copy');
      btn.classList.toggle('ok', ok);
      setTimeout(() => { btn.textContent = text('Copiar', 'Copy'); btn.classList.remove('ok'); }, 2000);
    });
    btn.setAttribute('aria-live', 'polite');
  });

  // Load the external player only after the visitor chooses to watch.
  const videoPoster = document.querySelector('.video-poster');
  videoPoster?.addEventListener('click', e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const frame = document.createElement('iframe');
    frame.src = videoPoster.dataset.video + '&autoplay=1';
    frame.title = text('Covenant CachyOS — apresentação', 'Covenant CachyOS — presentation');
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    videoPoster.hidden = true;
    videoPoster.parentElement.append(frame);
    frame.focus();
  });

  const progress = document.getElementById('scrollBar');
  const toTop = document.getElementById('toTop');
  const sections = [...document.querySelectorAll('section[id]')];
  let scheduled = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    toTop?.classList.toggle('show', scrollY > 700);
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) current = s.id; });
    links?.querySelectorAll('a').forEach(a => {
      const active = a.hash === '#' + current;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));

  const lightbox = document.getElementById('lightbox');
  const wins = [...document.querySelectorAll('.win')];
  let currentImage = 0;
  let returnFocus;
  const background = [...document.querySelectorAll('main, nav, footer, #toTop')];
  function showImage(i) {
    currentImage = (i + wins.length) % wins.length;
    const win = wins[currentImage];
    const source = win.querySelector('img');
    const image = document.getElementById('lbImg');
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    document.getElementById('lbCap').textContent = `${win.dataset.title} · ${currentImage + 1} / ${wins.length}`;
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    background.forEach(el => { el.inert = false; });
    returnFocus?.focus({ preventScroll: true });
  }
  function localizeControls() {
    if (toggle) toggle.setAttribute('aria-label', text('Menu de navegação', 'Navigation menu'));
    toTop?.setAttribute('aria-label', text('Voltar ao topo', 'Back to top'));
    if (tabList) tabList.setAttribute('aria-label', text('Categorias de otimização', 'Optimization categories'));
    if (lightbox) {
      lightbox.setAttribute('aria-label', text('Galeria de imagens do MachCtrl', 'MachCtrl image gallery'));
      document.getElementById('lbClose').setAttribute('aria-label', text('Fechar galeria', 'Close gallery'));
      document.getElementById('lbPrev').setAttribute('aria-label', text('Imagem anterior', 'Previous image'));
      document.getElementById('lbNext').setAttribute('aria-label', text('Próxima imagem', 'Next image'));
      wins.forEach(win => win.setAttribute('aria-label', text('Ampliar: ', 'Enlarge: ') + win.dataset.title));
      if (lightbox.classList.contains('open')) showImage(currentImage);
    }
  }
  if (lightbox) {
    wins.forEach((win, i) => {
      win.setAttribute('role', 'button');
      win.setAttribute('aria-haspopup', 'dialog');
      win.tabIndex = 0;
      const open = () => {
        returnFocus = win;
        showImage(i);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        background.forEach(el => { el.inert = true; });
        document.getElementById('lbClose').focus();
      };
      win.addEventListener('click', open);
      win.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', () => showImage(currentImage - 1));
    document.getElementById('lbNext').addEventListener('click', () => showImage(currentImage + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentImage - 1);
      if (e.key === 'ArrowRight') showImage(currentImage + 1);
      if (e.key === 'Tab') {
        const controls = [...lightbox.querySelectorAll('button')];
        const first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  localizeControls();
  addEventListener('langchange', localizeControls);
})();
