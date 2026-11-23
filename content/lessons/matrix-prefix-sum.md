---
title: 2D Prefix Sum
summary: Build a table of cumulative rectangle sums, then answer each query with four lookups.
---

## Mark the inclusive rectangle

```step
diagram:
  type: html
  src: diagrams/matrix-prefix-sum/1.html
  alt: "2D Prefix Sum: Mark the inclusive rectangle"
```

Sum rows 1 through 2 and columns 1 through 2\. Use a prefix table so each later rectangle costs the same to query\.

## Add a zero row and column

```step
diagram:
  type: html
  src: diagrams/matrix-prefix-sum/2.html
  alt: "2D Prefix Sum: Add a zero row and column"
```

For each entry, add its top and left totals and the current input\. Subtract the top\-left total once\. The full matrix sums to 45\.

## Subtract the two strips outside the query

```step
diagram:
  type: html
  src: diagrams/matrix-prefix-sum/3.html
  alt: "2D Prefix Sum: Subtract the two strips outside the query"
```

Start with prefix\[3\]\[3\] = 45\. Remove the top strip of 6 and the left strip of 12\. This removes the top\-left 1 twice\.

## Add the shared corner once

```step
diagram:
  type: html
  src: diagrams/matrix-prefix-sum/4.html
  alt: "2D Prefix Sum: Add the shared corner once"
```

Add prefix\[1\]\[1\] = 1\. The remaining total is 28\. The same four lookups work for any rectangle\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Answer Rectangle Sum Queries
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(R × C) build · O(1) query | O(R × C) |

### When to use this pattern

Look for many rectangle sum queries on a matrix whose values stay fixed.

### Invariant

prefix\[r\]\[c\] sums the first r rows and first c columns.

### Common error

Add the overlap back after subtracting the two strips. Both strips include the same top-left region.

## Practice

```step
id: practice
```

Why add prefix\[top\]\[left\] in the query?

1. It restores the area that both subtractions removed
2. It includes the next row down
3. It accounts for the zero border

[Check the answer](#/matrix-prefix-sum/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It restores the area that both subtractions removed**

The two strips overlap. After subtracting both, restore their shared corner once.

### Follow-up exercises

- [Range Sum Query 2D](https://leetcode.com/problems/range-sum-query-2d-immutable/)
- [Matrix Block Sum](https://leetcode.com/problems/matrix-block-sum/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/matrix-prefix-sum.py
  language: python
```

Example problem: Answer Rectangle Sum Queries.

## Java example

```step
id: java
snippet:
  src: java/matrix-prefix-sum.java
  language: java
```

Example problem: Answer Rectangle Sum Queries.
