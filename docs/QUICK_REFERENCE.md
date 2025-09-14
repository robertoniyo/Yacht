# Quick Reference Guide

## 🏃‍♂️ Getting Started in 60 Seconds

```bash
npm install && npm run dev
```

Visit: http://localhost:3000

## 📦 Component Import Cheatsheet

```tsx
// All components (copy-paste ready)
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import FleetCarousel from '@/components/FleetCarousel'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
```

## 🎨 Design System Quick Access

### Colors (Tailwind Classes)
```css
/* Brand Colors */
bg-brand-primary     /* Deep navy */
bg-brand-secondary   /* Ocean blue */
bg-brand-accent      /* Champagne */
bg-brand-muted       /* Light slate */

/* Surface Colors */
bg-surface           /* White */
bg-surface-elevated  /* Light gray */

/* Text Colors */
text-text            /* Dark slate */
text-text-muted      /* Medium slate */
text-text-on-brand   /* White */
```

### Typography Classes
```css
font-display         /* Plus Jakarta Sans (headings) */
font-body           /* Inter (body text) */
```

### Common Patterns
```css
container mx-auto container-px    /* Responsive container */
rounded-xl                       /* 24px border radius */
rounded-lg                       /* 16px border radius */
rounded-md                       /* 12px border radius */
```

## 🧩 Component Props & Features

| Component | Props | Key Features |
|-----------|-------|-------------|
| `Navbar` | None | Sticky, mobile menu, smooth scroll |
| `Hero` | None | Responsive grid, CTA buttons, hero image |
| `FeatureGrid` | None | 3-column grid, icons, responsive |
| `FleetCarousel` | None | Horizontal scroll, yacht cards |
| `CTA` | None | Booking form, gradient background |
| `Footer` | None | Brand info, navigation links |

## 🛠️ Scripts Reference

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm start           # Start production server
npm run lint        # Run ESLint

# Utilities
npm run figma:sync   # Sync Figma design tokens
npm run repo:init    # Initialize GitHub repo
```

## 🔧 Environment Variables

```env
# .env.local
FIGMA_TOKEN=figd_...              # Figma API token
FIGMA_FILE_KEY=ABC123...          # Figma file ID
GH_TOKEN=ghp_...                  # GitHub token
```

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
sm:   /* ≥ 640px */
md:   /* ≥ 768px */
lg:   /* ≥ 1024px */
xl:   /* ≥ 1280px */
```

## 🎯 Common Use Cases

### Add New Section
```tsx
// Create component
export default function NewSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto container-px">
        {/* Content */}
      </div>
    </section>
  )
}

// Add to page
import NewSection from '@/components/NewSection'
// Insert between existing sections
```

### Custom Styling with Brand Colors
```tsx
<div className="bg-brand-primary text-text-on-brand p-6 rounded-xl">
  <h3 className="text-brand-accent font-display text-2xl">
    Premium Feature
  </h3>
</div>
```

### Responsive Image
```tsx
import Image from 'next/image'

<div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
  <Image
    src="/your-image.jpg"
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | `rm -rf .next && npm install` |
| Styles not loading | Check Tailwind config & imports |
| Images not showing | Verify URLs & Next.js Image setup |
| TypeScript errors | Run `npx tsc --noEmit` |

## 📁 File Locations

```
src/
├── app/
│   ├── globals.css      # Design tokens & styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
└── components/          # All React components

scripts/
├── figma-sync.mjs      # Design token sync
└── github-init-push.mjs # Repo deployment

docs/
├── API_DOCUMENTATION.md # Complete API reference
├── README.md           # Project overview
└── QUICK_REFERENCE.md  # This file
```

## 🔗 Links

- [Full API Documentation](./API_DOCUMENTATION.md)
- [Project README](./README.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

---

*Keep this reference handy for quick development! 🚀*