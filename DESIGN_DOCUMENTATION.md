# Flyin - Frontend Design Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Design System](#design-system)
5. [File Structure](#file-structure)
6. [Component Library](#component-library)
7. [Styling Guidelines](#styling-guidelines)
8. [Development Workflow](#development-workflow)
9. [Testing Strategy](#testing-strategy)
10. [Performance Guidelines](#performance-guidelines)
11. [Accessibility Standards](#accessibility-standards)
12. [Deployment Guidelines](#deployment-guidelines)

---

## Project Overview

**Flyin** is a modern travel booking application built with React and TypeScript. The application provides users with flight search, booking, payment processing, and trip curation features with a focus on user experience and performance.

### Key Features
- Flight search and booking
- Trip curation and recommendations
- Payment processing
- User profile management
- Responsive design with dark/light mode support
- Internationalization (i18n) support

---

## Technology Stack

### Core Technologies
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.11
- **Component Library**: shadcn/ui + Radix UI
- **State Management**: Redux Toolkit 2.8.2 + React Query 5.56.2
- **Routing**: React Router DOM 6.26.2

### UI & Animation
- **Icons**: Lucide React 0.462.0 + Heroicons 2.2.0
- **Animation**: Framer Motion 12.10.5
- **Charts**: Recharts 2.12.7
- **Maps**: React Leaflet 4.2.1
- **Notifications**: Sonner 1.5.0

### Development Tools
- **Testing**: Jest 29.7.0 + Cypress 14.3.3 + Testing Library
- **Storybook**: 8.6.14
- **Linting**: ESLint 9.9.0
- **Type Checking**: TypeScript
- **Visual Testing**: Percy CLI

### Form & Validation
- **Forms**: React Hook Form 7.53.0
- **Validation**: Zod 3.23.8
- **Date Handling**: date-fns 3.6.0

---

## Architecture Overview

### Application Structure
```
src/
├── app/                    # App-level configuration
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── Booking/           # Booking-specific components
│   ├── Payment/           # Payment-specific components
│   ├── TripCuration/      # Trip curation components
│   └── trip-detail/       # Trip detail components
├── context/               # React context providers
├── data/                  # Static data and constants
├── features/              # Feature-based modules
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── pages/                 # Page components (routes)
├── services/              # API services and external integrations
├── stories/               # Storybook stories
├── styles/                # Global styles and themes
├── testing/               # Testing utilities
└── utils/                 # Utility functions
```

### Routing Structure
```
/                          # Home page (Index)
/search                    # Flight search page
/curation                  # Trip curation page
/booking                   # Booking page
/payment                   # Payment page
/payment-confirmation      # Payment confirmation page
```

---

## Design System

### Color Palette

#### CSS Custom Properties
The design system uses CSS custom properties for consistent theming:

```css
:root {
  /* Primary Colors */
  --primary: 215 70% 33%;           /* #2A5298 - Main brand blue */
  --primary-foreground: 0 0% 100%;  /* White text on primary */
  --primary-hover: 45 99% 59%;      /* #FFD700 - Gold hover state */
  
  /* Neutral Colors */
  --background: 0 0% 100%;          /* White background */
  --foreground: 0 0% 12%;           /* Dark text */
  --muted: 0 0% 96%;                /* Light gray */
  --muted-foreground: 0 0% 45%;     /* Medium gray text */
  
  /* Semantic Colors */
  --destructive: 0 84% 60%;         /* Error red */
  --border: 0 0% 90%;               /* Border gray */
  --input: 0 0% 90%;                /* Input border */
  --ring: 211 100% 45%;             /* Focus ring blue */
}
```

#### Brand Colors
```css
.apple {
  --gray: #f5f5f7;    /* Apple-inspired gray */
  --blue: #0071e3;    /* Apple blue */
  --black: #1d1d1f;   /* Apple black */
  --white: #ffffff;   /* Pure white */
}
```

#### Dark Mode Support
The application supports dark mode with automatic theme switching:

```css
.dark {
  --background: 0 0% 11%;           /* Dark background */
  --foreground: 0 0% 96%;           /* Light text */
  --primary: 211 100% 60%;          /* Brighter blue for dark mode */
  --card: 0 0% 11%;                 /* Dark card background */
  --border: 0 0% 20%;               /* Dark border */
}
```

### Typography

#### Font Families
```css
font-family: {
  sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
  display: ['Special Gothic Condensed One', 'sans-serif'],
}
```

#### Font Weights & Sizes
- **Plus Jakarta Sans**: 200-800 weight range
- **Responsive scaling**: Uses Tailwind's responsive typography
- **Line height**: Optimized for readability (1.5-1.6)

### Spacing & Layout

#### Container System
```css
.container {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1400px'  /* Max width for large screens */
  }
}
```

#### Border Radius
```css
--radius: 0.5rem;              /* Base radius */
border-radius: {
  lg: 'var(--radius)',         /* 8px */
  md: 'calc(var(--radius) - 2px)', /* 6px */
  sm: 'calc(var(--radius) - 4px)'  /* 4px */
}
```

### Animation System

#### Custom Keyframes
```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slide-up {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
```

#### Animation Classes
```css
.animation {
  'fade-in': 'fade-in 0.5s ease-out',
  'slide-up': 'slide-up 0.3s ease-out',
  'accordion-down': 'accordion-down 0.2s ease-out',
}
```

---

## File Structure

### Detailed Directory Breakdown

#### `/src/components/`
```
components/
├── ui/                           # Base UI components (shadcn/ui)
│   ├── button.tsx               # Button component with variants
│   ├── card.tsx                 # Card container component
│   ├── dialog.tsx               # Modal dialog component
│   ├── form.tsx                 # Form components with validation
│   ├── input.tsx                # Input field component
│   ├── select.tsx               # Select dropdown component
│   ├── table.tsx                # Data table component
│   ├── tabs.tsx                 # Tab navigation component
│   ├── toast.tsx                # Toast notification component
│   └── ...                      # Other base UI components
├── Booking/                      # Booking feature components
├── Payment/                      # Payment processing components
├── TripCuration/                 # Trip curation components
├── trip-detail/                  # Trip detail view components
├── FlightSearchForm.tsx          # Main flight search component
├── TravelCanvas.tsx              # Interactive travel visualization
├── Navigation.tsx                # Main navigation component
├── Profile.tsx                   # User profile component
├── MyTrips.tsx                   # User trips management
└── SuggestionCard.tsx            # Trip suggestion card
```

#### `/src/pages/`
```
pages/
├── Index.tsx                     # Home page
├── Search.tsx                    # Flight search page
├── Booking.tsx                   # Booking page
├── Payment.tsx                   # Payment page
├── PaymentConfirmation.tsx       # Payment confirmation
├── Curation.tsx                  # Trip curation page
└── NotFound.tsx                  # 404 error page
```

#### `/src/styles/`
```
styles/
├── globals.css                   # Global styles and CSS variables
├── components.css                # Component-specific styles
└── utilities.css                 # Utility classes
```

#### `/src/lib/`
```
lib/
├── utils.ts                      # Utility functions
├── cn.ts                         # Class name utility (clsx + tailwind-merge)
├── validations.ts                # Zod validation schemas
└── constants.ts                  # Application constants
```

---

## Component Library

### Base UI Components (shadcn/ui)

#### Button Component
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Usage
<Button variant="default" size="lg">
  Search Flights
</Button>
```

#### Card Component
```typescript
interface CardProps {
  className?: string
  children: React.ReactNode
}

// Usage
<Card>
  <CardHeader>
    <CardTitle>Flight Details</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Flight information...</p>
  </CardContent>
</Card>
```

#### Form Components
```typescript
// Form with validation
<Form {...form}>
  <FormField
    control={form.control}
    name="departure"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Departure City</FormLabel>
        <FormControl>
          <Input placeholder="Enter departure city" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### Feature Components

#### FlightSearchForm
- **Purpose**: Main flight search interface
- **Props**: Search parameters, onSubmit callback
- **Features**: Date selection, city autocomplete, passenger count
- **File**: `src/components/FlightSearchForm.tsx`

#### TravelCanvas
- **Purpose**: Interactive travel visualization
- **Props**: Trip data, interaction handlers
- **Features**: Map integration, route visualization
- **File**: `src/components/TravelCanvas.tsx`

#### Navigation
- **Purpose**: Main application navigation
- **Props**: Current route, user authentication state
- **Features**: Responsive design, mobile menu
- **File**: `src/components/Navigation.tsx`

### Component Naming Conventions

1. **PascalCase** for component names
2. **camelCase** for props and functions
3. **kebab-case** for CSS classes
4. **UPPER_CASE** for constants

```typescript
// ✅ Good
const FlightSearchForm = ({ onSubmit, initialValues }: FlightSearchFormProps) => {
  const handleFormSubmit = (data: FormData) => {
    // Handle submission
  }
  
  return (
    <div className="flight-search-form">
      {/* Component content */}
    </div>
  )
}

// ❌ Bad
const flightSearchForm = ({ OnSubmit, initial_values }) => {
  // Component implementation
}
```

---

## Styling Guidelines

### Tailwind CSS Usage

#### Utility-First Approach
```typescript
// ✅ Preferred: Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Flight Details</h2>
  <Button className="bg-primary hover:bg-primary-hover">Book Now</Button>
</div>

// ✅ Acceptable: Component classes for complex patterns
<div className="flight-card">
  {/* Content */}
</div>
```

#### Responsive Design
```typescript
// Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

// Responsive text sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Find Your Perfect Flight
</h1>
```

#### Custom Utility Classes
```css
/* Apple-inspired effects */
.apple-blur {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.glass-effect {
  @apply bg-white/70 dark:bg-black/70 apple-blur;
}

.apple-transition {
  @apply transition-all duration-300 ease-out;
}

/* Text utilities */
.text-balance {
  text-wrap: balance;
}
```

### CSS Custom Properties

#### Theme Variables
```css
:root {
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### Component-Specific Styles

#### Search Button Styling
```css
.search-button {
  background-color: #2A5298 !important;
  color: white !important;
  transition: background-color 0.3s ease !important;
}

.search-button:hover {
  background-color: #FFD700 !important;
}

.search-button svg {
  color: white !important;
  transition: color 0.3s ease !important;
}

.search-button:hover svg {
  color: #0894FF !important;
}
```

#### Toast Notifications
```css
.custom-toast-light {
  background: #222 !important;
  color: #fff !important;
  border: 1px solid #194E91 !important;
}
```

---

## Development Workflow

### Component Development Process

1. **Create Component Structure**
   ```typescript
   // components/NewComponent.tsx
   import { cn } from "@/lib/utils"
   
   interface NewComponentProps {
     className?: string
     children?: React.ReactNode
     // Other props
   }
   
   export const NewComponent = ({ className, children, ...props }: NewComponentProps) => {
     return (
       <div className={cn("base-styles", className)} {...props}>
         {children}
       </div>
     )
   }
   ```

2. **Add Storybook Story**
   ```typescript
   // components/ui/new-component.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import { NewComponent } from './new-component'
   
   const meta: Meta<typeof NewComponent> = {
     title: 'UI/NewComponent',
     component: NewComponent,
     parameters: {
       layout: 'centered',
     },
   }
   
   export default meta
   type Story = StoryObj<typeof meta>
   
   export const Default: Story = {
     args: {
       children: 'Component content',
     },
   }
   ```

3. **Write Tests**
   ```typescript
   // components/__tests__/NewComponent.test.tsx
   import { render, screen } from '@testing-library/react'
   import { NewComponent } from '../NewComponent'
   
   describe('NewComponent', () => {
     it('renders correctly', () => {
       render(<NewComponent>Test content</NewComponent>)
       expect(screen.getByText('Test content')).toBeInTheDocument()
     })
   })
   ```

### Code Style Guidelines

#### TypeScript Best Practices
```typescript
// ✅ Use proper typing
interface User {
  id: string
  name: string
  email: string
}

// ✅ Use const assertions for immutable data
const FLIGHT_STATUSES = ['scheduled', 'delayed', 'cancelled'] as const
type FlightStatus = typeof FLIGHT_STATUSES[number]

// ✅ Use generic types appropriately
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// ✅ Use proper error handling
const fetchFlights = async (): Promise<Flight[]> => {
  try {
    const response = await api.get('/flights')
    return response.data
  } catch (error) {
    console.error('Failed to fetch flights:', error)
    throw new Error('Unable to load flights')
  }
}
```

#### React Best Practices
```typescript
// ✅ Use proper component structure
const FlightCard = memo(({ flight, onSelect }: FlightCardProps) => {
  const handleClick = useCallback(() => {
    onSelect(flight.id)
  }, [flight.id, onSelect])
  
  return (
    <Card onClick={handleClick}>
      {/* Component content */}
    </Card>
  )
})

// ✅ Use custom hooks for logic
const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  
  const searchFlights = useCallback(async (params: SearchParams) => {
    setLoading(true)
    try {
      const results = await flightService.search(params)
      setFlights(results)
    } finally {
      setLoading(false)
    }
  }, [])
  
  return { flights, loading, searchFlights }
}
```

### Git Workflow

#### Branch Naming
- `feature/flight-search-enhancement`
- `bugfix/payment-validation-error`
- `hotfix/critical-booking-issue`
- `chore/update-dependencies`

#### Commit Messages
```
feat(search): add advanced filter options
fix(payment): resolve validation error on card input
docs(readme): update installation instructions
style(button): improve hover state animation
refactor(api): simplify flight search service
test(booking): add unit tests for booking flow
```

---

## Testing Strategy

### Unit Testing with Jest

#### Component Testing
```typescript
// __tests__/FlightCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { FlightCard } from '../FlightCard'

const mockFlight = {
  id: '1',
  airline: 'Test Airlines',
  departure: '2024-01-01T10:00:00Z',
  arrival: '2024-01-01T14:00:00Z',
  price: 299
}

describe('FlightCard', () => {
  it('displays flight information correctly', () => {
    render(<FlightCard flight={mockFlight} onSelect={jest.fn()} />)
    
    expect(screen.getByText('Test Airlines')).toBeInTheDocument()
    expect(screen.getByText('$299')).toBeInTheDocument()
  })
  
  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn()
    render(<FlightCard flight={mockFlight} onSelect={onSelect} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })
})
```

#### Hook Testing
```typescript
// __tests__/useFlightSearch.test.ts
import { renderHook, act } from '@testing-library/react'
import { useFlightSearch } from '../hooks/useFlightSearch'

describe('useFlightSearch', () => {
  it('should search flights', async () => {
    const { result } = renderHook(() => useFlightSearch())
    
    await act(async () => {
      await result.current.searchFlights({
        from: 'NYC',
        to: 'LAX',
        date: '2024-01-01'
      })
    })
    
    expect(result.current.flights).toHaveLength(2)
    expect(result.current.loading).toBe(false)
  })
})
```

### E2E Testing with Cypress

#### Test Structure
```typescript
// cypress/e2e/flight-search.cy.ts
describe('Flight Search', () => {
  beforeEach(() => {
    cy.visit('/search')
  })
  
  it('should search for flights', () => {
    cy.get('[data-testid="departure-input"]').type('New York')
    cy.get('[data-testid="arrival-input"]').type('Los Angeles')
    cy.get('[data-testid="date-picker"]').click()
    cy.get('[data-testid="search-button"]').click()
    
    cy.get('[data-testid="flight-results"]').should('be.visible')
    cy.get('[data-testid="flight-card"]').should('have.length.greaterThan', 0)
  })
})
```

### Visual Testing with Percy

#### Visual Regression Tests
```typescript
// cypress/e2e/visual-regression.cy.ts
describe('Visual Regression Tests', () => {
  it('should match homepage design', () => {
    cy.visit('/')
    cy.percySnapshot('Homepage')
  })
  
  it('should match search results design', () => {
    cy.visit('/search')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="flight-results"]').should('be.visible')
    cy.percySnapshot('Search Results')
  })
})
```

### Storybook Testing

#### Component Stories
```typescript
// components/ui/button.stories.tsx
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'default',
    children: 'Loading...',
    disabled: true,
  },
}
```

---

## Performance Guidelines

### Code Splitting

#### Route-based Splitting
```typescript
// App.tsx
import { lazy, Suspense } from 'react'

const SearchPage = lazy(() => import('./pages/Search'))
const BookingPage = lazy(() => import('./pages/Booking'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Suspense>
  )
}
```

#### Component-based Splitting
```typescript
// Heavy component lazy loading
const HeavyChart = lazy(() => import('./components/HeavyChart'))

const Dashboard = () => {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}
```

### Image Optimization

#### Responsive Images
```typescript
// Responsive image component
const OptimizedImage = ({ src, alt, className }: ImageProps) => {
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet={`${src}?w=800&q=80 1x, ${src}?w=1600&q=80 2x`}
      />
      <img
        src={`${src}?w=400&q=80`}
        srcSet={`${src}?w=400&q=80 1x, ${src}?w=800&q=80 2x`}
        alt={alt}
        className={className}
        loading="lazy"
      />
    </picture>
  )
}
```

### Bundle Optimization

#### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          maps: ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
})
```

### React Query Optimization

#### Caching Strategy
```typescript
// services/flightService.ts
export const useFlights = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['flights', searchParams],
    queryFn: () => fetchFlights(searchParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!searchParams.from && !!searchParams.to,
  })
}
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Semantic HTML
```typescript
// ✅ Good: Semantic structure
<main>
  <section aria-labelledby="search-heading">
    <h1 id="search-heading">Flight Search</h1>
    <form role="search">
      <fieldset>
        <legend>Travel Details</legend>
        <label htmlFor="departure">Departure City</label>
        <input id="departure" type="text" required />
      </fieldset>
    </form>
  </section>
</main>

// ❌ Bad: Non-semantic structure
<div>
  <div>Flight Search</div>
  <div>
    <div>Travel Details</div>
    <div>Departure City</div>
    <div><input type="text" /></div>
  </div>
</div>
```

#### ARIA Labels and Descriptions
```typescript
// Button with accessible label
<Button
  aria-label="Search for flights from New York to Los Angeles"
  aria-describedby="search-help"
>
  Search Flights
</Button>
<div id="search-help" className="sr-only">
  Click to search for available flights with your selected criteria
</div>

// Form with error handling
<Input
  aria-invalid={!!error}
  aria-describedby={error ? "error-message" : undefined}
/>
{error && (
  <div id="error-message" role="alert" className="text-red-600">
    {error}
  </div>
)}
```

#### Keyboard Navigation
```typescript
// Custom dropdown with keyboard support
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(prev + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        if (focusedIndex >= 0) {
          selectOption(options[focusedIndex])
        }
        break
    }
  }
  
  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
    >
      {/* Dropdown implementation */}
    </div>
  )
}
```

#### Focus Management
```typescript
// Modal with focus trap
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()
    }
  }, [isOpen])
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={modalRef}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

