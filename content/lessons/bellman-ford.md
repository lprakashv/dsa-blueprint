---
title: Bellman–Ford
summary: Relax every edge in repeated passes and detect a negative cycle reachable from the source.
---

## Start with only the source reachable

```step
diagram:
  type: html
  src: diagrams/bellman-ford/1.html
  alt: "Bellman–Ford: Start with only the source reachable"
```

Set A to 0 and all other distances to infinity\. For this trace, visit edges in order C → D, B → C, A → B, A → C\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Pass | 0 |
| Distance to D | ∞ |

## Discover the immediate neighbors

```step
diagram:
  type: html
  src: diagrams/bellman-ford/2.html
  alt: "Bellman–Ford: Discover the immediate neighbors"
```

The first two edges start at nodes with unknown distances\. The last two edges set B to 4 and C to 5\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Pass | 1 |
| Distance to D | ∞ |

## Use the edge with negative cost

```step
diagram:
  type: html
  src: diagrams/bellman-ford/3.html
  alt: "Bellman–Ford: Use the edge with negative cost"
```

C → D first gives D a distance of 6\. Then B → C lowers C’s distance from 5 to 2\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Pass | 2 |
| Distance to D | 6 |

## Use the improved distance to C

```step
diagram:
  type: html
  src: diagrams/bellman-ford/4.html
  alt: "Bellman–Ford: Use the improved distance to C"
```

C → D uses the new distance to C\. The path A → B → C → D costs 4 − 2 \+ 1 = 3\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Pass | 3 |
| Distance to D | 3 |

## Check for a reachable negative cycle

```step
diagram:
  type: html
  src: diagrams/bellman-ford/5.html
  alt: "Bellman–Ford: Check for a reachable negative cycle"
```

After V − 1 passes, try each edge once more\. No distance improves here\. If any reachable edge still improves a distance, a reachable negative cycle exists\.

### Example state

| Measure | Value |
| --- | --- |
| Source | A |
| Pass | Cycle check |
| Distance to D | 3 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Find Paths With Negative Edge Weights
- **Difficulty:** Advanced
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(VE) relaxations | O(V) |

### When to use this pattern

Use Bellman–Ford for single-source paths when some edge weights are negative.

### Invariant

After pass k, you have accounted for all paths from the source with at most k edges.

### Common error

Only a negative cycle reachable from the source can keep improving its distances.

## Practice

```step
id: practice
```

What does an improvement on the extra pass after V − 1 passes show?

1. A reachable negative cycle
2. A negative edge necessarily starts at the source
3. A positive cycle

[Check the answer](#/bellman-ford/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: A reachable negative cycle**

A shortest simple path uses at most V − 1 edges. Further improvement means a reachable cycle can reduce the path cost.

### Follow-up exercises

- [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
- Trace the extra pass after adding a directed edge D → B of weight −2.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/bellman-ford.py
  language: python
```

Example problem: Find Paths With Negative Edge Weights.

## Java example

```step
id: java
snippet:
  src: java/bellman-ford.java
  language: java
```

Example problem: Find Paths With Negative Edge Weights.
