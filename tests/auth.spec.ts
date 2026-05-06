import { expect, test } from '@playwright/test';
import { TicTacToePage } from '../pages/TicTacToePage';

test('Register with valid username', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await expect(page.getByText('Tic-Tac-Toe')).toBeVisible();
  await gamePage.register('Amir1');
  await gamePage.expectHelloUser('Hello, Amir1');
});

test('Register with empty username', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.nameInput.fill('');
  await gamePage.registerButton.click();
  await gamePage.expectAuthError('Please enter a name.');
});

test('Register duplicate username', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.logout();
  await gamePage.nameInput.fill('Amir1');
  await gamePage.registerButton.click();
  await gamePage.expectAuthError('This name is already taken. Try logging in.');
});

test('Login with valid username', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectHelloUser('Hello, Amir1');
  await gamePage.logout();
  await gamePage.switchToLogin();
  await gamePage.login('Amir1');
  await gamePage.expectHelloUser('Hello, Amir1');
});

test('Logout user', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectHelloUser('Hello, Amir1');
  await gamePage.logout();
  await expect(gamePage.registerButton).toContainText('Create Account');
});

test('Session persistence after refresh', async ({ page }) => {
  const gamePage = new TicTacToePage(page);
  await gamePage.goto();
  await gamePage.register('Amir1');
  await gamePage.expectHelloUser('Hello, Amir1');
  await gamePage.logout();
  await gamePage.switchToLogin();
  await gamePage.login('Amir1');
  await page.reload();
  await gamePage.expectHelloUser('Hello, Amir1');
});
