# Tic-Tac-Toe Game – Playwright Tests

This repository contains a simple Tic-Tac-Toe game along with automated end-to-end tests written using Playwright. The project is structured using **Object-Oriented Programming (OOP)** principles to ensure modularity, readability, and maintainability.

## 📌 Project Overview

The project demonstrates how to test a browser-based game using Playwright while following OOP design practices. The game logic and test structure are organized in a way that promotes reusability and clear separation of concerns.


## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Run Tests

```bash
npx playwright test
```

## 🌐 Local Server Setup

Since the game is implemented as a static HTML file located in the root of the project, it cannot be reliably opened directly via the file system (`file://`). To address this, a local HTTP server is used.

### HTTP Server Installation

The project uses `http-server` as a development dependency:

```bash
npm install --save-dev http-server
```

### Why This Is Needed

* The HTML file resides in the root directory.
* Playwright requires a proper HTTP context to interact with the page reliably.
* Some browser features and test behaviors do not work correctly when using `file://`.

## ⚙️ Playwright Configuration

The `playwright.config` file has been updated to:

* Start the local HTTP server before running tests
* Serve the project root directory
* Ensure tests run against a proper `http://localhost` URL

This setup ensures consistent and reliable test execution.

## 📂 Project Structure

```
├── tests/                # Playwright test files
├── playwright.config.js  # Playwright configuration
├── index.html            # Tic-Tac-Toe game (root)
├── package.json
└── README.md
```

## 🧪 Test Coverage

The Playwright tests cover:

* Game initialization
* Player moves
* Turn switching
* Winning conditions
* UI updates

## 🛠 Tech Stack

* Playwright
* JavaScript / Node.js
* Static HTML/CSS/JS

## 📄 Notes

* Ensure the HTTP server runs via Playwright config (no need to start manually).
* Modify test cases in the `tests/` folder to expand coverage.

---
## ⚙️ CI/CD (GitHub Actions)

This repository includes a GitHub Actions workflow for running Playwright tests in a CI environment:

```bash
.github/workflows/playwright.yml
```

```bash
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest

    container:
      image: mcr.microsoft.com/playwright:v1.45.0-jammy

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

The workflow is configured to use the official Playwright Docker container image, ensuring a consistent and reliable test environment without needing to install browsers on every run.

### 📌 Note

This workflow is included primarily for **demonstration and showcase purposes**. At this stage, it is not intended to run on every push to the repository.

If needed, the workflow triggers can be easily adjusted (e.g., manual runs or specific branches only) depending on project requirements.

This approach highlights how the project can be integrated into a CI/CD pipeline while keeping repository activity lightweight.

Feel free to contribute or improve the tests!
