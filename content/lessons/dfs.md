---
title: Depth-First Search
summary: Follow one branch to its end before you explore another branch.
---

## Start at the root

```step
diagram:
  type: html
  src: diagrams/dfs/1.html
  alt: "Depth-First Search: Start at the root"
```

Mark A visited\. Explore B before C for this example\.

## Follow the left branch

```step
diagram:
  type: html
  src: diagrams/dfs/2.html
  alt: "Depth-First Search: Follow the left branch"
```

From B, visit D first\. D has no unvisited neighbor\.

## Return to the last branch point

```step
diagram:
  type: html
  src: diagrams/dfs/3.html
  alt: "Depth-First Search: Return to the last branch point"
```

Return to B and visit E\. C is still waiting\.

## Explore the other branch

```step
diagram:
  type: html
  src: diagrams/dfs/4.html
  alt: "Depth-First Search: Explore the other branch"
```

Return to A\. Visit C and then F\. All six reachable nodes are now visited\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Explore a Connected Component
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(V + E) | O(V) |

### When to use this pattern

Look for connectivity, reachability, or a need to explore all branches.

### Invariant

Every node enters the visited set before you explore its neighbors.

### Common error

In graphs, skip visited nodes. In large graphs, use an explicit stack to avoid recursion limits.

## Practice

```step
id: practice
```

What prevents DFS from looping on a cycle?

1. A queue
2. A visited set
3. Sorting the edges

[Check the answer](#/dfs/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: A visited set**

Mark each node before exploring its neighbors so a cycle cannot re-enter it.

### Follow-up exercises

- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Clone Graph](https://leetcode.com/problems/clone-graph/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/dfs.py
  language: python
```

Example problem: Explore a Connected Component.

## Java example

```step
id: java
snippet:
  src: java/dfs.java
  language: java
```

Example problem: Explore a Connected Component.
