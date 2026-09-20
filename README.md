# Pasya Zahri — Neubrutalist Developer Portfolio

A personal developer portfolio built with a dark Neubrutalist design language, featuring lime (`#ccff00`), electric blue (`#4d7cff`), and neon pink (`#ff4d8d`) accents, high-contrast offset shadows, responsive tech-stack filtering, interactive project cards, timeline view, and SEO optimization.

---

## ⚡ Features & Architecture

- **Neubrutalist Dark Theme**:
  - Near-black `#0a0a0a` background with `#141414` surface cards and high-contrast white borders.
  - Hard offset drop shadows (`5px 5px 0px #ccff00`, `5px 5px 0px #ffffff`, `4px 4px 0px #000000`).
  - Tactile button states: hover translation (`-2px, -2px`), click shadow collapse (`+2px, +2px`).
  - Typography: **Space Grotesk** (display headings), **JetBrains Mono** (labels, code, tags), **Inter** (body readability).
  - Subtle dot and grid canvas textures.
- **Sections**:
  1. **Navbar**: Sticky, bordered navigation with active indicator, mobile drawer menu, and "Hire Me" CTA.
  2. **Hero**: Oversized headline, rotated "Available for Work" badge, CV direct generator/downloader, and infinite marquee.
  3. **About**: Photo in a bordered frame with hard shadow offset, quick stats grid (years of experience, shipped projects, code commits), and engineering philosophy.
  4. **Technical Skills**:
     - Categorized into Languages, Frontend, Backend, Database, Mobile, and DevOps & Tools.
     - 5-block segmented proficiency meter for each skill chip.
     - Category filter tabs with Framer Motion layout animations.
     - Real-time hover inspection bar detailing years of experience and specialization notes.
     - Infinite animated technology strip with pause-on-hover.
     - "Currently Learning" card with roadmap progress indicator.
     - Typed dataset defined in `src/data/skills.ts`.
  5. **Projects**: Filterable showcase (All / Web / Mobile / Backend) with tags, metrics, Live Demo, and GitHub links, plus an interactive detail modal.
  6. **Experience & Education**: Vertical timeline with bordered cards and category filtering.
  7. **Contact**: Validated transmission form with success/error states, quick email clipboard copy, and direct social buttons.
  8. **Footer**: Quick links, copyright, and smooth back-to-top button.
- **SEO & Social Metadata**:
  - Open Graph and Twitter Card tags with dedicated 1200x630 share image (`/og-image.svg`).
  - Schema.org `Person` JSON-LD structured data.
  - `robots.txt` and `sitemap.xml`.
  - Mobile theme color `#ccff00` and black-translucent status bar.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pasyazahri/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be compiled into the `dist/` directory.

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Vercel Deployment

This project is configured as a standard client-side SPA (Single Page Application) with Vite and is optimized for zero-configuration Vercel deployment.

### Method 1: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Authenticate and deploy:
   ```bash
   vercel
   ```

3. For production releases:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via Vercel Web Dashboard (Git Integration)

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel will automatically detect the **Vite** framework preset:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Vercel will build and assign your domain with automatic SSL certificates and edge CDN caching.

---

## 🛠️ Tech Stack

- **Framework**: React 19 / 18 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom Neubrutalist tokens
- **Animations**: Motion (`motion/react`)
- **Icons**: Lucide React + custom SVG brand marks
- **Fonts**: Space Grotesk, JetBrains Mono, Inter
