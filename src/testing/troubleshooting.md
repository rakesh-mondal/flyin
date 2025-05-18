# Visual Regression Testing Troubleshooting

## Common Issues & Solutions

### ES Module Error in Cypress Configuration

**Problem:**
When running Cypress with Percy, you might encounter this error:
```
ReferenceError: exports is not defined in ES module scope
```

**Cause:**
This happens because the project is using ES modules (indicated by `"type": "module"` in package.json), but Percy's task imports use CommonJS module syntax.

**Solution:**
Instead of importing Percy's `percyHealthCheck` directly, create a custom task that wraps the Percy functionality:

```typescript
// In cypress.config.ts
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Custom Percy task that works with ES modules
      on('task', {
        percyHealthCheck() {
          return null;
        }
      });
      return config;
    },
  },
  // ...
});
```

When Percy is properly configured in CI/CD with the PERCY_TOKEN, the snapshots will be captured regardless of this local health check.

### Running Percy Tests Locally

**Problem:**
Percy tests fail to capture snapshots when run locally without a Percy token.

**Solution:**
1. Get a Percy token from your project admin
2. Set the token as an environment variable before running tests:
   ```bash
   export PERCY_TOKEN=your_token_here
   npm run percy:visual
   ```

Without a token, you can still run the Cypress tests, but Percy snapshots won't be captured.

### Component Test Issues

**Problem:**
Component tests may fail with errors about React not being available.

**Solution:**
Ensure your component tests have the correct imports and are properly mounting components:

```typescript
// In your component test file
import React from 'react';
import { mount } from 'cypress/react';
import YourComponent from '../../src/components/YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    cy.mount(<YourComponent />);
    cy.percySnapshot('YourComponent Default');
  });
});
```

Make sure `cypress/support/component.ts` correctly defines the mount command with types.

### Viewport Sizing Issues

**Problem:**
Snapshots don't capture the full component or look inconsistent across runs.

**Solution:**
Set fixed dimensions in your Percy configuration:

```javascript
// In percy.config.js
export default {
  version: 2,
  snapshot: {
    widths: [375, 768, 1280], // Common breakpoints
    minHeight: 1024,
    percyCSS: '', // Custom CSS to apply to snapshots
  },
};
```

## Percy Best Practices

1. **Consistent test data**: Use fixtures or mock APIs to ensure consistent data in your visual tests
2. **Wait for animations**: Add `cy.wait()` or explicit waits before taking snapshots
3. **Isolate tests**: Each test should be independent and not rely on state from other tests
4. **Minimize snapshot count**: Focus on critical UI elements to avoid excessive snapshots
5. **Review all changes**: Always carefully review visual diffs in the Percy dashboard 