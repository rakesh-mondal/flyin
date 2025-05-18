# Component Testing Approach for Visual Regression

## Overview

This document outlines our approach to component testing with Percy for visual regression. We have established a pattern that ensures both functional verification and comprehensive visual coverage.

## Testing Pattern

For each component, we follow this testing pattern:

1. **Basic Rendering Test**
   - Verify the component renders correctly with default props
   - Take a Percy snapshot of the default state
   - Check that key elements are visible and correctly styled

2. **Variation Tests**
   - Test different prop combinations
   - Test optional props (both present and absent)
   - Take Percy snapshots of each significant variation

3. **State Tests**
   - Test different component states (loading, error, empty, populated)
   - Test user interactions that change the component's appearance
   - Take Percy snapshots of each state transition

4. **Error Handling Tests**
   - Test how the component handles invalid inputs or errors
   - Test fallback UI when resources fail to load
   - Take Percy snapshots of error states

5. **Interaction Tests**
   - Verify event handlers are called correctly
   - Test keyboard, mouse, and touch interactions
   - Ensure accessibility features work as expected

## Completed Component Tests

1. **Navigation Component**
   - Active tab states (home, search, trips, profile)
   - Hidden state (mobile navigation collapsed)
   - Tab click interaction

2. **TripProposal Component**
   - Full trip details (with flight and hotel)
   - Minimal trip details (without flight and hotel)
   - Click event handling

3. **SuggestionCard Component**
   - Complete rendering with all props
   - Minimal rendering with required props only
   - Image error fallback state
   - Click event handling

4. **Skeleton Component**
   - Default styling
   - Multiple variations (text lines, card skeleton)
   - Complete skeleton loading card

5. **FlightSearchForm Component**
   - Default rendering
   - Form field input states
   - Calendar selection
   - Form submission

## Implementation Notes

- Each test file follows a consistent structure
- We wrap components in appropriate context providers when needed
- We use realistic mock data to ensure testing conditions match production
- We test at multiple viewport sizes to ensure responsive design works correctly
- We isolate components from their dependencies using mocks and stubs

## Future Improvements

1. Add more complex interaction sequences to E2E tests
2. Implement a11y tests alongside visual regression tests
3. Create visual regression tests for dark mode when implemented
4. Add performance metrics to key component tests
5. Integrate component tests with Storybook when implemented

## Next Components to Test

The following high-priority components should be tested next:

1. Flight Card
2. Error message components
3. Form elements (inputs, validation errors)
4. Modal dialogs
5. Trip Detail components

Refer to [critical-components.md](./critical-components.md) for the complete prioritized list. 