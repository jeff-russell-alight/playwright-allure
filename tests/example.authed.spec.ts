import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.beforeEach(async ({page}) => {
    const sessionStorage = JSON.parse(fs.readFileSync('./playwright/.auth/session.json', 'utf-8'));
    await page.addInitScript(storage => {
      if (window.location.hostname === 'localhost') {
        for (const [key, value] of Object.entries(storage))
          window.sessionStorage.setItem(key, value);
      }
    }, sessionStorage);
});

