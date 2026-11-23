---
title: Pattern cheatsheets
summary: Find a pattern by its signal and compare time and space costs.
---

## Arrays & Strings

```step
id: arrays-and-strings
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Two Pointers](#/two-pointers/notes) | Look for a sorted array and a pair of values. The order tells you which end to move. | O(n) | O(1) | [Python](#/two-pointers/python) · [Java](#/two-pointers/java) |
| [Sliding Window](#/sliding-window/notes) | A fixed window keeps the same length. A variable window moves its left edge when doing so can restore or improve a valid range. | O(n) | O(1) | [Python](#/sliding-window/python) · [Java](#/sliding-window/java) |
| [Prefix Sum](#/prefix-sum/notes) | Look for repeated range sums over an array with fixed values. | O(n) build · O(1) query | O(n) | [Python](#/prefix-sum/python) · [Java](#/prefix-sum/java) |
| [Hash Map Lookup](#/hash-map/notes) | Look for frequent membership tests, value-to-index lookups, or counts. | O(n) average | O(n) | [Python](#/hash-map/python) · [Java](#/hash-map/java) |
| [Prefix Sum + Hash Map](#/prefix-sum-hash-map/notes) | Look for contiguous ranges with a target sum or equal counts when values can cancel each other. | O(n) expected | O(n) | [Python](#/prefix-sum-hash-map/python) · [Java](#/prefix-sum-hash-map/java) |

## Search & Sorting

```step
id: search-and-sorting
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Binary Search](#/binary-search/notes) | Look for sorted values or a predicate that switches once from false to true. | O(log n) | O(1) | [Python](#/binary-search/python) · [Java](#/binary-search/java) |
| [Merge Intervals](#/intervals/notes) | Look for overlapping time ranges, bookings, or segments. | O(n log n) | O(n) | [Python](#/intervals/python) · [Java](#/intervals/java) |
| [Binary Search on the Answer](#/binary-search-on-answer/notes) | Look for a minimum feasible rate, capacity, or limit. Define a quick yes/no test and prove that it changes in one direction. | O(n log(U + 1)) for maximum pile U | O(1) | [Python](#/binary-search-on-answer/python) · [Java](#/binary-search-on-answer/java) |

## Data Structures

```step
id: data-structures
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Stacks](#/stack/notes) | Look for nested brackets, undo operations, or a need to resolve the most recent item. | O(n) | O(n) | [Python](#/stack/python) · [Java](#/stack/java) |
| [Linked List Reversal](#/linked-list/notes) | Look for a linked-list problem that asks you to change the order in place. | O(n) | O(1) | [Python](#/linked-list/python) · [Java](#/linked-list/java) |
| [Heap / Top K](#/heap/notes) | Look for top K, repeated access to an extreme, or a stream of values. | O(n log k) for k ≥ 2 | O(k) | [Python](#/heap/python) · [Java](#/heap/java) |
| [Fixed-Gap Linked List Pointers](#/linked-list-gap/notes) | Use a fixed pointer gap when you know a position relative to the tail. Use different speeds to find the middle or detect a cycle. | O(n) | O(1) | [Python](#/linked-list-gap/python) · [Java](#/linked-list-gap/java) |
| [Dense Array + Index Map](#/array-index-map/notes) | Use a dense array and index map for constant-time membership and deletion when order can change. | O(1) average per operation | O(n) | [Python](#/array-index-map/python) · [Java](#/array-index-map/java) |
| [B-Tree](#/b-tree/notes) | Look for an ordered index that must stay shallow and balanced as keys arrive. | O(log n) for fixed page capacity | O(log n) auxiliary | [Python](#/b-tree/python) · [Java](#/b-tree/java) |
| [B+ Tree](#/b-plus-tree/notes) | Look for an ordered index with range queries. h is the tree height and p is the number of leaves read. | O(h + p) page reads | O(1) auxiliary for the scan | [Python](#/b-plus-tree/python) · [Java](#/b-plus-tree/java) |

## Trees & Graphs

```step
id: trees-and-graphs
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Breadth-First Search](#/bfs/notes) | Look for minimum moves with equal cost or level-order traversal. | O(V + E) | O(V) | [Python](#/bfs/python) · [Java](#/bfs/java) |
| [Depth-First Search](#/dfs/notes) | Look for connectivity, reachability, or a need to explore all branches. | O(V + E) | O(V) | [Python](#/dfs/python) · [Java](#/dfs/java) |
| [Topological Sort](#/topological-sort/notes) | Look for prerequisites, build dependencies, or any order that must respect directed edges. | O(V + E) | O(V) auxiliary | [Python](#/topological-sort/python) · [Java](#/topological-sort/java) |
| [Postorder Tree Aggregation](#/tree-postorder/notes) | Use postorder when a node needs its children’s height, balance, or best downward score before it can finish. | O(n) | O(h) for tree height h | [Python](#/tree-postorder/python) · [Java](#/tree-postorder/java) |
| [Union-Find](#/union-find/notes) | Look for undirected connectivity as edges arrive, cycle detection, or Kruskal’s algorithm. | O(α(n)) amortized per find or union | O(n) | [Python](#/union-find/python) · [Java](#/union-find/java) |
| [Dijkstra’s Algorithm](#/dijkstra/notes) | Choose Dijkstra for single-source shortest paths with nonnegative weights. Use BFS if every move has the same positive cost. | O((V + E) log V) on simple graphs | O(V + E) with lazy heap entries | [Python](#/dijkstra/python) · [Java](#/dijkstra/java) |
| [Bellman–Ford](#/bellman-ford/notes) | Use Bellman–Ford for single-source paths when some edge weights are negative. | O(VE) relaxations | O(V) | [Python](#/bellman-ford/python) · [Java](#/bellman-ford/java) |
| [Floyd–Warshall](#/floyd-warshall/notes) | Look for all-pairs shortest paths when the graph is small or dense enough for a cubic algorithm. | O(V³) | O(V²) | [Python](#/floyd-warshall/python) · [Java](#/floyd-warshall/java) |

## Matrices & Grids

```step
id: matrices-and-grids
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Grid DFS & Flood Fill](#/grid-dfs/notes) | Look for connected regions, island counts, or groups of cells with the same value. | O(R × C) | O(R × C) | [Python](#/grid-dfs/python) · [Java](#/grid-dfs/java) |
| [Multi-Source Grid BFS](#/grid-bfs/notes) | Look for distance to the nearest of many sources, or a process that spreads one cell per turn. | O(R × C) | O(R × C) | [Python](#/grid-bfs/python) · [Java](#/grid-bfs/java) |
| [Spiral Matrix](#/spiral-matrix/notes) | Look for a layer-by-layer matrix traversal with a regular visit order. | O(R × C) | O(1) auxiliary | [Python](#/spiral-matrix/python) · [Java](#/spiral-matrix/java) |
| [2D Prefix Sum](#/matrix-prefix-sum/notes) | Look for many rectangle sum queries on a matrix whose values stay fixed. | O(R × C) build · O(1) query | O(R × C) | [Python](#/matrix-prefix-sum/python) · [Java](#/matrix-prefix-sum/java) |

## Optimization

```step
id: optimization
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Backtracking](#/backtracking/notes) | Look for all subsets, permutations, combinations, or valid arrangements. | O(n · 2ⁿ) | O(n) auxiliary | [Python](#/backtracking/python) · [Java](#/backtracking/java) |
| [Dynamic Programming](#/dynamic-programming/notes) | Look for a count or optimal value with overlapping subproblems. | O(n) | O(1) optimized | [Python](#/dynamic-programming/python) · [Java](#/dynamic-programming/java) |
| [Greedy Choice](#/greedy/notes) | Look for a local choice you can prove is safe for the objective. | O(n log n) | O(n) | [Python](#/greedy/python) · [Java](#/greedy/java) |
| [0/1 Knapsack and Subset Sum](#/knapsack-01/notes) | Use a table of totals when each item can be picked at most once and the target sum is small enough to index. | O(n × target) | O(target) | [Python](#/knapsack-01/python) · [Java](#/knapsack-01/java) |
| [Minimum and Maximum DP States](#/dp-min-max/notes) | Keep both extremes when a later operation can make the smallest value become the largest, as with multiplication by a negative number. | O(n) | O(1) | [Python](#/dp-min-max/python) · [Java](#/dp-min-max/java) |

## Misc Problems

```step
id: misc-problems
```

| Pattern | When to use it | Time | Extra space | Examples |
| --- | --- | --- | --- | --- |
| [Minimum Window Substring](#/minimum-window-substring/notes) | Use a variable-size sliding window when you need the shortest contiguous match that contains a required set of counts. | O(m + n) | O(u) for distinct target letters | [Python](#/minimum-window-substring/python) · [Java](#/minimum-window-substring/java) |
| [Largest Rectangle in Histogram](#/largest-rectangle-in-histogram/notes) | Look for the widest span where every bar reaches a candidate height. A shorter bar sets a boundary. | O(n) | O(n) | [Python](#/largest-rectangle-in-histogram/python) · [Java](#/largest-rectangle-in-histogram/java) |
| [Word Ladder](#/word-ladder/notes) | Use BFS when each transformation has unit cost. Generate neighbors from the current state instead of comparing every pair of words. | O(N × L²) for fixed alphabet | O(N × L) | [Python](#/word-ladder/python) · [Java](#/word-ladder/java) |
| [Shortest Path With Obstacle Elimination](#/grid-obstacle-elimination/notes) | When reaching a cell leaves different resources available for the rest of the route, include those resources in the search state. | O(R × C × (k + 1)) | O(R × C × (k + 1)) worst case | [Python](#/grid-obstacle-elimination/python) · [Java](#/grid-obstacle-elimination/java) |
| [Burst Balloons](#/burst-balloons/notes) | When the first removal changes the remaining neighbors, try reasoning backward from the last removal. | O(n³) | O(n²) | [Python](#/burst-balloons/python) · [Java](#/burst-balloons/java) |
| [Median of Two Sorted Arrays](#/median-of-two-sorted-arrays/notes) | Look for a rank in two sorted arrays when a linear merge would exceed the time limit. | O(log(min(m, n) + 2)) | O(1) | [Python](#/median-of-two-sorted-arrays/python) · [Java](#/median-of-two-sorted-arrays/java) |
| [Binary Tree Maximum Path Sum](#/binary-tree-maximum-path-sum/notes) | Look for the best path anywhere in a tree. A path can turn at one node and continue down two branches. | O(n) | O(h) for tree height h | [Python](#/binary-tree-maximum-path-sum/python) · [Java](#/binary-tree-maximum-path-sum/java) |
| [Reverse Nodes in k-Group](#/reverse-nodes-in-k-group/notes) | Use a sentinel and a saved successor when an in-place linked-list change applies only to a bounded segment. | O(n) | O(1) | [Python](#/reverse-nodes-in-k-group/python) · [Java](#/reverse-nodes-in-k-group/java) |
| [Word Search II](#/word-search-ii/notes) | Use a trie when a search must match many words and can stop as soon as the current prefix has no completion. | O(S + R × C × 3ᴸ) worst case | O(S + L) auxiliary | [Python](#/word-search-ii/python) · [Java](#/word-search-ii/java) |
| [Split Array Largest Sum](#/split-array-largest-sum/notes) | Use a limit check when you must minimize the worst contiguous group and loosening the limit cannot hurt. | O(n log(S + 2)) for total sum S | O(1) | [Python](#/split-array-largest-sum/python) · [Java](#/split-array-largest-sum/java) |
