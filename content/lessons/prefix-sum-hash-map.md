---
title: Prefix Sum + Hash Map
summary: Store the first position of each prefix balance to find the longest range with equal counts.
---

## Give 0 and 1 opposite weights

```step
diagram:
  type: html
  src: diagrams/prefix-sum-hash-map/1.html
  alt: "Prefix Sum + Hash Map: Give 0 and 1 opposite weights"
```

### Problem

Given an array containing only 0 and 1, find the length of the longest contiguous subarray with the same number of zeros and ones. For [1, 0, 1, 1, 0, 0], return 6. Return 0 if no such range exists.

### Walkthrough

Count a 1 as \+1 and a 0 as −1\. A range with equal counts makes no net change\. Start at boundary 0 before the first element\.

## Save the first boundary for each balance

```step
diagram:
  type: html
  src: diagrams/prefix-sum-hash-map/2.html
  alt: "Prefix Sum + Hash Map: Save the first boundary for each balance"
```

Read 1 and reach balance 1 at boundary 1\. Record this boundary\. Later matches can subtract it to find a zero\-sum range\.

## Subtract the earlier boundary

```step
diagram:
  type: html
  src: diagrams/prefix-sum-hash-map/3.html
  alt: "Prefix Sum + Hash Map: Subtract the earlier boundary"
```

The next 0 brings the balance back to 0 at boundary 2\. The range between boundaries 0 and 2 is balanced\. Keep boundary 0 for future matches\.

## Keep the largest distance

```step
diagram:
  type: html
  src: diagrams/prefix-sum-hash-map/4.html
  alt: "Prefix Sum + Hash Map: Keep the largest distance"
```

The balance returns to 0 at boundary 6\. The original boundary 0 gives the longest balanced range\. For a target sum k, look up current prefix minus k\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Longest Balanced Binary Subarray
- **Difficulty:** Intermediate
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(n) expected | O(n) |

### When to use this pattern

Look for contiguous ranges with a target sum or equal counts when values can cancel each other.

### Invariant

first\[balance\] is the earliest boundary where that balance occurred.

### Common error

Seed balance 0 at boundary 0. For a longest range, keep the earliest boundary. For a count of ranges, store frequencies instead.

## Practice

```step
id: practice
```

Why keep the first boundary for a repeated balance?

1. It gives the longest range that ends at this boundary
2. It makes the prefix sum increase
3. It counts every matching range

[Check the answer](#/prefix-sum-hash-map/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It gives the longest range that ends at this boundary**

All boundaries with the same balance give a zero-sum range. The earliest one gives the greatest distance.

### Follow-up exercises

- [Contiguous Array](https://leetcode.com/problems/contiguous-array/)
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)
- [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/prefix-sum-hash-map.py
  language: python
```

Example problem: Find the Longest Balanced Binary Subarray.

## Java example

```step
id: java
snippet:
  src: java/prefix-sum-hash-map.java
  language: java
```

Example problem: Find the Longest Balanced Binary Subarray.
