---
title: Grid DFS & Flood Fill
summary: Treat each land cell as a node and visit all land in its component before counting the next island.
---

## Decide which cells touch

```step
diagram:
  type: html
  src: diagrams/grid-dfs/1.html
  alt: "Grid DFS & Flood Fill: Decide which cells touch"
```

### Problem

Given a grid of land (1) and water (0), count the islands. An island is a group of land cells connected by moves up, down, left, or right; diagonal contact alone does not connect cells.

### Walkthrough

A 1 is land and a 0 is water\. Cells share an island when you can reach one from the other by moving along edges\.

## Visit all land reachable from (0, 0)

```step
diagram:
  type: html
  src: diagrams/grid-dfs/2.html
  alt: "Grid DFS & Flood Fill: Visit all land reachable from (0, 0)"
```

The first land cell starts a depth\-first search\. Visit (0, 1) and (1, 1)\. Mark those three cells as one island\.

## Keep scanning for fresh land

```step
diagram:
  type: html
  src: diagrams/grid-dfs/3.html
  alt: "Grid DFS & Flood Fill: Keep scanning for fresh land"
```

Skip water and marked cells\. Start the second search at (1, 3)\. It reaches (2, 3)\.

## Count the isolated cell

```step
diagram:
  type: html
  src: diagrams/grid-dfs/4.html
  alt: "Grid DFS & Flood Fill: Count the isolated cell"
```

The land at (2, 0) has no land neighbor\. It is the third island\. Return 3\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Count Islands in a Binary Grid
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(R × C) | O(R × C) |

### When to use this pattern

Look for connected regions, island counts, or groups of cells with the same value.

### Invariant

A cell enters the visited set before it enters the stack. Each new search counts one component.

### Common error

Check the allowed moves. Here only up, down, left, and right connect two cells.

## Practice

```step
id: practice
```

Two land cells share only a corner. Do they form one island in this problem?

1. Yes, a corner counts as a connection
2. Only if there is a path of edge-sharing land cells
3. Yes, if they are the same distance from the grid edge

[Check the answer](#/grid-dfs/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: Only if there is a path of edge-sharing land cells**

The movement rule only allows sharing an edge. A diagonal alone does not join two components.

### Follow-up exercises

- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Flood Fill](https://leetcode.com/problems/flood-fill/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/grid-dfs.py
  language: python
```

Example problem: Count Islands in a Binary Grid.

## Java example

```step
id: java
snippet:
  src: java/grid-dfs.java
  language: java
```

Example problem: Count Islands in a Binary Grid.
