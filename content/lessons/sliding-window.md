---
title: Sliding Window
summary: Update a running sum as a fixed-size window moves across an array.
---

## Add the first window

```step
diagram:
  type: html
  src: diagrams/sliding-window/1.html
  alt: "Sliding Window: Add the first window"
```

Add the first 3 values\. This sum is the first candidate for the maximum\.

### Example state

| Measure | Value |
| --- | --- |
| Window size | 3 |
| Current sum | 8 |
| Best sum | 8 |

## Update the running sum

```step
diagram:
  type: html
  src: diagrams/sliding-window/2.html
  alt: "Sliding Window: Update the running sum"
```

Subtract the outgoing value 2 and add the incoming value 1\. The new sum is 7\.

### Example state

| Measure | Value |
| --- | --- |
| Window size | 3 |
| Current sum | 7 |
| Best sum | 8 |

## Update the running sum

```step
diagram:
  type: html
  src: diagrams/sliding-window/3.html
  alt: "Sliding Window: Update the running sum"
```

Subtract the outgoing value 1 and add the incoming value 3\. The new sum is 9\.

### Example state

| Measure | Value |
| --- | --- |
| Window size | 3 |
| Current sum | 9 |
| Best sum | 9 |

## Update the running sum

```step
diagram:
  type: html
  src: diagrams/sliding-window/4.html
  alt: "Sliding Window: Update the running sum"
```

Subtract the outgoing value 5 and add the incoming value 2\. The new sum is 6\.

### Example state

| Measure | Value |
| --- | --- |
| Window size | 3 |
| Current sum | 6 |
| Best sum | 9 |

## Return the maximum

```step
diagram:
  type: html
  src: diagrams/sliding-window/5.html
  alt: "Sliding Window: Return the maximum"
```

The best window starts at index 2\. Its sum is 9\.

### Example state

| Measure | Value |
| --- | --- |
| Window size | 3 |
| Best start | 2 |
| Best sum | 9 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Maximum Sum of K Adjacent Values
- **Difficulty:** Beginner
- **Estimated study time:** 7 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

A fixed window keeps the same length. A variable window moves its left edge when doing so can restore or improve a valid range.

### Invariant

The running sum equals the sum of exactly k elements in the current window.

### Common error

Initialize the maximum from the first window. A zero default fails when all values are negative.

### Try your own input

Choose a small array and a window size. Trace the array by hand, then check the result with the [Python](#/sliding-window/python) or [Java](#/sliding-window/java) example.

## Practice

```step
id: practice
```

A fixed window moves one index to the right. How do you update its sum?

1. Subtract the outgoing value and add the incoming value
2. Add both boundary values
3. Recompute every value in the window

[Check the answer](#/sliding-window/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: Subtract the outgoing value and add the incoming value**

The overlapping elements stay in the window. Only its first and last positions change membership.

### Follow-up exercises

- [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)
- [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/sliding-window.py
  language: python
```

Example problem: Maximum Sum of K Adjacent Values.

## Java example

```step
id: java
snippet:
  src: java/sliding-window.java
  language: java
```

Example problem: Maximum Sum of K Adjacent Values.
