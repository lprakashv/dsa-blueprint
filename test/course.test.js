import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { diagram, escapeText, legend } from '../site/src/diagrams.js'
import { lessons } from '../site/src/lessons.js'
import { getRoute, lessonLink } from '../site/src/navigation.js'

test('every lesson has renderable frames, a valid link and a practice answer', () => {
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, lessons.length)
  for (const lesson of lessons) {
    const { practice } = lesson
    assert.ok(practice.options[practice.answer])
    assert.ok(practice.why)
    assert.ok(practice.exercises.length)
    if (lesson.challenge) {
      const { slug, prompt, input, output, explanation, constraints, hints } = lesson.challenge
      assert.equal(lesson.difficulty, 'Hard')
      assert.match(slug, /^[a-z0-9-]+$/)
      assert.ok(prompt && input && output && explanation)
      assert.ok(constraints.length && hints.length >= 2)
    }
    assert.ok(lesson.steps.length >= 2)
    for (const [index, frame] of lesson.steps.entries()) {
      assert.ok(frame.label && frame.title && frame.body)
      assert.ok(diagram(frame.scene).startsWith('<div'))
      assert.ok(legend(frame.scene).length >= 2)
      assert.deepEqual(getRoute(lessonLink(lesson, index), lessons), { page: 'learn', lesson, step: index })
    }
  }
  assert.equal(escapeText('<script> "x" & \'y\''), '&lt;script&gt; &quot;x&quot; &amp; &#39;y&#39;')
})

test('missing and invalid routes fall back to a valid page and step', () => {
  assert.deepEqual(getRoute('#/', lessons), { page: 'learn', lesson: lessons[0], step: 0 })
  assert.equal(getRoute('#/learn/two-pointers/999', lessons).step, lessons[0].steps.length - 1)
  assert.equal(getRoute('#/learn/two-pointers/-2', lessons).step, 0)
  assert.equal(getRoute('#/learn/two-pointers/1.5', lessons).step, 0)
  assert.equal(getRoute('#/learn/unknown/bad', lessons).lesson, lessons[0])
  assert.equal(getRoute('#/practice/bfs', lessons).lesson.id, 'bfs')
  assert.equal(getRoute('#/lab', lessons).page, 'lab')
  assert.equal(getRoute('#/reference', lessons).page, 'reference')
})

