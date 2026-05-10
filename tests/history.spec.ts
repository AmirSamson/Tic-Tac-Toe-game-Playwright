import {test, expect} from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';
import { getActiveResourcesInfo } from 'node:process';

test('Game recorded after completion', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameUntilEnd(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toHaveCount(1);
});

test('History persists after refresh', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameUntilEnd(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toBeVisible();
  await page.reload();
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toHaveCount(1);
});


test('Clear history', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  await gamePage.playGameUntilEnd(page)
  await gamePage.goToHistory()
  await expect(gamePage.historyRow).toHaveCount(1);
  await gamePage.historyClear
  
    page.once('dialog', dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Clear');
        return dialog.accept();
    });    
  await gamePage.historyClear.click();
  await expect(gamePage.historyRow).toHaveCount(0);
});