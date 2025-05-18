# Testing Infrastructure Setup

This document outlines the testing infrastructure setup that has been completed for the Flyin application as part of task 13.4.

## Overview of Testing Tools

The Flyin application uses a comprehensive testing strategy with multiple tools:

1. **Jest + React Testing Library**: For unit and component tests
2. **Storybook**: For component documentation and visual testing
3. **Percy + Cypress**: For visual regression testing
4. **Redux Toolkit Testing**: For testing state management

## Implementation Details

### 1. Jest and React Testing Library

- **Configuration**: `jest.config.cjs`, `tsconfig.test.json`
- **Setup**: `src/testing/jest-setup.ts`
- **Utilities**: `src/testing/test-utils.tsx`
- **Example Tests**:
  - Unit Tests: `src/utils/__tests__/date-utils.test.ts` - Testing utility functions
  - Redux Tests: `src/features/__tests__/bookingSlice.test.ts` - Testing Redux slice behavior

### 2. Storybook

- **Configuration**: `.storybook/` directory
- **Example Stories**:
  - UI Components: `src/components/ui/table.stories.tsx` - Table component with various states
  - Other Stories: `src/stories/` directory - Button, Header, and Page components

### 3. Percy and Cypress

- **Configuration**: `cypress.config.cjs`, `percy.config.cjs`
- **E2E Tests**: `cypress/e2e/` directory
- **Component Tests**: `cypress/component/` directory
- **Visual Regression**: Percy snapshots integrated with Cypress tests

## Running Tests

### Unit and Component Tests with Jest

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook (for deployment)
npm run build-storybook
```

### Visual Regression Tests with Percy and Cypress

```bash
# Run Cypress tests
npm run cypress:open
npm run cypress:run

# Run visual regression tests
npm run test:visual

# Run visual regression tests with Percy
npm run percy:visual
```

## Testing Directory Structure

- `src/testing/` - Testing utilities and documentation
- `src/components/__tests__/` - Component tests
- `src/utils/__tests__/` - Utility function tests
- `src/features/__tests__/` - Redux slice tests
- `cypress/` - Cypress E2E and component tests
- `.storybook/` - Storybook configuration

## Next Steps

1. **Expand Testing Coverage**: Continue adding tests for remaining components and utility functions
2. **Add E2E Tests**: Implement full end-to-end tests for critical user flows
3. **Integrate with CI/CD**: Ensure all tests run on CI/CD pipelines
4. **Monitor Coverage**: Track and improve test coverage metrics

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
- [Percy](https://docs.percy.io/docs/getting-started)
- [Redux Toolkit Testing](https://redux-toolkit.js.org/usage/usage-with-typescript#testing) 