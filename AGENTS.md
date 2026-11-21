# Agent guide

Read [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md) before making changes. Preserve user changes and follow any more specific instructions in the active task.

## Product and design

DSA Blueprint teaches coding interview patterns through step-by-step visuals, practice, a custom-input playground, and cheatsheets. Keep explanations concise, accurate, and suitable for learners. Use ASD-STE100 style for documentation and explanations. State assumptions when they matter.

Preserve the current visual language, responsive layout, light and dark themes, keyboard controls, semantic HTML, accessible names, and visible focus states. Do not rely on color alone to convey meaning. Check affected views in a browser when the UI changes.

## Structure and contracts

The app is a static site with native ES modules and no runtime dependencies. Prefer existing helpers and browser or standard-library features. Keep changes small and avoid new dependencies and configuration unless required. If a dependency is needed, check its maintenance and permissive license first.

`lessons.js` assembles the course from lesson objects and topic modules. Lesson IDs are used in fragment routes, progress, and cross-links; preserve them unless a migration is part of the task. Each lesson needs renderable steps, a Python example, and a practice question. A challenge also needs its prompt, example, constraints, hints, and judge slug. Use existing data shapes and tests as the contract. Keep algorithm explanations, diagram states, examples, and complexity consistent.

`trace.js` owns playground input validation and trace generation. `diagrams.js` renders scene data; escape dynamic text at HTML boundaries. `navigation.js` handles fragment routes. `app.js` owns rendering and interactions. Progress and theme use browser local storage; preserve existing saved data and graceful failure when storage is unavailable. Static hosting must work in a subdirectory.

## Verify

Run `npm run lint`, `npm test`, `npm run coverage`, and `npm run build` for relevant changes. Add focused tests for changed behavior, including edge cases and Python examples where applicable. Coverage excludes browser-only interactions. For UI changes, also check the affected behavior, keyboard access, and responsive layout in a browser. Update affected parent documentation and describe any checks you could not run.

`dist/` is generated. `showcase/` is ignored and holds local post materials; do not commit it. README images in `docs/images/` are documentation assets. Do not publish or post material without a user request.
