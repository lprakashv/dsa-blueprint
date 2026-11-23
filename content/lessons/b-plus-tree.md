---
title: B+ Tree
summary: Descend to the first matching leaf, then follow leaf links to scan the range in order.
---

## An insert fills a leaf past capacity

```step
diagram:
  type: html
  src: diagrams/b-plus-tree/1.html
  alt: "B+ Tree: An insert fills a leaf past capacity"
```

Each leaf can hold three records in this example\. Insert 40 after 30\. The diagram shows record keys only\.

## Copy up the first key in the right leaf

```step
diagram:
  type: html
  src: diagrams/b-plus-tree/2.html
  alt: "B+ Tree: Copy up the first key in the right leaf"
```

Split into \[10, 20\] and \[30, 40\]\. Copy 30 into the new root and link the leaves\. The record with key 30 stays in the right leaf\.

## Find the leaf for the range start

```step
diagram:
  type: html
  src: diagrams/b-plus-tree/3.html
  alt: "B+ Tree: Find the leaf for the range start"
```

Scan the inclusive range \[20, 35\]\. Since 20 is less than 30, go left\. The first key in range is 20\.

## Read the next leaf directly

```step
diagram:
  type: html
  src: diagrams/b-plus-tree/4.html
  alt: "B+ Tree: Read the next leaf directly"
```

Follow the leaf link\. Read 30, then stop at 40 because it is greater than 35\.

## Return the keys in order

```step
diagram:
  type: html
  src: diagrams/b-plus-tree/5.html
  alt: "B+ Tree: Return the keys in order"
```

The result is \[20, 30\]\. The scan made one descent, then followed the leaf links\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Scan a Key Range Across Linked Leaves
- **Difficulty:** Advanced
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(h + p) page reads | O(1) auxiliary for the scan |

### When to use this pattern

Look for an ordered index with range queries. h is the tree height and p is the number of leaves read.

### Invariant

Separators guide the search. All record keys are in the leaves, in order.

### Common error

In this convention, equality with a separator goes right. The copied key still exists in the right leaf.

## Practice

```step
id: practice
```

A B+ tree search matches an internal separator. Where is the record?

1. In that internal page
2. In a leaf reached through the right child
3. In the previous leaf

[Check the answer](#/b-plus-tree/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: In a leaf reached through the right child**

An internal separator only directs the search. The record with that key is in the right subtree.

### Follow-up exercises

- Trace the scan for the inclusive range \[30, 40\].
- Explain why a linked leaf chain helps with range scans.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/b-plus-tree.py
  language: python
```

Example problem: Scan a Key Range Across Linked Leaves.

## Java example

```step
id: java
snippet:
  src: java/b-plus-tree.java
  language: java
```

Example problem: Scan a Key Range Across Linked Leaves.
