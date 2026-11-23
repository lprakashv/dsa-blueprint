---
title: Burst Balloons
summary: Choose the last balloon in each interval so its neighbors are known and its subproblems are independent.
---

## Give the row two fixed boundaries

```step
diagram:
  type: html
  src: diagrams/burst-balloons/1.html
  alt: "Burst Balloons: Give the row two fixed boundaries"
```

Add a 1 at each end\. The two added values stay in place and contribute to a score when an edge balloon is removed\.

[Read the problem and hints](#/burst-balloons/practice).

## Split the interval at the last balloon

```step
diagram:
  type: html
  src: diagrams/burst-balloons/2.html
  alt: "Burst Balloons: Split the interval at the last balloon"
```

If 3 is last in the full interval, its neighbors are the two outer 1s\. Everything to its left can be solved before that final score of 3\.

## Build the shorter intervals first

```step
diagram:
  type: html
  src: diagrams/burst-balloons/3.html
  alt: "Burst Balloons: Build the shorter intervals first"
```

Adjacent boundaries enclose zero balloons\. The interval between values 2 and 3 encloses only 4, so dp\[1\]\[3\] equals 2 × 4 × 3 = 24\.

## Try every last balloon in the full interval

```step
diagram:
  type: html
  src: diagrams/burst-balloons/4.html
  alt: "Burst Balloons: Try every last balloon in the full interval"
```

The totals for making 2, 4, or 3 last are 32, 24, and 33\. Choose 33 and store it at dp\[0\]\[4\]\.

## Check the best order

```step
diagram:
  type: html
  src: diagrams/burst-balloons/5.html
  alt: "Burst Balloons: Check the best order"
```

Remove 4 for 24 coins, then 2 for 6, then 3 for 3\. Return 33\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Maximize Coins With Interval Dynamic Programming
- **Difficulty:** Hard
- **Estimated study time:** 18 min

| Time | Extra space |
| --- | --- |
| O(n³) | O(n²) |

### When to use this pattern

When the first removal changes the remaining neighbors, try reasoning backward from the last removal.

### Invariant

dp\[left\]\[right\] is the best score from removing only the balloons strictly between those two boundaries.

### Common error

Score the last balloon using the fixed interval boundaries. Shorter intervals must be ready before larger ones.

## Practice

```step
id: practice
```

### Problem

Remove all balloons from a row. When you remove one, multiply its value by the values of its two current neighbors and add the product to your score. An absent neighbor counts as 1. Find the largest possible total.

### Example

```text
Input
balloons = [2, 4, 3]

Output
33
```

Remove the 4 first, then the 2, then the 3. The scores are 24, 6, and 3.

### Constraints

- There are 1 to 300 balloons.
- Each balloon value is an integer from 0 through 100.

[Solve on LeetCode](https://leetcode.com/problems/burst-balloons/) · [Read the hints](#/burst-balloons/hints)

### Check your reasoning

What are the neighbors of the last balloon removed inside (left, right)?

1. Its original two neighbors
2. The two fixed boundaries left and right
3. The highest values remaining anywhere in the row

[Check the answer](#/burst-balloons/answer).

## Hints

```step
id: hints
```

### Hint 1

Choosing the first removal changes which balloons are adjacent. Try choosing the last removal inside an interval instead.

### Hint 2

If k is last inside (left, right), its score is values\[left\] × values\[k\] × values\[right\]. The intervals on either side can be solved independently.

## Answer and exercises

```step
id: answer
```

**Answer 2: The two fixed boundaries left and right**

Every other balloon inside the interval is gone by then. The two boundaries still surround the last one.

### Follow-up exercises

- [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/)
- Derive the recurrence for two balloons inside an interval.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/burst-balloons.py
  language: python
```

Example problem: Maximize Coins With Interval Dynamic Programming.

## Java example

```step
id: java
snippet:
  src: java/burst-balloons.java
  language: java
```

Example problem: Maximize Coins With Interval Dynamic Programming.
