# Covenant CachyOS — Website Oficial

Repositório da página oficial de apresentação e documentação do **Covenant CachyOS Builder** e do ecossistema **MachCtrl**.

🌐 **Acesse online:** [https://araujo791.github.io/covenant-site/](https://araujo791.github.io/covenant-site/)

---

## ⚡ Sobre o Projeto

O site apresenta os diferenciais do **Covenant CachyOS**, uma distribuição customizada e focada em desempenho extremo para desktops, estações de trabalho e hardware gamer:

- **Hardware Aware:** Detecção automática de hardware (tipo de disco, GPU, topologia de núcleos) com otimizações aplicadas no primeiro boot.
- **Identidade Covenant:** Slides customizados no Calamares, suíte de temas para o GRUB (1080p pixel-perfect) e splash Plymouth em tela preta pura.
- **Desempenho Máximo:** Kernel cmdline preemptivo, BBRv3, mitigations desativadas, afinidade de IRQ e PipeWire de ultrabaixa latência.
- **MachCtrl 3.0:** Monitor e otimizador nativo de hardware embutido na ISO.

---

## 🛠️ Stack & Tecnologias

- **HTML5 Semântico:** Estrutura acessível com suporte a leitores de tela (`aria-*`, `skip-link`).
- **CSS Moderno (`design.css`):** Design responsivo dark/cyberpunk, grid/flexbox e variáveis nativas.
- **Efeitos Visuais (`effects.js`):** Fundo interativo via HTML5 Canvas (campo neural), tilt 3D nos cards e micro-interações.
- **Internacionalização (`i18n.js`):** Detecção inteligente de idioma (Português como base e tradução dinâmica para Inglês).
- **Zero Dependências Pesadas:** Vanilla JavaScript puro, sem frameworks pesados para carregamento instantâneo.

---

## 📁 Estrutura de Arquivos

```
covenant-site/
├── index.html        # Página principal (Covenant CachyOS Builder)
├── machctrl.html     # Página de detalhes do monitor de hardware MachCtrl
├── design.css        # Folha de estilos unificada
├── effects.js        # Efeitos visuais e partículas Canvas
├── i18n.js           # Mecanismo bilíngue (PT-BR / EN)
├── site.js           # Lógica de navegação, abas e acessibilidade
├── fonts/            # Fontes Space Grotesk otimizadas (.woff2)
└── images/           # Logos, prints, ícones e assets visuais
```

---

## 🔗 Links Relacionados

- **Covenant CachyOS Builder:** [github.com/araujo791/Covenant-CachyOs-Builder](https://github.com/araujo791/Covenant-CachyOs-Builder)
- **MachCtrl:** [github.com/araujo791/machctrl](https://github.com/araujo791/machctrl)
