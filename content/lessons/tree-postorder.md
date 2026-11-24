---
title: Postorder Tree Aggregation
summary: Combine child results after both children are done. Return one branch to the parent and record the best path.
---

## Visit children before their parent

```step
diagram:
  type: html
  src: diagrams/tree-postorder/1.html
  alt: "Postorder Tree Aggregation: Visit children before their parent"
```

### Problem

Given a binary tree, find its diameter: the largest number of edges on a path between any two nodes. The path does not have to pass through the root. An empty tree has diameter 0.

### Walkthrough

Put a return visit for A on the stack\. Process the children before that return visit\. An empty subtree has height zero\.

## Pass height 1 up from each leaf

```step
diagram:
  type: html
  src: diagrams/tree-postorder/2.html
  alt: "Postorder Tree Aggregation: Pass height 1 up from each leaf"
```

D and E each have no children\. Store height 1 for each\. Their local paths have zero edges\.

## Keep a local path and a return value

```step
diagram:
  type: html
  src: diagrams/tree-postorder/3.html
  alt: "Postorder Tree Aggregation: Keep a local path and a return value"
```

At B, the path D → B → E has 2 edges\. Give A the height of one branch from B, which is 2 nodes\.

## Use the largest path seen anywhere

```step
diagram:
  type: html
  src: diagrams/tree-postorder/4.html
  alt: "Postorder Tree Aggregation: Use the largest path seen anywhere"
```

C gives height 1\. At A, the path D → B → A → C has 3 edges\. A different tree could have its best path entirely inside a child\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Diameter of a Binary Tree
- **Difficulty:** Intermediate
- **Estimated study time:** 10 min

| Time | Extra space |
| --- | --- |
| O(n) | O(h) for tree height h |

### When to use this pattern

Use postorder when a node needs its children’s height, balance, or best downward score before it can finish.

### Invariant

Each completed subtree gives its height in nodes. The best diameter includes every node processed so far as a possible turning point.

### Common error

A path through a node can use both children. A branch extended by its parent can include only one of them.

## Practice

```step
id: practice
```

The left and right subtree heights are 2 and 3 nodes. What does this node pass to its parent?

1. 3 nodes
2. 4 nodes
3. 5 nodes

[Check the answer](#/tree-postorder/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: 4 nodes**

A branch uses the taller child of height 3 and this node. The full path through both children has 5 edges.

### Follow-up exercises

- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
- [Binary Tree Tilt](https://leetcode.com/problems/binary-tree-tilt/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/tree-postorder.py
  language: python
```

Example problem: Find the Diameter of a Binary Tree.

## Java example

```step
id: java
snippet:
  src: java/tree-postorder.java
  language: java
```

Example problem: Find the Diameter of a Binary Tree.
