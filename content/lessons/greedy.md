---
title: Greedy Choice
summary: Select the meeting that ends first to leave the most time for later meetings.
---

## Order meetings by end time

```step
diagram:
  type: html
  src: diagrams/greedy/1.html
  alt: "Greedy Choice: Order meetings by end time"
```

Sort by when each meeting ends\. A meeting can start at the previous meeting’s end\.

## Take the earliest finish

```step
diagram:
  type: html
  src: diagrams/greedy/2.html
  alt: "Greedy Choice: Take the earliest finish"
```

Choose \[1, 3\]\. Replacing any first meeting with this earlier finish leaves at least as much room\.

## Skip the overlapping meeting

```step
diagram:
  type: html
  src: diagrams/greedy/3.html
  alt: "Greedy Choice: Skip the overlapping meeting"
```

The next start, 2, is less than 3\. Skip it\. Choose \[3, 5\] because it starts at 3\.

## Choose the last meeting

```step
diagram:
  type: html
  src: diagrams/greedy/4.html
  alt: "Greedy Choice: Choose the last meeting"
```

Choose \[5, 7\]\. The three chosen meetings do not overlap\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Schedule the Most Meetings
- **Difficulty:** Intermediate
- **Estimated study time:** 8 min

| Time | Extra space |
| --- | --- |
| O(n log n) | O(n) |

### When to use this pattern

Look for a local choice you can prove is safe for the objective.

### Invariant

After each selection, the remaining time starts as early as possible for that number of selections.

### Common error

Earliest start and shortest duration do not guarantee the most compatible meetings.

## Practice

```step
id: practice
```

Which property makes earliest finish safe here?

1. It leaves at least as much room for future meetings
2. It always gives the shortest meeting
3. It depends on choosing the longest possible input

[Check the answer](#/greedy/answer).

## Answer and exercises

```step
id: answer
```

**Answer 1: It leaves at least as much room for future meetings**

Replace an optimal solution’s first meeting with the earliest finish. Every later meeting still fits.

### Follow-up exercises

- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- [Maximum Length of Pair Chain](https://leetcode.com/problems/maximum-length-of-pair-chain/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/greedy.py
  language: python
```

Example problem: Schedule the Most Meetings.

## Java example

```step
id: java
snippet:
  src: java/greedy.java
  language: java
```

Example problem: Schedule the Most Meetings.
