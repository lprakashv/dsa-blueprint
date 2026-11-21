# DSA Blueprint

DSA Blueprint is a visual course for coding interviews. It has 30 lessons and 130 steps across arrays and strings, search and sorting, data structures, trees and graphs, matrices and grids, and optimization.

- **Learn** shows each algorithm one step at a time. Use the timeline, arrow keys, or playback controls. Press Space to play or pause and R to reset. Open **Python implementation** for the code.
- **Practice** has pattern questions with feedback and a **Hard problems** picker. Each hard problem has a statement, constraints, a worked example, two hints, and links to its visual walkthrough and LeetCode judge.
- **Playground** builds traces from custom inputs for Two Pointers, Sliding Window, and Binary Search.
- **Cheatsheets** show when to use each pattern, its complexity, and a Python template.

The course outline, central diagram, and step guide take inspiration from [Designed to Scale](https://designed-to-scale.vercel.app/#/). DSA Blueprint has its own lesson content and visual design. Completion and theme settings are stored in the browser.

The B-tree example uses a minimum degree of 2. The B+ tree example uses the first key in the right subtree as a separator. The diagram shows the record keys in the leaves. See [OpenDSA’s B-tree and B+ tree chapter](https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS3/html/BTree.html).

The graph lessons show Union-Find, Dijkstra, Bellman–Ford, and Floyd–Warshall. See [Princeton’s Union-Find case study](https://algs4.cs.princeton.edu/15uf/) and [MIT’s shortest-path lectures](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-sma-5503-fall-2005/resources/lecture-videos/).

The hard problems cover variable-size sliding windows, monotonic stacks, word transformations, grid BFS with a removal budget, and interval dynamic programming. They use original examples and link to the corresponding LeetCode problems.

## Development

Use Node.js 22.12 or later, npm, and Python 3. There are no packages to install.

```sh
npm run dev
```

Open [the development site](http://127.0.0.1:4173/).

```sh
npm run lint
npm test
npm run coverage
```

Lint checks JavaScript syntax and source whitespace. The tests check routes, lesson and diagram data, custom-input traces, and each Python example. Browser interaction checks run separately from the coverage task.

To add a pattern, register the lesson in its chapter in `site/src/lessons.js`. Give it an ID, an interview problem, steps with diagram data, a Python example, and a practice question. A lesson with a `challenge` entry also appears in the Hard problems picker. The course outline, search, practice view, and cheatsheets use the same lesson data.

## Production

```sh
npm run build
npm run run
```

Open [the build preview](http://127.0.0.1:4174/). Publish the contents of `dist/` to a static host. Use `npm run build` as the build command and `dist` as the output directory. Routes use URL fragments, so the host can serve the same index file from the root or a subdirectory.
