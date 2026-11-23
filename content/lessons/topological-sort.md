---
title: Topological Sort
summary: Process tasks with no unmet prerequisites and remove their outgoing edges.
---

## Count incoming dependencies

```step
diagram:
  type: html
  src: diagrams/topological-sort/1.html
  alt: "Topological Sort: Count incoming dependencies"
```

A unlocks B and C\. Both B and C unlock D\. Only A starts with in\-degree zero\.

## Process A and unlock B and C

```step
diagram:
  type: html
  src: diagrams/topological-sort/2.html
  alt: "Topological Sort: Process A and unlock B and C"
```

Remove A’s outgoing edges\. B and C each drop to zero\.

## Wait for both prerequisites

```step
diagram:
  type: html
  src: diagrams/topological-sort/3.html
  alt: "Topological Sort: Wait for both prerequisites"
```

B lowers the count of D to 1\. C lowers it to 0\. Now D is ready\.

## Check that every task ran

```step
diagram:
  type: html
  src: diagrams/topological-sort/4.html
  alt: "Topological Sort: Check that every task ran"
```

Process D\. All four tasks are in the output, so this order is valid\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Order Tasks With Dependencies
- **Difficulty:** Intermediate
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O(V + E) | O(V) auxiliary |

### When to use this pattern

Look for prerequisites, build dependencies, or any order that must respect directed edges.

### Invariant

A node is ready exactly when its count of unmet prerequisites reaches zero.

### Common error

If you process fewer nodes than the graph contains, a cycle blocks the remaining nodes.

## Practice

```step
id: practice
```

The queue is empty but one task is still blocked. What does this indicate?

1. There is a cycle
2. The queue needs to be sorted
3. The graph has two connected components

[Check the answer](#/topological-sort/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: There is a cycle**

All unprocessed tasks have an unmet dependency. Following those dependencies must eventually revisit a task.

### Follow-up exercises

- [Course Schedule](https://leetcode.com/problems/course-schedule/)
- [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/topological-sort.py
  language: python
```

Example problem: Order Tasks With Dependencies.

## Java example

```step
id: java
snippet:
  src: java/topological-sort.java
  language: java
```

Example problem: Order Tasks With Dependencies.
