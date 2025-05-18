// Import Percy
import '@percy/cypress';

// Import Testing Library commands
import '@testing-library/cypress/add-commands';

// Import the Cypress React component adapter
import { mount } from 'cypress/react';

// Add the mount command with proper typing
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Additional commands can be added here 