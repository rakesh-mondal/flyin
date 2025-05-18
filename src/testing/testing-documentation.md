# Flyin Testing Documentation

This document provides a comprehensive guide to the testing infrastructure in the Flyin application.

## Testing Layers

The Flyin application implements multiple testing layers to ensure code quality:

1. **Unit Testing** - Using Jest for business logic, utilities, and hooks
2. **Component Testing** - Using React Testing Library for UI components
3. **Visual Regression Testing** - Using Percy with Cypress for UI appearance
4. **Storybook** - For component documentation and manual visual testing
5. **End-to-End Testing** - Using Cypress for user flows

## Running Tests

### Unit and Component Tests (Jest)

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Visual Regression Tests (Percy/Cypress)

```bash
# Run Cypress tests in browser
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run visual regression tests
npm run test:visual

# Run visual regression tests with Percy snapshots
npm run percy:visual
```

### Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Directory Structure

```
src/
├── __tests__/       # Unit tests for utilities, hooks, store
├── components/
│   ├── __tests__/   # Component tests using React Testing Library
│   └── ui/
│       └── *.stories.tsx  # Storybook stories
├── testing/
│   ├── __mocks__/   # Mock implementations for tests
│   ├── jest-setup.ts      # Jest configuration
│   └── test-utils.tsx     # Testing utilities and wrappers
├── cypress/
│   ├── e2e/         # End-to-end tests
│   └── component/   # Component tests using Cypress
```

## Writing Tests

### Unit Tests

```typescript
// src/utils/__tests__/example.test.ts
import { myFunction } from '../example';

describe('myFunction', () => {
  it('should return the expected result', () => {
    expect(myFunction(1, 2)).toBe(3);
  });
});
```

### Component Tests

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '../../testing/test-utils';
import { Button } from '../ui/button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
```

### Storybook Stories

```typescript
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### Visual Regression Tests

```typescript
// cypress/e2e/visual-regression.cy.ts
describe('Visual Regression', () => {
  it('homepage looks correct', () => {
    cy.visit('/');
    cy.percySnapshot('Homepage');
  });
});
```

## Best Practices

### Unit Testing
- Focus on testing business logic and utility functions
- Use pure unit tests for non-UI code
- Aim for 80%+ coverage of utility functions

### Component Testing
- Test component behavior, not implementation details
- Test all main states (default, loading, error, etc.)
- Use `data-testid` attributes sparingly, prefer accessible roles
- Use the custom `render` function from `test-utils.tsx` to include providers

### Visual Regression Testing
- Create Percy snapshots for critical UI components
- Test components in all important states
- Test at multiple viewport sizes for responsive design
- Use `cy.percySnapshot()` for capturing snapshots

### Storybook
- Create stories for all reusable components
- Document component props and usage examples
- Showcase different component states and variants
- Use args for interactive controls

## Mocking

### API Requests
- Use Jest's mocking capabilities to mock API calls
- Set up global fetch/axios mocks in `jest-setup.ts` if needed
- For component-specific mocks, use the `jest.mock()` function

### Context Providers
- Use the `AllTheProviders` wrapper in `test-utils.tsx` to provide context
- For specific context values, override them in individual tests

## Troubleshooting

### Common Issues

1. **Tests failing with "Unable to find role"**
   - Check that you're using the correct role or query
   - Ensure the component is rendering correctly

2. **Visual regression test differences**
   - Check for intentional UI changes vs. regressions
   - Verify tests at different viewport sizes

3. **Mock not working**
   - Ensure mocks are set up before component rendering
   - Check that the import path in the mock matches exactly

### Debugging Tests

- Use `screen.debug()` to print the current DOM state
- Use `console.log` for runtime debugging
- For Jest tests, use the `--watch` mode for faster feedback 