# Contributing

Thank you for helping improve DSA Blueprint. Corrections to explanations, examples, accessibility, and code are welcome.

## Start

1. Fork the repository and clone your fork.
2. Use Node.js 22.12 or later, npm, and Python 3. No package installation is needed.
3. Create a branch for your change and run `npm run dev`. Open http://127.0.0.1:4173/.

See the [README](README.md) for the project map and deployment steps. See [AGENTS.md](AGENTS.md) for design and implementation conventions.

## Make a change

Keep changes focused. For a new or changed lesson, check its example, complexity, invariant, pitfalls, Python code, diagram states, and practice answer. Lesson data is registered in `site/src/lessons.js`; larger topic-specific lessons live in the `*-lessons.js` files. Reuse `step`, `code`, `quiz`, and existing diagram shapes where they fit. A `challenge` entry adds a hard problem to the picker.

Add or update tests when behavior changes. Update the README or other affected documentation. For visual or interaction changes, check the affected views in a browser, including keyboard use and a narrow viewport when relevant.

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