### Screen Reader Support

#### Skip Links
```typescript
// Skip navigation for screen readers
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white p-2 rounded"
>
  Skip to main content
</a>
```

#### Live Regions
```typescript
// Announce dynamic content changes
const SearchResults = ({ results, loading }: SearchResultsProps) => {
  return (
    <div>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading ? 'Searching for flights...' : `Found ${results.length} flights`}
      </div>
      <div id="main-content">
        {/* Search results */}
      </div>
    </div>
  )
}
```

---

## Deployment Guidelines

### Build Process

#### Production Build
```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

#### Environment Variables
```bash
# .env.production
VITE_API_URL=https://api.flyin.com
VITE_MAPS_API_KEY=your_maps_api_key
VITE_ANALYTICS_ID=your_analytics_id
```

### Performance Monitoring

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npx depcheck

# Audit for vulnerabilities
npm audit
```

### CDN Configuration

#### Static Asset Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
  },
})
```

---

## Additional Resources

### Documentation Links
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Design Tools
- [Figma Design System](link-to-figma)
- [Color Palette Generator](https://coolors.co/)
- [Typography Scale Calculator](https://type-scale.com/)
- [Accessibility Checker](https://wave.webaim.org/)

### Development Tools
- [Storybook](http://localhost:6006) - Component development
- [Bundle Analyzer](https://bundlephobia.com/) - Package size analysis
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [WebPageTest](https://www.webpagetest.org/) - Performance testing

---

*This documentation is a living document and should be updated as the project evolves. For questions or suggestions, please reach out to the frontend team.* 