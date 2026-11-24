---
title: Heap / Top K
summary: Keep the K largest candidates in a min-heap and remove the smallest as needed.
---

## Add the first three values

```step
diagram:
  type: html
  src: diagrams/heap/1.html
  alt: "Heap / Top K: Add the first three values"
```

### Problem

Given an array and an integer k, return the k largest values. For [4, 1, 7, 3, 9] and k = 3, the result contains 4, 7, and 9; their order is not required.

### Walkthrough

Find the three largest values in \[4, 1, 7, 3, 9\]\. Add 4, 1, and 7 to the heap\. Its root is 1\.

## Compare 3 with the root

```step
diagram:
  type: html
  src: diagrams/heap/2.html
  alt: "Heap / Top K: Compare 3 with the root"
```

3 \> 1\. Remove 1 and insert 3\. The new root is 3\.

## Compare 9 with the root

```step
diagram:
  type: html
  src: diagrams/heap/3.html
  alt: "Heap / Top K: Compare 9 with the root"
```

9 \> 3\. Replace 3 with 9 and restore heap order\. The new root is 4\.

## Return the retained values

```step
diagram:
  type: html
  src: diagrams/heap/4.html
  alt: "Heap / Top K: Return the retained values"
```

The heap contains 4, 7, and 9\. Sort these three values only if the result requires sorted order\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the K Largest Values
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(n log k) for k ≥ 2 | O(k) |

### When to use this pattern

Look for top K, repeated access to an extreme, or a stream of values.

### Invariant

After k inputs, the heap holds the k largest values seen so far.

### Common error

Use a min-heap for the k largest values. The smallest retained value is the one to replace.

## Practice

```step
id: practice
```

What does the root represent in a min-heap of the top K values?

1. The largest value seen
2. The smallest value retained
3. The next value to read

[Check the answer](#/heap/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: The smallest value retained**

The root is the threshold. A larger incoming value can replace it.

### Follow-up exercises

- [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/heap.py
  language: python
```

Example problem: Find the K Largest Values.

## Java example

```step
id: java
snippet:
  src: java/heap.java
  language: java
```

Example problem: Find the K Largest Values.
