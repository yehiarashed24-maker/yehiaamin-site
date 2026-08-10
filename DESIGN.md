---
name: Yehia Amin Portfolio
description: Sleek dark-mode obsidian workspace with electric neon accents and 3D depth.
colors:
  primary: "#B600A8"
  secondary: "#00E1FF"
  neutral-bg: "#0C0C0C"
  surface: "#141518"
  text-primary: "#D7E2EA"
  border: "#2B2E36"
typography:
  display:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Kanit, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: "1.2"
  body:
    fontFamily: "Kanit, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
rounded:
  sm: "6px"
  md: "16px"
  lg: "32px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
---

# Design System: Yehia Amin Portfolio

## Overview

**Creative North Star: "The Cybernetic Canvas"**

The design system for Yehia Amin's personal portfolio is a high-contrast, obsidian-dark digital interface built around precision engineering, high-tech aesthetics, and immersive 3D depth. Anchored by an ultra-dark background (`#0C0C0C`) and high-chroma electric magenta (`#B600A8`) and cyan (`#00E1FF`) accents, the interface delivers a futuristic, high-performance experience designed to impress recruiters and hiring managers.

Typography is grounded in the geometric sans-serif **Kanit**, delivering crisp readability across all viewports. Micro-interactions—from custom precision cursors to 3D canvas spheres and glowing border transitions—create a responsive environment that feels alive.

**Key Characteristics:**
- **Obsidian Dark Canvas:** Deep `#0C0C0C` background with subtle `#141518` container cards and glowing borders.
- **Electric Dual-Neon Accents:** Dominant magenta (`#B600A8`) paired with cyber cyan (`#00E1FF`).
- **Precision Micro-Interactions:** Custom precision cursor, glassmorphism modals, magnetic hover effects, and 3D webgl canvas integration.
- **Geometric Typography:** High-contrast, bold uppercase headers paired with clean body text in **Kanit**.

## Colors

The color palette uses deep dark neutral surfaces contrasted by high-saturation neon accents to evoke a high-tech cybernetic aesthetic.

### Primary
- **Electric Magenta** (`#B600A8`): Primary action trigger, highlight glow, and active navigation indicator.

### Secondary
- **Cyber Cyan** (`#00E1FF`): Secondary accent used for technical tags, tertiary icons, and 3D particle lighting.

### Neutral
- **Obsidian Background** (`#0C0C0C`): Base screen background color.
- **Dark Charcoal Surface** (`#141518` / `#1E2026`): Card containers, modal backgrounds, and interactive hover states.
- **Ice Silver Text** (`#D7E2EA`): Primary typography color providing high legibility against obsidian surfaces.
- **Slate Border** (`#2B2E36`): Subtle container dividing lines and field outlines.

### Named Rules
**The Neon Rarity Rule.** Neon accent colors (`#B600A8` and `#00E1FF`) are reserved strictly for key interactive elements, badges, and focal points. They occupy ≤15% of any screen surface.

## Typography

**Display Font:** Kanit (with sans-serif fallback)  
**Body Font:** Kanit (with sans-serif fallback)

**Character:** Modern, geometric, bold, and authoritative. Uppercase transformations with tight tracking are used for section titles and primary actions.

### Hierarchy
- **Display** (Weight: 900, Clamp: `2.5rem` to `4.5rem`, Line-height: 1.1): Used for Hero section titles and major headlines.
- **Headline** (Weight: 700, Clamp: `1.75rem` to `2.5rem`, Line-height: 1.2): Used for section headers and modal titles.
- **Title** (Weight: 600, Size: `1.25rem`, Line-height: 1.3): Used for card headings and sub-features.
- **Body** (Weight: 400 / 300, Size: `1rem`, Line-height: 1.6): Used for descriptive paragraphs and project summaries. Max line length: 65ch.
- **Label** (Weight: 500, Size: `0.75rem`, Uppercase, Tracking: `0.1em`): Used for tags, metadata, and button labels.

## Layout

Layout is structured on a responsive flex and grid system with generous vertical padding (`py-16` to `py-24`). Content containers are capped at maximum widths (`max-w-4xl`, `max-w-6xl`) with symmetric horizontal padding (`px-6` to `px-12`).

## Elevation & Depth

Surfaces are predominantly flat with subtle elevation achieved via dark surface layering (`#0C0C0C` vs `#141518`) and multi-layer drop shadows with neon color glows (`shadow-[0_0_50px_rgba(182,0,168,0.15)]`).

### Shadow Vocabulary
- **Magenta Ambient Glow** (`0px 4px 24px rgba(181, 1, 167, 0.25)`): Interactive focus and floating CTA glow.
- **Card Depth Shadow** (`shadow-2xl` / `0 20px 25px -5px rgba(0,0,0,0.5)`): Modals and popup containers.

### Named Rules
**The Dark Layering Rule.** Depth is created through surface contrast (`#0C0C0C` -> `#141518` -> `#1E2026`) and thin borders (`#2B2E36`), relying on ambient neon glow rather than traditional light drop shadows.

## Shapes

- **Buttons & Badges:** Pill-shaped (`rounded-full`) for high touchability and organic fluid feel.
- **Cards & Modals:** Generous rounded corners (`rounded-2xl` to `rounded-[32px]`) with crisp 1px borders (`#2B2E36`).

## Components

### Buttons
- **Shape:** Full pill (`rounded-full`)
- **Primary:** Gradient/Solid Magenta (`#B600A8`), white text, bold uppercase label.
- **Secondary / Outline:** Dark background with ice silver border (`#D7E2EA/30`) and white text. Hover transitions to solid `#D7E2EA` with dark text.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) or `rounded-[32px]` (32px)
- **Background:** `#141518` or `#0C0C0C`
- **Border:** 1px `#2B2E36`
- **Padding:** `p-6` to `p-8`

### Modals
- **Background:** `#141518` with `#0a0a0a` backdrop overlay (`backdrop-blur-md`).
- **Border:** 1px `#2B2E36` with optional `rgba(182,0,168,0.15)` ambient glow.

## Do's and Don'ts

### Do:
- **Do** maintain deep obsidian `#0C0C0C` as the primary background color.
- **Do** use `Kanit` with bold uppercase styling for major headings and CTA labels.
- **Do** apply `rounded-full` to interactive pill buttons and status tags.
- **Do** use subtle border lines (`#2B2E36` or `#D7E2EA/10`) to separate dark cards and sections.

### Don't:
- **Don't** use light background colors for main sections.
- **Don't** overuse electric neon accent colors (`#B600A8`, `#00E1FF`) on body text or wide background areas.
- **Don't** use sharp 0px corners on interactive cards or modals.
