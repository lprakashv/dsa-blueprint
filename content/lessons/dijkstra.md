---
title: Dijkstra’s Algorithm
summary: Use a min-heap to settle the nearest node and improve distances along its outgoing edges.
---

## Give only the source a finite distance

```step
diagram:
  type: html
  src: diagrams/dijkstra/1.html
  alt: "Dijkstra’s Algorithm: Give only the source a finite distance"
```

### Problem

Given a directed graph with nonnegative edge weights and a source, find the shortest distance from the source to each reachable node. For this example, start at A and find the shortest path to D.

### Walkthrough

Start at A with distance 0\. The other nodes have no known path yet\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Settled nodes | 0 |
| Distance to D | ∞ |

## Relax the edges out of A

```step
diagram:
  type: html
  src: diagrams/dijkstra/2.html
  alt: "Dijkstra’s Algorithm: Relax the edges out of A"
```

Pop A\. The path to B costs 4 and the path to C costs 1\. Put both candidates in the heap\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Settled nodes | 1 |
| Distance to D | ∞ |

## Replace B’s earlier distance

```step
diagram:
  type: html
  src: diagrams/dijkstra/3.html
  alt: "Dijkstra’s Algorithm: Replace B’s earlier distance"
```

C is next\. A → C → B costs 3, which beats 4\. The first known path to D costs 7\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Settled nodes | 2 |
| Distance to D | 7 |

## Improve the path to D

```step
diagram:
  type: html
  src: diagrams/dijkstra/4.html
  alt: "Dijkstra’s Algorithm: Improve the path to D"
```

Pop B at distance 3\. B → D costs 1, so reduce D’s distance from 7 to 4\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Settled nodes | 3 |
| Distance to D | 4 |

## Read the shortest path

```step
diagram:
  type: html
  src: diagrams/dijkstra/5.html
  alt: "Dijkstra’s Algorithm: Read the shortest path"
```

Skip the old heap entry for B at distance 4\. When D is popped at distance 4, its distance is final\. Follow the predecessor links back to A\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Settled nodes | 4 |
| Distance to D | 4 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Find Shortest Paths With Nonnegative Weights
- **Difficulty:** Intermediate
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O((V + E) log V) on simple graphs | O(V + E) with lazy heap entries |

### When to use this pattern

Choose Dijkstra for single-source shortest paths with nonnegative weights. Use BFS if every move has the same positive cost.

### Invariant

When you pop the smallest current distance, that node’s distance is final.

### Common error

Skip stale heap entries. A better path can add a second entry for the same node.

## Practice

```step
id: practice
```

When is it safe to stop if you only need the distance to the target?

1. When you first insert the target into the heap
2. When you pop the target with its current best distance
3. When the target’s smallest edge is read

[Check the answer](#/dijkstra/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: When you pop the target with its current best distance**

With nonnegative weights, popping the smallest current distance settles it. The first insertion can still be improved.

### Follow-up exercises

- [Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/dijkstra.py
  language: python
```

Example problem: Find Shortest Paths With Nonnegative Weights.

## Java example

```step
id: java
snippet:
  src: java/dijkstra.java
  language: java
```

Example problem: Find Shortest Paths With Nonnegative Weights.
