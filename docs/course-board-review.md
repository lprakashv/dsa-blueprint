# Course Board learner migration

The stock learner now builds DSA Blueprint. The project pins Course Board commit `046dd2c`, the commit that merged Studio and the bundle import command. [Upstream commit](https://github.com/lprakashv/course-board/commit/046dd2ca02dfdea90ac7a94d817898096b712c6c)

The migration used `course-board ingest` to write the manifest, Markdown lessons, snippets, and public assets. The 42 original lessons keep their IDs and the order of their numbered walkthrough steps. When you edit the files in Studio and save, the Course Board development server reads the same files on reload. The production build uses the same compiler and renders the same model in the stock learner.

| Material | Course Board format |
| --- | --- |
| 183 original walkthrough steps | Markdown guides, state tables, and static HTML board attachments |
| Pattern signal, invariant, complexity, and common error | Pattern notes steps |
| 42 practice questions and 10 challenge prompts | Markdown practice, hints, answer, and exercise steps |
| 84 Python and Java examples | Local files referenced by native `snippet` blocks |
| Cheatsheets | One reference lesson with a step per original chapter |
| Branding and theme | Manifest title and description, with CSS theme variables |

## Learner differences

- The stock learner uses `#/<lesson-id>/<step>` and its own browser progress storage. Earlier fragment routes and saved DSA progress do not carry over.
- The stock learner provides manual navigation with Previous, Next, and arrow keys. It uses the browser's color preference for light or dark mode. The old shell's playback, pane resizing, and theme toggle are retired.
- The previous Playground's input form is retired. The Two Pointers, Sliding Window, and Binary Search notes link to the code examples for checking a hand trace.
- The learner has no declarative Google Analytics or Google Tag Manager setting. The Pages build no longer passes `GOOGLE_TAG_ID`.
- Studio can replace a migrated HTML diagram or update its metadata. To change the markup of an existing HTML asset, edit the file in `public/diagrams/`. The learner displays it in a sandboxed frame. For new editable drawings, use Studio to create an Excalidraw board.

See [Contributing](../CONTRIBUTING.md) for the source layout, Studio commands, and bundle import procedure.
