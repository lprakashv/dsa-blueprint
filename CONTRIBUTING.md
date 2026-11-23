# Contributing

Corrections to explanations, examples, accessibility, and diagrams are welcome.

## Start

Fork and clone DSA Blueprint. Use Node.js 22.12 or later, npm, Python 3, and JDK 17 or later. Run `npm ci`, then `npm run dev`. Open [the learner preview](http://127.0.0.1:4173/).

## Edit in Course Board Studio

Studio uses the editor dependencies from a Course Board source checkout. The following commands assume that the current directory is the DSA Blueprint root and that the Course Board checkout is next to it. If you already have that checkout at the pinned commit, start with the second command block.

```sh
git clone https://github.com/lprakashv/course-board.git ../course-board
git -C ../course-board checkout --detach 9e76c08de42190571454631d64c8f90572bcc89f
```

```sh
npm --prefix ../course-board ci
node ../course-board/src/cli.js author .
```

Open [Course Board Studio](http://127.0.0.1:4175/). Select a lesson and edit the Markdown or attach a board. Select **Save course**, then reload the learner preview. Stop Studio with Ctrl+C. [Course Board authoring guide](https://github.com/lprakashv/course-board/blob/9e76c08de42190571454631d64c8f90572bcc89f/docs/authoring.md)

## Edit source files or import a bundle

- Set chapter and lesson order in `content/course.json`. Each lesson ID maps to `content/lessons/<id>.md`.
- Use `##` for step titles and `###` or lower for headings within a step. Put a fenced `step` block immediately below the title to set a named ID, attach a diagram, or reference a snippet. Keep lesson IDs and the order of published numbered steps stable. Keep named step IDs stable when you reorder steps.
- Keep the example, complexity, invariant, common error, metrics, and practice answer consistent. Include a question, a separate answer, and related exercises. For a challenge, also include a problem statement, example, constraints, hints, and a public judge link.
- Put example files in `content/snippets/`. Set `snippet.src` relative to that directory and set `snippet.language` to `python` or `java`. Edit the file directly to update its content. Reflect new examples in `test/python.test.js` and `test/java.test.js`.
- Put board files under `public/` and set `diagram.src` relative to it. Write descriptive alternative text. Edit a migrated HTML board as a static file or replace it with a board attachment in Studio. To draw a new board, use Studio's Excalidraw editor. The learner renders attachments with Course Board's diagram types.
- Change theme colors in `public/theme.css`. Review both device color schemes. Keep the interface accessible by keyboard and check a narrow screen.

For bulk import, prepare a JSON bundle with a manifest, lessons, and optional maps from project destinations to source files. The bundle supplies the course outline. Course Board checks the result before it updates source files. The imported Markdown and assets are the editable source after import. [Bundle schema](https://github.com/lprakashv/course-board/blob/9e76c08de42190571454631d64c8f90572bcc89f/schemas/ingest.json)

```sh
npm run ingest -- /path/to/course-bundle.json
npm run lint
```

## Check a change

```sh
npm run lint
npm test
npm run coverage
npm run build
```

Lint runs the Course Board content validator. The tests check links, the stock learner build, and all Python and Java examples. Coverage runs the Node tests with coverage reporting. Browser behavior belongs to Course Board and is checked separately.

Run `npm run run` and open [the production preview](http://127.0.0.1:4174/). Check the affected steps, direct links, and keyboard controls. Update the README or other affected docs. See the [agent guide](AGENTS.md) for project conventions.

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE).
