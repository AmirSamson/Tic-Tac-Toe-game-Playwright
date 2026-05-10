import { expect, test } from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';

test('Start new game', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();
});

test('Player can place X', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  const cell = await gamePage.getCell(0);
  await cell.click();
  await gamePage.expectCellState(0, 'x');
  await gamePage.expectCellText(0, 'X');
});

test('Prevent overwrite occupied cell', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  const cell = await gamePage.getCell(0);
  await cell.click();
  await gamePage.expectCellDisabled(0);

  await cell.click({ force: true });
  await expect(cell).not.toHaveAttribute('data-state', 'empty');
  await expect(cell).not.toHaveText('');
});

test('Computer places O after player move', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  const cell = await gamePage.getCell(0);
  await cell.click();
  await cell.click({ force: true });

  await expect(page.locator('[data-state="o"]')).toHaveCount(1, { timeout: 1000 });
  const computerMove = page.locator('[data-state="o"]');

  await expect(computerMove).toHaveCount(1);
  await expect(computerMove).toHaveText('O');
  await expect(computerMove).toBeDisabled();

  const index = await computerMove.getAttribute('data-index');
  console.log(`Computer placed O in cell ${index}`);
});

test('Reset game clears board', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');

  const cell = await gamePage.getCell(0);
  await cell.click();

  await gamePage.resetGame();

  await expect(page.locator('[data-state="x"], [data-state="o"]')).toHaveCount(0);
  const cells = gamePage.cells;
  await expect(cells).toHaveCount(9);
  await expect(page.locator('[data-state="empty"]')).toHaveCount(9);
});

test('Board disables after game ends', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.playGameUntilEnd(page);
  await gamePage.checkForNoMovesAllowed(page);
});
