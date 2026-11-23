# Contributing

Thank you for helping improve DSA Blueprint. Corrections to explanations, examples, accessibility, and code are welcome.

## Start

1. Fork the repository and clone your fork.
2. Use Node.js 22.12 or later, npm, and Python 3. No package installation is needed.
3. Create a branch for your change and run `npm run dev`. Open http://127.0.0.1:4173/.

See the [README](README.md) for the project map and deployment steps. See [AGENTS.md](AGENTS.md) for design and implementation conventions.

## Make a change

Keep changes focused. Add a pattern when it applies to several problems. Add related exercises to an existing lesson when it already teaches the technique. Check each changed lesson’s example, complexity, invariant, pitfalls, Python code, diagram states, and practice answer. Register lesson data in `site/src/lessons.js`. Reuse `step`, `code`, `quiz`, and existing diagram shapes.

Use **Misc Problems** for widely practiced hard problems with public evidence of use in major tech interviews. Give each problem a `challenge` entry and a visual solution that explains why the algorithm works. Write original examples and code, and use public problem links.

Add or update tests when behavior changes. Update the README or other affected documentation. For visual changes, use the Designed to Scale palette and pane layout as the reference. Check the affected views in a browser, including light and dark themes, keyboard controls, and a narrow viewport.

Before opening a pull request, run:

```sh
npm run lint
npm test
npm run coverage
npm run build
```

For a production preview, run `npm run run` after the build and open http://127.0.0.1:4174/. Stop either local server with Ctrl+C.

## Open a pull request

Describe the problem, the change, and the checks you ran. Link a related issue if there is one. Include screenshots or a short recording for visible changes. Note any limits or follow-up work. The GitHub Actions workflow runs the checks and build for pull requests to `main`.

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).
