# Ghulam Haider - Portfolio

A modern, performant single-page portfolio built with Astro, featuring an 80s arcade aesthetic with custom scroll-driven animations, horizontal panel navigation, and comprehensive accessibility support.

**Live Site:** [ghulamhaiderdev.github.io](https://ghulamhaiderdev.github.io)

## Technical Highlights

This portfolio demonstrates proficiency in:

- **Modern Frontend Architecture** - Astro 5 with islands architecture, React 19 for interactive components, TypeScript throughout
- **Custom Animation Systems** - Scroll-driven horizontal panels with CSS sticky positioning, preview movement feedback, touch swipe gestures
- **Performance Optimization** - Zero-dependency horizontal scroll (no GSAP for core navigation), lazy loading, critical CSS inlining
- **Accessibility-First Design** - Three contrast modes, animations toggle, keyboard navigation, screen reader support
- **Mobile-First Responsive** - Touch swipe support, progressive enhancement, breakpoint-specific optimizations
- **Backend Integration** - Secure contact form with reCAPTCHA v3, rate limiting, and Resend API integration
- **Clean Code Practices** - Modular TypeScript utilities, shared scroll/reveal patterns, separation of concerns

## Tech Stack

### Core Framework
- **[Astro 5](https://astro.build)** - Static site generation with islands architecture for optimal performance
- **[React 19](https://react.dev)** - Interactive components via Astro's React integration
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development

### Styling & Animation
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS with custom theme configuration
- **Custom Scroll-Driven Animations** - CSS sticky + transform-based horizontal scroll with no heavy dependencies
- **Touch Swipe Support** - Native touch gesture handling for mobile horizontal navigation
- **Sound Effects** - Audio feedback for panel snaps and card reveals (user-controllable)
- **Custom CSS Animations** - Floating geometric shapes, drift effects, wobble animations
- **Arcade Carpet Theme** - 80s-inspired neon color palette with teal accent (#22CBCC) for headings, buttons, and highlights

### SEO
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Automatic sitemap generation
- **JSON-LD Structured Data** - Schema.org markup for Person and WebSite
- **Open Graph & Twitter Cards** - Rich social media previews
- **Semantic Heading Structure** - Proper h1-h3 hierarchy for document outline

### Performance
- **[astro-compress](https://github.com/astro-community/astro-compress)** - HTML, CSS, JS, and SVG minification
- **[Sharp](https://sharp.pixelplumbing.com)** - Image optimization
- **Critical CSS Inlining** - Fastest possible First Contentful Paint
- **Font Loading Strategy** - `display=optional` to prevent layout shift

## Features

### Animations & Interactions

#### Hero Section
- **Above-the-Fold Content**: Hero includes name, bio, location, availability, and CTA buttons in a glass container
- **Mascot Positioning**: On desktop (768px+), mascot overlaps the content container from the left with responsive sizing; on mobile, mascot appears centered behind content
- **Responsive Breakpoints**: Multiple breakpoints adjust mascot position and text layout for optimal viewing on all devices
- **4K Scaling**: Glowing orbs double in size and blur on screens above 2000px for consistent visual impact
- **Navigation Hint**: Scroll indicator shows both mouse scroll icon and animated spacebar key to indicate navigation options

#### Section Titles (Scroll-Driven)
- **Wave Animation**: Letters scale up as a "wave" passes through based on scroll position
- **Sheen Effect**: Brightness sweep follows the wave animation
- **Scroll-Driven Typewriter**: Subtitle types/untypes based on scroll position
- **Bidirectional**: Animations progress forward when scrolling down, reverse when scrolling up

#### Horizontal Scroll Sections (Offer, Projects, Experience)
All three horizontal scroll sections use a custom CSS sticky + transform system for smooth panel navigation:
- **CSS Sticky Container**: Section pins in viewport while vertical scroll drives horizontal panel movement
- **Scroll Preview Movement**: Panels shift in scroll direction for visual feedback before snapping
- **Snap-to-Panel**: Automatic snap with eased transition when crossing panel thresholds
- **Touch Swipe Support**: Horizontal swipe gestures navigate between panels on mobile
- **Sound Effects**: Audio feedback on panel transitions
- **Timeline Progress Bar** (Experience): Neon gradient progress bar fills as you scroll through cards

### Security Measures

#### Contact Info Obfuscation
Email and phone are stored reversed and reconstructed at runtime to prevent bot scraping.

#### Contact Form Protection
Multi-layered spam prevention:
- **reCAPTCHA v3** - Invisible bot detection with score-based validation
- **IP Rate Limiting** - 5 submissions per hour per IP address
- **Honeypot Field** - Hidden field that bots fill but humans never see
- **Timing Analysis** - Rejects submissions under 3 seconds
- **Resend API Integration** - Secure and reliable email delivery

### GitHub Integration
- **Contribution Heatmap**: Live contribution heatmap via GitHub GraphQL API
- **Recent Repositories**: Dynamically fetched repository cards with fly-in animations
- **Visual Feedback**: Active tiles randomly shimmer; inactive tiles subtly pulse

## Project Structure

```
src/
├── components/
│   ├── common/          # Header, Footer, ArcadeDecorations, ThemeToggle
│   ├── contact/         # Contact form (React)
│   ├── github/          # GitHub heatmap (React)
│   ├── hero/            # Hero section with animations
│   ├── sections/        # About, Experience, Projects, Contact
│   └── ui/              # Reusable UI components
├── data/
│   ├── experience.ts    # Work history & education
│   ├── profile.ts       # Personal info & contact (obfuscated)
│   ├── projects.ts      # Featured projects
│   └── skills.ts        # Technical skills & services
├── layouts/
│   └── BaseLayout.astro # Main layout with SEO
├── lib/
│   ├── contact.ts          # Email/phone unscrambling utilities
│   ├── scroll-reveal.ts    # Shared scroll-triggered reveal animations
│   ├── sounds.ts           # Sound effect utilities
│   └── theme.ts            # Theme & animations state management
├── pages/
│   ├── api/             # Server endpoints (contact form)
│   └── index.astro      # Single-page portfolio
└── styles/
    ├── global.css              # Theme & animations
    ├── high-contrast.css       # High contrast dark mode styles
    └── high-contrast-light.css # High contrast light mode styles
```

## Design Philosophy

### Visual Theme
The design draws inspiration from 80s arcade carpet patterns, featuring:
- Deep purple/black backgrounds (`#0a0015`)
- Teal accent color (`#22CBCC`) for highlights and navigation
- Neon accent colors for decorations
- Floating geometric shapes and glassmorphism cards

### Accessibility
- **High Contrast Modes**: Normal, High Contrast Dark, and High Contrast Light options
- **Animations Toggle**: Global switch to disable all decorative animations
- **Keyboard Navigation**: Spacebar snapping and full keyboard support
- **Semantic HTML**: Proper structure for screen readers

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions.

### Workflow
The deployment process is defined in `.github/workflows/deploy.yml`:
1. **Build**: Astro project is built into static files
2. **Deploy**: Static files are pushed to the `gh-pages` branch

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

```env
# GitHub API (for contribution heatmap)
GITHUB_TOKEN=ghp_xxx

# reCAPTCHA v3
PUBLIC_RECAPTCHA_SITE_KEY=6Lxxx
RECAPTCHA_SECRET=6Lxxx

# Resend API (email delivery)
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=your-email@example.com
```

## License

This project is open source and available for reference.

---

Built with Astro, TypeScript, and attention to detail by **Ghulam Haider**.
rchitecture with clear separation of concerns
- Reusable utility functions and shared patterns
- Consistent naming conventions and code organization

**User Experience**
- Progressive enhancement (graceful degradation on small screens)
- Comprehensive accessibility (contrast modes, keyboard nav, screen readers)
- Visual feedback systems (preview movement, sound effects)
- Mobile-first responsive design with touch support

**Technical Decision-Making**
- Replaced GSAP dependency with custom CSS sticky + transform solution
- Extracted shared scroll/reveal patterns to reduce code duplication
- Implemented snap lockout to prevent animation conflicts
- Balanced visual polish with performance considerations

### Key Files to Review 
- `src/lib/about-scroll.ts` - Core horizontal scroll implementation
- `src/lib/touch-swipe.ts` - Clean touch gesture detection
- `src/lib/sounds.ts` - Audio utility with factory pattern
- `src/components/sections/ProjectsSection.astro` - Complex component example

## License

This project is open source and available for reference. Feel free to use it as inspiration for your own portfolio.

---

Built with Astro, TypeScript, and attention to detail.
