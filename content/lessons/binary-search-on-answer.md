---
title: Binary Search on the Answer
summary: Find the smallest candidate that passes a check when every larger candidate also passes.
---

## Choose a feasible upper bound

```step
diagram:
  type: html
  src: diagrams/binary-search-on-answer/1.html
  alt: "Binary Search on the Answer: Choose a feasible upper bound"
```

### Problem

Given piles of items and a time limit, find the smallest integer rate that finishes all piles in time. In one hour, work on one pile and remove up to the rate; unused capacity does not carry to another pile. For [3, 5, 8] and 6 hours, find the minimum rate.

### Walkthrough

Finish piles \[3, 5, 8\] in 6 hours\. Each hour works on one pile\. Rate 8 needs one hour per pile, so the minimum feasible rate is between 1 and 8\.

## Test the middle rate

```step
diagram:
  type: html
  src: diagrams/binary-search-on-answer/2.html
  alt: "Binary Search on the Answer: Test the middle rate"
```

Rate 4 needs 1 \+ 2 \+ 2 = 5 hours\. It passes\. Every faster rate also passes, so keep 4 and discard candidates above it\.

## Discard an infeasible lower half

```step
diagram:
  type: html
  src: diagrams/binary-search-on-answer/3.html
  alt: "Binary Search on the Answer: Discard an infeasible lower half"
```

Rate 2 needs 2 \+ 3 \+ 4 = 9 hours\. It fails\. Any smaller rate needs at least as much time\.

## Stop when one candidate remains

```step
diagram:
  type: html
  src: diagrams/binary-search-on-answer/4.html
  alt: "Binary Search on the Answer: Stop when one candidate remains"
```

Rate 3 needs 1 \+ 2 \+ 3 = 6 hours\. It passes\. Both bounds are now 3, the smallest rate that meets the deadline\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Minimum Eating Rate
- **Difficulty:** Intermediate
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(n log(U + 1)) for maximum pile U | O(1) |

### When to use this pattern

Look for a minimum feasible rate, capacity, or limit. Define a quick yes/no test and prove that it changes in one direction.

### Invariant

The smallest feasible answer stays inside the current search range, and the upper bound is feasible.

### Common error

If mid passes, keep it as the new upper bound. It can be the first feasible value. Round up each pile separately.

## Practice

```step
id: practice
```

If rate 4 passes, why keep it in the search range?

1. It could be the smallest passing rate
2. It proves 3 also passes
3. The upper bound must fail

[Check the answer](#/binary-search-on-answer/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It could be the smallest passing rate**

The test proves 4 is feasible. A smaller feasible candidate may exist, so retain 4 as the upper bound.

### Follow-up exercises

- [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- [Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/binary-search-on-answer.py
  language: python
```

Example problem: Find the Minimum Eating Rate.

## Java example

```step
id: java
snippet:
  src: java/binary-search-on-answer.java
  language: java
```

Example problem: Find the Minimum Eating Rate.
