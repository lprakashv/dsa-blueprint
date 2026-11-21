import { step, code, quiz, matrix } from './lesson-content.js'

const islands = [[1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 0, 1]]
const firstIsland = [[0, 0], [0, 1], [1, 1]]
const secondIsland = [[1, 3], [2, 3]]
const water = [[0, 2], [0, 3], [1, 0], [1, 2], [2, 1], [2, 2]]
const islandScene = (caption, options = {}) => matrix(islands, caption, {
  blocked: water, legend: ['Current island', 'Visited land', 'Water'], ...options,
})

const sources = [[0, 0], [2, 4]]
const layerOne = [[0, 1], [1, 0], [1, 4], [2, 3]]
const layerTwo = [[0, 2], [0, 4], [1, 3], [2, 0], [2, 2]]
const layerThree = [[0, 3], [2, 1]]
const wave = (values, caption, current, done = []) => matrix(values, caption, {
  current, done, blocked: [[1, 1], [1, 2]], legend: ['Current layer', 'Earlier layers', 'Wall'],
})

const numbers = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
const topRow = [[0, 0], [0, 1], [0, 2], [0, 3]]
const rightColumn = [[1, 3], [2, 3]]
const bottomRow = [[2, 2], [2, 1], [2, 0]]
const outerRing = [...topRow, ...rightColumn, ...bottomRow, [1, 0]]
const spiral = (caption, current, done = []) => matrix(numbers, caption, { current, done, legend: ['Current segment', 'Read'] })

const queryValues = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const prefixValues = [[0, 0, 0, 0], [0, 1, 3, 6], [0, 5, 12, 21], [0, 12, 27, 45]]
const prefix = (caption, current, done = []) => matrix(prefixValues, caption, { current, done, legend: ['Current total', 'Other terms'] })

