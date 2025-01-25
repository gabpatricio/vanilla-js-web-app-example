import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://erickwendel.github.io/vanilla-js-web-app-example', // seta como url base para todos os testes
    testIsolation: false // não limpa estado da tela após cada it
  },
});
