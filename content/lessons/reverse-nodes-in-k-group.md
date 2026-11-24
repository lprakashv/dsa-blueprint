---
title: Reverse Nodes in k-Group
summary: Find the end of each complete group, reverse its links, and reconnect both boundaries.
---

## Confirm that two nodes are available

```step
diagram:
  type: html
  src: diagrams/reverse-nodes-in-k-group/1.html
  alt: "Reverse Nodes in k-Group: Confirm that two nodes are available"
```

### Problem

Reverse each complete group of k consecutive nodes in a linked list. Preserve the order of a final group with fewer than k nodes. Change the links and keep each node’s value.

### Example

```text
Input
List = [8, 3, 5, 2, 9]
k = 2

Output
[3, 8, 2, 5, 9]
```

The pairs \[8, 3\] and \[5, 2\] each reverse. The last node stays in place.

### Walkthrough

Start at a dummy node\. Count two links to find the group end at 3\. Save 8 as the old first node and 5 as the node after the group\.

[Read the constraints and hints](#/reverse-nodes-in-k-group/practice).

## Reverse links until the saved successor

```step
diagram:
  type: html
  src: diagrams/reverse-nodes-in-k-group/2.html
  alt: "Reverse Nodes in k-Group: Reverse links until the saved successor"
```

Initialize prev to 5\. Save 8’s next link, then set 8\.next to 5\. Save 3’s next link, then set 3\.next to 8\. Stop when the current node is 5\.

## Attach the new head and move to the new tail

```step
diagram:
  type: html
  src: diagrams/reverse-nodes-in-k-group/3.html
  alt: "Reverse Nodes in k-Group: Attach the new head and move to the new tail"
```

Set dummy\.next to 3\. Node 8 is already linked to 5\. Set before to 8 so the next scan starts at the end of the completed group\.

## Apply the same rules to the second group

```step
diagram:
  type: html
  src: diagrams/reverse-nodes-in-k-group/4.html
  alt: "Reverse Nodes in k-Group: Apply the same rules to the second group"
```

Find group \[5, 2\] and save successor 9\. Reverse its links with prev = 9\. Set 8\.next to 2, and set before to 5\.

## Leave the incomplete suffix intact

```step
diagram:
  type: html
  src: diagrams/reverse-nodes-in-k-group/5.html
  alt: "Reverse Nodes in k-Group: Leave the incomplete suffix intact"
```

The lookahead finds 9 and then reaches the end\. Return dummy\.next\. Each node participates in at most one group scan and one reversal\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Reverse Each Complete Block of a Linked List in Place
- **Difficulty:** Hard
- **Estimated study time:** 15 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) |

### When to use this pattern

Use a sentinel and a saved successor when an in-place linked-list change applies only to a bounded segment.

### Invariant

before points to the last node of the finished prefix. The untouched suffix starts at before.next.

### Common error

Check that the group has k nodes before modifying links. Save the node after the group and the old first node before rewiring.

## Practice

```step
id: practice
```

### Problem

Reverse each complete group of k consecutive nodes in a linked list. Preserve the order of a final group with fewer than k nodes. Change the links and keep each node’s value.

### Example

```text
Input
List = [8, 3, 5, 2, 9]
k = 2

Output
[3, 8, 2, 5, 9]
```

The pairs \[8, 3\] and \[5, 2\] each reverse. The last node stays in place.

### Constraints

- The list contains 1 to 5,000 nodes.
- The group size k is at least 1 and at most the list length.

[Solve on LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/) · [Read the hints](#/reverse-nodes-in-k-group/hints)

### Check your reasoning

Why start the reversal with prev pointing to the node after the group?

1. It lets the old first node link to the untouched suffix
2. It skips reversing the last node of the group
3. It removes the need to find a full group

[Check the answer](#/reverse-nodes-in-k-group/answer).

## Hints

```step
id: hints
```

### Hint 1

Put a dummy node before the head. From the end of the finished prefix, look ahead exactly k links.

### Hint 2

Start the reversal with prev set to the node after the group. The first link you reverse also reconnects the group’s future tail.

### Hint 3

The old first node becomes the group’s tail. Use it as the starting point for the next lookahead.

## Answer and exercises

```step
id: answer
```

**Answer 1: It lets the old first node link to the untouched suffix**

The old first node becomes the tail. Its new next link is already correct after the first reversal.

### Follow-up exercises

- [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)
- [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/reverse-nodes-in-k-group.py
  language: python
```

Example problem: Reverse Each Complete Block of a Linked List in Place.

## Java example

```step
id: java
snippet:
  src: java/reverse-nodes-in-k-group.java
  language: java
```

Example problem: Reverse Each Complete Block of a Linked List in Place.
