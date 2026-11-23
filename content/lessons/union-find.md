---
title: Union-Find
summary: Use disjoint sets, also called DSU, to merge components and check whether two nodes share a root.
---

## Start with four separate sets

```step
diagram:
  type: html
  src: diagrams/union-find/1.html
  alt: "Union-Find: Start with four separate sets"
```

Each node is its own root\. A find on any node returns that node\.

## Join two pairs by their roots

```step
diagram:
  type: html
  src: diagrams/union-find/2.html
  alt: "Union-Find: Join two pairs by their roots"
```

Union(0, 1) links 1 to 0\. Union(2, 3) links 3 to 2\. When sizes are equal, this example keeps the first root\.

## Join the two remaining sets

```step
diagram:
  type: html
  src: diagrams/union-find/3.html
  alt: "Union-Find: Join the two remaining sets"
```

Union(0, 2) links root 2 to root 0\. Node 3 still points to 2, so find(3) follows 3 → 2 → 0\.

## Point directly to the root

```step
diagram:
  type: html
  src: diagrams/union-find/4.html
  alt: "Union-Find: Point directly to the root"
```

Find(3) rewrites parent\[3\] to 0\. The component stays the same\. The next find from 3 needs one hop\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Track Connected Components as Edges Arrive
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(α(n)) amortized per find or union | O(n) |

### When to use this pattern

Look for undirected connectivity as edges arrive, cycle detection, or Kruskal’s algorithm.

### Invariant

Two nodes belong to the same component exactly when find returns the same root.

### Common error

Link roots during union. Linking an arbitrary node can move only part of its component.

## Practice

```step
id: practice
```

What changes when find compresses a path?

1. Which nodes are connected
2. Which root represents the set
3. Parent links along the path

[Check the answer](#/union-find/answer).

## Answer and exercises

```step
id: answer
```

**Answer 3: Parent links along the path**

Existing members still reach the same root. The parent links now get them there in fewer hops.

### Follow-up exercises

- [Redundant Connection](https://leetcode.com/problems/redundant-connection/)
- [Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/union-find.py
  language: python
```

Example problem: Track Connected Components as Edges Arrive.

## Java example

```step
id: java
snippet:
  src: java/union-find.java
  language: java
```

Example problem: Track Connected Components as Edges Arrive.
