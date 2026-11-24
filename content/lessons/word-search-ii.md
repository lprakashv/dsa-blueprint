---
title: Word Search II
summary: Combine grid backtracking with a trie so all words that share a prefix use the same search.
---

## Store shared prefixes once

```step
diagram:
  type: html
  src: diagrams/word-search-ii/1.html
  alt: "Word Search II: Store shared prefixes once"
```

### Problem

Return the dictionary words that you can spell in a grid. Move one cell up, down, left, or right at a time. Use each cell at most once per word. Return each match once, in any order.

### Example

```text
Input
Board = [["a", "t", "e"], ["t", "o", "a"]]
Words = ["at", "ate", "to", "tea", "tat", "ata"]

Output
["at", "ate", "tat", "tea", "to"]
```

The top row spells ate, and the first two cells spell at. Other routes spell tat, tea, and to. No valid path spells ata.

### Walkthrough

Build a trie from the words\. Store a full word at the node where it ends\. The prefix at marks a match and still has children for ate and ata\.

[Read the constraints and hints](#/word-search-ii/practice).

## Record a word and continue from its prefix

```step
diagram:
  type: html
  src: diagrams/word-search-ii/2.html
  alt: "Word Search II: Record a word and continue from its prefix"
```

Start at the top\-left a\. Move right to t and record at\. Remove its word marker to prevent a duplicate\. Keep the trie branches for ate and ata\.

## Use only unused cells with a valid next letter

```step
diagram:
  type: html
  src: diagrams/word-search-ii/3.html
  alt: "Word Search II: Use only unused cells with a valid next letter"
```

Move right to e and record ate\. The other possible extension would need a fresh a adjacent to t\. The start cell is marked while this path is active, so it cannot be used again\.

## Undo cell marks and discard exhausted trie branches

```step
diagram:
  type: html
  src: diagrams/word-search-ii/4.html
  alt: "Word Search II: Undo cell marks and discard exhausted trie branches"
```

Restore e, then t and a as the calls return\. Remove a trie edge only when its child has no word marker or child edges left\. The at branch still has an untested word, ata\.

## Search from each cell that can begin a word

```step
diagram:
  type: html
  src: diagrams/word-search-ii/5.html
  alt: "Word Search II: Search from each cell that can begin a word"
```

Start at the lower t to find tat through the upper\-left a\. From the upper t, go through e to find tea\. Either t reaches o to find to\. S is the total dictionary length, and L is the longest word length\. Each path has at most four first moves and three choices per later move\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Find All Dictionary Words Hidden in a Grid
- **Difficulty:** Hard
- **Estimated study time:** 18 min

| Time | Extra space |
| --- | --- |
| O(S + R × C × 3ᴸ) worst case | O(S + L) auxiliary |

### When to use this pattern

Use a trie when a search must match many words and can stop as soon as the current prefix has no completion.

### Invariant

The visited cells form the current path. The current trie node describes exactly the prefix made by that path.

### Common error

Restore every marked cell before returning. Clear a found word marker while keeping any longer words below it.

## Practice

```step
id: practice
```

### Problem

Return the dictionary words that you can spell in a grid. Move one cell up, down, left, or right at a time. Use each cell at most once per word. Return each match once, in any order.

### Example

```text
Input
Board = [["a", "t", "e"], ["t", "o", "a"]]
Words = ["at", "ate", "to", "tea", "tat", "ata"]

Output
["at", "ate", "tat", "tea", "to"]
```

The top row spells ate, and the first two cells spell at. Other routes spell tat, tea, and to. No valid path spells ata.

### Constraints

- The grid has 1 to 12 rows and 1 to 12 columns.
- There are up to 30,000 distinct lowercase words, each 1 to 10 letters long.

[Solve on LeetCode](https://leetcode.com/problems/word-search-ii/) · [Read the hints](#/word-search-ii/hints)

### Check your reasoning

You find at, and the trie also contains ate. What can you remove immediately?

1. The full branch for a
2. The word marker for at
3. The trie edge for t

[Check the answer](#/word-search-ii/answer).

## Hints

```step
id: hints
```

### Hint 1

Store dictionary prefixes in a trie. A completed word needs a marker even if it is also a prefix of a longer word.

### Hint 2

Pass the current trie node into each grid step. If the next letter has no child in the trie, stop that branch now.

### Hint 3

During a path, mark each used cell. Restore it when you return so a different path can use it.

## Answer and exercises

```step
id: answer
```

**Answer 2: The word marker for at**

Removing the terminal marker stops duplicate results for at. The edge into its node still leads to longer words.

### Follow-up exercises

- [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Word Search](https://leetcode.com/problems/word-search/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/word-search-ii.py
  language: python
```

Example problem: Find All Dictionary Words Hidden in a Grid.

## Java example

```step
id: java
snippet:
  src: java/word-search-ii.java
  language: java
```

Example problem: Find All Dictionary Words Hidden in a Grid.
