import { type Page, type Locator, expect } from '@playwright/test';
import { promises } from 'node:dns';

export class TicTacToePage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly registerButton: Locator;
  readonly loginButton: Locator;
  readonly switchModeButton: Locator;
  readonly logoutButton: Locator;
  readonly authError: Locator;
  readonly helloUser: Locator;

  readonly board: Locator;
  readonly cells: Locator;
  readonly status: Locator;
  readonly resetButton: Locator;
  readonly hintButton: Locator;
  readonly difficultySelect: Locator;

  readonly filledBefore: Locator;
  readonly filledAfter:Locator;
  readonly emptyCellsAfter: Locator;

  readonly playNav: Locator;
  readonly historyNav: Locator;
  readonly historyRow: Locator;
  readonly historyClear: Locator;
  readonly profileNav: Locator;

  readonly themeButton: Locator;
  readonly languageSelect: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByTestId('input-name');
    this.registerButton = page.getByTestId('btn-register');
    this.loginButton = page.getByTestId('btn-login');
    this.switchModeButton = page.getByTestId('btn-switch-mode');
    this.logoutButton = page.getByTestId('btn-logout');
    this.authError = page.getByTestId('auth-error');
    this.helloUser = page.getByTestId('hello-user');

    this.board = page.getByTestId('board');
    this.cells = page.locator('[data-testid^="cell-"]');
    this.status = page.locator('.status');
    this.resetButton = page.getByTestId('btn-reset');
    this.hintButton = page.getByTestId('btn-hint');
    this.difficultySelect = page.getByTestId('select-difficulty');

    this.filledBefore = page.locator('[data-state="x"], [data-state="o"]');
    this.filledAfter = page.locator('[data-state="x"], [data-state="o"]');
    this.emptyCellsAfter = page.locator('[data-state="empty"]:not([disabled])');

    this.playNav = page.getByTestId('nav-play');
    this.historyNav = page.getByTestId('nav-history');
    this.historyRow = page.locator('[data-testid^="history-row-"]')
    this.historyClear = page.getByTestId('btn-clear-history')
    this.profileNav = page.getByTestId('nav-profile');

    this.themeButton = page.getByTestId('btn-theme');
    this.languageSelect = page.getByTestId('select-language');
  }

  async goto() {
    await this.page.goto('/tic-tac-toe.html');
  }

  async register(name: string) {
    await this.nameInput.fill(name);
    await this.registerButton.click();
  }

  async login(name: string) {
    await this.nameInput.fill(name);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async switchToLogin() {
    await this.switchModeButton.click();
  }

  async switchToRegister() {
    await this.switchModeButton.click();
  }

  async clickCell(index: number) {
    const cell = this.page.getByTestId(`cell-${index}`);
    await cell.click();
  }

  async getCell(index: number) {
    return this.page.getByTestId(`cell-${index}`);
  }

  async getGameStatus() {
  return await this.status.getAttribute('data-status');
  }

  async getCellState(index: number): Promise<string> {
    const cell = this.page.getByTestId(`cell-${index}`);
    return await cell.getAttribute('data-state') || '';
  }

  async countMarks(type: 'x' | 'o') {
    return await this.page.locator(`[data-state="${type}"]`).count();
  }

  async getAllCellDetails(): Promise<Array<{ state: string | null; class: string; aria: string | null }>> {
    return await this.cells.evaluateAll(els =>
      els.map(el => ({
        state: el.getAttribute('data-state'),
        class: el.className,
        aria: el.getAttribute('aria-label')
      }))
    );
  }

  async clickEmptyCell() {
    let emptyCell = this.page.locator('[data-state=""]').first();
    if (await emptyCell.count() === 0) {
      emptyCell = this.page.locator('[data-state="empty"]').first();
    }
    if (await emptyCell.count() > 0) {
      await emptyCell.click();
    }
  }
   async checkForNoMovesAllowed (page:Page): Promise<void> {
    const beforeFillCounter=await this.filledBefore.count();

    if (await this.emptyCellsAfter.count() > 0) {
      await this.emptyCellsAfter.first().click();
    }
    const afterFillCounter= await this.filledAfter.count();
    expect(afterFillCounter).toBe(beforeFillCounter);
 }

  async resetGame() {
    await this.resetButton.click();
  }

  async clickHint() {
    await this.hintButton.click();
  }

  async getStatus(): Promise<string> {
    return await this.status.getAttribute('data-status') || '';
  }

  async getStatusText(): Promise<string> {
    return await this.status.textContent() || '';
  }

  async isGameOver(): Promise<boolean> {
    const status = await this.getStatus();
    return status === 'win' || status === 'draw' || status === 'computer';
  }

  async playGameUntilEnd(page:Page): Promise<void> {
    const status = page.locator('[data-testid="status"]');

    while (true) {
      const gameStatus = await status.getAttribute('data-status');

      if (
        gameStatus &&
        ['computer', 'human', 'draw'].includes(gameStatus)
      ) {
        break;
      }
    
      const emptyCells = page.locator(
        '[data-state="empty"]:not([disabled])'
      );

      await emptyCells.first().click();
      await page.waitForTimeout(300);
    }
  }

  async goToProfile() {
    await this.profileNav.click();
  }

  async goToHistory() {
    await this.historyNav.click();
  }

  async clearHistory(){
    await this.historyClear.click();
  }

  async goToPlay() {
    await this.playNav.click();
  }

  async toggleTheme() {
    await this.themeButton.click();
  }

  async setLanguage(lang: string) {
    await this.languageSelect.selectOption(lang);
  }

  async setDifficulty(difficulty: string) {
    await this.difficultySelect.selectOption(difficulty);
  }

  async expectBoardVisible() {
    await expect(this.board).toBeVisible();
  }

  async expectCellState(index: number, state: string) {
    const cell = this.page.getByTestId(`cell-${index}`);
    await expect(cell).toHaveAttribute('data-state', state);
  }

  async expectCellText(index: number, text: string) {
    const cell = this.page.getByTestId(`cell-${index}`);
    await expect(cell).toHaveText(text);
  }

  async expectCellDisabled(index: number) {
    const cell = this.page.getByTestId(`cell-${index}`);
    await expect(cell).toBeDisabled();
  }

  async expectHelloUser(text: string) {
    await expect(this.helloUser).toContainText(text);
  }

  async expectAuthError(text: string) {
    await expect(this.authError).toContainText(text);
  }
}
