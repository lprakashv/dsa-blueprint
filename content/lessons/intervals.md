---
title: Merge Intervals
summary: Sort ranges by start and keep one merged range open at a time.
---

## Sort by start time

```step
diagram:
  type: html
  src: diagrams/intervals/1.html
  alt: "Merge Intervals: Sort by start time"
```

After sorting, the next start is always at or after the last start you processed\.

## Combine the first overlap

```step
diagram:
  type: html
  src: diagrams/intervals/2.html
  alt: "Merge Intervals: Combine the first overlap"
```

2 ≤ 3\. Merge \[1, 3\] and \[2, 6\] into \[1, 6\]\.

## Open a new range at the gap

```step
diagram:
  type: html
  src: diagrams/intervals/3.html
  alt: "Merge Intervals: Open a new range at the gap"
```

8 \> 6\. Add \[8, 10\] as a new interval\.

## Extend the last range

```step
diagram:
  type: html
  src: diagrams/intervals/4.html
  alt: "Merge Intervals: Extend the last range"
```

9 ≤ 10\. Extend the second output range to 12\. Return the two merged ranges\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Combine Overlapping Ranges
- **Difficulty:** Intermediate
- **Estimated study time:** 7 min

| Time | Extra space |
| --- | --- |
| O(n log n) | O(n) |

### When to use this pattern

Look for overlapping time ranges, bookings, or segments.

### Invariant

The output is sorted and disjoint. Only its last interval can overlap the next input.

### Common error

Use the larger end when you merge. A contained interval must not shorten the current range.

## Practice

```step
id: practice
```

What is the merge of \[1, 9\] and \[2, 4\]?

1. \[1, 4\]
2. \[2, 9\]
3. \[1, 9\]

[Check the answer](#/intervals/answer).

## Answer and exercises

```step
id: answer
```

**Answer 3: \[1, 9\]**

The second interval is contained in the first. The larger end remains 9.

### Follow-up exercises

- [Merge Intervals](https://leetcode.com/problems/merge-intervals/)
- [Insert Interval](https://leetcode.com/problems/insert-interval/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/intervals.py
  language: python
```

Example problem: Combine Overlapping Ranges.

## Java example

```step
id: java
snippet:
  src: java/intervals.java
  language: java
```

Example problem: Combine Overlapping Ranges.
