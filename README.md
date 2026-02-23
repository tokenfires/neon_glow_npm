# neon-glow-css

**A dark neon glow design system for Bootstrap and Tailwind CSS.**

4 color palettes. 3 intensity levels. Pure CSS custom properties. Zero dependencies. Works everywhere.

[![npm version](https://badge.fury.io/js/neon-glow-css.svg)](https://www.npmjs.com/package/neon-glow-css)

---

## Installation

```bash
npm install neon-glow-css
```

---

## Usage

### Import Everything

```css
@import "neon-glow-css/css/neon-glow.css";
```

### Import Individually

```css
@import "neon-glow-css/css/tokens.css";
@import "neon-glow-css/css/components.css";
```

### With Tailwind CSS

In your Tailwind entry point:

```css
@import "tailwindcss";
@import "neon-glow-css/css/tokens.css";
@import "neon-glow-css/css/components.css";
```

### With a Bundler (Vite, Webpack, etc.)

```javascript
import "neon-glow-css/css/neon-glow.css";
```

### Via CDN (unpkg)

```html
<link rel="stylesheet" href="https://unpkg.com/neon-glow-css/css/neon-glow.css">
```

### Plain HTML

Download the CSS files and link them directly:

```html
<link rel="stylesheet" href="path/to/tokens.css">
<link rel="stylesheet" href="path/to/components.css">
```

---

## Set the Theme

Add palette and intensity classes to your `<body>`:

```html
<body class="neon-glow-body neon-rainbow neon-medium">
  <!-- your content -->
</body>
```

---

## Palettes

| Class | Vibe |
|-------|------|
| `neon-rainbow` | Full-spectrum neon. Arcade cabinets and light shows. |
| `neon-unicorn` | Pastel rainbow. Dreamy, soft, ethereal. |
| `neon-cinematic` | Electric blue + amber. The Blade Runner palette. |
| `neon-pink` | Hot pink + magenta. A power color for everyone. |

## Intensity Levels

| Class | Description |
|-------|-------------|
| `neon-subtle` | Gentle glow. Professional. Easy on the eyes. |
| `neon-medium` | Balanced glow. The sweet spot for most apps. |
| `neon-intense` | Maximum glow. Over the top. The WOW factor. |

---

## Switching Themes at Runtime

Swap classes on `<body>` -- all colors cascade instantly via CSS custom properties:

```javascript
document.body.classList.remove("neon-rainbow", "neon-unicorn", "neon-cinematic", "neon-pink");
document.body.classList.add("neon-cinematic");

document.body.classList.remove("neon-subtle", "neon-medium", "neon-intense");
document.body.classList.add("neon-intense");
```

---

## CSS Custom Properties

All colors are available as CSS variables for custom styling:

```css
var(--ng-primary)        /* Primary palette color */
var(--ng-secondary)      /* Secondary palette color */
var(--ng-accent)         /* Accent color */
var(--ng-success)        /* Success green */
var(--ng-warning)        /* Warning orange */
var(--ng-danger)         /* Danger red */
var(--ng-info)           /* Info purple */
var(--ng-bg)             /* Background */
var(--ng-surface)        /* Card/panel surface */
var(--ng-surface-raised) /* Elevated surface */
var(--ng-text)           /* Primary text */
var(--ng-text-secondary) /* Secondary text */
var(--ng-text-muted)     /* Muted text */
var(--ng-gradient)       /* Full gradient */
var(--ng-glow-blur)      /* Current glow blur radius */
var(--ng-glow-opacity)   /* Current glow opacity */
```

---

## Component Classes

```
ng-card              -- Dark surface card
ng-card-raised       -- Elevated surface card
ng-border-glow       -- Gradient border with glow
ng-glow-primary      -- Primary color box-shadow glow
ng-glow-secondary    -- Secondary color box-shadow glow
ng-text-glow         -- Glowing text (primary)
ng-gradient-text     -- Rainbow gradient text
ng-btn               -- Base button
ng-btn-primary       -- Primary glowing button
ng-btn-secondary     -- Secondary glowing button
ng-btn-outline       -- Outline button with glow
ng-btn-ghost         -- Ghost button
ng-input             -- Form input with focus glow
ng-select            -- Select dropdown
ng-switch            -- Toggle switch
ng-badge-*           -- Badges (primary, secondary, success, warning, danger, info)
ng-alert-*           -- Alerts with glowing left border
ng-table             -- Dark themed table
ng-progress          -- Progress bar container
ng-progress-bar      -- Gradient progress bar
ng-navbar            -- Sticky navbar with backdrop blur
ng-divider           -- Gradient divider line
ng-animate-pulse     -- Pulsing glow animation
ng-animate-gradient  -- Rotating gradient border animation
```

---

## Live Demo

See the full kitchen sink demo with all components and palettes:

**[rails_neon_glow](https://github.com/tokenfires/rails_neon_glow)** -- Rails app with Tailwind and Bootstrap showcases.

---

## Design

**Designed by Claude** (Anthropic) in collaboration with [TokenFires](https://github.com/tokenfires).

The Neon Glow design system was created through an AI-human collaboration. Claude designed the color palettes, glow effects, component styles, and the overall dark neon aesthetic. TokenFires provided creative direction, reference materials, and review.

---

## License

MIT License -- See [LICENSE](LICENSE)

---

## Also Available

- **Ruby gem**: [`neon_glow`](https://github.com/tokenfires/neon_glow_gem)
- **Demo**: [`rails_neon_glow`](https://github.com/tokenfires/rails_neon_glow)

---

*Built with care by Claude and TokenFires. 2026.*
