---
title: Fixed-Gap Linked List Pointers
summary: Keep two pointers a fixed number of links apart to locate a node from the end.
---

## Add a predecessor before the head

```step
diagram:
  type: html
  src: diagrams/linked-list-gap/1.html
  alt: "Fixed-Gap Linked List Pointers: Add a predecessor before the head"
```

### Problem

Given the head of a singly linked list and a valid position n from the end, remove that node and return the head. For A → B → C → D and n = 2, return A → B → D.

### Walkthrough

Remove the second node from the end of A → B → C → D\. Put both pointers at a dummy node that points to A\.

## Move the lead pointer two links

```step
diagram:
  type: html
  src: diagrams/linked-list-gap/2.html
  alt: "Fixed-Gap Linked List Pointers: Move the lead pointer two links"
```

Move the lead pointer to B\. Keep the follow pointer at the dummy node\.

## Move both pointers to keep the gap

```step
diagram:
  type: html
  src: diagrams/linked-list-gap/3.html
  alt: "Fixed-Gap Linked List Pointers: Move both pointers to keep the gap"
```

Stop when the lead pointer reaches D, the last node\. The follow pointer is at B, immediately before C\.

## Bypass the node after the follow pointer

```step
diagram:
  type: html
  src: diagrams/linked-list-gap/4.html
  alt: "Fixed-Gap Linked List Pointers: Bypass the node after the follow pointer"
```

Set B\.next to D\. Return dummy\.next so the same code works when the head is removed\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Remove the Nth Node From the End
- **Difficulty:** Intermediate
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

Use a fixed pointer gap when you know a position relative to the tail. Use different speeds to find the middle or detect a cycle.

### Invariant

After setup, the lead pointer is N links ahead of the follow pointer.

### Common error

N = 1 removes the tail. N equal to the length removes the head. A dummy node gives the head a predecessor.

## Practice

```step
id: practice
```

Where does the follow pointer stop when N equals the list length?

1. At the last node
2. At the dummy node
3. At the head

[Check the answer](#/linked-list-gap/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: At the dummy node**

The lead pointer reaches the tail during setup. The follow pointer stays at the dummy and can unlink the head.

### Follow-up exercises

- [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)
- [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
- If the problem says to remove the head when N exceeds the length, handle that case during the lead scan.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/linked-list-gap.py
  language: python
```

Example problem: Remove the Nth Node From the End.

## Java example

```step
id: java
snippet:
  src: java/linked-list-gap.java
  language: java
```

Example problem: Remove the Nth Node From the End.
