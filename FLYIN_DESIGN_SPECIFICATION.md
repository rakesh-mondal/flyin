# Flyin - Design System Specification

## Table of Contents
1. [Typography Scale](#typography-scale)
2. [Spacing System](#spacing-system)
3. [Color Palette](#color-palette)
4. [Layout Specifications](#layout-specifications)
5. [Component Specifications](#component-specifications)
6. [Responsive Design](#responsive-design)
7. [Animation & Interactions](#animation--interactions)

---

## Typography Scale

### Font Families

#### Primary Font Stack
```css
font-family: 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'
```

#### Display Font Stack
```css
font-family: 'Special Gothic Condensed One', 'sans-serif'
```

### Font Weights
- **Plus Jakarta Sans**: 200-800 weight range available
- **Common weights used**:
  - `font-light` (300)
  - `font-normal` (400)
  - `font-medium` (500)
  - `font-semibold` (600)
  - `font-bold` (700)

### Text Sizes

#### Base Scale (Tailwind CSS)
| Class | Size | Usage |
|-------|------|--------|
| `text-xs` | 0.75rem (12px) | Labels, captions, metadata |
| `text-sm` | 0.875rem (14px) | Body text, form inputs |
| `text-base` | 1rem (16px) | Default body text |
| `text-lg` | 1.125rem (18px) | Large body text |
| `text-xl` | 1.25rem (20px) | Small headings |
| `text-2xl` | 1.5rem (24px) | Medium headings |
| `text-3xl` | 1.875rem (30px) | Large headings |
| `text-4xl` | 2.25rem (36px) | Hero headings |
| `text-5xl` | 3rem (48px) | Display headings |
| `text-6xl` | 3.75rem (60px) | Large display headings |

#### Responsive Typography Examples
```css
/* Hero heading - responsive scaling */
text-3xl sm:text-4xl md:text-5xl lg:text-6xl

/* Sub-heading */
text-base sm:text-lg md:text-xl

/* Body text with responsive sizing */
text-sm md:text-base
```

### Heading Hierarchy

#### H1 - Hero/Page Titles
```css
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
```

#### H2 - Section Headings
```css
className="text-lg sm:text-xl font-medium"
```

#### H3 - Card Titles
```css
className="text-2xl font-semibold leading-none tracking-tight"
```

#### H4 - Subsection Headings
```css
className="text-base sm:text-lg font-medium leading-tight"
```

#### H5 - Alert/Modal Titles
```css
className="mb-1 font-medium leading-none tracking-tight"
```

### Line Height
- Default: 1.5-1.6 for optimal readability
- Tight: `leading-tight` for headings
- None: `leading-none` for compact titles

---

## Spacing System

### Base Spacing Scale (Tailwind CSS)
| Value | Pixels | Usage |
|-------|--------|--------|
| `0.5` | 2px | Fine adjustments |
| `1` | 4px | Very tight spacing |
| `1.5` | 6px | Tight spacing |
| `2` | 8px | Small spacing |
| `3` | 12px | Medium spacing |
| `4` | 16px | Large spacing |
| `5` | 20px | Extra large spacing |
| `6` | 24px | Section spacing |
| `8` | 32px | Major section spacing |
| `12` | 48px | Large section spacing |

### Common Spacing Patterns

#### Component Internal Spacing
```css
/* Card padding */
p-6                /* 24px all sides */
p-4                /* 16px all sides */
p-3                /* 12px all sides */

/* Asymmetric padding */
px-3 py-2          /* 12px horizontal, 8px vertical */
px-4 py-2          /* 16px horizontal, 8px vertical */
px-5 py-3          /* 20px horizontal, 12px vertical */
```

#### Gap Values (Flexbox/Grid)
```css
/* Common gap values */
gap-1              /* 4px */
gap-2              /* 8px */
gap-3              /* 12px */
gap-4              /* 16px */
space-x-2          /* 8px horizontal between children */
space-y-1.5        /* 6px vertical between children */
```

#### Margin Patterns
```css
/* Common margins */
mb-1               /* 4px bottom */
mb-2               /* 8px bottom */
mb-4               /* 16px bottom */
mb-6               /* 24px bottom */
mt-8               /* 32px top */
mt-12              /* 48px top */
```

### Form Spacing Patterns
```css
/* Form field spacing */
space-y-4          /* 16px vertical spacing between fields */
gap-3              /* 12px for form grids */
mb-3               /* 12px for section spacing */
```

---

## Color Palette

### CSS Custom Properties (HSL Format)

#### Primary Colors
```css
--primary: 215 70% 33%;              /* #2A5298 - Main brand blue */
--primary-foreground: 0 0% 100%;     /* White text on primary */
--primary-hover: 45 99% 59%;         /* #FFD700 - Gold hover state */
```

#### Neutral Colors
```css
--background: 0 0% 100%;             /* #FFFFFF - White background */
--foreground: 0 0% 12%;              /* #1F1F1F - Dark text */
--muted: 0 0% 96%;                   /* #F5F5F5 - Light gray */
--muted-foreground: 0 0% 45%;        /* #737373 - Medium gray text */
--border: 0 0% 90%;                  /* #E5E5E5 - Border gray */
--input: 0 0% 90%;                   /* #E5E5E5 - Input border */
```

#### Semantic Colors
```css
--destructive: 0 84% 60%;            /* #F56565 - Error red */
--destructive-foreground: 0 0% 100%; /* White text on destructive */
--ring: 211 100% 45%;                /* #0073E6 - Focus ring blue */
```

#### Secondary Colors
```css
--secondary: 0 0% 96%;               /* #F5F5F5 - Light gray background */
--secondary-foreground: 0 0% 12%;    /* Dark text on secondary */
--accent: 0 0% 96%;                  /* Light gray accent */
--accent-foreground: 0 0% 12%;       /* Dark text on accent */
```

#### Card Colors
```css
--card: 0 0% 100%;                   /* White card background */
--card-foreground: 0 0% 12%;         /* Dark text on cards */
--popover: 0 0% 100%;                /* White popover background */
--popover-foreground: 0 0% 12%;      /* Dark text on popovers */
```

### Apple-Inspired Colors
```css
--apple-gray: #f5f5f7;               /* Apple-inspired light gray */
--apple-blue: #0071e3;               /* Apple blue */
--apple-black: #1d1d1f;              /* Apple black */
--apple-white: #ffffff;              /* Pure white */
```

### Dark Mode Support
```css
.dark {
  --background: 0 0% 11%;            /* #1C1C1C - Dark background */
  --foreground: 0 0% 96%;            /* #F5F5F5 - Light text */
  --primary: 211 100% 60%;           /* Brighter blue for dark mode */
  --card: 0 0% 11%;                  /* Dark card background */
  --border: 0 0% 20%;                /* Dark border */
  --muted: 0 0% 15%;                 /* Dark muted background */
  --muted-foreground: 0 0% 65%;      /* Medium gray text in dark mode */
}
```

### Brand-Specific Colors

#### Search Button Colors
```css
background-color: #2A5298;           /* Primary blue */
hover: #FFD700;                      /* Gold hover state */
hover icon: #0894FF;                 /* Light blue icon on hover */
```

#### Toast Notifications
```css
background: #222;                    /* Dark background */
color: #fff;                         /* White text */
border: 1px solid #194E91;           /* Dark blue border */
```

---

## Layout Specifications

### Container System
```css
.container {
  center: true;
  padding: 2rem;                     /* 32px horizontal padding */
  max-width: 1400px;                 /* On 2xl screens */
}
```

### Responsive Breakpoints
| Breakpoint | Min Width | Usage |
|------------|-----------|--------|
| `sm` | 640px | Small tablets/large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Laptops |
| `2xl` | 1536px | Large screens |

### Grid Systems

#### Common Grid Patterns
```css
/* Responsive grid - 1 to 3 columns */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Form grids */
grid-cols-1 md:grid-cols-3 gap-3

/* Card grids with responsive columns */
grid-cols-2 md:grid-cols-4
```

#### Layout Examples
```css
/* Flight search form layout */
flex w-full flex-col lg:flex-row      /* Stack on mobile, row on large screens */

/* Content with sidebar */
w-full lg:w-96                         /* Full width mobile, fixed sidebar desktop */

/* Centered content */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 /* Responsive centered container */
```

### Border Radius System
```css
--radius: 0.5rem;                    /* 8px - Base radius */

/* Calculated values */
border-radius: var(--radius);        /* lg - 8px */
border-radius: calc(var(--radius) - 2px); /* md - 6px */
border-radius: calc(var(--radius) - 4px); /* sm - 4px */

/* Common classes */
rounded-sm         /* 2px */
rounded-md         /* 6px */
rounded-lg         /* 8px */
rounded-xl         /* 12px */
rounded-2xl        /* 16px */
rounded-3xl        /* 24px */
rounded-full       /* 50% */
```

---

## Component Specifications

### Button Component

#### Base Button Classes
```css
/* Base button styling */
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
```

#### Button Variants
```css
/* Default */
bg-primary text-primary-foreground hover:bg-primary/90

/* Destructive */
bg-destructive text-destructive-foreground hover:bg-destructive/90

/* Outline */
border border-input bg-background hover:bg-accent hover:text-accent-foreground

/* Secondary */
bg-secondary text-secondary-foreground hover:bg-secondary/80

/* Ghost */
hover:bg-accent hover:text-accent-foreground

/* Link */
text-primary underline-offset-4 hover:underline

/* Search Button (Special) */
bg-[#2A5298] text-white hover:bg-[#FFD700] hover:[&_svg]:text-[#0894FF] rounded-full
```

#### Button Sizes
```css
/* Default */
h-10 px-4 py-2

/* Small */
h-9 rounded-md px-3

/* Large */
h-11 rounded-md px-8

/* Icon */
h-10 w-10
```

### Input Component

#### Base Input Styling
```css
flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
```

#### Input Variants
- **Height**: `h-10` (40px) standard
- **Compact**: `h-8` (32px) for forms
- **Padding**: `px-3 py-2` (12px horizontal, 8px vertical)
- **Border radius**: `rounded-md` (6px)

### Card Component

#### Base Card Styling
```css
rounded-lg border bg-card text-card-foreground shadow-sm
```

#### Card Structure
```css
/* Card Header */
flex flex-col space-y-1.5 p-6

/* Card Title */
text-2xl font-semibold leading-none tracking-tight

/* Card Description */
text-sm text-muted-foreground

/* Card Content */
p-6 pt-0

/* Card Footer */
flex items-center p-6 pt-0
```

### Badge Component
```css
/* Base badge */
inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2

/* Status badge example */
bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800
```

### Form Component Patterns

#### Form Field Spacing
```css
/* Form grid */
grid grid-cols-1 md:grid-cols-3 gap-3

/* Field labels */
text-xs font-medium text-gray-700 mb-1

/* Field containers */
mb-3                  /* 12px bottom margin */
```

#### Form Buttons
```css
/* Save button */
px-3 py-1.5 bg-[#194a8f] text-white text-xs font-medium rounded-md hover:bg-[#143a7a]

/* Cancel button */
px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50
```

---

## Responsive Design

### Mobile-First Approach
The design system follows a mobile-first responsive approach with progressive enhancement for larger screens.

#### Common Responsive Patterns
```css
/* Typography */
text-2xl md:text-3xl lg:text-4xl

/* Spacing */
px-4 sm:px-6 lg:px-8
py-4 sm:py-6 lg:py-8

/* Layout */
flex-col lg:flex-row
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Sizing */
w-full lg:w-96
h-32 sm:h-40
```

#### Responsive Component Sizes
```css
/* Icons */
h-6 sm:h-8 w-6 sm:w-8

/* Cards */
w-56 sm:w-64         /* Card width */
h-32 sm:h-40         /* Card height */

/* Padding responsive */
p-3 sm:p-4           /* 12px to 16px */
px-2 sm:px-2.5       /* 8px to 10px */
```

---

## Animation & Interactions

### Custom Keyframes
```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes slide-up {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

### Animation Classes
```css
/* Custom animations */
animate-fade-in      /* fade-in 0.5s ease-out */
animate-fade-out     /* fade-out 0.5s ease-out */
animate-slide-up     /* slide-up 0.3s ease-out */
animate-accordion-down /* accordion-down 0.2s ease-out */
animate-accordion-up /* accordion-up 0.2s ease-out */
```

### Transition Utilities
```css
/* Apple-inspired transitions */
apple-transition     /* transition-all duration-300 ease-out */

/* Common transitions */
transition-colors    /* Color transitions */
transition-transform /* Transform transitions */
transition-opacity   /* Opacity transitions */
```

### Hover Effects
```css
/* Scale on hover */
hover:scale-[1.02]

/* Background changes */
hover:bg-gray-50
hover:bg-primary-hover

/* Transform effects */
hover:translate-y-[-3px]
```

### Custom Effects
```css
/* Apple blur effect */
apple-blur {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Glass effect */
glass-effect {
  @apply bg-white/70 dark:bg-black/70 apple-blur;
}

/* Text balance */
text-balance {
  text-wrap: balance;
}
```

---

## Implementation Notes

### CSS Architecture
- Uses Tailwind CSS as the primary styling framework
- CSS custom properties for theme variables in HSL format
- Supports automatic dark/light mode switching
- Uses `@layer` directives for organized CSS structure

### Component Patterns
- Components built with shadcn/ui as base
- Uses `class-variance-authority` (CVA) for variant management
- Consistent use of `cn()` utility for conditional classes
- Forward refs for all interactive components

### Accessibility
- Proper focus states with ring utilities
- ARIA labels and roles implemented
- Keyboard navigation support
- Color contrast meets WCAG guidelines

### Performance
- Optimized font loading with `font-display: swap`
- Efficient CSS with Tailwind's purge system
- Minimal custom CSS for better maintainability
- Progressive enhancement for animations 