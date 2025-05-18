# Testing Infrastructure

This directory contains the testing infrastructure for the Flyin application.

## Directory Contents

- **`component-testing-approach.md`**: Documents the approach for component testing, including patterns and guidelines.
- **`critical-components.md`**: Lists the critical UI components prioritized for testing.
- **`next-steps.md`**: Outlines the next steps for improving test coverage.
- **`testing-documentation.md`**: Comprehensive documentation of the entire testing infrastructure.
- **`jest-setup.ts`**: Configuration for Jest, including global mocks and setup.
- **`test-utils.tsx`**: Utilities for testing, including a custom render function with providers.
- **`__mocks__/`**: Mock implementations for tests.

## Testing Infrastructure Overview

The Flyin application uses multiple testing tools to ensure code quality:

1. **Jest + React Testing Library**: For unit and component tests
   - Configuration: `jest.config.cjs`, `tsconfig.test.json`
   - Setup: `src/testing/jest-setup.ts`
   - Utilities: `src/testing/test-utils.tsx`

2. **Storybook**: For component documentation and visual testing
   - Stories: `src/components/ui/*.stories.tsx`

3. **Percy + Cypress**: For visual regression testing
   - Configuration: `cypress.config.cjs`, `percy.config.cjs`
   - E2E Tests: `cypress/e2e/`
   - Component Tests: `cypress/component/`

## Starting Points

- For writing new component tests, see `component-testing-approach.md`
- For visual regression testing, check `critical-components.md`
- For a complete guide to all testing tools, see `testing-documentation.md`

## Getting Started

1. Run unit and component tests:
   ```bash
   npm test
   ```

2. Run Storybook to view components:
   ```bash
   npm run storybook
   ```

3. Run visual regression tests:
   ```bash
   npm run test:visual
   ``` 