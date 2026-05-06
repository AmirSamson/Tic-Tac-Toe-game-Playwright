import { test, expect } from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';

test('Change difficulty before game', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();
  await gamePage.difficultySelect.selectOption('medium');
  await expect(gamePage.difficultySelect).toHaveValue('medium');
});

test('Change difficulty mid-game', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  const cell = await gamePage.getCell(0);
  await cell.click();
  await page.waitForTimeout(800);

  page.once('dialog', dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Change difficulty');
    return dialog.accept();
  });

  await gamePage.difficultySelect.selectOption('medium');
});

test('Confirm difficulty change resets game', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  const cell = await gamePage.getCell(0);
  await cell.click();
  await page.waitForTimeout(800);

  page.once('dialog', dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Change difficulty');
    return dialog.accept();
  });

  await gamePage.difficultySelect.selectOption('medium');

  await expect(gamePage.difficultySelect).not.toHaveValue('easy');
  await expect(gamePage.difficultySelect).not.toHaveValue('hard');
});

test('Cancel difficulty change', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  const cell = await gamePage.getCell(0);
  await cell.click();
  await page.waitForTimeout(800);

  page.once('dialog', dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Change difficulty');
    return dialog.dismiss();
  });

  await gamePage.difficultySelect.selectOption('medium');
  await expect(gamePage.difficultySelect).toHaveValue('easy');
});
