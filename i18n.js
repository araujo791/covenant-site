/* Covenant CachyOS — detecção de idioma + tradução PT/EN
 * O português é o conteúdo original das páginas; aqui ficam só as traduções para inglês.
 * Ordem de decisão: ?lang=pt|en  →  escolha salva  →  fuso horário do Brasil  →  idioma do navegador.
 */
(function () {
  'use strict';

  var EN = {
    m_windows_download: `Download for Windows`,
    d_native_tool: `Hardware control`,
    d_skip: `Skip to content`,
    d_hero: `Your hardware.<br>Your potential.<br><span>Without limits.</span>`,
    d_download: `Download ISO <svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>`,
    d_based: `CachyOS foundation. Covenant identity.`,
    d_scroll: `Explore what is inside`,
    d_action_label: `In motion`,
    d_watch: `Watch the presentation`,
    d_action_title: `A new perspective.<br>The same control.`,
    d_action_desc: `Meet the Covenant experience: an environment with its own identity, from the first boot to your next project.`,
    d_mach_tagline: `Every detail. Under your control.`,

    // ───── index.html ─────
    i001: `Usage`,
    i003: `Optimizations`,
    i004: `Installer`,
    i006: `Active development`,
    i008: `Custom CachyOS ISO builder (Desktop/Plasma), with its own branding and performance optimizations. Most optimizations use <strong style="color: var(--text)">automatic hardware detection</strong> — they work on any machine.`,
    i010: `How to use <svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>`,
    i011: `View optimizations`,
    i012: `branding slides`,
    i013: `optimization categories`,
    i014: `automatic build retries`,
    i015: `desktops: Plasma and Hyprland`,
    i016: `Get started`,
    i017: `How to build`,
    i018: `Two build modes. RAM mode is faster, but needs plenty of free memory.`,
    i019: `Normal build`,
    i020: `Copy`,
    i021: `RAM build`,
    i022: `Copy`,
    i023: `Generated ISO`,
    i024: `Write to a USB drive`,
    i025: `Copy`,
    i026: `<strong>Note:</strong> This version is an <em>incremental, isolated</em> build — it started 100% pure and each customization was reintroduced and tested separately, to make diagnosis easier (especially GPU/Wayland issues).`,
    i028: `What the build does`,
    i029: `From scratch to the final ISO, with automatic retries and defensive fixes.`,
    i030: `Dependencies and mirrors`,
    i031: `Installs git, archiso and cachyos-rate-mirrors. Picks the fastest mirrors and refreshes the package databases.`,
    i032: `Calamares clone and patch`,
    i033: `Clones the official cachyos-live-iso and patches <code>calamares-online.sh</code> so it no longer reinstalls Calamares (the root cause of the installer not opening + lost branding).`,
    i034: `Packages and branding`,
    i035: `Replaces the package list, applies Covenant branding (10 PNG slides), copies wallpapers and trims the installer to offer only Plasma and Hyprland.`,
    i036: `Safety hooks`,
    i037: `Creates a pacman hook that reapplies branding if the package is reinstalled. Adds IgnorePkg for cachyos-calamares-next. Injects covenant-target-setup without overwriting upstream.`,
    i038: `MachCtrl + auto-fix`,
    i039: `Builds machctrl-bin from the AUR and embeds it in the ISO. Checks with ldd that Calamares loads all its libraries; if not, automatically fixes boost-libs via the Arch Linux Archive.`,
    i040: `Final ISO`,
    i041: `Generates post-install optimization files, configures makepkg.conf, names the ISO Covenant-CachyOS-&lt;date&gt;-&lt;suffix&gt;, builds with automatic retry (3×) and creates a SHA256 checksum.`,
    i043: `Post-install optimizations`,
    i044: `They run <strong style="color: var(--text)">only on the installed system</strong>, once, on first boot (<code>covenant-first-boot.service</code>). Never in the live session.`,
    i046: `Network`,
    i047: `Memory`,
    i052: `Other`,
    i053: `Dynamic hardware detection: governor <strong>performance</strong> on Desktops; adaptive governor and EPP <strong>balance_performance</strong> on Laptops/Battery (via <code>covenant-cpu-governor.service</code>)`,
    i054: `GPU forced to <code>power_dpm_force_performance_level=high</code> and <code>power_dpm_state=performance</code>`,
    i055: `Kernel cmdline: <code>mitigations=off</code>, <code>transparent_hugepage=madvise</code> (no gaming stutter), <code>nowatchdog</code>, <code>amd_pstate=active</code> (and conditional <code>max_cstate=1</code> on desktops)`,
    i056: `TCP <strong>BBR</strong> + <code>fq_pie</code> as the default qdisc`,
    i057: `Bufferbloat-safe buffers: <code>rmem_max</code>/<code>wmem_max</code> at 32 MB (prevents ping spikes in gaming), <code>optmem_max=65536</code>, <code>somaxconn=8192</code>, <code>netdev_max_backlog=16384</code>`,
    i059: `<code>tcp_fastopen=3</code> — Fast Open for client and server`,
    i060: `<code>tcp_mtu_probing=1</code> — automatic Path MTU Discovery`,
    i061: `<code>tcp_bbr</code> module loaded at boot`,
    i063: `<code>page-cluster=0</code> — no swap readahead`,
    i064: `<code>compaction_proactiveness=0</code> — no proactive compaction`,
    i065: `Huge Pages: 512 pages of 2 MB`,
    i066: `ZRAM disabled (masked via systemd)`,
    i071: `udev rules with a <code>99-</code> prefix (override CachyOS defaults)`,
    i072: `<code>fstrim.timer</code> enabled`,
    i073: `NVMe and AMD GPU IRQs pinned to half of the available logical cores`,
    i074: `Service <code>covenant-irq-affinity.service</code>`,
    i077: `Automatic backup of <code>/etc/fstab</code> before any change`,
    i078: `<code>sched_autogroup_enable=0</code> — better throughput on heavy workloads`,
    i079: `<code>nmi_watchdog=0</code> — double safeguard alongside <code>nowatchdog</code> in GRUB`,
    i080: `<code>perf_event_paranoid=-1</code> + <code>kptr_restrict=0</code> — profiling without root`,
    i081: `<code>unprivileged_userns_clone=1</code> — Flatpak, rootless containers and the Chromium sandbox`,
    i082: `<strong>Journald:</strong> persistent, compressed, 256 MB / 1 week. Coredumps disabled`,
    i084: `<strong>Polkit:</strong> disk mounting and MachCtrl hardware control without a password for the wheel group`,
    i085: `<strong>Limits:</strong> raised nofile and memlock; inotify 524288 watches`,
    i086: `<strong>Verification:</strong> <code>covenant-check.sh</code> shows the status of all optimizations`,
    i088: `Custom installer`,
    i089: `Online installation mode, with Covenant branding and a lean desktop selection.`,
    i090: `Covenant branding`,
    i091: `10 custom PNG slides during installation, applied via neutral staging + a rewrite of show.qml.`,
    i093: `The selection screen offers only “No Desktop”, “Plasma Desktop” and “Hyprland”. All other desktops are removed.`,
    i094: `Optimizations on the target`,
    i095: `covenant-target-setup injected into shellprocess-before-online.conf, preserving CachyOS upstream.`,
    i096: `Why Calamares wouldn't open`,
    i097: `The Launch Installer button called <code>calamares-online.sh</code>, which ran <code>pacman -Sy cachyos-calamares-next</code> before opening the GUI. On a rolling distro this breaks in two ways:`,
    i098: `Installer won't open`,
    i099: `The new package is built against boost/qt/python versions that don't exist in the ISO's frozen squashfs.`,
    i100: `Customizations disappear`,
    i101: `pacman restores the original show.qml, netinstall.yaml, packagechooser and shellprocess files.`,
    i102: `<strong>Layered defense:</strong> patch in calamares-online.sh (no reinstall), IgnorePkg in the live pacman.conf, and a branding-reapply hook outside /etc/calamares/. On top of that, automatic boost-libs mismatch fix via the Arch Linux Archive — if ldd detects a missing lib, it downloads and installs the exact version.`,
    i103: `Pre-installed`,
    i104: `Built-in tools`,
    i105: `Installed automatically on first boot of the installed system.`,
    i107: `Native hardware monitor and optimizer for CachyOS. Built from the AUR during the ISO build and embedded in it. Installed via pacman -U on first boot, with no internet or AUR helper needed.`,
    i108: `View screenshots and details →`,
    i110: `Graphical package manager with AUR support, from the official CachyOS repository. Installed on first boot together with MachCtrl, after confirming DNS resolution.`,
    i111: `Cleanup`,
    i112: `Lean ISO`,
    i113: `Documentation`,
    i114: `Removes /usr/share/doc, man, info and gtk-doc.`,
    i116: `Keeps only pt_BR, en_US and en_GB.`,
    i118: `Removes enterprise/datacenter NICs. Keeps WiFi and Bluetooth.`,
    i119: `Active development`,
    i120: `Online installation tested and working on real hardware — all optimizations, MachCtrl, Pamac and the automatic boost-libs/Calamares mismatch fix confirmed end to end (build → live → install → first boot).`,
    i122: `incremental, isolated build`,

    // ───── machctrl.html ─────
    m001: `← Back to Home`,
    m002: `Pre-installed on Covenant CachyOS`,
    m004: `Hardware Monitor and Optimizer for Linux — native version built with Rust + Tauri v2 + React.<br> Modern dark/light look, with a Rust backend reading sensors straight from <code>/proc</code> and <code>/sys</code> (no sysinfo, no Electron, no heavy WebView — it uses the system's own WebKitGTK).`,
    m005: `Overview`,
    m006: `CPU/Memory/GPU cards with live charts, Top Processes (RAM) and Network`,
    m008: `Multi-socket (one card per physical CPU), core grid with activity + temperature`,
    m009: `Memory`,
    m010: `Usage + DIMM modules (via dmidecode)`,
    m011: `Disks`,
    m012: `All partitions with a usage bar`,
    m014: `RPM/PWM with a control slider and Auto mode`,
    m015: `Power`,
    m016: `Economy / Balanced / Performance profiles`,
    m017: `Cleanup`,
    m018: `System cleanup tasks`,
    m019: `Tuning`,
    m020: `System optimizations`,
    m021: `under construction`,
    m023: `Detailed View`,
    m024: `System Overview`,
    m025: `Central dashboard summarizing CPU, RAM, GPU, Network and Top Processes. It adapts to different setups, from laptops to Xeon workstations.`,
    m027: `Alternative Dashboard (Laptop)`,
    m028: `Overview detailing battery status, voltage and frequencies on setups focused on efficiency.`,
    m030: `Advanced CPU Monitoring`,
    m031: `Per-thread and per-core usage, temperature and frequency of the processor.`,
    m033: `Memory Management`,
    m034: `View of the installed modules, speed (MT/s), voltage and free motherboard slots.`,
    m035: `<i></i><i></i><i></i><span class="win-title">machctrl — memory</span>`,
    m036: `Storage Metrics (Disks)`,
    m037: `Real-time read and write rates, total capacity and filesystems (F2FS, BTRFS, NTFS3, etc.) of every mapped drive.`,
    m038: `<i></i><i></i><i></i><span class="win-title">machctrl — disks</span>`,
    m039: `Power Profiles`,
    m040: `Simplified switching between Performance, Balanced and Battery Saver modes, with cell health details.`,
    m041: `<i></i><i></i><i></i><span class="win-title">machctrl — power</span>`,
    m042: `Fan Control`,
    m043: `Precise RPM control with support for custom curves and Automatic, Manual and Maximum modes via PWM.`,
    m045: `System Cleanup`,
    m046: `Quick maintenance to remove orphaned packages, empty the Pacman cache, clear Journal logs and more in one click.`,
    m047: `<i></i><i></i><i></i><span class="win-title">machctrl — cleanup</span>`,
    m048: `Settings`,
    m049: `A few tweaks to get more out of your hardware, network, disks, services and memory.`,
    m050: `<i></i><i></i><i></i><span class="win-title">machctrl — settings</span>`,
    m052: `Built for Arch`
  };

  // Atributos (alt, aria-label, data-title), título e meta description — chave = texto em português
  var ATTR = {
    'Logo MachCtrl': 'MachCtrl logo',
    'Voltar ao topo': 'Back to top',
    'Logo Covenant': 'Covenant logo',
    'Imagem ampliada': 'Enlarged image',
    'Fechar': 'Close',
    'Anterior': 'Previous',
    'Próxima': 'Next',
    'Builder de ISO customizada do CachyOS com branding próprio e otimizações de performance com detecção automática de hardware.':
      'Custom CachyOS ISO builder with its own branding and performance optimizations, with automatic hardware detection.',
    'MachCtrl - Detalhes e Prints': 'MachCtrl - Details & Screenshots',
    // alt das capturas
    'Visão Geral - Xeon': 'Overview - Xeon',
    'Visão Geral - Inspiron': 'Overview - Inspiron',
    'Monitoramento de CPU': 'CPU Monitoring',
    'Gestão de Memória': 'Memory Management',
    'Métricas de Discos': 'Disk Metrics',
    'Perfis de Energia': 'Power Profiles',
    'Controle de Ventoinhas': 'Fan Control',
    'Limpeza do Sistema': 'System Cleanup',
    'Ajustes': 'Settings',
    // legendas do lightbox (data-title)
    'Visão Geral do Sistema': 'System Overview',
    'Dashboard Alternativo (Notebook)': 'Alternative Dashboard (Laptop)',
    'Monitoramento de CPU Avançado': 'Advanced CPU Monitoring',
    'Métricas de Armazenamento (Discos)': 'Storage Metrics (Disks)',
    'Controle de Ventoinhas (Fans)': 'Fan Control'
  };

  var KEY = 'covenant-lang';
  var BR_TZ = /^America\/(Sao_Paulo|Bahia|Fortaleza|Recife|Belem|Manaus|Cuiaba|Campo_Grande|Porto_Velho|Boa_Vista|Rio_Branco|Araguaina|Maceio|Santarem|Noronha|Eirunepe)$/;
  var ATTRS = ['alt', 'aria-label', 'data-title'];

  var origHtml = new Map();
  var origAttr = new Map();
  var origTitle = document.title;
  var meta = document.querySelector('meta[name="description"]');
  var origMeta = meta ? meta.getAttribute('content') : null;

  function store(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  function detect() {
    var m = /[?&]lang=(pt|en)\b/i.exec(location.search);
    if (m) { var q = m[1].toLowerCase(); store(q); return q; }
    try {
      var s = localStorage.getItem(KEY);
      if (s === 'pt' || s === 'en') return s;
    } catch (e) {}
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    if (BR_TZ.test(tz)) return 'pt';
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    return /^pt/i.test(langs[0] || '') ? 'pt' : 'en';
  }

  function tr(map, v, en) { return (en && map[v] !== undefined) ? map[v] : v; }

  function apply(l) {
    var en = l === 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!origHtml.has(el)) origHtml.set(el, el.innerHTML);
      var t = EN[el.getAttribute('data-i18n')];
      el.innerHTML = (en && t !== undefined) ? t : origHtml.get(el);
    });

    ATTRS.forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) {
        var o = origAttr.get(el);
        if (!o) { o = {}; origAttr.set(el, o); }
        if (!(a in o)) o[a] = el.getAttribute(a);
        el.setAttribute(a, tr(ATTR, o[a], en));
      });
    });

    document.title = tr(ATTR, origTitle, en);
    if (meta) meta.setAttribute('content', tr(ATTR, origMeta, en));
    document.documentElement.lang = en ? 'en' : 'pt-BR';

    var sw = document.querySelector('.lang');
    if (sw) {
      sw.setAttribute('data-l', l);
      sw.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-l') === l ? 'true' : 'false');
      });
    }
  }

  function injectStyle() {
    var css =
      '.nav-right{display:flex;align-items:center;gap:10px}' +
      '.lang{position:relative;display:inline-flex;padding:3px;border-radius:12px;flex-shrink:0;' +
      'background:rgba(255,255,255,.05);border:1px solid var(--border-strong,rgba(255,255,255,.16));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
      '.lang button{position:relative;z-index:1;font:700 .74rem/1 var(--font,system-ui,sans-serif);letter-spacing:.07em;' +
      'color:var(--text-muted,#a0a9bd);background:none;border:0;padding:9px 12px;border-radius:9px;cursor:pointer;transition:color .25s}' +
      '.lang button:hover,.lang button[aria-pressed="true"]{color:#fff}' +
      '.lang button:focus-visible{outline:2px solid var(--accent-2,#a78bfa);outline-offset:1px}' +
      '.lang-glider{position:absolute;top:3px;left:3px;bottom:3px;width:calc(50% - 3px);border-radius:9px;' +
      'background:linear-gradient(135deg,rgba(124,92,255,.55),rgba(34,211,238,.3));box-shadow:0 0 18px rgba(124,92,255,.35);' +
      'transition:transform .35s cubic-bezier(.16,1,.3,1)}' +
      '.lang[data-l="en"] .lang-glider{transform:translateX(100%)}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }

  var api = {
    lang: 'pt',
    set: function (l, persist) {
      if (l !== 'pt' && l !== 'en') return;
      api.lang = l;
      if (persist) store(l);
      apply(l);
      try { window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } })); } catch (e) {}
    }
  };
  window.i18n = api;

  function buildSwitch() {
    var host = document.getElementById('langSwitch');
    if (!host) return;
    host.innerHTML =
      '<div class="lang" role="group" aria-label="Language / Idioma" data-l="pt">' +
      '<span class="lang-glider"></span>' +
      '<button type="button" data-l="pt" title="Português" aria-pressed="true">BR</button>' +
      '<button type="button" data-l="en" title="English" aria-pressed="false">EN</button>' +
      '</div>';
    host.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { api.set(b.getAttribute('data-l'), true); });
    });
  }

  injectStyle();
  buildSwitch();
  api.lang = detect();
  apply(api.lang);
  try { window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: api.lang } })); } catch (e) {}
})();
