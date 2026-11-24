---
title: Median of Two Sorted Arrays
summary: Search for a cut in the shorter array that puts every left-side value before every right-side value.
---

## Fix the size of the left half

```step
diagram:
  type: html
  src: diagrams/median-of-two-sorted-arrays/1.html
  alt: "Median of Two Sorted Arrays: Fix the size of the left half"
```

### Problem

Given two arrays sorted in nondecreasing order, return the median of their combined values in logarithmic time. At least one array must be nonempty. For an even number of values, use the average of the two middle values.

### Example

```text
Input
first = [6, 8]
second = [1, 3, 4, 5]

Output
4.5
```

The middle values in sorted order are 4 and 5. Their average is 4.5.

### Walkthrough

With 6 values, put 3 on each side\. Search only the cut i in the shorter array\. Set the other cut j to 3 − i\. Because the first array is shorter, every candidate i gives an in\-range j\.

[Read the constraints and hints](#/median-of-two-sorted-arrays/practice).

## Compare the two cross-array boundaries

```step
diagram:
  type: html
  src: diagrams/median-of-two-sorted-arrays/2.html
  alt: "Median of Two Sorted Arrays: Compare the two cross-array boundaries"
```

Try i = 1 and j = 2\. The left includes 6, but the right includes 4\. The first cut is too far right\. Moving it even farther right can only raise its left boundary and lower the other right boundary\.

## Move in the direction of the failed check

```step
diagram:
  type: html
  src: diagrams/median-of-two-sorted-arrays/3.html
  alt: "Median of Two Sorted Arrays: Move in the direction of the failed check"
```

If the second left boundary exceeds the first right boundary, move the first cut right\. Here that check is already satisfied\. Reduce the upper bound and try i = 0, j = 3\.

## Treat an empty boundary as infinity

```step
diagram:
  type: html
  src: diagrams/median-of-two-sorted-arrays/4.html
  alt: "Median of Two Sorted Arrays: Treat an empty boundary as infinity"
```

No first\-array value is on the left, so use −∞ there\. The two cross checks are −∞ ≤ 5 and 4 ≤ 6\. Each array is already sorted, so these checks put every left value at or below every right value\.

## Read the median from the cut

```step
diagram:
  type: html
  src: diagrams/median-of-two-sorted-arrays/5.html
  alt: "Median of Two Sorted Arrays: Read the median from the cut"
```

The largest value on the left is 4 and the smallest on the right is 5\. Average them when the total is even\. When the total is odd, the left side has one extra value, so return its maximum\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Middle of Two Sorted Arrays Without Merging
- **Difficulty:** Hard
- **Estimated study time:** 16 min

| Time | Extra space |
| --- | --- |
| O(log(min(m, n) + 2)) | O(1) |

### When to use this pattern

Look for a rank in two sorted arrays when a linear merge would exceed the time limit.

### Invariant

The two cuts always put ceil((m + n) / 2) values on the left. Compare only the values next to each cut.

### Common error

Allow a cut at either end of the shorter array. With an even total, average the middle pair.

## Practice

```step
id: practice
```

### Problem

Given two arrays sorted in nondecreasing order, return the median of their combined values in logarithmic time. At least one array must be nonempty. For an even number of values, use the average of the two middle values.

### Example

```text
Input
first = [6, 8]
second = [1, 3, 4, 5]

Output
4.5
```

The middle values in sorted order are 4 and 5. Their average is 4.5.

### Constraints

- Each array can be empty. Together, they contain 1 to 2,000 values.
- Both arrays are sorted in nondecreasing order.

[Solve on LeetCode](https://leetcode.com/problems/median-of-two-sorted-arrays/) · [Read the hints](#/median-of-two-sorted-arrays/hints)

### Check your reasoning

The first array’s left boundary is greater than the second array’s right boundary. What changes?

1. Move the cut in the first array left
2. Move the cut in the first array right
3. Increase the number of values on the left

[Check the answer](#/median-of-two-sorted-arrays/answer).

## Hints

```step
id: hints
```

### Hint 1

Pick a cut count i in the shorter array. The size of the left half determines the other cut count j.

### Hint 2

Check the largest value to the left of each cut against the smallest value to the right of the other cut.

### Hint 3

A missing left boundary acts like negative infinity. A missing right boundary acts like positive infinity.

## Answer and exercises

```step
id: answer
```

**Answer 1: Move the cut in the first array left**

Reducing the first cut lowers its left boundary and moves the other cut right. Keep the total number of left values fixed.

### Follow-up exercises

- [Find K Closest Elements](https://leetcode.com/problems/find-k-closest-elements/)
- Find the kth value instead of the median. How does the cut size change?

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/median-of-two-sorted-arrays.py
  language: python
```

Example problem: Find the Middle of Two Sorted Arrays Without Merging.

## Java example

```step
id: java
snippet:
  src: java/median-of-two-sorted-arrays.java
  language: java
```

Example problem: Find the Middle of Two Sorted Arrays Without Merging.
