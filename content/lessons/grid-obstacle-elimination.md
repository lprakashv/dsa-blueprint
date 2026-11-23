---
title: Shortest Path With Obstacle Elimination
summary: Extend grid BFS to track both the current cell and how many removals are left.
---

## Start with one removal available

```step
diagram:
  type: html
  src: diagrams/grid-obstacle-elimination/1.html
  alt: "Shortest Path With Obstacle Elimination: Start with one removal available"
```

Use a state (row, column, remaining)\. The initial state is (0, 0, 1)\.

### Example state

| Measure | Value |
| --- | --- |
| Moves | 0 |
| Removals left | 1 |

[Read the problem and hints](#/grid-obstacle-elimination/practice).

## A short arrival can use up the budget

```step
diagram:
  type: html
  src: diagrams/grid-obstacle-elimination/2.html
  alt: "Shortest Path With Obstacle Elimination: A short arrival can use up the budget"
```

Reach (0, 2) in two moves through (0, 1)\. This uses the only removal\. The obstacles next to the goal still block that route\.

### Example state

| Measure | Value |
| --- | --- |
| Moves | 2 |
| Removals left | 0 |

## Keep a later arrival with more budget

```step
diagram:
  type: html
  src: diagrams/grid-obstacle-elimination/3.html
  alt: "Shortest Path With Obstacle Elimination: Keep a later arrival with more budget"
```

Go down and across row 1, then up to (0, 2)\. This takes four moves and still has one removal\. Add this state even though the cell was seen\.

### Example state

| Measure | Value |
| --- | --- |
| Moves | 4 |
| Removals left | 1 |

## Use the saved removal at the goal entrance

```step
diagram:
  type: html
  src: diagrams/grid-obstacle-elimination/4.html
  alt: "Shortest Path With Obstacle Elimination: Use the saved removal at the goal entrance"
```

Follow row 0 to column 4\. Enter obstacle (1, 4) and then goal (2, 4)\. This route has eight moves\. BFS finds no shorter route within the budget\.

### Example state

| Measure | Value |
| --- | --- |
| Moves | 8 |
| Removals left | 0 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Fewest Moves With a Removal Budget
- **Difficulty:** Hard
- **Estimated study time:** 18 min

| Time | Extra space |
| --- | --- |
| O(R × C × (k + 1)) | O(R × C × (k + 1)) worst case |

### When to use this pattern

When reaching a cell leaves different resources available for the rest of the route, include those resources in the search state.

### Invariant

During BFS, a new arrival at a cell is useful only if it has more removals left than any arrival already seen there.

### Common error

A boolean visited grid loses routes that arrive later with enough budget to pass a future obstacle.

## Practice

```step
id: practice
```

### Problem

Walk from the top-left cell to the bottom-right cell of a binary grid. Each move goes up, down, left, or right and costs one step. Entering a cell marked 1 spends one of k removals. Return the fewest moves that reach the goal, or −1 if the budget makes it unreachable.

### Example

```text
Input
grid = [[0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 1, 1, 0]]
k = 1

Output
8
```

Detour through row 1, return to row 0 at column 2, then save the one removal for cell (1, 4).

### Constraints

- The grid has 1 to 40 rows and columns. Both endpoints are open.
- The removal budget k is between 0 and the number of cells.

[Solve on LeetCode](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) · [Read the hints](#/grid-obstacle-elimination/hints)

### Check your reasoning

BFS previously reached a cell with 0 removals left. A later arrival has 1 left. What do you do?

1. Discard it because the cell was already seen
2. Enqueue it as a useful new state
3. Reset the queue and start again

[Check the answer](#/grid-obstacle-elimination/answer).

## Hints

```step
id: hints
```

### Hint 1

Two routes can reach the same coordinate with different budgets. Put the budget in the BFS queue state.

### Hint 2

An earlier or equally short arrival with at least as much budget makes a new arrival redundant. Store the largest remaining budget seen at each cell.

## Answer and exercises

```step
id: answer
```

**Answer 2: Enqueue it as a useful new state**

A later route with more budget can pass an obstacle the earlier route could not.

### Follow-up exercises

- [Shortest Path to Get All Keys](https://leetcode.com/problems/shortest-path-to-get-all-keys/)
- Explain why an earlier arrival with the same budget dominates a later arrival.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/grid-obstacle-elimination.py
  language: python
```

Example problem: Find the Fewest Moves With a Removal Budget.

## Java example

```step
id: java
snippet:
  src: java/grid-obstacle-elimination.java
  language: java
```

Example problem: Find the Fewest Moves With a Removal Budget.
