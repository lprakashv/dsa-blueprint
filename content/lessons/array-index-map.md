---
title: Dense Array + Index Map
summary: Use an array for uniform sampling and a map for direct access. Move the last element to fill a deletion gap.
---

## Keep both views of the values

```step
diagram:
  type: html
  src: diagrams/array-index-map/1.html
  alt: "Dense Array + Index Map: Keep both views of the values"
```

The array has \[7, 4, 9\]\. The map associates each value with its index\.

## Find the gap with the map

```step
diagram:
  type: html
  src: diagrams/array-index-map/2.html
  alt: "Dense Array + Index Map: Find the gap with the map"
```

Remove 4\. Its index is 1\. Shifting every later element would take time proportional to the array length\.

## Move the last element into the gap

```step
diagram:
  type: html
  src: diagrams/array-index-map/3.html
  alt: "Dense Array + Index Map: Move the last element into the gap"
```

Put 9 at index 1 and update the map entry for 9\. Pop the last slot and delete the entry for 4\.

## Pick an occupied index uniformly

```step
diagram:
  type: html
  src: diagrams/array-index-map/4.html
  alt: "Dense Array + Index Map: Pick an occupied index uniformly"
```

Choose either array index with probability 1/2\. Every stored value has one index, so both values have the same probability\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Insert, Remove, and Sample a Value
- **Difficulty:** Intermediate
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(1) average per operation | O(n) |

### When to use this pattern

Use a dense array and index map for constant-time membership and deletion when order can change.

### Invariant

Each stored value occurs once. Its map entry points to its current array index.

### Common error

Update the index of the moved value before removing the deleted value’s map entry. The deleted value can already be last.

## Practice

```step
id: practice
```

When the last value fills a gap, which map entry changes index?

1. Every entry after the gap
2. Only the entry for the value moved into the gap
3. The map needs no change

[Check the answer](#/array-index-map/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: Only the entry for the value moved into the gap**

No other value moves. If the removed value was already last, the update is harmless because its entry is deleted next.

### Follow-up exercises

- [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1/)
- [Random Pick Index](https://leetcode.com/problems/random-pick-index/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/array-index-map.py
  language: python
```

Example problem: Insert, Remove, and Sample a Value.

## Java example

```step
id: java
snippet:
  src: java/array-index-map.java
  language: java
```

Example problem: Insert, Remove, and Sample a Value.
