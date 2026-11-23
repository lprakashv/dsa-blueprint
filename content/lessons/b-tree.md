---
title: B-Tree
summary: Group sorted keys into pages and split a full page to keep the tree balanced.
---

## Start with a full root page

```step
diagram:
  type: html
  src: diagrams/b-tree/1.html
  alt: "B-Tree: Start with a full root page"
```

This example uses minimum degree 2, so each page holds at most three keys\. The root is a full leaf\. Insert 40 next\.

## Promote the median key

```step
diagram:
  type: html
  src: diagrams/b-tree/2.html
  alt: "B-Tree: Promote the median key"
```

Move 20 into a new root\. Keep 10 in the left leaf and 30 in the right leaf\. The tree grows by one level\.

## Descend to the right leaf

```step
diagram:
  type: html
  src: diagrams/b-tree/3.html
  alt: "B-Tree: Descend to the right leaf"
```

40 is greater than 20, so take the right branch\. Insert 40 after 30 in the right leaf\.

## A match can be in an internal page

```step
diagram:
  type: html
  src: diagrams/b-tree/4.html
  alt: "B-Tree: A match can be in an internal page"
```

The root contains 20\. Return a match at the root\. Search for 40 would go down to the right leaf\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Insert and Search in a B-Tree
- **Difficulty:** Advanced
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(log n) for fixed page capacity | O(log n) auxiliary |

### When to use this pattern

Look for an ordered index that must stay shallow and balanced as keys arrive.

### Invariant

Each separator divides its child ranges. All leaves have the same depth.

### Common error

Move the median into the parent. In this B-tree, it is removed from the child.

## Practice

```step
id: practice
```

Where does the median key go when you split a full B-tree page?

1. It moves into the parent
2. It stays in both leaves
3. It is discarded

[Check the answer](#/b-tree/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It moves into the parent**

The median becomes a separator in the parent. In this example, 20 is stored only in the new root.

### Follow-up exercises

- Draw each split when you insert 10, 20, 30, 40, 50, and 60.
- Explain how a larger page capacity changes the number of page reads.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/b-tree.py
  language: python
```

Example problem: Insert and Search in a B-Tree.

## Java example

```step
id: java
snippet:
  src: java/b-tree.java
  language: java
```

Example problem: Insert and Search in a B-Tree.
