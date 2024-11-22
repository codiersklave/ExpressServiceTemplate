import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8100",
    specPattern: 'tests/e2e/**/*.cy.js',
    fixturesFolder: 'tests/e2e/fixtures',
    pluginsFolder: 'tests/e2e/plugins/index.js',
    supportFile: 'tests/e2e/support/index.js',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    downloadsFolder: 'tests/e2e/downloads',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
