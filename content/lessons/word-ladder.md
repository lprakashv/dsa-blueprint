---
title: Word Ladder
summary: Run breadth-first search over a graph whose neighbors are valid one-letter edits.
---

## Put the start in the first layer

```step
diagram:
  type: html
  src: diagrams/word-ladder/1.html
  alt: "Word Ladder: Put the start in the first layer"
```

### Problem

Change start into end one letter at a time. Every word after start must appear in the dictionary, including end. Return the number of words in the shortest valid chain, with start included. Return 0 if there is no chain.

### Example

```text
Input
start = "cold", end = "warm"
words = ["cord", "card", "word", "ward", "warm"]

Output
5
```

One shortest chain is cold → cord → word → ward → warm.

### Walkthrough

Start with cold at chain length 1\. The start does not need to be in the dictionary\.

### Example state

| Measure | Value |
| --- | --- |
| Chain length | 1 |

[Read the constraints and hints](#/word-ladder/practice).

## Generate the first valid edit

```step
diagram:
  type: html
  src: diagrams/word-ladder/2.html
  alt: "Word Ladder: Generate the first valid edit"
```

Cold has one dictionary neighbor: cord\. Change its third letter\. Add cord to the next layer\.

### Example state

| Measure | Value |
| --- | --- |
| Chain length | 2 |

## Explore both candidates at the same depth

```step
diagram:
  type: html
  src: diagrams/word-ladder/3.html
  alt: "Word Ladder: Explore both candidates at the same depth"
```

Cord can change to word or card\. Both have chain length 3\. Queue word first when you generate edits left to right\.

### Example state

| Measure | Value |
| --- | --- |
| Chain length | 3 |

## Add ward once

```step
diagram:
  type: html
  src: diagrams/word-ladder/4.html
  alt: "Word Ladder: Add ward once"
```

Word discovers ward at length 4\. Card also reaches ward, but it cannot improve the chain\. Skip the duplicate\.

### Example state

| Measure | Value |
| --- | --- |
| Chain length | 4 |

## Return the number of words

```step
diagram:
  type: html
  src: diagrams/word-ladder/5.html
  alt: "Word Ladder: Return the number of words"
```

Ward changes to warm\. BFS first reaches it with four edits, so the output is five words\.

### Example state

| Measure | Value |
| --- | --- |
| Chain length | 5 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Find the Fewest Single-Letter Changes
- **Difficulty:** Hard
- **Estimated study time:** 17 min

| Time | Extra space |
| --- | --- |
| O(N × L²) for fixed alphabet | O(N × L) |

### When to use this pattern

Use BFS when each transformation has unit cost. Generate neighbors from the current state instead of comparing every pair of words.

### Invariant

The first time a word enters the queue, its chain length is minimal.

### Common error

Return the number of words in the chain, including the start, rather than the number of edges.

## Practice

```step
id: practice
```

### Problem

Change start into end one letter at a time. Every word after start must appear in the dictionary, including end. Return the number of words in the shortest valid chain, with start included. Return 0 if there is no chain.

### Example

```text
Input
start = "cold", end = "warm"
words = ["cord", "card", "word", "ward", "warm"]

Output
5
```

One shortest chain is cold → cord → word → ward → warm.

### Constraints

- The dictionary contains up to 5,000 distinct words of the same length.
- Words use lowercase English letters and have 1 to 10 characters. The endpoints differ.

[Solve on LeetCode](https://leetcode.com/problems/word-ladder/) · [Read the hints](#/word-ladder/hints)

### Check your reasoning

When do you remove a word from the set of unseen words?

1. When you first enqueue it
2. Only after both endpoints are dequeued
3. After you finish the entire layer

[Check the answer](#/word-ladder/answer).

## Hints

```step
id: hints
```

### Hint 1

Treat each word as a node. Each allowed one-letter change is an edge, and every edge has the same cost.

### Hint 2

For each letter position, try the alphabet and check the resulting word in a set. Remove a word from the set when you put it in the queue.

## Answer and exercises

```step
id: answer
```

**Answer 1: When you first enqueue it**

The first discovery already has the shortest chain length. Removing it immediately keeps other words from adding a duplicate.

### Follow-up exercises

- [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/)
- [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/word-ladder.py
  language: python
```

Example problem: Find the Fewest Single-Letter Changes.

## Java example

```step
id: java
snippet:
  src: java/word-ladder.java
  language: java
```

Example problem: Find the Fewest Single-Letter Changes.
