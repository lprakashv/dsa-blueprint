---
title: Breadth-First Search
summary: Explore an unweighted graph one distance from the start at a time.
---

## Start at distance zero

```step
diagram:
  type: html
  src: diagrams/bfs/1.html
  alt: "Breadth-First Search: Start at distance zero"
```

Put A in a first\-in, first\-out queue\. Mark it discovered\.

## Find the first layer

```step
diagram:
  type: html
  src: diagrams/bfs/2.html
  alt: "Breadth-First Search: Find the first layer"
```

Remove A\. Add its neighbors B and C with distance 1\.

## Add nodes at distance two

```step
diagram:
  type: html
  src: diagrams/bfs/3.html
  alt: "Breadth-First Search: Add nodes at distance two"
```

Remove B\. Add D and E to the back\. C will still run before D and E\.

## Finish at the target

```step
diagram:
  type: html
  src: diagrams/bfs/4.html
  alt: "Breadth-First Search: Finish at the target"
```

Remove C and discover F at distance 2\. The shortest path is A → C → F\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Fewest Edges to a Node
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(V + E) | O(V) |

### When to use this pattern

Look for minimum moves with equal cost or level-order traversal.

### Invariant

The queue processes nodes in order of nondecreasing distance from the start.

### Common error

Mark a node when you enqueue it. This stops two neighbors from adding the same node twice.

## Practice

```step
id: practice
```

When can BFS guarantee a shortest path measured in total cost?

1. When all edges have the same positive cost
2. When edge costs are all different
3. Whenever the graph has a cycle

[Check the answer](#/bfs/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: When all edges have the same positive cost**

BFS minimizes the number of edges. With equal positive cost per edge, that also minimizes cost.

### Follow-up exercises

- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/bfs.py
  language: python
```

Example problem: Find the Fewest Edges to a Node.

## Java example

```step
id: java
snippet:
  src: java/bfs.java
  language: java
```

Example problem: Find the Fewest Edges to a Node.
