# DSA Blueprint 🧭

An interactive course for learning coding interview patterns. Follow an algorithm one step at a time, test your understanding, and build traces with your own inputs.

[Open the app](https://www.lprakashv.com/dsa-blueprint/) · [Contribute](CONTRIBUTING.md) · [Agent guide](AGENTS.md)

![DSA Blueprint lesson with a course outline and algorithm whiteboard](https://www.lprakashv.com/dsa-blueprint/screenshot.png)

## Explore the course

- **Learn:** Work through 42 lessons in seven modules. Each lesson includes a diagram, a step guide, complexity notes, and Python and Java implementations.
- **Practice:** Answer pattern questions or open **Misc Problems** for ten hard problems with examples, hints, and detailed visual solutions.
- **Playground:** Build traces with your own inputs for Two Pointers, Sliding Window, and Binary Search.
- **Cheatsheets:** Review pattern signals, complexity, and Python and Java templates.

On desktop, the course outline sits beside the lesson text and whiteboard. Drag either divider to change the pane width. With a divider focused, use the arrow keys to resize it. On narrow screens, open the outline from the header. The whiteboard appears above the lesson text.

Use Back, the step menu, Next, or the arrow keys to move between steps. Press Space to play or pause, R to reset, and / to search. The app stores completed lessons, the theme, and pane widths in browser local storage.

The Java examples use fixed-width numeric types. Assume that inputs and intermediate results fit those types. String examples use Java UTF-16 characters; use code points when an input can include supplementary characters.

## Run locally 🚀

You need Node.js 22.12 or later, npm, Python 3, and JDK 17 or later.

```sh
git clone https://github.com/lprakashv/dsa-blueprint.git
cd dsa-blueprint
npm ci
npm run dev
```

Open [http://127.0.0.1:4173/](http://127.0.0.1:4173/). Stop the server with Ctrl+C.

## Checks

```sh
npm run lint
npm test
npm run coverage
npm run build
```

Lint checks JavaScript syntax and source whitespace. Tests check lesson data, diagrams, routes, playground traces, and Python and Java examples. Coverage reports the JavaScript modules loaded by the tests; it does not measure browser interactions. See [CONTRIBUTING.md](CONTRIBUTING.md) for the change and review process.

## Project map

| Path | Purpose |
| --- | --- |
| `site/index.html`, `site/src/app.js` | App shell, views, and interactions |
| `site/src/lessons.js`, `*-lessons.js`, `lesson-content.js` | Course data and lesson helpers |
| `content/course.json`, `content/lessons/` | Course Board chapter order and Markdown lesson text |
| `site/src/diagrams.js`, `trace.js` | Diagram rendering and playground algorithms |
| `site/src/course-board.js` | Course Board adapter for lesson and playground diagrams |
| `scripts/course-shell.js` | DSA shell for the Course Board site builder |
| `site/src/navigation.js`, `panes.js`, `style.css` | Routes, pane resizing, and visual styles |
| `test/` | Node tests and Python example checks |
| `scripts/` | Static build and lint scripts |
| `.github/workflows/` | Checks and GitHub Pages deployment |

The app compiles the Course Board manifest and Markdown lesson text, and uses its diagram dispatcher with the existing renderer. Setup scripts generate `site/src/generated/` and `site/media/` and copy the browser modules to `site/src/vendor/` before development, lint, tests, coverage, and builds. These generated files are not committed. Restart `npm run dev` after changing course content or assets.

The app starts through the Course Board shell entry point. A DSA adapter supplies its layout and controls and uses the shared shell lifecycle and storage helpers with the existing routes and storage key. The production builder uses the DSA shell to publish that interface. Diagram scenes, step labels, examples, quizzes, and playground traces remain in JavaScript. Keep chapter names, lesson membership, IDs, and step counts aligned with that data. Markdown steps can also use Course Board diagram blocks. See [CONTRIBUTING.md](CONTRIBUTING.md) for authoring steps.

The app uses the pinned Course Board GitHub Release asset. `npm ci` installs it for local builds and GitHub Actions.

## Deploy

Build and preview the production files:

```sh
npm run build
npm run run
```

Open [http://127.0.0.1:4174/](http://127.0.0.1:4174/) and stop the server with Ctrl+C. Publish the contents of `dist/` to a static host. Fragment routes work when the site is hosted at the root or in a subdirectory.

The [GitHub Pages workflow](.github/workflows/deploy-pages.yml) runs checks on pull requests to `main` and builds and deploys on pushes to `main` or manual dispatch. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The configured project endpoint is [www.lprakashv.com/dsa-blueprint](https://www.lprakashv.com/dsa-blueprint/).

The workflow captures the built site and publishes the README screenshot with each successful deployment. The screenshot link requires the Pages site to be available; cached copies may take time to refresh.

If the site shows the repository README, check the Pages source. **Deploy from a branch** can publish the repository root and replace the app. Set the source to **GitHub Actions**, then run **Deploy to GitHub Pages** from the Actions tab and check the site after the run succeeds.

### Website analytics

The site supports direct Google Analytics 4 (GA4) setup or Google Tag Manager (GTM). Tracking stays off until you add an ID. To enable it with GTM:

1. In Google Analytics, create a GA4 property and a **Web** data stream for `https://www.lprakashv.com/dsa-blueprint/`. Copy its measurement ID, which starts with `G-`.
2. In Google Tag Manager, add a [Google tag](https://support.google.com/tagmanager/answer/14842872) with that `G-` measurement ID. Set its trigger to **Initialization – All Pages**. Turn off its automatic page view and browser history page views. The site sends its own page view events, including fragment route changes.
3. Add a [GA4 Event tag](https://support.google.com/tagmanager/answer/13034206) with event name `page_view`. Set a **Custom Event** trigger with event name `app_page_view`. Add Data Layer Variables for `page_title`, `page_location`, and `page_path`, then map these as event parameters. Submit and publish the container.
4. In GitHub, open the repository **Settings → Secrets and variables → Actions → Variables**. Add a repository variable named `GOOGLE_TAG_ID` and set it to the GTM container ID. This ID is public and does not need to be a secret.
5. Run the **Deploy to GitHub Pages** workflow, or push a commit to `main`.
6. Visit the site and check the GA4 **Realtime** report. Google notes that initial collection can take up to 30 minutes.

For direct GA4 setup without Tag Manager, set `GOOGLE_TAG_ID` to the stream measurement ID (`G-...`) instead. Do not use both IDs.

For a local production preview, build with `GOOGLE_TAG_ID=GTM-... npm run build` (or `G-...`), then run `npm run run`. The normal development server does not send analytics. Update your privacy notice and consent setup if applicable to your visitors or region.

## Credits and license

DSA Blueprint uses the course layout and whiteboard style from [Designed to Scale](https://designed-to-scale.vercel.app/#/). The whiteboard uses the Virgil typeface under the [SIL Open Font License](site/assets/Virgil-LICENSE.md).

The B-tree example uses minimum degree 2. The B+ tree example uses the first key in the right subtree as a separator and shows record keys in the leaves. See [OpenDSA](https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS3/html/BTree.html). The graph lessons include Union-Find and shortest-path algorithms; see [Princeton](https://algs4.cs.princeton.edu/15uf/) and [MIT](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-videos/).

Released under the [MIT License](LICENSE).