test('all Python implementations solve the lesson example', () => {
  const cases = {
    'two-pointers': 'pair_sum([1, 2, 4, 6, 8, 12], 10) == (1, 4) and pair_sum([1, 2], 5) is None',
    'sliding-window': 'max_window([2, 1, 5, 1, 3, 2], 3) == 9 and max_window([-4, -2], 1) == -2',
    'prefix-sum': 'range_sum(build_prefix([2, 4, 1, 3]), 1, 3) == 8',
    'hash-map': 'two_sum([4, 1, 5, 8], 9) == (0, 2) and two_sum([4], 8) is None',
    'minimum-window-substring': 'minimum_window("CABACBD", "AAB") == "ABA" and minimum_window("AB", "AA") == "" and minimum_window("baab", "ab") == "ba" and minimum_window("aA", "A") == "A"',
    'binary-search': 'binary_search([1, 3, 5, 7, 9, 11, 13], 11) == 5 and binary_search([], 1) == -1',
    intervals: 'merge_intervals([[1, 3], [2, 6], [8, 10], [9, 12]]) == [[1, 6], [8, 12]]',
    stack: 'valid_brackets("{[]}") and not valid_brackets("([)]") and not valid_brackets("<")',
    'linked-list': 'reverse_list(first) is third and third.next is second and second.next is first and first.next is None',
    heap: 'sorted(top_k([4, 1, 7, 3, 9], 3)) == [4, 7, 9]',
    'b-tree': 'check_btree()',
    'b-plus-tree': 'check_bplus()',
    'largest-rectangle-in-histogram': 'check_histogram()',
    bfs: 'shortest_distance({"A": ["B", "C"], "B": ["D", "E"], "C": ["F"]}, "A", "F") == 2',
    dfs: 'reachable({"A": ["B", "C"], "B": ["A", "D", "E"], "C": ["F"]}, "A") == set("ABCDEF")',
    'topological-sort': 'task_order({"A": ["B", "C"], "B": ["D"], "C": ["D"]}) == list("ABCD") and task_order({"A": ["B"], "B": ["A"]}) is None',
    'union-find': 'check_union_find()',
    dijkstra: 'dijkstra({"A": [("B", 4), ("C", 1)], "C": [("B", 2), ("D", 6)], "B": [("D", 1)]}, "A") == ({"A": 0, "B": 3, "C": 1, "D": 4}, {"B": "C", "C": "A", "D": "B"})',
    'bellman-ford': 'bellman_ford(4, [(2, 3, 1), (1, 2, -2), (0, 1, 4), (0, 2, 5)], 0) == [0, 4, 2, 3] and bellman_ford(3, [(1, 2, -2), (2, 1, 0)], 0) == [0, float("inf"), float("inf")] and rejects_negative_cycle(bellman_ford, 2, [(0, 1, 0), (1, 0, -1)], 0)',
    'floyd-warshall': 'floyd_warshall(3, [(0, 1, 3), (0, 2, 10), (1, 2, 2)])[0] == [0, 3, 5] and rejects_negative_cycle(floyd_warshall, 2, [(0, 1, 0), (1, 0, -1)])',
    'word-ladder': 'ladder_length("cold", "warm", ["cord", "card", "word", "ward", "warm"]) == 5 and ladder_length("cold", "warm", ["warm"]) == 0 and ladder_length("cold", "cord", ["cold"]) == 0 and ladder_length("a", "b", ["b"]) == 2',
    'grid-dfs': 'count_islands([[1, 1, 0, 0], [0, 1, 0, 1], [1, 0, 0, 1]]) == 3 and count_islands([[1, 0], [0, 1]]) == 2 and count_islands([]) == 0',
    'grid-bfs': 'nearest_source([[0, 1, 1, 1, 1], [1, -1, -1, 1, 1], [1, 1, 1, 1, 0]]) == [[0, 1, 2, 3, 2], [1, -1, -1, 2, 1], [2, 3, 2, 1, 0]] and nearest_source([[0, -1, 1]]) == [[0, -1, -1]]',
    'spiral-matrix': 'spiral_order([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]) == [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] and spiral_order([[1, 2, 3]]) == [1, 2, 3] and spiral_order([[1], [2]]) == [1, 2]',
    'matrix-prefix-sum': 'check_matrix_prefix()',
    'grid-obstacle-elimination': 'check_obstacle_paths()',
    backtracking: 'subsets([1, 2]) == [[], [1], [1, 2], [2]]',
    'dynamic-programming': 'climb_stairs(4) == 5 and climb_stairs(0) == 1',
    greedy: 'compatible_meetings([(1, 3), (2, 4), (3, 5), (5, 7)]) == [(1, 3), (3, 5), (5, 7)]',
    'burst-balloons': 'check_balloon_orders()',
  }
  const setup = `
from collections import deque
from functools import lru_cache
from itertools import product

class Node: pass
first, second, third = Node(), Node(), Node()
first.next, second.next, third.next = second, third, None

def check_btree():
    root = BTreeNode()
    for key in (10, 20, 30, 40):
        root = root.insert(key)
    assert root.keys == [20]
    assert [child.keys for child in root.children] == [[10], [30, 40]]
    for key in range(50, 500, 10):
        root = root.insert(key)
    root = root.insert(40)

    def check_node(node, low, high, depth):
        assert 1 <= len(node.keys) <= 3
        assert node.keys == sorted(set(node.keys))
        assert all(low < key < high for key in node.keys)
        if not node.children:
            return {depth}
        assert len(node.children) == len(node.keys) + 1
        bounds = [low, *node.keys, high]
        leaf_depths = set()
        for i, child in enumerate(node.children):
            leaf_depths.update(check_node(child, bounds[i], bounds[i + 1], depth + 1))
        return leaf_depths

    assert len(check_node(root, 0, 500, 0)) == 1
    return all(root.contains(key) for key in range(10, 500, 10)) and not root.contains(41)

def check_bplus():
    left = BPlusPage([10, 20, 30, 40])
    tail = BPlusPage([50, 60])
    left.next_leaf = tail
    separator, right = split_plus_leaf(left)
    root = BPlusPage([separator, 50], [left, right, tail])
    assert separator == 30 and right.next_leaf is tail
    assert list(scan_keys(root, 20, 35)) == [20, 30]
    assert list(scan_keys(root, 30, 50)) == [30, 40, 50]
    return list(scan_keys(root, 61, 90)) == []

def check_union_find():
    sets = UnionFind(4)
    sets.union(0, 1)
    sets.union(2, 3)
    sets.union(0, 2)
    assert sets.parent == [0, 0, 0, 2]
    assert sets.find(3) == 0
    return sets.parent == [0, 0, 0, 0] and not sets.union(3, 1)

def rejects_negative_cycle(algorithm, *args):
    try:
        algorithm(*args)
    except ValueError as error:
        return 'negative cycle' in str(error).lower()
    return False

def check_matrix_prefix():
    grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    prefix = build_matrix_prefix(grid)
    assert prefix[-1][-1] == 45
    return rectangle_sum(prefix, 1, 1, 2, 2) == 28 and rectangle_sum(prefix, 0, 2, 2, 2) == 18

def check_histogram():
    assert largest_rectangle([2, 1, 4, 5, 2]) == 8
    for heights in product(range(4), repeat=5):
        expected = max(min(heights[left:right]) * (right - left)
                       for left in range(5) for right in range(left + 1, 6))
        assert largest_rectangle(heights) == expected, heights
    return True

def check_obstacle_paths():
    example = [[0, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 1, 1, 0]]
    assert shortest_with_removals(example, 1) == 8
    assert shortest_with_removals(example, 0) == -1
    assert shortest_with_removals([[0]], 0) == 0

    def exact_bfs(grid, k):
        queue = deque([(0, 0, k, 0)])
        seen = {(0, 0, k)}
        while queue:
            r, c, budget, steps = queue.popleft()
            if (r, c) == (2, 3):
                return steps
            for y, x in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= y < 3 and 0 <= x < 4:
                    remaining = budget - grid[y][x]
                    state = (y, x, remaining)
                    if remaining >= 0 and state not in seen:
                        seen.add(state)
                        queue.append((*state, steps + 1))
        return -1

    for inner in product((0, 1), repeat=10):
        tiles = (0, *inner, 0)
        grid = [tiles[i:i + 4] for i in range(0, 12, 4)]
        for k in range(3):
            assert shortest_with_removals(grid, k) == exact_bfs(grid, k), (grid, k)
    return True

def check_balloon_orders():
    @lru_cache(None)
    def brute(values):
        if not values:
            return 0
        padded = (1, *values, 1)
        return max(padded[i] * padded[i + 1] * padded[i + 2] + brute(values[:i] + values[i + 1:])
                   for i in range(len(values)))

    assert burst_balloons([2, 4, 3]) == 33
    return all(burst_balloons(values) == brute(values) for values in product(range(4), repeat=4))
`
  const script = [setup, ...lessons.map(lesson => {
    assert.ok(cases[lesson.id], `Missing Python example for ${lesson.id}`)
    return `${lesson.code}\nassert ${cases[lesson.id]}, "${lesson.id}"`
  })].join('\n\n')
  const result = spawnSync('python3', ['-'], { input: script, encoding: 'utf8', timeout: 5000 })
  assert.ifError(result.error)
  assert.equal(result.status, 0, result.stderr)
})
