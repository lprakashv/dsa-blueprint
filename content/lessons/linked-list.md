---
title: Linked List Reversal
summary: Reverse each link in place while keeping a reference to the rest of the list.
---

## Set the starting references

```step
diagram:
  type: html
  src: diagrams/linked-list/1.html
  alt: "Linked List Reversal: Set the starting references"
```

### Problem

Given the head of a singly linked list, reverse its links and return the new head. For A → B → C, return C → B → A.

### Walkthrough

Set prev to null and cur to A\. The original list is A → B → C\.

## Save B, then reverse A’s link

```step
diagram:
  type: html
  src: diagrams/linked-list/2.html
  alt: "Linked List Reversal: Save B, then reverse A’s link"
```

Save B before you set A\.next to null\. Put prev at A and cur at B\.

## Save C, then link B to A

```step
diagram:
  type: html
  src: diagrams/linked-list/3.html
  alt: "Linked List Reversal: Save C, then link B to A"
```

Set B\.next to A\. Move prev to B and cur to C\.

## Link C to B and return C

```step
diagram:
  type: html
  src: diagrams/linked-list/4.html
  alt: "Linked List Reversal: Link C to B and return C"
```

Now cur is null\. Return prev, the head of the reversed list C → B → A\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Reverse a Singly Linked List
- **Difficulty:** Intermediate
- **Estimated study time:** 7 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

Look for a linked-list problem that asks you to change the order in place.

### Invariant

prev heads the reversed prefix. cur heads the untouched suffix.

### Common error

Save cur.next before overwriting it. Otherwise the untouched suffix can become unreachable.

## Practice

```step
id: practice
```

Which reference must you save before you change cur.next?

1. The original head
2. The original cur.next
3. The new head

[Check the answer](#/linked-list/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: The original cur.next**

The original next node is the entry point for the untouched suffix.

### Follow-up exercises

- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
- [Reorder List](https://leetcode.com/problems/reorder-list/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/linked-list.py
  language: python
```

Example problem: Reverse a Singly Linked List.

## Java example

```step
id: java
snippet:
  src: java/linked-list.java
  language: java
```

Example problem: Reverse a Singly Linked List.