export const matrices = [
  {
    id: 'grid-dfs', title: 'Grid DFS & Flood Fill', problem: 'Count Islands in a Binary Grid',
    summary: 'Treat each land cell as a node and visit all land in its component before counting the next island.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(R × C)', space: 'O(R × C)',
    signal: 'Look for connected regions, island counts, or groups of cells with the same value.',
    invariant: 'A cell enters the visited set before it enters the stack. Each new search counts one component.',
    pitfall: 'Check the allowed moves. Here only up, down, left, and right connect two cells.',
    steps: [
      step('Set neighbors', 'Decide which cells touch', 'A 1 is land and a 0 is water. Cells share an island when you can reach one from the other by moving along edges.',
        islandScene('4 neighbors per cell · no diagonals')),
      step('Flood first', 'Visit all land reachable from (0, 0)', 'The first land cell starts a depth-first search. Visit (0, 1) and (1, 1). Mark those three cells as one island.',
        islandScene('Island 1 · 3 land cells', { current: firstIsland })),
      step('Flood second', 'Keep scanning for fresh land', 'Skip water and marked cells. Start the second search at (1, 3). It reaches (2, 3).',
        islandScene('Island 2 · 2 land cells', { current: secondIsland, done: firstIsland })),
      step('Count last', 'Count the isolated cell', 'The land at (2, 0) has no land neighbor. It is the third island. Return 3.',
        islandScene('3 connected components', { current: [[2, 0]], done: [...firstIsland, ...secondIsland] })),
    ],
    code: code(
      'def count_islands(grid):',
      '    if not grid or not grid[0]:',
      '        return 0',
      '    rows, cols = len(grid), len(grid[0])',
      '    directions = ((-1, 0), (1, 0), (0, -1), (0, 1))',
      '    seen, count = set(), 0',
      '    for row in range(rows):',
      '        for col in range(cols):',
      '            if grid[row][col] != 1 or (row, col) in seen:',
      '                continue',
      '            count += 1',
      '            seen.add((row, col))',
      '            stack = [(row, col)]',
      '            while stack:',
      '                r, c = stack.pop()',
      '                for dr, dc in directions:',
      '                    nr, nc = r + dr, c + dc',
      '                    if (0 <= nr < rows and 0 <= nc < cols',
      '                            and grid[nr][nc] == 1 and (nr, nc) not in seen):',
      '                        seen.add((nr, nc))',
      '                        stack.append((nr, nc))',
      '    return count',
    ),
    practice: quiz('Two land cells share only a corner. Do they form one island in this problem?',
      ['Yes, a corner counts as a connection', 'Only if there is a path of edge-sharing land cells', 'Yes, if they are the same distance from the grid edge'], 1,
      'The movement rule only allows sharing an edge. A diagonal alone does not join two components.',
      [['Number of Islands', 'number-of-islands'], ['Flood Fill', 'flood-fill']]),
  },
  {
    id: 'grid-bfs', title: 'Multi-Source Grid BFS', problem: 'Find the Distance to the Nearest Source',
    summary: 'Start breadth-first search from every source at once and fill the grid in layers.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(R × C)', space: 'O(R × C)',
    signal: 'Look for distance to the nearest of many sources, or a process that spreads one cell per turn.',
    invariant: 'The first wave that reaches a cell gives the shortest distance from any source.',
    pitfall: 'Put every source in the queue before expanding a neighbor. Mark cells as soon as you enqueue them.',
    steps: [
      step('Seed sources', 'Put both sources in the initial queue', 'Each move costs one. The top-left and bottom-right sources both start at distance 0. A wall cannot be crossed.',
        wave([[0, '·', '·', '·', '·'], ['·', '#', '#', '·', '·'], ['·', '·', '·', '·', 0]], 'Distance 0 · both sources', sources)),
      step('Expand once', 'Reach the cells one move away', 'Expand both source cells. Each new open neighbor gets distance 1 before you enqueue it.',
        wave([[0, 1, '·', '·', '·'], [1, '#', '#', '·', 1], ['·', '·', '·', 1, 0]], 'Distance 1 · four cells', layerOne, sources)),
      step('Expand twice', 'Let the waves move around the walls', 'Expand distance-1 cells. A cell already assigned a distance is skipped, even if another wave reaches it.',
        wave([[0, 1, 2, '·', 2], [1, '#', '#', 2, 1], [2, '·', 2, 1, 0]], 'Distance 2 · five cells', layerTwo, [...sources, ...layerOne])),
      step('Finish', 'Read the last layer', 'Two cells first appear at distance 3. The queue then empties. An open cell that never appeared would keep distance −1.',
        wave([[0, 1, 2, 3, 2], [1, '#', '#', 2, 1], [2, 3, 2, 1, 0]], 'Distance 3 · queue drains', layerThree, [...sources, ...layerOne, ...layerTwo])),
    ],
    code: code(
      'from collections import deque',
      '',
      'def nearest_source(grid):',
      '    if not grid or not grid[0]:',
      '        return []',
      '    rows, cols = len(grid), len(grid[0])',
      '    distance = [[-1] * cols for _ in range(rows)]',
      '    queue = deque()',
      '    for row in range(rows):',
      '        for col in range(cols):',
      '            if grid[row][col] == 0:',
      '                distance[row][col] = 0',
      '                queue.append((row, col))',
      '    while queue:',
      '        r, c = queue.popleft()',
      '        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):',
      '            nr, nc = r + dr, c + dc',
      '            if (0 <= nr < rows and 0 <= nc < cols',
      '                    and grid[nr][nc] != -1 and distance[nr][nc] == -1):',
      '                distance[nr][nc] = distance[r][c] + 1',
      '                queue.append((nr, nc))',
      '    return distance',
    ),
    practice: quiz('Why put all sources in the queue at distance 0?',
      ['It makes every source take part in the first wave', 'It lets BFS cross walls', 'It gives later sources larger distances'], 0,
      'Each wave expands paths of the same length from all sources. The earliest wave to reach a cell gives the minimum.',
      [['Rotting Oranges', 'rotting-oranges'], ['01 Matrix', '01-matrix']]),
  },
  {
    id: 'spiral-matrix', title: 'Spiral Matrix', problem: 'Read the Matrix in Clockwise Order',
    summary: 'Read the outer edges, then shrink four boundaries to reach the next inner ring.',
    difficulty: 'Beginner', minutes: 7, time: 'O(R × C)', space: 'O(1) auxiliary',
    signal: 'Look for a layer-by-layer matrix traversal with a regular visit order.',
    invariant: 'The unread cells lie inside the rectangle bounded by top, bottom, left, and right.',
    pitfall: 'Check that a row or column still exists before reading it. Odd dimensions can leave a single center strip.',
    steps: [
      step('Top edge', 'Read the top row left to right', 'Start with the entire rectangle. Read 1, 2, 3, and 4. Move the top boundary down by one.',
        spiral('Output: 1, 2, 3, 4', topRow)),
      step('Right edge', 'Read the right column downward', 'The top row is already excluded. Read 8 and 12, then move the right boundary left.',
        spiral('Append: 8, 12', rightColumn, topRow)),
      step('Bottom edge', 'Read the bottom row right to left', 'The right boundary moved inward. Read 11, 10, and 9. Then move the bottom boundary up.',
        spiral('Append: 11, 10, 9', bottomRow, [...topRow, ...rightColumn])),
      step('Left edge', 'Read the left column upward', 'Only 5 remains in the left column of this ring. Read it and move the left boundary right.',
        spiral('Append: 5', [[1, 0]], [...topRow, ...rightColumn, ...bottomRow])),
      step('Inner row', 'Check bounds before every edge', 'The inner rectangle has one row. Read 6 and 7. The row bounds cross, so the traversal is complete.',
        spiral('Append: 6, 7 · 12 cells total', [[1, 1], [1, 2]], outerRing)),
    ],
    code: code(
      'def spiral_order(grid):',
      '    if not grid or not grid[0]:',
      '        return []',
      '    top, bottom = 0, len(grid) - 1',
      '    left, right = 0, len(grid[0]) - 1',
      '    result = []',
      '    while top <= bottom and left <= right:',
      '        for col in range(left, right + 1):',
      '            result.append(grid[top][col])',
      '        top += 1',
      '        for row in range(top, bottom + 1):',
      '            result.append(grid[row][right])',
      '        right -= 1',
      '        if top <= bottom:',
      '            for col in range(right, left - 1, -1):',
      '                result.append(grid[bottom][col])',
      '            bottom -= 1',
      '        if left <= right:',
      '            for row in range(bottom, top - 1, -1):',
      '                result.append(grid[row][left])',
      '            left += 1',
      '    return result',
    ),
    practice: quiz('What do you check before you traverse the bottom row?',
      ['That the top boundary is at or above the bottom boundary', 'That every row has a different sum', 'That the height is even'], 0,
      'If top is past bottom, the last available row is already read.',
      [['Spiral Matrix', 'spiral-matrix'], ['Spiral Matrix II', 'spiral-matrix-ii']]),
  },
  {
    id: 'matrix-prefix-sum', title: '2D Prefix Sum', problem: 'Answer Rectangle Sum Queries',
    summary: 'Build a table of cumulative rectangle sums, then answer each query with four lookups.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(R × C) build · O(1) query', space: 'O(R × C)',
    signal: 'Look for many rectangle sum queries on a matrix whose values stay fixed.',
    invariant: 'prefix[r][c] sums the first r rows and first c columns.',
    pitfall: 'Add the overlap back after subtracting the two strips. Both strips include the same top-left region.',
    steps: [
      step('Mark query', 'Mark the inclusive rectangle', 'Sum rows 1 through 2 and columns 1 through 2. Use a prefix table so each later rectangle costs the same to query.',
        matrix(queryValues, 'Query: rows 1–2 · columns 1–2', { current: [[1, 1], [1, 2], [2, 1], [2, 2]], legend: ['Query rectangle'] })),
      step('Build table', 'Add a zero row and column', 'For each entry, add its top and left totals and the current input. Subtract the top-left total once. The full matrix sums to 45.',
        prefix('45 = 21 + 27 − 12 + 9', [[3, 3]], [[2, 3], [3, 2], [2, 2]])),
      step('Remove strips', 'Subtract the two strips outside the query', 'Start with prefix[3][3] = 45. Remove the top strip of 6 and the left strip of 12. This removes the top-left 1 twice.',
        prefix('45 − 6 − 12 = 27', [[1, 3], [3, 1]], [[3, 3]])),
      step('Add overlap', 'Add the shared corner once', 'Add prefix[1][1] = 1. The remaining total is 28. The same four lookups work for any rectangle.',
        prefix('45 − 6 − 12 + 1 = 28', [[1, 1]], [[3, 3], [1, 3], [3, 1]])),
    ],
    code: code(
      'def build_matrix_prefix(grid):',
      '    rows = len(grid)',
      '    cols = len(grid[0]) if rows else 0',
      '    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]',
      '    for r in range(1, rows + 1):',
      '        for c in range(1, cols + 1):',
      '            prefix[r][c] = (grid[r - 1][c - 1] + prefix[r - 1][c]',
      '                            + prefix[r][c - 1] - prefix[r - 1][c - 1])',
      '    return prefix',
      '',
      'def rectangle_sum(prefix, top, left, bottom, right):',
      '    return (prefix[bottom + 1][right + 1] - prefix[top][right + 1]',
      '            - prefix[bottom + 1][left] + prefix[top][left])',
    ),
    practice: quiz('Why add prefix[top][left] in the query?',
      ['It restores the area that both subtractions removed', 'It includes the next row down', 'It accounts for the zero border'], 0,
      'The two strips overlap. After subtracting both, restore their shared corner once.',
      [['Range Sum Query 2D', 'range-sum-query-2d-immutable'], ['Matrix Block Sum', 'matrix-block-sum']]),
  },
]
