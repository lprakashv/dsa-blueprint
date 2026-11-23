# Contributing

Thank you for helping improve DSA Blueprint. Corrections to explanations, examples, accessibility, and code are welcome.

## Start

1. Fork the repository and clone your fork.
2. Use Node.js 22.12 or later, npm, Python 3, and JDK 17 or later. Run `npm ci` to install the pinned dependencies.
3. Create a branch for your change and run `npm run dev`. Open http://127.0.0.1:4173/.

See the [README](README.md) for the project map and deployment steps. See [AGENTS.md](AGENTS.md) for design and implementation conventions.

## Make a change

Keep changes focused. Add a pattern when it applies to several problems. Add related exercises to an existing lesson when it already teaches the technique. Check each changed lesson’s example, complexity, invariant, pitfalls, Python and Java code, diagram states, and practice answer. Register lesson data in `site/src/lessons.js`. Reuse `step`, `code`, `quiz`, and existing diagram shapes.

Edit lesson titles, summaries, step titles, and step prose in `content/lessons/<id>.md`. The Course Board manifest in `content/course.json` sets chapter and lesson order. Keep each chapter's name and lesson membership, each lesson ID, and the number and order of steps aligned with the JavaScript data. The JavaScript retains older copies of some text as well as the scene, label, metrics, code, and practice data. Markdown is the source for displayed lesson titles, summaries, step titles, and prose. Change the related JavaScript data together with the Markdown when needed.

To override a step's diagram, add a Course Board `step` block directly below its heading. ASCII, image, SVG, Excalidraw SVG, sandboxed HTML, and custom renderers are supported. Put file assets in `public/`; the build validates them and publishes them under `media/`. For a custom renderer, set `extension` in the manifest to a module in `public/` that exports a `diagrams` map. Extensions are trusted code. The built-in `dsa-scene` renderer is reserved. The app shows the diagram's caption and an Excalidraw source download when supplied. An authored diagram replaces the existing scene and its metrics and legend for that step. Steps without a diagram retain the existing scene and animation. See the [Course Board authoring guide](https://github.com/lprakashv/course-board/blob/v0.1.2/docs/authoring.md#5-choose-a-diagram-type).

Run `npm run setup:course-board` after content or asset edits, or restart `npm run dev`, to compile the Markdown and copy assets before previewing them.

The production build calls Course Board's site builder with the DSA custom shell in `scripts/course-shell.js`. The shell writes the existing interface and the validated course model to the build directory. Course Board's browser entry point starts `site/src/app.js` as its adapter. The adapter uses the shared shell lifecycle and storage helpers. Keep routes and the `pattern-studio-v1` storage format compatible when changing the interface.

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
