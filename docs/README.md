# Yacht Landing Page 🛥️

A premium yacht charter landing page built with Next.js, React, and TypeScript. Features a modern design system, responsive components, and integrated Figma workflow.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Figma API token for design token sync
- (Optional) GitHub Personal Access Token for repository deployment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd yacht-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
yacht-landing/
├── docs/                      # Documentation
│   ├── API_DOCUMENTATION.md   # Complete API reference
│   └── README.md              # This file
├── scripts/                   # Utility scripts
│   ├── figma-sync.mjs         # Figma token synchronization
│   └── github-init-push.mjs   # GitHub repository initialization
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── globals.css        # Global styles & design tokens
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   └── components/            # React components
│       ├── CTA.tsx            # Call-to-action section
│       ├── FeatureGrid.tsx    # Features showcase
│       ├── FleetCarousel.tsx  # Yacht fleet carousel
│       ├── Footer.tsx         # Site footer
│       ├── Hero.tsx           # Hero section
│       └── Navbar.tsx         # Navigation header
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies & scripts
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Design System

### Color Palette

The application uses a sophisticated maritime-inspired color palette:

- **Brand Primary**: Deep Navy (`#102C57`)
- **Brand Secondary**: Ocean Blue (`#135F8D`) 
- **Brand Accent**: Champagne (`#E4CF98`)
- **Brand Muted**: Light Slate (`#CBD5E1`)

### Typography

- **Display Font**: Plus Jakarta Sans (headings)
- **Body Font**: Inter (body text, UI elements)

### Components

All components are fully responsive and follow consistent design patterns:

- **Navbar**: Sticky navigation with mobile menu
- **Hero**: Main landing section with CTA
- **FeatureGrid**: Three-column feature showcase
- **FleetCarousel**: Horizontal yacht showcase
- **CTA**: Booking form section
- **Footer**: Site footer with links

## 🛠️ Available Scripts

### Development

```bash
# Start development server on port 3000
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Design Workflow

```bash
# Sync color tokens from Figma
FIGMA_TOKEN=your_token FIGMA_FILE_KEY=your_file_key npm run figma:sync
```

### Deployment

```bash
# Initialize GitHub repository and push code
GH_TOKEN=your_token npm run repo:init
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment variables:

```env
# Figma Integration (Optional)
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key

# GitHub Integration (Optional)  
GH_TOKEN=your_github_personal_access_token
```

### Figma Integration

The project includes automatic design token synchronization from Figma:

1. Set up a Figma Personal Access Token
2. Get your Figma file key from the URL
3. Run `npm run figma:sync` to pull color tokens
4. Tokens are saved to `src/app/figma-tokens.css`

### GitHub Deployment

Automated repository creation and code push:

1. Create a GitHub Personal Access Token
2. Run the repo initialization script with your details
3. Repository is created and code is pushed automatically

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All components adapt seamlessly across devices with:
- Flexible grid layouts
- Responsive typography scaling
- Touch-friendly mobile navigation
- Optimized images for all screen sizes

## 🎯 Features

### Core Features

- ✅ Responsive design across all devices
- ✅ Modern component architecture
- ✅ TypeScript for type safety
- ✅ Optimized images with Next.js
- ✅ SEO-friendly structure
- ✅ Accessible navigation and forms

### Advanced Features

- ✅ Figma design token synchronization
- ✅ Automated GitHub repository deployment
- ✅ Custom design system with CSS variables
- ✅ Smooth scrolling navigation
- ✅ Glass morphism effects
- ✅ Gradient overlays and backgrounds

### Performance Optimizations

- ✅ Next.js Image optimization
- ✅ Font optimization with `next/font`
- ✅ CSS purging with Tailwind
- ✅ Static generation ready
- ✅ Minimal JavaScript bundle

## 🚢 Component Usage Examples

### Basic Page Layout

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Add more sections */}
      </main>
      <Footer />
    </>
  )
}
```

### Custom Component with Design System

```tsx
export function CustomCard() {
  return (
    <div className="bg-surface-elevated p-6 rounded-xl border border-brand-muted">
      <h3 className="text-brand-primary font-display text-2xl">
        Custom Content
      </h3>
      <p className="text-text-muted mt-2">
        Using the design system colors and typography.
      </p>
    </div>
  )
}
```

## 🔍 API Reference

For detailed API documentation including all component props, utility functions, and configuration options, see:

**[📖 Complete API Documentation](./API_DOCUMENTATION.md)**

The API documentation covers:
- All React components with props and examples
- Utility script functions and parameters  
- Design system tokens and usage
- Configuration options
- Best practices and patterns

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Deploy with automatic builds

### Other Platforms

The application is compatible with:
- Netlify
- AWS Amplify  
- GitHub Pages (with static export)
- Any Node.js hosting provider

### Static Export

For static hosting:

```bash
# Add to next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
}

# Build static version
npm run build
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across devices
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow the existing component patterns
- Maintain responsive design principles
- Use the design system tokens
- Add proper accessibility attributes

### Testing

```bash
# Run type checking
npx tsc --noEmit

# Check for linting issues  
npm run lint

# Test responsive design
# (Manual testing across breakpoints)
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🆘 Support

### Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete reference
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Common Issues

**Build Errors:**
- Ensure Node.js 18+ is installed
- Clear `.next` folder and reinstall dependencies
- Check TypeScript errors with `npx tsc --noEmit`

**Styling Issues:**
- Verify Tailwind classes are correct
- Check CSS custom properties in `globals.css`
- Ensure responsive variants are applied

**Image Loading:**
- Verify image URLs are accessible
- Check Next.js Image component configuration
- Ensure proper alt attributes are provided

### Getting Help

1. Check the API documentation first
2. Review component source code for examples
3. Test with the development server
4. Check browser console for errors

---

**Built with ❤️ for premium yacht charter experiences**

*This README provides a comprehensive overview of the Yacht Landing Page project. For technical implementation details, refer to the [API Documentation](./API_DOCUMENTATION.md).*