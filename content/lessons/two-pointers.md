---
title: Two Pointers
summary: Scan a sorted array from both ends to find a pair that adds up to a target.
---

## Start at both ends

```step
diagram:
  type: html
  src: diagrams/two-pointers/1.html
  alt: "Two Pointers: Start at both ends"
```

Put Left at the first element and Right at the last\. The array is sorted, so you can rule out one end after each comparison\.

### Example state

| Measure | Value |
| --- | --- |
| Target sum | 10 |
| Left index | 0 |
| Right index | 5 |

## The sum is too high

```step
diagram:
  type: html
  src: diagrams/two-pointers/2.html
  alt: "Two Pointers: The sum is too high"
```

13 \> 10\. Every other left value is at least 1, so index 5 cannot be in the answer\. Move Right left\.

### Example state

| Measure | Value |
| --- | --- |
| Target sum | 10 |
| Left index | 0 |
| Right index | 5 |

## The sum is too low

```step
diagram:
  type: html
  src: diagrams/two-pointers/3.html
  alt: "Two Pointers: The sum is too low"
```

9 \< 10\. Every other right value is at most 8, so index 0 cannot be in the answer\. Move Left right\.

### Example state

| Measure | Value |
| --- | --- |
| Target sum | 10 |
| Left index | 0 |
| Right index | 4 |

## Move Left and check again

```step
diagram:
  type: html
  src: diagrams/two-pointers/4.html
  alt: "Two Pointers: Move Left and check again"
```

Move Left from index 0 to index 1\. Now 2 \+ 8 = 10\. The new pair has the target sum\.

### Example state

| Measure | Value |
| --- | --- |
| Target sum | 10 |
| Left index | 1 |
| Right index | 4 |

## Return the two indices

```step
diagram:
  type: html
  src: diagrams/two-pointers/5.html
  alt: "Two Pointers: Return the two indices"
```

Return indices \[1, 4\]\. Each comparison removes one candidate until you find a pair or the pointers meet\.

### Example state

| Measure | Value |
| --- | --- |
| Target sum | 10 |
| Comparisons | 3 |
| Result | \[1, 4\] |

## Pattern notes

```step
id: notes
```

- **Example problem:** Two Sum on a Sorted Array
- **Difficulty:** Beginner
- **Estimated study time:** 6 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

Look for a sorted array and a pair of values. The order tells you which end to move.

### Invariant

If a solution remains, both indices are between Left and Right.

### Common error

Stop when the pointers meet. One element cannot form a pair with itself.

### Try your own input

Choose a small array and a target. Trace the array by hand, then check the result with the [Python](#/two-pointers/python) or [Java](#/two-pointers/java) example.

## Practice

```step
id: practice
```

The sum is larger than the target. Which pointer moves?

1. Left moves right
2. Right moves left
3. Both move inward

[Check the answer](#/two-pointers/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: Right moves left**

Right points to the largest remaining value. Moving it left can lower the sum.

### Follow-up exercises

- [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)
- For one allowed deletion, test both remaining ranges at the first mismatch.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/two-pointers.py
  language: python
```

Example problem: Two Sum on a Sorted Array.

## Java example

```step
id: java
snippet:
  src: java/two-pointers.java
  language: java
```

Example problem: Two Sum on a Sorted Array.
