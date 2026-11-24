---
title: Spiral Matrix
summary: Read the outer edges, then shrink four boundaries to reach the next inner ring.
---

## Read the top row left to right

```step
diagram:
  type: html
  src: diagrams/spiral-matrix/1.html
  alt: "Spiral Matrix: Read the top row left to right"
```

### Problem

Given a rectangular matrix, return all its values in clockwise spiral order. Start at the top-left cell and visit every cell once.

### Walkthrough

Start with the entire rectangle\. Read 1, 2, 3, and 4\. Move the top boundary down by one\.

## Read the right column downward

```step
diagram:
  type: html
  src: diagrams/spiral-matrix/2.html
  alt: "Spiral Matrix: Read the right column downward"
```

The top row is already excluded\. Read 8 and 12, then move the right boundary left\.

## Read the bottom row right to left

```step
diagram:
  type: html
  src: diagrams/spiral-matrix/3.html
  alt: "Spiral Matrix: Read the bottom row right to left"
```

The right boundary moved inward\. Read 11, 10, and 9\. Then move the bottom boundary up\.

## Read the left column upward

```step
diagram:
  type: html
  src: diagrams/spiral-matrix/4.html
  alt: "Spiral Matrix: Read the left column upward"
```

Only 5 remains in the left column of this ring\. Read it and move the left boundary right\.

## Check bounds before every edge

```step
diagram:
  type: html
  src: diagrams/spiral-matrix/5.html
  alt: "Spiral Matrix: Check bounds before every edge"
```

The inner rectangle has one row\. Read 6 and 7\. The row bounds cross, so the traversal is complete\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Read the Matrix in Clockwise Order
- **Difficulty:** Beginner
- **Estimated study time:** 7 min

| Time | Extra space |
| --- | --- |
| O(R × C) | O(1) auxiliary |

### When to use this pattern

Look for a layer-by-layer matrix traversal with a regular visit order.

### Invariant

The unread cells lie inside the rectangle bounded by top, bottom, left, and right.

### Common error

Check that a row or column still exists before reading it. Odd dimensions can leave a single center strip.

## Practice

```step
id: practice
```

What do you check before you traverse the bottom row?

1. That the top boundary is at or above the bottom boundary
2. That every row has a different sum
3. That the height is even

[Check the answer](#/spiral-matrix/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: That the top boundary is at or above the bottom boundary**

If top is past bottom, the last available row is already read.

### Follow-up exercises

- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/spiral-matrix.py
  language: python
```

Example problem: Read the Matrix in Clockwise Order.

## Java example

```step
id: java
snippet:
  src: java/spiral-matrix.java
  language: java
```

Example problem: Read the Matrix in Clockwise Order.
