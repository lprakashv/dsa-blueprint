---
title: Binary Search
summary: Cut the search range in half after each comparison.
---

## Start with the whole range

```step
diagram:
  type: html
  src: diagrams/binary-search/1.html
  alt: "Binary Search: Start with the whole range"
```

Search for 11 in this sorted array\. Set Low to 0 and High to 6\.

### Example state

| Measure | Value |
| --- | --- |
| Target | 11 |
| Low index | 0 |
| High index | 6 |

## Keep the right half

```step
diagram:
  type: html
  src: diagrams/binary-search/2.html
  alt: "Binary Search: Keep the right half"
```

Index 3 contains 7\. The sorted order lets you discard index 3 and everything to its left\.

### Example state

| Measure | Value |
| --- | --- |
| Low index | 0 |
| High index | 6 |
| Mid index | 3 |

## The middle value matches

```step
diagram:
  type: html
  src: diagrams/binary-search/3.html
  alt: "Binary Search: The middle value matches"
```

Index 5 contains 11\. Return this index\.

### Example state

| Measure | Value |
| --- | --- |
| Low index | 4 |
| High index | 6 |
| Mid index | 5 |

## Know when to stop

```step
diagram:
  type: html
  src: diagrams/binary-search/4.html
  alt: "Binary Search: Know when to stop"
```

For an absent target, keep narrowing the range until Low is greater than High\. Return −1\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find a Target in a Sorted Array
- **Difficulty:** Beginner
- **Estimated study time:** 7 min

| Time | Extra space |
| --- | --- |
| O(log n) | O(1) |

### When to use this pattern

Look for sorted values or a predicate that switches once from false to true.

### Invariant

If the target exists and you have not found it, it is in the inclusive range \[lo, hi\].

### Common error

Remove mid after a mismatch. Setting lo = mid can stall when two candidates remain.

### Try your own input

Choose a small array and a target. Trace the array by hand, then check the result with the [Python](#/binary-search/python) or [Java](#/binary-search/java) example.

## Practice

```step
id: practice
```

nums\[mid\] is smaller than the target. What changes?

1. hi = mid − 1
2. lo = mid + 1
3. lo = mid

[Check the answer](#/binary-search/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: lo = mid + 1**

Everything at or below mid is too small. The next candidate starts at mid + 1.

### Follow-up exercises

- [Binary Search](https://leetcode.com/problems/binary-search/)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/binary-search.py
  language: python
```

Example problem: Find a Target in a Sorted Array.

## Java example

```step
id: java
snippet:
  src: java/binary-search.java
  language: java
```

Example problem: Find a Target in a Sorted Array.
