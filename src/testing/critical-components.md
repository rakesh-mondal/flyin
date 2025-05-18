# Critical UI Components for Visual Testing

This document identifies and prioritizes components and pages that should be covered by visual regression tests, based on their importance to the user experience and risk of visual regressions during refactoring.

## High Priority Components

### Core Pages
1. **Homepage** - First impression, most visited
2. **Flight Search Form** - Central to the booking flow
3. **Search Results** - Complex layout with multiple states
4. **Flight Details** - Shows detailed flight information
5. **Booking Flow Pages** - Core business functionality
   - Passenger Information
   - Seat Selection
   - Payment
   - Confirmation

### Reusable UI Components
1. **Navigation Bar** - Present on all pages
2. **Flight Card** - Used throughout the application
3. **Trip Proposal Cards** - Featured prominently
4. **Loading States** - Critical for user experience
   - Skeletons
   - Spinners
5. **Form Elements** - Used in multiple places
   - Input fields
   - Validation errors
   - Buttons
   - Dropdowns

## Medium Priority Components

1. **Profile Page** - User account management
2. **Trip List** - Past and upcoming trips
3. **Filter Components** - Search refinement
4. **Modal Dialogs** - Various confirmations and forms
5. **Error States** - Various error messages and pages

## Low Priority Components

1. **Footer** - Less critical information
2. **Help/FAQ Pages** - Static content
3. **Promotional Banners** - Non-critical marketing
4. **Settings Panels** - Infrequently accessed

## Implementation Plan

1. Create Percy snapshots for all high-priority components first
2. Add medium-priority components after baseline is established
3. Gradually expand coverage to low-priority components

## Special States to Test

For each component, capture the following states where applicable:
- **Default/Empty State**
- **Loading State**
- **Populated/Success State**
- **Error State**
- **Interactive States** (hover, focus, active)
- **Responsive Breakpoints** (mobile, tablet, desktop)

## Visual Testing Strategy

1. **Component Tests**: Isolated testing of individual components
2. **Page Tests**: Full-page snapshots to capture layout and integration
3. **User Flow Tests**: Sequence of snapshots capturing a complete user journey

This list will evolve as the application is refactored, with new components being added to the testing suite as they are created. 