import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import path from 'path';
import * as fs from 'fs';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/storageState.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  grep: testPlanFilter(),

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["allure-playwright"]] : [['line'], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-first-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    // },
    // {
    //   name: 'authed',
    //   use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
    //   testMatch: '**/*.authed.spec.ts',
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'no-auth',
    //   use: { ...devices['Desktop Chrome'] },
    //   testIgnore: ['**/*.authed.spec.ts', '**/*.setup.ts'],
    // },
    // {
    //   name: 'authed chromium',
    //   use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE },
    //   testMatch: '**/*.authed.spec.ts',
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'authed firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
    //   testMatch: '**/*.authed.spec.ts',
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'authed safari',
    //   use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
    //   testMatch: '**/*.authed.spec.ts',
    //   dependencies: ['setup'],
    // },
    {
      name: 'no-auth chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/*.authed.spec.ts', '**/*.setup.ts', '**/second.spec.ts'],
    },
    {
      name: 'no-auth firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/*.authed.spec.ts', '**/*.setup.ts', '**/second.spec.ts'],
    },
    {
      name: 'no-auth safari',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/*.authed.spec.ts', '**/*.setup.ts', '**/second.spec.ts'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */

});
