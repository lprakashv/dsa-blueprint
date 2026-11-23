---
title: Split Array Largest Sum
summary: Binary-search a maximum group sum. Greedily pack each group to test that limit.
---

## Turn the optimization into a yes or no test

```step
diagram:
  type: html
  src: diagrams/split-array-largest-sum/1.html
  alt: "Split Array Largest Sum: Turn the optimization into a yes or no test"
```

Ask if there is a split with every group sum at most cap\. Search from 6, the largest item, through 20, the total\. A larger cap accepts every split that a smaller one accepts\.

[Read the problem and hints](#/split-array-largest-sum/practice).

## Take the longest prefix that fits each group

```step
diagram:
  type: html
  src: diagrams/split-array-largest-sum/2.html
  alt: "Split Array Largest Sum: Take the longest prefix that fits each group"
```

At cap 13, the first group reaches sum 12 before the next item would make it 15\. It covers at least as many items as any valid first group\. Moving those items into the first group only removes nonnegative values from later groups\. Repeat this argument for each group\.

## Raise the lower bound when the scan needs too many groups

```step
diagram:
  type: html
  src: diagrams/split-array-largest-sum/3.html
  alt: "Split Array Largest Sum: Raise the lower bound when the scan needs too many groups"
```

The next cap 9 needs three groups, so search \[10, 13\]\. Then cap 11 still needs three groups\. No cap at or below 11 can fit two groups\.

## Check whether the first remaining cap works

```step
diagram:
  type: html
  src: diagrams/split-array-largest-sum/4.html
  alt: "Split Array Largest Sum: Check whether the first remaining cap works"
```

Cap 12 fits the two groups \[4, 2, 6\] and \[3, 5\]\. If a scan uses fewer than k groups, split groups into smaller nonempty groups until there are k\. Their sums cannot increase\.

## Report the first feasible cap

```step
diagram:
  type: html
  src: diagrams/split-array-largest-sum/5.html
  alt: "Split Array Largest Sum: Report the first feasible cap"
```

Both bounds are 12\. Each cap check visits the array once, and each binary\-search step removes about half the remaining caps\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Minimize the Largest Sum of a Contiguous Group
- **Difficulty:** Hard
- **Estimated study time:** 15 min

| Time | Extra space |
| --- | --- |
| O(n log(S + 2)) for total sum S | O(1) |

### When to use this pattern

Use a limit check when you must minimize the worst contiguous group and loosening the limit cannot hurt.

### Invariant

A cap is feasible if the greedy scan uses at most k groups. The smallest feasible cap stays inside the search range.

### Common error

The greedy rule needs nonnegative values. Under that assumption, a feasible split with fewer than k groups can be refined to exactly k.

## Practice

```step
id: practice
```

### Problem

Divide the array into exactly k nonempty contiguous groups. Return the smallest possible value of the largest group sum.

### Example

```text
Input
nums = [4, 2, 6, 3, 5]
k = 2

Output
12
```

The groups \[4, 2, 6\] and \[3, 5\] have sums 12 and 8. Every split into two groups has a group that sums to at least 12.

### Constraints

- There are 1 to 1,000 nonnegative values.
- The group count k is at least 1 and at most the smaller of 50 and the array length.

[Solve on LeetCode](https://leetcode.com/problems/split-array-largest-sum/) · [Read the hints](#/split-array-largest-sum/hints)

### Check your reasoning

The greedy scan uses fewer than k groups. Why can the cap still pass?

1. The problem permits empty groups
2. Splitting a group of nonnegative values cannot raise its sum
3. Moving the cap up will increase the group count

[Check the answer](#/split-array-largest-sum/answer).

## Hints

```step
id: hints
```

### Hint 1

The maximum item is a lower bound. The total sum is feasible, since a group can be split into smaller groups.

### Hint 2

For a trial cap, extend the current group until the next item would exceed it. Count the resulting groups.

### Hint 3

If a cap needs too many groups, every smaller cap fails too. If it passes, keep the cap as a candidate.

## Answer and exercises

```step
id: answer
```

**Answer 2: Splitting a group of nonnegative values cannot raise its sum**

Because k is at most the array length, a nonsingleton group can be split until exactly k nonempty groups exist.

### Follow-up exercises

- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
- [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/split-array-largest-sum.py
  language: python
```

Example problem: Minimize the Largest Sum of a Contiguous Group.

## Java example

```step
id: java
snippet:
  src: java/split-array-largest-sum.java
  language: java
```

Example problem: Minimize the Largest Sum of a Contiguous Group.
