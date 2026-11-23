---
title: Dynamic Programming
summary: Solve small states once and use their answers to build larger states.
---

## Set the first two answers

```step
diagram:
  type: html
  src: diagrams/dynamic-programming/1.html
  alt: "Dynamic Programming: Set the first two answers"
```

There is one way to stay at step 0 and one way to reach step 1\.

## Count paths into step 2

```step
diagram:
  type: html
  src: diagrams/dynamic-programming/2.html
  alt: "Dynamic Programming: Count paths into step 2"
```

The last move came from step 0 or 1\. Add their counts to get 2\.

## Reuse the results at step 3

```step
diagram:
  type: html
  src: diagrams/dynamic-programming/3.html
  alt: "Dynamic Programming: Reuse the results at step 3"
```

Add the counts at 1 and 2\. Step 3 has three paths\.

## Compute the final state

```step
diagram:
  type: html
  src: diagrams/dynamic-programming/4.html
  alt: "Dynamic Programming: Compute the final state"
```

Add the counts at 2 and 3 to get 5\. Only the last two counts are needed at each step\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Count Ways to Climb Stairs
- **Difficulty:** Intermediate
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O(n) | O(1) optimized |

### When to use this pattern

Look for a count or optimal value with overlapping subproblems.

### Invariant

ways\[i\] is the number of ways to arrive at step i using moves of one or two.

### Common error

Define the state before writing its recurrence. Here ways\[0\] = 1 counts the empty path.

## Practice

```step
id: practice
```

What does ways\[i\] depend on in this lesson?

1. ways\[i − 1\] and ways\[i − 2\]
2. ways\[i + 1\]
3. Only ways\[0\]

[Check the answer](#/dynamic-programming/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: ways\[i − 1\] and ways\[i − 2\]**

The last move is either one or two steps, so each path comes from exactly one of those two states.

### Follow-up exercises

- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [House Robber](https://leetcode.com/problems/house-robber/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/dynamic-programming.py
  language: python
```

Example problem: Count Ways to Climb Stairs.

## Java example

```step
id: java
snippet:
  src: java/dynamic-programming.java
  language: java
```

Example problem: Count Ways to Climb Stairs.
