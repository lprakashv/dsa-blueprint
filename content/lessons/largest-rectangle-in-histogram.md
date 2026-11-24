---
title: Largest Rectangle in Histogram
summary: Use a monotonic stack to find the left and right limits of each bar in a single pass.
---

## Keep the first bar unresolved

```step
diagram:
  type: html
  src: diagrams/largest-rectangle-in-histogram/1.html
  alt: "Largest Rectangle in Histogram: Keep the first bar unresolved"
```

### Problem

The array lists the heights of adjacent bars, each one unit wide. Find the maximum area of an axis-aligned rectangle that rests on the baseline and fits under the bars it spans.

### Example

```text
Input
heights = [2, 1, 4, 5, 2]

Output
8
```

Bars at indices 2 and 3 support a rectangle of width 2 and height 4.

### Walkthrough

At index 0, push height 2\. You cannot tell how far its rectangle extends until you see a shorter bar\.

### Example state

| Measure | Value |
| --- | --- |
| Best area | 0 |

[Read the constraints and hints](#/largest-rectangle-in-histogram/practice).

## Close the first rectangle

```step
diagram:
  type: html
  src: diagrams/largest-rectangle-in-histogram/2.html
  alt: "Largest Rectangle in Histogram: Close the first rectangle"
```

Height 1 at index 1 stops the rectangle for height 2\. Its width is 1\. Pop index 0, then push index 1\.

### Example state

| Measure | Value |
| --- | --- |
| Best area | 2 |

## Keep taller bars on top

```step
diagram:
  type: html
  src: diagrams/largest-rectangle-in-histogram/3.html
  alt: "Largest Rectangle in Histogram: Keep taller bars on top"
```

Push indices 2 and 3, with heights 4 and 5\. Both are still waiting for a shorter bar to the right\.

### Example state

| Measure | Value |
| --- | --- |
| Best area | 2 |

## Use the shorter bar to find the width

```step
diagram:
  type: html
  src: diagrams/largest-rectangle-in-histogram/4.html
  alt: "Largest Rectangle in Histogram: Use the shorter bar to find the width"
```

Index 4 has height 2\. Pop height 5 for area 5\. Then pop height 4\. The new stack top is index 1, so the width is 4 − 1 − 1 = 2\.

### Example state

| Measure | Value |
| --- | --- |
| Best area | 8 |
| Left limit | 1 |
| Right limit | 4 |

## Close any open rectangles

```step
diagram:
  type: html
  src: diagrams/largest-rectangle-in-histogram/5.html
  alt: "Largest Rectangle in Histogram: Close any open rectangles"
```

Push index 4, then process a virtual height 0 after the last bar\. Remaining positive heights yield areas 6 and 5\. Keep 8\.

### Example state

| Measure | Value |
| --- | --- |
| Best area | 8 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Widest Span for Each Limiting Height
- **Difficulty:** Hard
- **Estimated study time:** 16 min

| Time | Extra space |
| --- | --- |
| O(n) | O(n) |

### When to use this pattern

Look for the widest span where every bar reaches a candidate height. A shorter bar sets a boundary.

### Invariant

Stack heights are nondecreasing. A stacked bar is waiting for a strictly shorter bar on its right.

### Common error

Use the new stack top as the exclusive left boundary. With equal heights, the earliest equal bar eventually spans the full plateau.

## Practice

```step
id: practice
```

### Problem

The array lists the heights of adjacent bars, each one unit wide. Find the maximum area of an axis-aligned rectangle that rests on the baseline and fits under the bars it spans.

### Example

```text
Input
heights = [2, 1, 4, 5, 2]

Output
8
```

Bars at indices 2 and 3 support a rectangle of width 2 and height 4.

### Constraints

- There are 1 to 100,000 bars.
- Each height is an integer from 0 through 10,000.

[Solve on LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/) · [Read the hints](#/largest-rectangle-in-histogram/hints)

### Check your reasoning

A bar is popped at index 4, and the new stack top is index 1. What width do you use?

1. 2
2. 3
3. 4

[Check the answer](#/largest-rectangle-in-histogram/answer).

## Hints

```step
id: hints
```

### Hint 1

Pick one bar as the minimum height of a rectangle. What is the first place on either side where you cannot extend it?

### Hint 2

Keep unresolved bar indices on a stack in nondecreasing height order. A drop reveals the right boundary of each taller bar you pop.

## Answer and exercises

```step
id: answer
```

**Answer 1: 2**

Only indices 2 and 3 lie between the two boundaries. The width is 4 − 1 − 1.

### Follow-up exercises

- [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/)
- Trace a histogram with three equal bars. Which pop gets the full width?

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/largest-rectangle-in-histogram.py
  language: python
```

Example problem: Find the Widest Span for Each Limiting Height.

## Java example

```step
id: java
snippet:
  src: java/largest-rectangle-in-histogram.java
  language: java
```

Example problem: Find the Widest Span for Each Limiting Height.
