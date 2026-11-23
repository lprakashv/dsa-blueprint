# DSA Blueprint 🧭

Learn coding interview patterns with step-by-step whiteboards, Python and Java examples, and practice questions.

[Open the course](https://www.lprakashv.com/dsa-blueprint/) · [Contribute](CONTRIBUTING.md) · [Agent guide](AGENTS.md)

![DSA Blueprint course index with chapters and lesson links](https://www.lprakashv.com/dsa-blueprint/screenshot.png)

## Explore the course

- Use the home page to browse 42 lessons across seven topic chapters. Use the course outline to search for a lesson or step.
- Open **Pattern notes** for the invariant, complexity, and common error. Open **Python example** or **Java example** for the implementation.
- In **Practice**, review the choices and open **Check the answer** to see the explanation and related exercises. The ten **Misc Problems** lessons include problem statements, constraints, hints, and links to LeetCode.
- Open **Reference → Pattern cheatsheets** to compare signals and costs and jump to code examples.

Use Previous, Next, or the left and right arrow keys to move between steps. Select **Mark complete** on the last step to save progress in the browser. Use **Theme** to choose a color scheme. On wide screens, drag the pane dividers or use the arrow keys to resize them.

The Java examples use fixed-width numeric types. Assume that inputs and intermediate results fit those types. The string examples use UTF-16 units. Use code points for strings that contain supplementary Unicode characters.

## Run locally

Install Node.js 22.12 or later and npm. The example tests also need Python 3 and JDK 17 or later.

```sh
git clone https://github.com/lprakashv/dsa-blueprint.git
cd dsa-blueprint
npm ci
npm run dev
```

Open [the learner preview](http://127.0.0.1:4173/). Save changes to the course files and reload the page. Stop the server with Ctrl+C.

Course Board is pinned to the `v0.3.0` tag commit `9e76c08`. The Course Board learner builds and serves this site from the same files Studio edits. [Course Board source](https://github.com/lprakashv/course-board/tree/9e76c08de42190571454631d64c8f90572bcc89f)

## Author and import

| Path | Contents |
| --- | --- |
| `content/course.json` | Course title, chapter and lesson order, and theme |
| `content/lessons/` | Step guides, metrics, practice, hints, and cheatsheets |
| `content/snippets/` | Python and Java examples referenced by lesson steps |
| `public/diagrams/` | Static whiteboard files and shared styles |
| `public/theme.css` | DSA Blueprint colors and typography |

Use Course Board Studio to edit the course or `npm run ingest -- /path/to/course-bundle.json` to import a full bundle. See [Contributing](CONTRIBUTING.md) for Studio setup, the bundle format, and checks.

## Build and deploy

```sh
npm run lint
npm test
npm run coverage
npm run build
npm run run
```

Open [the production preview](http://127.0.0.1:4174/). Stop the server with Ctrl+C. Upload `dist/` to a static host. Relative asset paths support subdirectory hosting.

The GitHub Pages workflow checks pull requests to `main` and publishes the site and screenshot on pushes to `main` or manual runs. Set **Pages → Build and deployment → Source** to **GitHub Actions**. [Deployment workflow](.github/workflows/deploy-pages.yml)

The build reads the `GOOGLE_TAG_ID` GitHub Actions repository secret to enable Google Analytics. Use a GA4 measurement ID. If the secret is empty, analytics is disabled. The ID is visible in the published site. Course Board records the initial page view and fragment navigation; disable overlapping history-change measurement in Google Analytics to avoid duplicate views. [Analytics guide](https://github.com/lprakashv/course-board/blob/9e76c08de42190571454631d64c8f90572bcc89f/docs/publishing.md#add-analytics-to-the-default-site)

## Learner migration

Course Board uses links such as `#/two-pointers/2` and `#/two-pointers/practice`. Earlier `#/learn/…`, `#/practice/…`, and other DSA routes need new links. Completion uses the Course Board storage format and starts fresh. The three lessons with custom input previously available include instructions to trace an input and verify it with the examples. The stock learner has manual step controls and a theme selector. [Migration details](docs/course-board-review.md)

## Credits and license

DSA Blueprint's original whiteboard style draws from [Designed to Scale](https://designed-to-scale.vercel.app/#/). The whiteboard uses Virgil under the [SIL Open Font License](public/fonts/Virgil-LICENSE.md).

The B-tree example uses minimum degree 2. The B+ tree example uses the first key in the right subtree as a separator and shows record keys in the leaves. [OpenDSA](https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS3/html/BTree.html)

References for Union-Find and shortest-path algorithms include [Princeton](https://algs4.cs.princeton.edu/15uf/) and [MIT](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-videos/).

Released under the [MIT License](LICENSE).
