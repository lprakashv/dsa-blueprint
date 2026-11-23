---
title: Binary Tree Maximum Path Sum
summary: Use postorder to keep one branch for the parent and score paths that join two branches at their highest node.
---

## Give each completed node two jobs

```step
diagram:
  type: html
  src: diagrams/binary-tree-maximum-path-sum/1.html
  alt: "Binary Tree Maximum Path Sum: Give each completed node two jobs"
```

For each node, compute a downward gain for its parent\. Also score a path whose highest node is this one\. Process the children first so their gains are available\.

[Read the problem and hints](#/binary-tree-maximum-path-sum/practice).

## Start with one-node paths

```step
diagram:
  type: html
  src: diagrams/binary-tree-maximum-path-sum/2.html
  alt: "Binary Tree Maximum Path Sum: Start with one-node paths"
```

The leaves under 4 return 3 and −6\. Each also supplies a one\-node candidate for the overall answer\. Keep negative gains as return values so the parent can decide whether to use them\.

### Example state

| Measure | Value |
| --- | --- |
| Best sum | 3 |

## Drop the child gain that lowers the sum

```step
diagram:
  type: html
  src: diagrams/binary-tree-maximum-path-sum/3.html
  alt: "Binary Tree Maximum Path Sum: Drop the child gain that lowers the sum"
```

At node 4, take the gain 3 and omit the gain −6\. The best path through 4 has sum 7\. Its return gain is also 7 because it uses only one child\.

### Example state

| Measure | Value |
| --- | --- |
| Best sum | 7 |

## Score both branches at the highest node

```step
diagram:
  type: html
  src: diagrams/binary-tree-maximum-path-sum/4.html
  alt: "Binary Tree Maximum Path Sum: Score both branches at the highest node"
```

The leaf 8 returns 8\. At −5, the full path uses both gains, 7 and 8, for a total of 10\. A parent could extend only the better branch, whose gain with −5 is 3\.

### Example state

| Measure | Value |
| --- | --- |
| Best sum | 10 |

## Keep the best nonempty path found anywhere

```step
diagram:
  type: html
  src: diagrams/binary-tree-maximum-path-sum/5.html
  alt: "Binary Tree Maximum Path Sum: Keep the best nonempty path found anywhere"
```

Every path has a highest node, and each such node was checked once\. Return 10\. With all\-negative input, every child gain is omitted, so the best answer is the largest individual node value\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Highest-Scoring Path Anywhere in a Binary Tree
- **Difficulty:** Hard
- **Estimated study time:** 15 min

| Time | Extra space |
| --- | --- |
| O(n) | O(h) for tree height h |

### When to use this pattern

Look for the best path anywhere in a tree. A path can turn at one node and continue down two branches.

### Invariant

A node returns the best downward path that starts there. The overall best includes all paths whose highest node has been processed.

### Common error

Initialize the answer from a real node. An empty path is invalid even if every node value is negative.

## Practice

```step
id: practice
```

### Problem

Find the largest sum of node values along a nonempty simple path in a binary tree. A path can start and finish at any nodes. It follows tree edges and visits each node at most once.

### Example

```text
Input
Tree in level order = [-5, 4, 8, 3, -6]

Output
10
```

The path 3 → 4 → −5 → 8 has sum 10.

### Constraints

- The tree contains 1 to 30,000 nodes.
- Node values range from −1,000 through 1,000.

[Solve on LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · [Read the hints](#/binary-tree-maximum-path-sum/hints)

### Check your reasoning

A node has value 5 and child gains of 4 and 3. What gain can it pass to its parent?

1. 12
2. 9
3. 5

[Check the answer](#/binary-tree-maximum-path-sum/answer).

## Hints

```step
id: hints
```

### Hint 1

Every path has exactly one highest node. Score the best path through each possible highest node.

### Hint 2

Return one branch to the parent. The parent cannot extend a path that already uses both of this node’s children.

### Hint 3

A negative child gain can be dropped. Keep the current node in both the return value and the local candidate.

## Answer and exercises

```step
id: answer
```

**Answer 2: 9**

The full path through the node scores 12. A path extended by its parent can continue down at most one child, so the return gain is 9.

### Follow-up exercises

- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/binary-tree-maximum-path-sum.py
  language: python
```

Example problem: Find the Highest-Scoring Path Anywhere in a Binary Tree.

## Java example

```step
id: java
snippet:
  src: java/binary-tree-maximum-path-sum.java
  language: java
```

Example problem: Find the Highest-Scoring Path Anywhere in a Binary Tree.
