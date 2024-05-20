import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// we don't want to store credentials in the repository
dotenv.config({
    path: './tests/.env.local',
});

const storageState = './playwright/.auth/storageState.json';

setup('authenticate', async ({ page }) => {
  const stats = fs.existsSync(storageState!.toString()) ? fs.statSync(storageState!.toString()) : null;
  if (stats && stats.mtimeMs > new Date().getTime() - 600000) {
    console.log(`\x1b[2m\tSign in skipped because token is fresh\x1b[0m`);
    return;
  }

  // Perform authentication steps. Replace these actions with your own.

  // End of authentication steps.

  await page.context().storageState({ path: storageState });
  const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync('./playwright/.auth/session.json', sessionStorage, 'utf-8');
});