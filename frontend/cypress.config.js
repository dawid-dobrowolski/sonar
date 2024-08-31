import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      defaultCommandTimeout: 10000
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
  },
});
