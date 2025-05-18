# Storybook Design System Alignment

This document explains how our Storybook stories align with Flyin's design system, ensuring consistency between documentation and the live application.

## Overview

Our Storybook implementation serves as both documentation and a visual testing platform for UI components. We've carefully ensured that all stories reflect the actual application's design language, including color schemes, typography, spacing, and component patterns.

## Key Design Principles

### 1. Color Scheme

All stories use the official Flyin color palette:
- Primary blue: Used for primary actions and emphasis
- Gray scale: Used for borders, text, and backgrounds with proper hierarchical distinction
- Success green: Used in status indicators, confirmation messages
- Warning/error red: Used for errors, cancellations, and alerts

Example from the Badge component stories:
```jsx
<Badge variant="success" className="bg-green-100 text-green-800 border-green-200">Direct</Badge>
<Badge variant="warning" className="bg-yellow-100 text-yellow-800 border-yellow-200">1 Stop</Badge>
<Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Long Layover</Badge>
```

### 2. Typography

All stories follow the application's typography system:
- Font family: System font stack for consistent cross-platform display
- Font sizes: Standardized sizes (text-sm, text-base, text-lg, etc.)
- Font weights: Consistent weight usage (font-normal, font-medium, font-bold)
- Line heights: Appropriate for readable text

Example from the Card component stories:
```jsx
<h3 className="text-lg font-medium border-b border-gray-200 pb-2">Flight Summary</h3>
<div className="text-gray-600 mt-1">...</div>
```

### 3. Spacing

Consistent spacing using the application's spacing scale:
- Margin/padding follows the Tailwind scale (m-1, p-2, etc.)
- Consistent spacing between related elements
- Proper vertical rhythm

Example from the Accordion component stories:
```jsx
<div className="rich-content text-gray-600">
  <h4 className="font-medium mb-2">Baggage Allowance</h4>
  <ul className="list-disc pl-5 mb-2">...</ul>
  <p className="mt-2">Excess baggage charges: ₹2,000 per kg</p>
</div>
```

### 4. Borders & Shadows

Consistent use of:
- Border radius (rounded-lg, rounded-md)
- Border colors (border-gray-200)
- Shadow styles (shadow-sm, shadow)

Example:
```jsx
<Card className="border-gray-200 p-4 rounded-lg">
```

## Component-Specific Patterns

### Cards

Our Card stories follow these consistent patterns:
- Standardized padding (p-4)
- Consistent border-radius (rounded-lg)
- Standard border color (border-gray-200)
- Semantic section headers with proper typographic hierarchy
- Proper spacing between card sections
- Consistent content layouts for similar card types (flight cards, summary cards)

Example alignment with FlightResultCard and FlightSummary:
- Both use the same border styling
- Both maintain consistent internal padding
- Both use the same typography hierarchy for headers and content
- Both maintain a similar layout structure for related information

### Badges

Badge stories follow consistent patterns for:
- Status indicators (Direct, 1 Stop, 2+ Stops)
- Contextual colors that match system semantics (success, warning, error)
- Consistent padding and border-radius
- Text weight and size appropriate for badges

All badge variants are drawn directly from the application's actual usage patterns.

### Accordion

Accordion stories demonstrate:
- Proper expansion/collapse behavior
- Consistent header styling
- Proper content padding and structure
- Nested accordion patterns that match production usage
- Flight-specific content examples that mirror real-world usage

## Data & Content Alignment

All stories use realistic data that mirrors the application's context:
- Real flight routes (primarily Bengaluru-London)
- Realistic pricing in Indian Rupees (₹)
- Actual airline names from the application
- Authentic flight details (departure/arrival times, durations)
- Realistic baggage policies and booking terms

Example:
```jsx
<h3 className="text-lg font-medium">Bengaluru → London</h3>
<span className="price text-lg font-bold">₹42,500</span>
```

## Current Coverage

We currently have Storybook stories for the following components:
1. Table
2. Card
3. Accordion
4. Badge
5. Button
6. Skeleton

Each component has multiple stories showing different states, variations, and usage patterns that align with the application.

## Best Practices for Creating New Stories

When creating new Storybook stories:

1. Reference actual components in the codebase (e.g., src/components/TripCuration/FlightResultCard.tsx)
2. Maintain the same class structure and naming
3. Use realistic data values that match the application's domain
4. Ensure all spacing, colors, and typography match the application
5. Include all relevant states and variations
6. Document the component's intended usage and accessibility considerations

These guidelines ensure our Storybook serves as an accurate, living representation of our design system. 