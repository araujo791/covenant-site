/* Covenant CachyOS — detecção de idioma + tradução PT/EN
 * O português é o conteúdo original das páginas; aqui ficam só as traduções para inglês.
 * Ordem de decisão: ?lang=pt|en  →  escolha salva  →  fuso horário do Brasil  →  idioma do navegador.
 */
(function () {
  'use strict';

  var EN = {
    // README updates — Covenant-CachyOs-Builder
    b_packages_body: `WiFi and Bluetooth (iwd, wpa_supplicant, bluez), basic network printing and virtual-machine tools are retained. scx-scheds, scx-tools, ananicy-cpp and zram-generator are included in the live image; configuration and activation happen on first boot of the installed system. The live package list includes neither NVIDIA nor ZFS packages.`,
    b_packages_title: `What stays in the live system`,
    b_tradeoffs: `<strong>Power and protection:</strong> desktop/laptop detection applies to the governor, EPP and C-States. Intel Turbo and high GPU profiles also apply on battery, increasing power use and temperature. <code>mitigations=off</code> reduces protection against CPU vulnerabilities.`,
    b_bluetooth: `<strong>Bluetooth:</strong> <code>bluetooth.service</code> is enabled on first boot if <code>bluez</code> is installed.`,
    b_systemd: `<strong>Systemd:</strong> <code>RuntimeWatchdogSec=0</code>, <code>DefaultTimeoutStopSec=10s</code> and <code>DefaultTimeoutStartSec=15s</code>. Services without their own timeout may be stopped after 15 seconds; first boot declares 900 seconds.`,
    b_ananicy: `<strong>ananicy-cpp + cachyos-ananicy-rules:</strong> auto-nice daemon enabled to prioritize CPU and I/O for games and foreground windows.`,
    b_baloo: `<strong>Baloo:</strong> basic indexing only, configured in <code>/etc/xdg/baloofilerc</code>.`,
    b_shaders: `<strong>Shaders:</strong> <code>MESA_SHADER_CACHE_MAX_SIZE=50G</code>, <code>__GL_SHADER_DISK_CACHE_SIZE=53687091200</code> and <code>RADV_PERFTEST=aco</code> in <code>/etc/environment</code>.`,
    b_kwin: `<strong>KWin / KDE Wayland:</strong> <code>LatencyPolicy=Lower</code> and <code>GLCore=true</code> in <code>/etc/xdg/kwinrc</code>. User settings in <code>~/.config/kwinrc</code> take precedence.`,
    b_pipewire: `<strong>PipeWire:</strong> 48 kHz, dynamic quantum from 64 to 1024 samples, in <code>99-covenant-lowlatency.conf</code>.`,
    b_sched_slice: `<code>kernel.sched_cfs_bandwidth_slice_us=3000</code> for smaller scheduling slices.`,
    b_scx: `<strong>scx_loader:</strong> selects <code>scx_rusty</code> with ≥2 NUMA nodes and <code>scx_lavd</code> for regular high-performance/gaming desktops.`,
    b_cstates: `Only desktops receive <code>processor.max_cstate=1</code> and <code>intel_idle.max_cstate=1</code>; laptop C-States remain unrestricted.`,
    b_kernel_latency: `Latency and timing: <code>split_lock_detect=off</code>, <code>preempt=full</code>, <code>tsc=reliable</code>, <code>clocksource=tsc</code> and <code>skew_tick=1</code>.`,
    b_cmdline: `<code>mitigations=off</code>, <code>transparent_hugepage=madvise</code>, <code>nowatchdog</code>, <code>amdgpu.ppfeaturemask=0xffffffff</code> and <code>amd_pstate=active</code>.`,
    b_bootloaders: `Boot-parameter merge for <strong>GRUB and systemd-boot</strong>, preserving existing options such as <code>quiet</code> and <code>splash</code>.`,
    b_ext4: `<strong>Ext4:</strong> <code>noatime</code> and <code>commit=60</code> for a 60-second flushing interval.`,
    b_btrfs: `<strong>Btrfs:</strong> <code>noatime</code>, <code>space_cache=v2</code>, <code>compress=zstd:1</code> and <code>discard=async</code>.`,
    b_hdparm: `HDDs use <code>hdparm -B 255</code> and <code>-S 0</code>, persisted in <code>69-covenant-hdparm.rules</code>.`,
    b_max_map: `<code>vm.max_map_count=2147483642</code> for games and Steam Proton.`,
    b_network_extra: `<code>tcp_notsent_lowat=16384</code> to reduce queueing; <code>tcp_syncookies=1</code> and <code>tcp_tw_reuse=1</code>.`,
    b_nvidia: `NVIDIA Persistence Mode: <code>nvidia-smi -pm 1</code> when proprietary drivers are present.`,
    b_cpu_service: `<code>covenant-cpu-governor.service</code> reapplies the profile at every boot; laptop detection uses batteries in <code>/sys/class/power_supply/BAT*</code> and the DMI chassis type.`,
    b_audio_tab: `Audio / Desktop`,
    b_audit_label: `Check optimizations after rebooting into the installed system`,
    b_checksum_label: `Check ISO integrity (SHA256)`,
    b_readme: `README on GitHub <svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>`,
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
    i008: `Custom CachyOS ISO builder with Covenant branding, Plasma/KDE and Hyprland. Optimizations use <strong style="color: var(--text)">automatic hardware detection</strong> and are applied to the installed system on first boot.`,
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
    i026: `<strong>Live and installed system:</strong> <code>packages.x86_64</code> defines live packages only. Online installation uses <code>netinstall.yaml</code>; <code>covenant-post-install.sh</code> installs MachCtrl and Pamac on first boot.`,
    i028: `What the build does`,
    i029: `From scratch to the final ISO, with automatic retries and defensive fixes.`,
    i030: `Dependencies and mirrors`,
    i031: `Installs git, archiso and cachyos-rate-mirrors. Picks the fastest mirrors and refreshes the package databases.`,
    i032: `Calamares clone and patch`,
    i033: `Clones the official cachyos-live-iso and patches <code>calamares-online.sh</code> so it no longer reinstalls Calamares (the root cause of the installer not opening + lost branding).`,
    i034: `Packages and branding`,
    i035: `Applies the lean live package list, 10 Covenant slides and 20 wallpapers to the live and installed systems. Desktop selection is limited to Plasma/KDE and Hyprland.`,
    i036: `Safety hooks`,
    i037: `Reapplies branding through a hook and before launching Calamares. The live system prevents Calamares package reinstalls with IgnorePkg. covenant-target-setup preserves the upstream file.`,
    i038: `MachCtrl + auto-fix`,
    i039: `Builds machctrl-bin with makepkg, creates a local pacman repository and embeds the package in the ISO. Checks Calamares libraries with ldd and attempts to repair boost-libs through the Arch Linux Archive.`,
    i040: `Final ISO`,
    i041: `Generates post-install optimization files, configures makepkg.conf, names the ISO Covenant-CachyOS-&lt;date&gt;-&lt;suffix&gt;, builds with automatic retry (3×) and creates a SHA256 checksum.`,
    i043: `Post-install optimizations`,
    i044: `Run <strong style="color: var(--text)">only on the installed system</strong>, once on first boot, through <code>covenant-first-boot.service</code>. The <code>/var/lib/covenant-setup-done</code> marker prevents repeated execution. Never in the live session.`,
    i045: `CPU / GPU`,
    i046: `Network`,
    i047: `Memory / ZRAM`,
    i051: `Kernel / scx`,
    i052: `Other`,
    i053: `<strong>Desktop:</strong> <code>performance</code> governor and EPP. <strong>Laptop:</strong> adaptive <code>powersave</code>/<code>schedutil</code> governor, <code>balance_performance</code> EPP and unrestricted C-States.`,
    i054: `iGPU and dGPU set to high performance: <code>power_dpm_force_performance_level=high</code> and <code>power_dpm_state=performance</code>, including on laptops.`,
    i055: `Intel Turbo Boost enabled with <code>no_turbo=0</code>. Turbo and GPU settings also apply while running on battery.`,
    i056: `TCP <strong>BBR</strong> + <code>fq</code> as the default qdisc, with packet pacing for BBRv3.`,
    i057: `Bufferbloat tuning: <code>rmem_max</code>/<code>wmem_max</code> at 32 MB (<code>33554432</code>), <code>optmem_max=65536</code>, <code>somaxconn=8192</code> and <code>netdev_max_backlog=16384</code>.`,
    i058: `<code>tcp_timestamps=0</code>, <code>tcp_slow_start_after_idle=0</code> and <code>tcp_fin_timeout=10</code>.`,
    i059: `<code>tcp_fastopen=3</code> — Fast Open for client and server`,
    i060: `<code>tcp_mtu_probing=1</code> — automatic Path MTU Discovery`,
    i061: `<code>tcp_bbr</code> module loaded at boot`,
    i062: `<code>swappiness=100</code> and <code>vfs_cache_pressure=50</code>, tuned for ZRAM.`,
    i063: `<code>page-cluster=0</code> — no aggressive swap readahead, suitable for ZRAM.`,
    i064: `<code>compaction_proactiveness=20</code> and non-blocking THP defrag with <code>defer+madvise</code>.`,
    i065: `2 MB Huge Pages based on RAM: 1024 pages at ≥32 GB; 512 at ≥16 GB; below 16 GB, on-demand THP without a fixed reservation.`,
    i066: `<strong>ZRAM with zstd:</strong> compressed swap in RAM, sized at approximately half of physical RAM, capped at 16 GB.`,
    i067: `Byte-based dirty pacing: <code>dirty_bytes=268435456</code> (256 MB), <code>dirty_background_bytes=134217728</code> (128 MB) and 500/1000 cs intervals.`,
    i071: `udev rules with a <code>99-</code> prefix (override CachyOS defaults)`,
    i072: `<code>fstrim.timer</code> enabled`,
    i073: `NVMe, AMD/NVIDIA/Intel GPU, Ethernet and WiFi IRQs pinned to the first half of the available cores.`,
    i074: `<code>covenant-irq-affinity.service</code> applies affinities. <code>irqbalance.service</code> is stopped and masked to preserve them.`,
    i077: `Backs up <code>/etc/fstab</code> to <code>fstab.covenant-backup</code> before changes.`,
    i078: `<code>sched_autogroup_enabled=1</code> — dynamic desktop task-group isolation. Older ISOs may have the value set to 0.`,
    i079: `<code>nmi_watchdog=0</code> alongside <code>nowatchdog</code> in boot parameters.`,
    i080: `<code>perf_event_paranoid=-1</code> + <code>kptr_restrict=0</code> — profiling without root`,
    i081: `<code>unprivileged_userns_clone=1</code> — Flatpak, rootless containers and the Chromium sandbox`,
    i082: `<strong>Journald:</strong> persistent, compressed, capped at 256 MB, 32 MB files and one-week retention. Coredumps use <code>Storage=none</code>.`,
    i084: `<strong>Polkit:</strong> the <code>wheel</code> group can mount disks, unlock encrypted volumes and eject media without a password. MachCtrl permissions for governors, GPU and fans avoid repeated root prompts.`,
    i085: `<strong>Limits:</strong> raised <code>nofile</code> and <code>memlock</code>; <code>inotify.max_user_watches=524288</code> and <code>max_user_instances=1024</code>.`,
    i086: `<strong>Verification:</strong> <code>sudo covenant-check.sh</code> audits governor, EPP, boot, network, disks, IRQs, audio, ananicy, polkit and other settings.`,
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
    i102: `<strong>Layered defense:</strong> the launcher updates the keyring without reinstalling Calamares. IgnorePkg protects installer packages; the hook reapplies branding before exec. The boost-libs repair checks the Arch Linux Archive and pins the live version; if the download fails, the build only warns and continues.`,
    i103: `Pre-installed`,
    i104: `Built-in tools`,
    i105: `Installed automatically on first boot of the installed system.`,
    i107: `Native CachyOS monitor and optimizer, built from the AUR and embedded in the ISO. First boot installs the local package with pacman -U and removes it on success. On failure, it remains in /usr/local/share/covenant-target-files/ for manual installation.`,
    i108: `View screenshots and details →`,
    i110: `Graphical package manager with AUR support, from the official CachyOS repository. Post-install waits for DNS, syncs package databases and installs Pamac. After five minutes without a network connection, it logs manual commands for installing Pamac and MachCtrl.`,
    i111: `Cleanup`,
    i112: `Lean ISO`,
    i113: `Documentation`,
    i114: `Cleanup only in the chroot: documentation, CJK fonts, extra icon themes, package cache and logs. Preserves breeze, hicolor, Adwaita and cursors.`,
    i116: `Keeps only pt_BR, en_US and en_GB.`,
    i118: `Removes enterprise/datacenter NICs. Keeps WiFi and Bluetooth.`,
    i119: `Active development`,
    i120: `According to the README, online installation, MachCtrl, Pamac and boost-libs/Calamares repair were validated on real hardware. The October 2026 updates — dynamic profiles, scx_loader, ZRAM, dirty pacing, KWin, shaders, systemd and IRQs — were added after that validation. Check each item after installing a new ISO with sudo covenant-check.sh.`,
    i122: `Covenant CachyOS Builder documentation`,

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
