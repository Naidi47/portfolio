# Portfolio Design Style Guide

## Design Philosophy

### Visual Language
**Modern Glassmorphism with Dark Elegance**: The portfolio embraces the sophisticated glassmorphism trend, combining translucent glass-like elements with a carefully curated dark color palette. This creates depth, visual interest, and a premium feel that immediately communicates technical sophistication and modern design sensibilities.

### Color Palette
**Primary Colors:**
- Deep Space: #0b0f19 (main background)
- Slate Dark: #1e293b (card backgrounds)
- Glass White: rgba(255, 255, 255, 0.05) (glassmorphism effect)
- Accent Blue: #3b82f6 (highlights and CTAs)
- Accent Purple: #8b5cf6 (secondary highlights)

**Text Colors:**
- Pure White: #ffffff (primary text)
- Light Gray: #94a3b8 (secondary text)
- Medium Gray: #64748b (subtle text)

### Typography
**Primary Font**: Inter (modern sans-serif for clean, professional look)
**Secondary Font**: JetBrains Mono (monospace for code/technical elements)
**Hierarchy:**
- H1: 3rem (48px) - Hero titles
- H2: 2.25rem (36px) - Section headers
- H3: 1.5rem (24px) - Card titles
- Body: 1rem (16px) - Regular text
- Small: 0.875rem (14px) - Captions

## Visual Effects

### Used Libraries
- **Anime.js**: Smooth element animations and transitions
- **Typed.js**: Typewriter effect for hero text
- **Splitting.js**: Text animation effects
- **ECharts.js**: Interactive skill visualization charts
- **p5.js**: Background particle effects
- **Pixi.js**: Advanced visual effects
- **Splide.js**: Project image carousels

### Glassmorphism Effects
**Card Styling:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Animation Strategy
**Scroll Animations:**
- Elements fade in with subtle upward motion (20px)
- Staggered delays for card grids (100ms intervals)
- Timeline items slide in from alternating sides
- Skill bars animate width on scroll into view

**Hover Effects:**
- Cards lift with increased shadow and scale (1.02x)
- Buttons glow with accent color on hover
- Social icons rotate and scale on hover
- Project cards tilt slightly (3deg) for depth

### Header Effects
**Background**: Animated particle system using p5.js with floating geometric shapes in deep space theme
**Hero Text**: Typewriter animation with gradient color cycling
**Profile Image**: Subtle glow effect with animated border

### Interactive Elements
**Timeline**: Vertical line with pulsing dots, cards slide in on scroll
**Project Grid**: Masonry layout with hover zoom and overlay details
**Skills Visualization**: Animated radar chart and progress bars
**Navigation**: Smooth scroll with active state indicators

### Responsive Design
**Desktop**: Fixed sidebar (300px) with main content area
**Tablet**: Collapsed sidebar with hamburger menu
**Mobile**: Full-width cards with touch-friendly interactions

### Accessibility Features
- High contrast text (4.5:1 minimum ratio)
- Focus indicators for keyboard navigation
- Reduced motion options for animations
- Screen reader friendly structure

## Component Styling Guidelines

### Sidebar Profile Card
- Fixed position with glassmorphism background
- Rounded profile image with subtle border animation
- Social links with hover scale effects
- Contact information with copy-to-clipboard functionality

### Experience Timeline
- Vertical line with gradient styling
- Pulsing dots for each timeline item
- Cards with alternating left/right alignment
- Smooth slide-in animations on scroll

### Project Showcase
- Grid layout with masonry effect
- Glassmorphism cards with hover lift
- Modal overlays for project details
- Tech stack badges with color coding

### Skills Section
- Interactive radar chart using ECharts
- Animated progress bars for skill levels
- Category filtering with smooth transitions
- Visual proficiency indicators

This design system creates a cohesive, professional portfolio that showcases technical expertise while maintaining visual elegance and modern design standards.