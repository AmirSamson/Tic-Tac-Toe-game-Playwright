import {test, expect} from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';
import { getActiveResourcesInfo } from 'node:process';

test('Board disables after game ends', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameThreeMoves(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyNav).toBeVisible();
});

test('History persists after refresh', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameThreeMoves(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toBeVisible();
  await page.reload();
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toBeVisible();
});


test('Clear history', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameThreeMoves(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toBeVisible();
  await gamePage.historyClear
  
    page.once('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Clear');
        return dialog.accept();
    });    
  await gamePage.historyClear.click();
  await expect(gamePage.historyRow).not.toBeVisible();
});