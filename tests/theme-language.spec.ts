import { test, expect } from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';

test('Switch to dark theme', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();

  await gamePage.toggleTheme();
  await expect(gamePage.themeButton).toHaveText('Light');
});

test('Theme persists after refresh', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();

  await gamePage.toggleTheme();
  await page.reload();
  await expect(gamePage.themeButton).toHaveText('Light');
});

test('Switch language to Persian', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();

  await gamePage.setLanguage('fa');
  await expect(gamePage.languageSelect).toHaveValue('fa');
});

test('RTL layout applied in Persian', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();

  await gamePage.setLanguage('fa');
  await expect(gamePage.languageSelect).toHaveValue('fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
