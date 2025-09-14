# Yacht Landing Page - API Documentation

## Overview

This documentation covers all public APIs, functions, and components for the Yacht Landing Page application built with Next.js, React, and TypeScript.

## Table of Contents

- [Components](#components)
- [Utility Scripts](#utility-scripts)
- [Design System](#design-system)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)

---

## Components

### 1. Navbar Component

**Location:** `src/components/Navbar.tsx`

**Description:** Responsive navigation header with mobile menu support.

**Props:** None (stateless component)

**Features:**
- Sticky positioning with backdrop blur
- Mobile hamburger menu
- Smooth scrolling navigation links
- Brand logo linking

**Usage Example:**
```tsx
import Navbar from '@/components/Navbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Rest of your content */}
    </>
  )
}
```

**Styling Classes:**
- `sticky top-0 z-50` - Fixed positioning
- `backdrop-blur` - Glass morphism effect
- `container mx-auto container-px` - Responsive container

---

### 2. Hero Component

**Location:** `src/components/Hero.tsx`

**Description:** Main landing section with hero content and featured image.

**Props:** None

**Features:**
- Responsive grid layout (1 column mobile, 2 columns desktop)
- Call-to-action buttons
- Social proof indicators
- Next.js Image optimization
- Gradient background overlay

**Usage Example:**
```tsx
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  )
}
```

**Content Structure:**
- Main headline with responsive typography
- Descriptive paragraph
- Two CTA buttons (primary and secondary)
- Trust indicators (rating and guest count)
- Hero image with aspect ratio 4:3

---

### 3. FeatureGrid Component

**Location:** `src/components/FeatureGrid.tsx`

**Description:** Three-column feature showcase with icons and descriptions.

**Props:** None

**Features:**
- Responsive grid (1 column mobile, 3 columns desktop)
- SVG icons with consistent styling
- Card-based layout with shadows
- Predefined feature data

**Data Structure:**
```typescript
interface Feature {
  title: string
  desc: string
  icon: JSX.Element
}
```

**Usage Example:**
```tsx
import FeatureGrid from '@/components/FeatureGrid'

export default function FeaturesSection() {
  return <FeatureGrid />
}
```

**Features Included:**
1. **Modern Fleet** - Yacht collection showcase
2. **Bespoke Itineraries** - Custom route planning
3. **Exceptional Crew** - Service quality highlight

---

### 4. FleetCarousel Component

**Location:** `src/components/FleetCarousel.tsx`

**Description:** Horizontal scrolling carousel showcasing yacht fleet.

**Props:** None

**Features:**
- Horizontal scroll with auto-sizing columns
- Responsive card layout
- Next.js Image optimization
- Navigation buttons (desktop only)
- Pricing and specifications display

**Card Data Structure:**
```typescript
interface YachtCard {
  title: string
  img: string
}
```

**Usage Example:**
```tsx
import FleetCarousel from '@/components/FleetCarousel'

export default function FleetSection() {
  return <FleetCarousel />
}
```

**Yacht Information Displayed:**
- Yacht name and type (M/Y = Motor Yacht, S/Y = Sailing Yacht)
- High-quality images from Unsplash
- Specifications (sleeps, cabins, crew)
- Pricing starting from daily rate
- Link to booking section

---

### 5. CTA Component

**Location:** `src/components/CTA.tsx`

**Description:** Call-to-action section with booking form.

**Props:** None

**Features:**
- Two-column responsive layout
- Form with multiple input fields
- Gradient background overlay
- Brand-colored styling

**Form Fields:**
- Name (text input)
- Email (email input)
- Date (date picker)
- Destination (text input)
- Submit button

**Usage Example:**
```tsx
import CTA from '@/components/CTA'

export default function BookingSection() {
  return <CTA />
}
```

**Styling Features:**
- Radial gradient background
- Glass morphism form styling
- Brand primary background
- White text on brand colors

---

### 6. Footer Component

**Location:** `src/components/Footer.tsx`

**Description:** Site footer with branding and navigation links.

**Props:** None

**Features:**
- Responsive flex layout
- Brand information
- Legal/utility navigation
- Hover effects on links

**Usage Example:**
```tsx
import Footer from '@/components/Footer'

export default function Layout() {
  return (
    <>
      {/* Main content */}
      <Footer />
    </>
  )
}
```

**Navigation Links:**
- Privacy Policy
- Terms of Service
- Contact Information

---

## Utility Scripts

### 1. Figma Sync Script

**Location:** `scripts/figma-sync.mjs`

**Description:** Synchronizes color tokens from Figma to CSS variables.

**Environment Variables Required:**
- `FIGMA_TOKEN` - Figma API access token
- `FIGMA_FILE_KEY` - Figma file identifier

**Usage:**
```bash
FIGMA_TOKEN=your_token FIGMA_FILE_KEY=your_file_key npm run figma:sync
```

**Functions:**

#### `applyDotenvIfPresent()`
Loads environment variables from `.env.local` if present.

#### `fetchJson(url)`
**Parameters:**
- `url: string` - API endpoint URL

**Returns:** `Promise<any>` - JSON response

**Usage:**
```javascript
const data = await fetchJson('https://api.figma.com/v1/files/FILE_KEY')
```

#### `rgbFloatTo255({ r, g, b })`
**Parameters:**
- `r: number` - Red value (0-1)
- `g: number` - Green value (0-1) 
- `b: number` - Blue value (0-1)

**Returns:** `string` - RGB values in 0-255 format

**Usage:**
```javascript
const rgb = rgbFloatTo255({ r: 0.5, g: 0.7, b: 0.9 })
// Returns: "128 179 230"
```

#### `kebabCase(name)`
**Parameters:**
- `name: string` - Input string to convert

**Returns:** `string` - Kebab-cased string

**Usage:**
```javascript
const token = kebabCase("Brand Primary Color")
// Returns: "brand-primary-color"
```

#### `extractSolidFill(node)`
**Parameters:**
- `node: object` - Figma node object

**Returns:** `string | null` - RGB color string or null

Recursively searches node tree for solid color fills.

**Output:** Creates `src/app/figma-tokens.css` with CSS custom properties.

---

### 2. GitHub Init Push Script

**Location:** `scripts/github-init-push.mjs`

**Description:** Creates GitHub repository and pushes files using GitHub API.

**Environment Variables Required:**
- `GH_TOKEN` - GitHub Personal Access Token

**Usage:**
```bash
GH_TOKEN=your_token node scripts/github-init-push.mjs owner repo "commit message" "Author Name" "author@email.com"
```

**Parameters:**
1. `owner: string` - GitHub username/organization
2. `repoName: string` - Repository name
3. `commitMessage: string` - Initial commit message (optional)
4. `authorName: string` - Commit author name (optional)
5. `authorEmail: string` - Commit author email (optional)

**Functions:**

#### `github(url, init)`
**Parameters:**
- `url: string` - GitHub API endpoint
- `init: object` - Fetch configuration (optional)

**Returns:** `Promise<Response>` - Fetch response

Wrapper for GitHub API requests with authentication.

#### `walk(dir, baseDir)`
**Parameters:**
- `dir: string` - Directory to scan
- `baseDir: string` - Base directory for relative paths

**Returns:** `Promise<Array<{full: string, rel: string}>>` - File list

Recursively walks directory structure, excluding ignored files/folders.

**Ignored Items:**
- `.git`, `node_modules`, `.next`, `.turbo`, `.vercel`
- `coverage`, `dist`, `build`, `out`
- Environment files (except `.env.example`)

#### `ensureRepo()`
**Returns:** `Promise<object>` - Repository object

Creates repository if it doesn't exist, or fetches existing repository.

#### `createBlobs(files)`
**Parameters:**
- `files: Array<{full: string, rel: string}>` - File objects

**Returns:** `Promise<Array<{path: string, sha: string}>>` - Blob references

Creates Git blob objects for all files.

---

## Design System

### Color Palette

**Location:** `src/app/globals.css` and `tailwind.config.ts`

#### Brand Colors
```css
--color-brand-primary: 16 44 87;    /* Deep navy */
--color-brand-secondary: 19 95 141; /* Ocean blue */
--color-brand-accent: 228 207 152;  /* Champagne */
--color-brand-muted: 203 213 225;   /* Slate-200 */
```

#### Surface Colors
```css
--color-surface: 255 255 255;       /* White */
--color-surface-elevated: 245 247 250; /* Light gray */
```

#### Text Colors
```css
--color-text: 15 23 42;             /* Slate-900 */
--color-text-muted: 71 85 105;      /* Slate-500 */
--color-text-on-brand: 255 255 255; /* White */
```

### Typography

#### Font Families
- **Display Font:** Plus Jakarta Sans (headings)
- **Body Font:** Inter (body text)

#### Heading Styles
```css
h1 { @apply font-display text-4xl md:text-6xl tracking-tight; }
h2 { @apply font-display text-3xl md:text-4xl tracking-tight; }
h3 { @apply font-display text-2xl md:text-3xl tracking-tight; }
p  { @apply font-body text-base md:text-lg text-text-muted; }
```

### Spacing & Layout

#### Container Class
```css
.container-px { @apply px-4 sm:px-6 lg:px-8; }
```

#### Border Radius
- `xl: 24px`
- `lg: 16px`
- `md: 12px`

---

## Configuration

### Next.js Configuration

**Location:** `next.config.mjs`

Basic Next.js configuration for the yacht landing page.

### TypeScript Configuration

**Location:** `tsconfig.json`

Standard Next.js TypeScript configuration with path aliases:
- `@/*` maps to `src/*`

### Tailwind Configuration

**Location:** `tailwind.config.ts`

Extended Tailwind configuration with:
- Custom color system using CSS variables
- Custom font families
- Extended border radius values
- Centered container with padding

### PostCSS Configuration

**Location:** `postcss.config.js`

Standard configuration for Tailwind CSS and Autoprefixer.

---

## Usage Examples

### Complete Page Implementation

```tsx
// src/app/page.tsx
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

### Custom Layout with Components

```tsx
// Custom layout example
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutProps {
  children: ReactNode
}

export default function CustomLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto container-px py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

### Using Design System Colors

```tsx
// Component with brand colors
export function BrandCard() {
  return (
    <div className="bg-brand-primary text-text-on-brand p-6 rounded-lg">
      <h3 className="text-brand-accent">Premium Service</h3>
      <p className="text-brand-muted">Exceptional yacht experiences</p>
    </div>
  )
}
```

### Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Sync Figma tokens (requires environment variables)
npm run figma:sync

# Initialize GitHub repository (requires GH_TOKEN)
npm run repo:init
```

---

## Best Practices

### Component Usage
1. Import components using absolute paths (`@/components/ComponentName`)
2. Use TypeScript for type safety
3. Follow responsive design patterns (mobile-first)
4. Utilize the design system colors and typography

### Styling Guidelines
1. Use Tailwind utility classes
2. Leverage CSS custom properties for colors
3. Apply consistent spacing with container classes
4. Use responsive variants (`md:`, `lg:`) for breakpoints

### Image Optimization
1. Use Next.js `Image` component for all images
2. Specify `alt` attributes for accessibility
3. Use `fill` prop for responsive images
4. Add `priority` for above-the-fold images

### Performance Considerations
1. Components are stateless where possible
2. Images are optimized with Next.js
3. CSS is optimized with Tailwind's purging
4. Fonts are loaded efficiently with `next/font`

---

This documentation provides comprehensive coverage of all public APIs, components, and utilities in the Yacht Landing Page application. For additional support or customization, refer to the individual component files and their implementations.