const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8082',
    setupNodeEvents(on, config) {
      // Percy setup - using a simple task instead of direct import
      on('task', {
        percyHealthCheck() {
          return null;
        }
      });
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      // Percy setup - using a simple task instead of direct import
      on('task', {
        percyHealthCheck() {
          return null;
        }
      });
      return config;
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
}); 