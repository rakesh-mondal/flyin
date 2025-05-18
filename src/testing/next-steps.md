# Next Steps for Testing

This document outlines the next steps for improving test coverage and test infrastructure in the Flyin application.

## Completed Work

- ✅ Set up Percy for visual regression testing
- ✅ Create component tests for high-priority UI components
- ✅ Implement E2E visual regression tests for key user flows
- ✅ Set up Jest and React Testing Library
- ✅ Create testing documentation and guidelines
- ✅ Implement Storybook for component documentation

## Short-term Goals

1. **Increase Unit Test Coverage**
   - Implement tests for remaining utility functions
   - Add tests for hooks and custom hooks
   - Test Redux slices and reducers (if applicable)

2. **Expand Component Test Coverage**
   - Continue adding tests for remaining critical components
   - Add more interaction tests for complex components
   - Ensure all conditional rendering scenarios are tested

3. **Improve E2E Test Coverage**
   - Add tests for complete booking flow
   - Test error handling scenarios
   - Implement tests for user account flows

## Medium-term Goals

1. **Test Automation in CI/CD**
   - Set up GitHub Actions workflow for running all test types
   - Implement code coverage reporting in CI
   - Add Percy visual reviews to PR process

2. **Performance Testing**
   - Implement basic performance metrics in E2E tests
   - Add Lighthouse CI for performance regression detection
   - Set performance budgets for critical user flows

3. **Accessibility Testing**
   - Add axe-core or similar library to test for accessibility issues
   - Create accessibility test patterns for components
   - Implement automated accessibility checks in CI

## Long-term Goals

1. **Advanced Test Patterns**
   - Implement contract testing for API integrations
   - Add property-based testing for complex business logic
   - Implement user journey testing with realistic scenarios

2. **Test Infrastructure Improvements**
   - Create testing dashboards for tracking coverage over time
   - Implement flaky test detection and management
   - Set up parallel test execution for faster CI runs

## Priorities for Next Sprint

1. Add unit tests for date utilities and price formatting functions
2. Create Storybook stories for all UI components in the design system
3. Implement Redux slice tests for booking and search functionality
4. Add E2E tests for the complete booking flow

## Remaining Tasks (Prioritized)

### High Priority
1. **Get PERCY_TOKEN**: 
   - Request PERCY_TOKEN from project administrator
   - Add to GitHub repository secrets
   - Add to local .env file for testing

2. **Fix Server Connection Issues**:
   - Ensure Vite dev server starts before running Cypress
   - Verify port configuration is correct (8081 vs 5173)
   - Test with component tests if e2e tests continue to have issues

3. **Complete Core Component Tests**:
   - Implement tests for Navigation component
   - Implement tests for Flight Card component
   - Implement tests for Trip Proposal Cards
   - Implement tests for core form components

### Medium Priority
1. **Implement Core Page Tests**:
   - Homepage
   - Search Results
   - Flight Details
   - Booking Flow pages

2. **Add State Testing**:
   - Loading states
   - Error states
   - Success states
   - Empty states

### Low Priority
1. **Add Unit Testing Infrastructure**:
   - Configure Jest
   - Set up React Testing Library
   - Create examples for hooks and utilities

2. **Set up Storybook**:
   - Configure Storybook
   - Add component stories
   - Integrate with Percy

## Troubleshooting Notes
- ES module errors were resolved using .cjs extension for configuration files
- Server connection issues need further investigation
- Visual regression tests require a valid PERCY_TOKEN to capture snapshots
- Component tests may be easier to implement initially vs. e2e tests

## References
- [Percy Documentation](https://docs.percy.io)
- [Cypress Documentation](https://docs.cypress.io)
- [Testing with ES Modules](https://docs.cypress.io/guides/references/configuration#Node-version)
- [Troubleshooting Tips](./troubleshooting.md) 