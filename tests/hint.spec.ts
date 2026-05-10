import { test, expect } from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';

test('Request hint during game', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectBoardVisible();

  await gamePage.clickEmptyCell();

  const cells = gamePage.cells;

  const before = await cells.evaluateAll(els =>
    els.map(el => ({
      state: el.getAttribute('data-state'),
      class: el.className,
      aria: el.getAttribute('aria-label')
    }))
  );

  await gamePage.clickHint();

  const after = await cells.evaluateAll(els =>
    els.map(el => ({
      state: el.getAttribute('data-state'),
      class: el.className,
      aria: el.getAttribute('aria-label')
    }))
  );

  expect(after).not.toEqual(before);
});

test('Hint unavailable after game end', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.playGameUntilEnd(page)
  await expect(page.locator('[data-testid=btn-hint]')).toHaveAttribute('disabled');
});
