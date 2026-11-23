# Agent guide

Read [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md) before making changes. Preserve user changes and follow any more specific instructions in the active task.

## Product and design

DSA Blueprint teaches coding interview patterns with step-by-step whiteboards, practice questions, and cheatsheets. Keep explanations concise, accurate, and suitable for learners. Use ASD-STE100 for documentation and explanations. State assumptions when they matter.

Preserve responsive layout, light and dark themes, keyboard controls, accessible names, and visible focus states. Give diagram states text labels where color alone would make their meaning unclear.

## Structure and contracts

Course Board imports, validates, builds, and renders the site. Use its manifest, Markdown, asset, and snippet formats for course changes. Keep project customization in `content/` and `public/`. Use the pinned Course Board source checkout for Studio.

`content/course.json` sets chapter order and membership. Keep published lesson IDs, named step IDs, and numbered walkthrough order stable. Each study lesson needs a walkthrough, notes, examples in both languages, and a practice question with an answer. A challenge also needs a prompt, example, constraints, hints, and a judge link. Keep explanations, diagram states, examples, and complexity consistent. Use relative asset paths for subdirectory hosting.

## Verify

Run `npm run lint`, `npm test`, `npm run coverage`, and `npm run build` for relevant changes. Add focused checks for changed behavior and keep example tests in sync. For visual changes, check the relevant steps, keyboard access, and a narrow screen in a browser. Update affected parent documentation and report any checks you could not run.

`dist/` is generated. `showcase/` is ignored and holds local materials. Do not publish or post material without a user request.
