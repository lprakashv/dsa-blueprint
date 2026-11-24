---
title: Minimum and Maximum DP States
summary: Track both product extremes because a negative multiplier reverses their order.
---

## Start with the first element

```step
diagram:
  type: html
  src: diagrams/dp-min-max/1.html
  alt: "Minimum and Maximum DP States: Start with the first element"
```

### Problem

Given a nonempty array of integers, find the largest product of a nonempty contiguous subarray. Negative values can change the sign of a product, and zero can split a range. For [2, -3, -2, 0, 4], return 12 for [2, -3, -2].

### Walkthrough

The only nonempty range that ends at index 0 is \[2\]\. Both extremes and the best product start at 2\.

## Compare a new range with an extension

```step
diagram:
  type: html
  src: diagrams/dp-min-max/2.html
  alt: "Minimum and Maximum DP States: Compare a new range with an extension"
```

At −3, start with −3 or extend 2 to get −6\. Keep −6 as the minimum and −3 as the maximum ending here\.

## Use the old minimum to get a new maximum

```step
diagram:
  type: html
  src: diagrams/dp-min-max/3.html
  alt: "Minimum and Maximum DP States: Use the old minimum to get a new maximum"
```

Multiply −6 by −2 to get 12\. Tracking only the old maximum of −3 would miss the best range\.

## Allow a range to start after a zero

```step
diagram:
  type: html
  src: diagrams/dp-min-max/4.html
  alt: "Minimum and Maximum DP States: Allow a range to start after a zero"
```

Both products become 0 at zero\. At 4, starting a new range gives 4\. The best over all endpoints stays 12\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Maximum Product Subarray
- **Difficulty:** Intermediate
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

Keep both extremes when a later operation can make the smallest value become the largest, as with multiplication by a negative number.

### Invariant

low and high are the minimum and maximum product of a nonempty subarray that ends at the current index.

### Common error

Compute both next states from the same previous pair. In grid variants, delay modulo until the final answer to preserve ordering.

## Practice

```step
id: practice
```

Why keep the minimum product that ends here?

1. It gives the product of the full array
2. A later negative value can turn it into the maximum
3. It allows you to skip zero

[Check the answer](#/dp-min-max/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: A later negative value can turn it into the maximum**

Multiplication by a negative value reverses the order of its operands. Starting a new range remains a separate option.

### Follow-up exercises

- [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/)
- [Maximum Non Negative Product in a Matrix](https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/dp-min-max.py
  language: python
```

Example problem: Find the Maximum Product Subarray.

## Java example

```step
id: java
snippet:
  src: java/dp-min-max.java
  language: java
```

Example problem: Find the Maximum Product Subarray.
