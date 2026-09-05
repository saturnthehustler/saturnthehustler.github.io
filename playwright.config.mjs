import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  // Tests run against the exported static site, not the dev server, so what
  // is checked is what actually gets deployed.
  webServer: {
    command: 'npx serve out -l 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  use: { baseURL: 'http://localhost:4321' },
});
