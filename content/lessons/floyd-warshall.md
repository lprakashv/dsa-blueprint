---
title: Floyd–Warshall
summary: Use a distance matrix to test whether routing through each vertex improves a path.
---

## Fill the matrix from direct edges

```step
diagram:
  type: html
  src: diagrams/floyd-warshall/1.html
  alt: "Floyd–Warshall: Fill the matrix from direct edges"
```

### Problem

Given a directed weighted graph, find the shortest distance between every pair of vertices. Use infinity when no path exists. Report a negative cycle if one exists, since it makes some shortest distances undefined. For this example, compare the direct A → C edge of cost 10 with the route through B.

### Walkthrough

Set each diagonal entry to 0\. Enter 3 for A → B, 2 for B → C, and 10 for A → C\. Use infinity when there is no direct edge\.

## Ask if a stop at B helps

```step
diagram:
  type: html
  src: diagrams/floyd-warshall/2.html
  alt: "Floyd–Warshall: Ask if a stop at B helps"
```

Pivot A did not improve a route\. With B as the pivot, compare the direct cost A → C with the sum of A → B and B → C\.

## Replace the expensive direct route

```step
diagram:
  type: html
  src: diagrams/floyd-warshall/3.html
  alt: "Floyd–Warshall: Replace the expensive direct route"
```

The path via B costs 5, so update the entry for A → C from 10 to 5\.

## Read any pair’s shortest distance

```step
diagram:
  type: html
  src: diagrams/floyd-warshall/4.html
  alt: "Floyd–Warshall: Read any pair’s shortest distance"
```

Pivot C makes no further improvement\. The entry at row A, column C is 5\. An infinity entry, such as C → A, means no path exists\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find Distances Between Every Pair
- **Difficulty:** Advanced
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O(V³) | O(V²) |

### When to use this pattern

Look for all-pairs shortest paths when the graph is small or dense enough for a cubic algorithm.

### Invariant

After processing pivot k, each entry allows vertices up to k as intermediate stops.

### Common error

The pivot loop must be outermost. A negative diagonal entry at the end signals a negative cycle.

## Practice

```step
id: practice
```

Why is the pivot loop outermost?

1. It processes pivots from largest weight to smallest
2. Each round must use only the pivots admitted so far
3. It lets the algorithm use constant memory

[Check the answer](#/floyd-warshall/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: Each round must use only the pivots admitted so far**

One round adds one allowed intermediate vertex for all source–destination pairs.

### Follow-up exercises

- [Find the City With the Smallest Number of Neighbors](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)
- [Minimum Cost to Convert String I](https://leetcode.com/problems/minimum-cost-to-convert-string-i/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/floyd-warshall.py
  language: python
```

Example problem: Find Distances Between Every Pair.

## Java example

```step
id: java
snippet:
  src: java/floyd-warshall.java
  language: java
```

Example problem: Find Distances Between Every Pair.
