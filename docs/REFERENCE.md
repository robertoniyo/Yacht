## Yacht UI — Component and API Reference

This document describes the public components and configuration used in this project, along with usage examples and guidance. All components are written in React (TypeScript) and designed for a Next.js App Router project with Tailwind CSS.

### Prerequisites

- Next.js 14+ with the App Router
- Tailwind CSS configured with the theme in `tailwind.config.ts`
- CSS variables defined in `src/app/globals.css`

---

## Components

All components are exported as default from their files inside `src/components`. They are presentational and currently accept no props. You can copy and adapt them as needed.

### `Navbar`

Responsive top navigation bar with a hamburger toggle on mobile.

Usage:

```tsx
import Navbar from '@/components/Navbar'

export default function Page() {
  return (
    <>
      <Navbar />
      {/* ... */}
    </>
  )
}
```

Notes:
- Declared as a Client Component (`"use client"`).
- Contains a mobile menu controlled by internal state.
- Links anchor to in-page sections: `#fleet`, `#destinations`, `#about`, `#book`.

### `Hero`

Marketing hero section with heading, supporting copy, CTAs, and a feature image.

Usage:

```tsx
import Hero from '@/components/Hero'

<Hero />
```

Notes:
- Uses `next/image` for the main visual.
- Provides two CTAs linking to `#book` and `#fleet`.

### `FeatureGrid`

Three-column grid highlighting key features.

Usage:

```tsx
import FeatureGrid from '@/components/FeatureGrid'

<FeatureGrid />
```

Notes:
- Features are defined inline inside the component.
- Each item contains an icon, title, and description.

### `FleetCarousel`

Horizontally scrolling list of yacht cards.

Usage:

```tsx
import FleetCarousel from '@/components/FleetCarousel'

<FleetCarousel />
```

Notes:
- Uses CSS `grid` with `overflow-x-auto` for scrolling; not a JS slider.
- Prev/Next buttons are presentational; add logic if needed.
- Images use `next/image` and titles/metadata are hard-coded in `cards`.

### `CTA`

Call-to-action section with a short form for itinerary requests.

Usage:

```tsx
import CTA from '@/components/CTA'

<CTA />
```

Notes:
- Includes inputs for name, email, date, and destination.
- Form currently has no submit handler. Add your own action/server route.

### `Footer`

Simple site footer with brand, tagline, and legal links.

Usage:

```tsx
import Footer from '@/components/Footer'

<Footer />
```

---

## App Structure

- `src/app/layout.tsx`: Root layout, sets fonts via `next/font` and applies global classes.
- `src/app/page.tsx`: Home page that composes all components in order.
- `src/app/globals.css`: Tailwind layers, CSS variables, and global utility classes.

Example page composition:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureGrid from '@/components/FeatureGrid'
import FleetCarousel from '@/components/FleetCarousel'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <FleetCarousel />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

---

## Theming and Design Tokens

Tokens are defined as CSS variables in `globals.css` and mapped into Tailwind via `tailwind.config.ts`.

CSS variables (RGB components):

```css
:root {
  --color-brand-primary: 16 44 87;
  --color-brand-secondary: 19 95 141;
  --color-brand-accent: 228 207 152;
  --color-brand-muted: 203 213 225;
  --color-surface: 255 255 255;
  --color-surface-elevated: 245 247 250;
  --color-text: 15 23 42;
  --color-text-muted: 71 85 105;
  --color-text-on-brand: 255 255 255;
}
```

Tailwind extensions (excerpt):

```ts
// tailwind.config.ts
extend: {
  colors: {
    brand: {
      primary: 'rgb(var(--color-brand-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-brand-secondary) / <alpha-value>)',
      accent: 'rgb(var(--color-brand-accent) / <alpha-value>)',
      muted: 'rgb(var(--color-brand-muted) / <alpha-value>)',
    },
    surface: {
      DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
      elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
    },
    text: {
      DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
      muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
      onBrand: 'rgb(var(--color-text-on-brand) / <alpha-value>)',
    },
  },
  fontFamily: {
    display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
    body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
  },
}
```

Typography defaults:

```css
@layer base {
  h1 { @apply font-display text-4xl md:text-6xl tracking-tight; }
  h2 { @apply font-display text-3xl md:text-4xl tracking-tight; }
  h3 { @apply font-display text-2xl md:text-3xl tracking-tight; }
  p { @apply font-body text-base md:text-lg text-text-muted; }
}
```

Container padding utility:

```css
.container-px { @apply px-4 sm:px-6 lg:px-8; }
```

---

## Extending Components (Examples)

While current components have no props, here are patterns to extend them safely.

### Add props to `Navbar`

```tsx
type NavbarProps = { brandName?: string }

export default function Navbar({ brandName = 'Yacht' }: NavbarProps) {
  // ... render brandName instead of the hard-coded label
}
```

### Make `FeatureGrid` dynamic

```tsx
type Feature = { title: string; desc: string; icon?: React.ReactNode }
type FeatureGridProps = { features: Feature[] }

export default function FeatureGrid({ features }: FeatureGridProps) {
  // ... map over props.features
}
```

### Handle `CTA` form submission

```tsx
// Client action example
function submitItinerary(formData: FormData) {
  // post to your API route
}

export default function CTA() {
  return (
    <form action={submitItinerary}>{/* ... */}</form>
  )
}
```

---

## Frequently Used Classes

- `text-brand-primary`, `bg-brand-primary`, `text-text-on-brand`
- `bg-surface`, `bg-surface-elevated`
- `container-px` for horizontal padding on containers

---

## Accessibility Notes

- `Navbar` mobile toggle button includes `aria-label`.
- Ensure color contrast remains AA when adjusting tokens.
- Provide `alt` text for all `Image` components.

---

## License

This documentation covers code under your project’s license. Adapt as required.

