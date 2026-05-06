# Tic-Tac-Toe Game – Playwright Tests

This repository contains a simple Tic-Tac-Toe game along with automated end-to-end tests written using Playwright.

## 📌 Project Overview

The project demonstrates how to test a browser-based game using Playwright. The game itself is implemented as a static HTML file, and Playwright is used to validate gameplay scenarios such as moves, win conditions, and UI behavior.

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

Feel free to contribute or improve the tests!
