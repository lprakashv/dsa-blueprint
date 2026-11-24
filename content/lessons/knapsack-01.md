---
title: 0/1 Knapsack and Subset Sum
summary: Track reachable totals and update them from right to left so each item can be used once.
---

## Reduce equal partition to subset sum

```step
diagram:
  type: html
  src: diagrams/knapsack-01/1.html
  alt: "0/1 Knapsack and Subset Sum: Reduce equal partition to subset sum"
```

### Problem

Given positive integers, decide whether they can be split into two groups with equal sums. Use each input value exactly once. For [2, 3, 4, 1], the answer is yes: [2, 3] and [4, 1] both sum to 5.

### Walkthrough

The values \[2, 3, 4, 1\] sum to 10\. Find one subset that sums to 5\. The remaining values will also sum to 5\. An odd total cannot be split equally\.

## Read from the previous item state

```step
diagram:
  type: html
  src: diagrams/knapsack-01/2.html
  alt: "0/1 Knapsack and Subset Sum: Read from the previous item state"
```

With item 2, scan sums from 5 down to 2\. When you check 4, sum 2 is still false\. Only sum 2 becomes reachable\.

## Build on earlier items

```step
diagram:
  type: html
  src: diagrams/knapsack-01/3.html
  alt: "0/1 Knapsack and Subset Sum: Build on earlier items"
```

With item 3, sum 5 reads the old state for sum 2\. Sum 3 reads sum 0\. Both become reachable\.

## Stop when the target is reachable

```step
diagram:
  type: html
  src: diagrams/knapsack-01/4.html
  alt: "0/1 Knapsack and Subset Sum: Stop when the target is reachable"
```

The subset \[2, 3\] reaches 5\. The remaining values \[4, 1\] also reach 5\. Later items cannot make a reachable sum unreachable\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Partition Values Into Two Equal Sums
- **Difficulty:** Intermediate
- **Estimated study time:** 11 min

| Time | Extra space |
| --- | --- |
| O(n × target) | O(target) |

### When to use this pattern

Use a table of totals when each item can be picked at most once and the target sum is small enough to index.

### Invariant

After an item is processed, reachable\[s\] says whether processed items can form sum s.

### Common error

Descending updates prevent reuse in 0/1 knapsack. With an item that can be reused, ascending updates let the same item contribute again.

## Practice

```step
id: practice
```

What would go wrong if you scanned sums upward for item 2?

1. You could read past target
2. A new result for sum 2 could make sum 4 reachable using the same item
3. Sum 0 would become unreachable

[Check the answer](#/knapsack-01/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: A new result for sum 2 could make sum 4 reachable using the same item**

The value at sum 2 would already include the current item. Descending order reads states from before that item.

### Follow-up exercises

- [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
- [Target Sum](https://leetcode.com/problems/target-sum/)
- [Coin Change](https://leetcode.com/problems/coin-change/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/knapsack-01.py
  language: python
```

Example problem: Partition Values Into Two Equal Sums.

## Java example

```step
id: java
snippet:
  src: java/knapsack-01.java
  language: java
```

Example problem: Partition Values Into Two Equal Sums.
