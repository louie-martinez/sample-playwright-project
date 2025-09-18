# Playwright SampleProject

## 🚀 Initial Setup

Open a terminal in your project root and run:

```sh
# 1. Install Playwright with TypeScript support
npm init playwright@latest

# 2. Install dependencies (if not already done)
npm install

# 3. (Optional) Install Node.js types for TypeScript
npm install --save-dev @types/node

# 4. Run your first test
npx playwright test
```

## 📁 Folder Structure

```
SampleProject/
├── pages/           # Page Object Models (POM) for each app page
│   └── registrationPage.ts
├── tests/           # All test specs
│   └── generatedTest.spec.ts
├── utils/           # Utility functions (e.g., random email generator)
│   └── stringUtils.ts
├── fixtures/        # Custom fixtures for test setup/teardown
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

### Folder Explanations

- **pages/**: Contains Page Object Model classes. Each file represents a page and encapsulates element selectors and actions.
- **tests/**: Contains all test files. Each spec targets a feature or page.
- **utils/**: Utility/helper functions reusable across tests (e.g., random data generators).
- **fixtures/**: Custom Playwright fixtures for advanced setup/teardown or shared test context.
- **playwright.config.ts**: Central config for test runs, browsers, reporters, and more.
- **tsconfig.json**: TypeScript compiler options for the project.

## 🧪 Test Implementation Approach

- **Page Object Model (POM):**  
  Each page (e.g., Registration) has a class in `pages/` encapsulating element locators and actions using Playwright's `getByRole` for accessibility and maintainability.
- **Test Specs:**  
  Each test file in `tests/` imports the relevant POM and utilities. Tests are grouped using `test.describe` for logical organization.

  - **Direct Approach (e.g., `home.spec.ts`):**  
    Tests interact directly with page elements using selectors inside the test itself. This approach is quick for simple scenarios but can become hard to maintain as the application grows.

  - **Page Object Model Approach (e.g., `homePOM.spec.ts`):**  
    Tests use Page Object Model classes to encapsulate selectors and actions. The test files call methods and properties from these classes, making tests more readable, reusable, and maintainable. This is the recommended approach for scalable test automation.

  - **Example:**  
    - `home.spec.ts` might contain:
      ```typescript
      await page.click('text=Login');
      await expect(page.locator('h1')).toHaveText('Welcome');
      ```
    - `homePOM.spec.ts` would use:
      ```typescript
      await homePage.clickLogin();
      await expect(homePage.header).toHaveText('Welcome');
      ```

  - **Other Test Spec Files:**  
    - `generatedTest.spec.ts`:  
      Demonstrates registration form tests using the POM approach, covering both positive and negative scenarios with dynamic test data.
    - `homefixture.spec.ts`:  
      Uses Playwright fixtures for advanced setup and teardown, and demonstrates how to share state or page objects between tests for efficiency and clarity.
    - For each test spec, the approach is chosen based on maintainability, reusability, and clarity. POM and fixtures are preferred for complex flows, while direct selectors may be used for simple or experimental scripts.
- **Test Data:**  
  Utilities like `generateRandomEmail()` are used for dynamic, unique test data.
- **Positive & Negative Scenarios:**  
  Both successful and failure cases are covered for robust validation.

## ⚙️ playwright.config.ts Explanation

- **testDir:** Directory where test files are located.
- **fullyParallel:** Run tests in parallel for speed.
- **forbidOnly:** Prevent accidental commits of `.only` tests in CI.
- **retries:** Retries failed tests (more on CI).
- **workers:** Limits parallelism on CI.
- **reporter:** Generates an HTML report after test runs.
- **use:** Shared settings (e.g., screenshots on failure, trace on retry).
- **projects:** Defines which browsers and devices to test against.
- **webServer:** (Commented) Example for starting a dev server before tests.

## ✅ Playwright Best Practices

- Use **Page Object Model** to keep tests maintainable and DRY.
- Prefer **getByRole** and accessible selectors for robust, future-proof tests.
- Keep test data dynamic and unique (e.g., random emails).
- Group related tests with `test.describe`.
- Use fixtures for shared setup/teardown logic.
- Run tests in parallel for speed, but isolate state between tests.
- Use Playwright's built-in reporters and traces for debugging failures.
- Keep configuration and utilities modular and well-documented.

---

Happy Testing! 🚦