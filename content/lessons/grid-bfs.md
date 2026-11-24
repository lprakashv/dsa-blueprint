---
title: Multi-Source Grid BFS
summary: Start breadth-first search from every source at once and fill the grid in layers.
---

## Put both sources in the initial queue

```step
diagram:
  type: html
  src: diagrams/grid-bfs/1.html
  alt: "Multi-Source Grid BFS: Put both sources in the initial queue"
```

### Problem

Given a grid with source cells, open cells, and walls, find the fewest moves from any source to each open cell. Move one cell at a time along an edge; walls cannot be crossed. Return -1 for walls and for open cells that cannot reach a source.

### Walkthrough

Each move costs one\. The top\-left and bottom\-right sources both start at distance 0\. A wall cannot be crossed\.

## Reach the cells one move away

```step
diagram:
  type: html
  src: diagrams/grid-bfs/2.html
  alt: "Multi-Source Grid BFS: Reach the cells one move away"
```

Expand both source cells\. Each new open neighbor gets distance 1 before you enqueue it\.

## Let the waves move around the walls

```step
diagram:
  type: html
  src: diagrams/grid-bfs/3.html
  alt: "Multi-Source Grid BFS: Let the waves move around the walls"
```

Expand distance\-1 cells\. A cell already assigned a distance is skipped, even if another wave reaches it\.

## Read the last layer

```step
diagram:
  type: html
  src: diagrams/grid-bfs/4.html
  alt: "Multi-Source Grid BFS: Read the last layer"
```

Two cells first appear at distance 3\. The queue then empties\. An open cell that never appeared would keep distance −1\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Distance to the Nearest Source
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(R × C) | O(R × C) |

### When to use this pattern

Look for distance to the nearest of many sources, or a process that spreads one cell per turn.

### Invariant

The first wave that reaches a cell gives the shortest distance from any source.

### Common error

Put every source in the queue before expanding a neighbor. Mark cells as soon as you enqueue them.

## Practice

```step
id: practice
```

Why put all sources in the queue at distance 0?

1. It makes every source take part in the first wave
2. It lets BFS cross walls
3. It gives later sources larger distances

[Check the answer](#/grid-bfs/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It makes every source take part in the first wave**

Each wave expands paths of the same length from all sources. The earliest wave to reach a cell gives the minimum.

### Follow-up exercises

- [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- [01 Matrix](https://leetcode.com/problems/01-matrix/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/grid-bfs.py
  language: python
```

Example problem: Find the Distance to the Nearest Source.

## Java example

```step
id: java
snippet:
  src: java/grid-bfs.java
  language: java
```

Example problem: Find the Distance to the Nearest Source.
