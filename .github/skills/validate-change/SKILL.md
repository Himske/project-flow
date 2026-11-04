---
name: validate-change
description: "Use when validating a code change before sharing or merging it. Inspect the changed files, choose relevant tests and lint checks available in this repository, run them, and report passed, failed, and not-run checks."
---

# Validate Change

Inspect the current code change and validate its affected behavior with the repository's available checks.

## Workflow

1. Inspect the diff and the repository guidance relevant to the changed files. Identify the behavior and modules affected; do not modify the change being validated.
2. Check `package.json`, project configuration, and nearby test files to determine which test runners and scripts actually exist. Select tests that cover the changed behavior. Do not invent test commands.
3. Run relevant Vitest tests with `npm test -- --run`, adding a test file or name filter when supported. If no test files cover the change, report tests as not run and state why; do not treat an empty test suite as a passing behavior check.
4. Run the repository lint check with `npm run lint`. If the change is limited to a narrow set of files and the repository's configured lint tooling supports a reliable scoped invocation, that invocation may be used instead; state what was checked.
5. For changes that affect application code, routing, styling, or build configuration, run `npm run build` to catch integration and production-build errors. Skip it only when clearly irrelevant, and explain the omission.
6. Summarize each check under `Passed`, `Failed`, or `Not run`. Include the exact command, concise outcome, and any actionable failure details. Never imply a check passed if it was not run; distinguish unavailable checks from intentionally skipped checks.

## Repository Commands

- `npm run lint` runs ESLint across the repository.
- `npm run build` runs the Vite production build.
- `npm test -- --run` runs Vitest once. No test files currently exist; recheck before each validation.