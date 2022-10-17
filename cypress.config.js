const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  numTestsKeptInMemory: 0,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: 0,
  defaultCommandTimeout: 30000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
