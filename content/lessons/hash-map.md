---
title: Hash Map Lookup
summary: Store elements you already saw and check for the complement in one pass.
---

## Start with an empty map

```step
diagram:
  type: html
  src: diagrams/hash-map/1.html
  alt: "Hash Map Lookup: Start with an empty map"
```

Given target 9, scan the unsorted array once\. For each value x, look up 9 − x\.

## Record the first index

```step
diagram:
  type: html
  src: diagrams/hash-map/2.html
  alt: "Hash Map Lookup: Record the first index"
```

The complement of 4 is 5\. The map is empty, so store 4 at index 0\.

## Check the next complement

```step
diagram:
  type: html
  src: diagrams/hash-map/3.html
  alt: "Hash Map Lookup: Check the next complement"
```

The complement of 1 is 8\. It is missing, so store 1 at index 1\.

## Find the earlier index

```step
diagram:
  type: html
  src: diagrams/hash-map/4.html
  alt: "Hash Map Lookup: Find the earlier index"
```

For value 5, the complement is 4\. The map gives index 0\. Return indices \[0, 2\]\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Two Sum on an Unsorted Array
- **Difficulty:** Beginner
- **Estimated study time:** 6 min

| Time | Extra space |
| --- | --- |
| O(n) average | O(n) |

### When to use this pattern

Look for frequent membership tests, value-to-index lookups, or counts.

### Invariant

Before you check index i, the map contains values from earlier indices.

### Common error

Look up the complement before insertion so one index cannot match itself.

## Practice

```step
id: practice
```

What should the map store if the answer needs indices?

1. Value → index
2. Index → value
3. Target → list length

[Check the answer](#/hash-map/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: Value → index**

The complement is a value. Use it as the key to retrieve an earlier index directly.

### Follow-up exercises

- [Two Sum](https://leetcode.com/problems/two-sum/)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/hash-map.py
  language: python
```

Example problem: Two Sum on an Unsorted Array.

## Java example

```step
id: java
snippet:
  src: java/hash-map.java
  language: java
```

Example problem: Two Sum on an Unsorted Array.
