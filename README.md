# Draft Studio Portfolio - Astro Project

A professional, multilingual portfolio website for **Draft Studio**, the freelance architectural design and real estate marketing practice of **Mustafa Benchabane**. Built by converting the "Minifolio" HTML template into a modern, component-based **Astro** project.

## 🏗️ Project Overview

- **Client:** Draft Studio (Mustafa Benchabane)
- **Role:** Architect & Real Estate Marketing Specialist
- **Experience:** 7+ Years
- **Regions:** Saudi Arabia, Russia, Algeria
- **Tech Stack:** Astro 5.x, TypeScript, Bootstrap 5, Swiper, WOW.js
- **Languages:** Arabic (Default, RTL), English, French

## ✨ Features

- **Multilingual Support (i18n):** Full content translation for AR, EN, and FR with automatic routing (`/ar/`, `/en/`, `/fr/`).
- **RTL Ready:** Native Right-to-Left support for Arabic, including layout flipping, logical CSS properties, and directional icons.
- **Component Architecture:** Modular Astro components for every section (Hero, Services, Projects, Testimonials, etc.).
- **Content Collections:** Type-safe content management for Services and Projects using Astro's Content Collections API.
- **Performance Optimized:** 
  - Zero JavaScript by default (only loads what's needed).
  - Image optimization via `astro:assets` (WebP, srcset).
  - Critical CSS inlining.
- **SEO & Accessibility:** 
  - Semantic HTML5 structure.
  - Meta tags, Open Graph, and Twitter Cards per page/language.
  - Schema.org structured data (`ProfessionalService`).
  - WCAG AA color contrast compliance.
- **Coming Soon Services:** Graceful handling of upcoming services with non-clickable badges.

## 📂 Project Structure

```bash
/
├── public/
│   ├── assets/             # Original template assets (fonts, libs, images)
│   └── robots.txt          # SEO robots configuration
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, Base layouts
│   │   ├── sections/       # Page sections (Hero, About, Services, etc.)
│   │   └── ui/             # Reusable UI blocks (Cards, Buttons, Icons)
│   ├── content/
│   │   ├── services/       # Service data (JSON)
│   │   ├── projects/       # Project portfolio data (JSON)
│   │   └── config.ts       # Content collection schemas
│   ├── i18n/
│   │   ├── ar.json         # Arabic translations (Default)
│   │   ├── en.json         # English translations
│   │   └── fr.json         # French translations
│   ├── layouts/
│   │   ├── BaseLayout.astro# Master layout with <head> setup
│   │   └── PageLayout.astro# Inner layout for content pages
│   ├── pages/
│   │   ├── [lang]/         # Dynamic language routes
│   │   │   ├── index.astro # Homepage
│   │   │   ├── services/   # Services listing & details
│   │   │   ├── portfolio/  # Portfolio listing & details
│   │   │   ├── faq.astro   # FAQ page
│   │   │   └── contact.astro # Contact page
│   │   └── index.astro     # Root redirect to /ar/
│   ├── styles/
│   │   ├── main.css        # Original template styles
│   │   ├── theme.css       # Draft Studio color variables (Teal/Navy)
│   │   └── rtl.css         # RTL-specific overrides
│   ├── utils/
│   │   └── i18n.ts         # Translation helper functions
│   └── env.d.ts            # TypeScript environment definitions
├── astro.config.mjs        # Astro configuration (i18n, sitemap, adapter)
├── package.json
├── tsconfig.json           # TypeScript strict mode config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v22.12.0 or higher (Recommended)
- **npm:** v10.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd draft-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:4321`
   - Access specific languages:
     - Arabic (Default): `http://localhost:4321/ar/`
     - English: `http://localhost:4321/en/`
     - French: `http://localhost:4321/fr/`

### Build for Production

```bash
npm run build
```
- Output directory: `dist/`
- Ready for deployment to Cloudflare Pages, Netlify, or Vercel.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local dev server (HMR enabled) |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Serve built site locally |
| `npm run astro check` | Type-check and lint project |
| `npm run sync` | Sync Astro types (usually auto-run) |

## 🌍 Internationalization (i18n)

The project uses a file-based i18n system.

- **Default Locale:** Arabic (`ar`)
- **Supported Locales:** `ar`, `en`, `fr`
- **Translation Files:** Located in `src/i18n/`.
- **Usage in Components:**
  ```astro
  ---
  import { getTranslation } from '../../utils/i18n';
  const { lang } = Astro.params;
  const t = getTranslation(lang || 'ar');
  ---
  <h1>{t.hero.title}</h1>
  ```

### RTL Support
- The `<html dir="rtl">` attribute is automatically applied when the locale is `ar`.
- CSS Logical Properties (`margin-inline-start`, etc.) are used throughout `theme.css` to ensure proper flipping without media queries.

## 🎨 Design System

### Color Palette (Draft Studio Theme)
Mapped from the original "Neon Green" template to a professional Architectural palette:

| Role | Original | **New (Draft Studio)** | Hex |
| :--- | :--- | :--- | :--- |
| **Primary** | Neon Green | **Teal** | `#008080` |
| **Secondary** | Purple | **Navy Blue** | `#1a237e` |
| **Accent** | Pink | **Gold/Sand** | `#c5a059` |
| **Dark** | Black | **Charcoal** | `#121212` |
| **Light** | White | **Off-White** | `#f8f9fa` |

### Typography
- **Font Family:** *Cairo* (Google Fonts) - Supports Arabic, Latin, and Cyrillic scripts perfectly.
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold).

## 📦 Content Management

Content is stored as JSON files in `src/content/`, leveraging Astro's Content Collections for type safety.

### Services
Located in `src/content/services/`.
- **Fields:** `title`, `slug`, `excerpt`, `icon`, `active`, `comingSoon`.
- **Logic:** If `comingSoon: true`, the card renders as a badge and disables the link.

### Projects
Located in `src/content/projects/`.
- **Fields:** `title`, `slug`, `category`, `year`, `location`, `image`, `gallery`.
- **Locations:** Supports cities in Saudi Arabia, Russia, and Algeria.

## 🚢 Deployment (Cloudflare Pages)

This project is configured for **Cloudflare Pages**.

1. **Build Settings:**
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `/`

2. **Environment Variables:**
   - None required for static build.

3. **Adapter:**
   - Uses `@astrojs/cloudflare` for optimal edge compatibility if server-side features are added later.

## ✅ Phase Completion Status

| Phase | Description | Status |
| :--- | :--- | :--- |
| **Phase 1** | Core Astro Scaffolding | ✅ Complete |
| **Phase 2** | Component Decomposition | ✅ Complete |
| **Phase 3** | Page Assembly & Content | ✅ Complete |
| **Phase 4** | RTL & i18n Implementation | ✅ Complete |
| **Phase 5** | Cleanup, Optimization, Hardening | ✅ Complete |

## 📝 Known Limitations & Future Work

1. **Images:** Currently using template placeholders. Replace paths in `src/content/projects/*.json` with real project photography for the final launch.
2. **Testimonials:** Slider structure is ready; populate `src/i18n/*/json` with real client quotes when available.
3. **Blog/News:** Intentionally excluded per requirements (design.md §5.3). Can be added later by creating a `posts` collection.

## 📄 License

Proprietary code for Draft Studio. All rights reserved.

---

**Built with ❤️ by Mustafa Benchabane**
*Architect & Real Estate Marketing Specialist*
