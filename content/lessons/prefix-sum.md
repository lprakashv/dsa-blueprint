---
title: Prefix Sum
summary: Prepare cumulative totals once, then answer each range query in constant time.
---

## Start with an empty prefix

```step
diagram:
  type: html
  src: diagrams/prefix-sum/1.html
  alt: "Prefix Sum: Start with an empty prefix"
```

### Problem

Given a fixed array of numbers, answer sum queries for contiguous ranges. Each query gives inclusive start and end indices. For [2, 4, 1, 3], the sum from index 1 through index 3 is 8.

### Walkthrough

The sum of zero values is 0\. Put this value at index 0\.

## Add one input value at a time

```step
diagram:
  type: html
  src: diagrams/prefix-sum/2.html
  alt: "Prefix Sum: Add one input value at a time"
```

To add the second value, start with 2 and add 4\. Store 6 at prefix\[2\]\.

## Find both boundaries

```step
diagram:
  type: html
  src: diagrams/prefix-sum/3.html
  alt: "Prefix Sum: Find both boundaries"
```

To sum indices 1 through 3, take the totals at prefix\[1\] and prefix\[4\]\.

## Remove the part before the range

```step
diagram:
  type: html
  src: diagrams/prefix-sum/4.html
  alt: "Prefix Sum: Remove the part before the range"
```

The total through index 3 is 10\. Subtract 2, the total before index 1\. The answer is 8\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Sum an Inclusive Range
- **Difficulty:** Beginner
- **Estimated study time:** 6 min

| Time | Extra space |
| --- | --- |
| O(n) build · O(1) query | O(n) |

### When to use this pattern

Look for repeated range sums over an array with fixed values.

### Invariant

prefix\[i\] is the sum of the first i input elements.

### Common error

An inclusive right endpoint r needs prefix\[r + 1\].

## Practice

```step
id: practice
```

Which formula sums the inclusive range \[0, 2\]?

1. prefix\[2\] − prefix\[0\]
2. prefix\[3\] − prefix\[1\]
3. prefix\[3\] − prefix\[0\]

[Check the answer](#/prefix-sum/answer).

## Answer and exercises

```step
id: answer
```

**Answer 3: prefix\[3\] − prefix\[0\]**

prefix\[3\] includes the first three items, and prefix\[0\] subtracts zero.

### Follow-up exercises

- [Range Sum Query](https://leetcode.com/problems/range-sum-query-immutable/)
- [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/prefix-sum.py
  language: python
```

Example problem: Sum an Inclusive Range.

## Java example

```step
id: java
snippet:
  src: java/prefix-sum.java
  language: java
```

Example problem: Sum an Inclusive Range.
