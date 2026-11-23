---
title: Backtracking
summary: Make a choice, explore its results, and undo the choice before trying the next one.
---

## Record the empty subset

```step
diagram:
  type: html
  src: diagrams/backtracking/1.html
  alt: "Backtracking: Record the empty subset"
```

For input \[1, 2\], start with an empty path\. Record a copy before making any choice\.

## Take the first option

```step
diagram:
  type: html
  src: diagrams/backtracking/2.html
  alt: "Backtracking: Take the first option"
```

Append 1\. Record \[1\]\. From here, only later indices are available\.

## Explore a deeper choice

```step
diagram:
  type: html
  src: diagrams/backtracking/3.html
  alt: "Backtracking: Explore a deeper choice"
```

Append 2 to the current path\. Record \[1, 2\]\. No later index remains\.

## Return to the empty path

```step
diagram:
  type: html
  src: diagrams/backtracking/4.html
  alt: "Backtracking: Return to the empty path"
```

Undo 2\. Then undo 1\. Choose 2 directly from the empty path and record \[2\]\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Build All Subsets
- **Difficulty:** Intermediate
- **Estimated study time:** 9 min

| Time | Extra space |
| --- | --- |
| O(n · 2ⁿ) | O(n) auxiliary |

### When to use this pattern

Look for all subsets, permutations, combinations, or valid arrangements.

### Invariant

The working path contains only the choices on the current branch.

### Common error

Copy the current path when saving an answer. Later edits would otherwise change saved results.

## Practice

```step
id: practice
```

Why does the code pop after a recursive call?

1. To sort the result
2. To restore the path for the next choice
3. To discard every saved result

[Check the answer](#/backtracking/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: To restore the path for the next choice**

Each sibling branch must start from the same path that existed before the choice.

### Follow-up exercises

- [Subsets](https://leetcode.com/problems/subsets/)
- [Combination Sum](https://leetcode.com/problems/combination-sum/)
- [Split a String Into the Max Number of Unique Substrings](https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)
- For unique splits, keep a set on the current branch. Prune when the remaining characters cannot improve the best count.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/backtracking.py
  language: python
```

Example problem: Build All Subsets.

## Java example

```step
id: java
snippet:
  src: java/backtracking.java
  language: java
```

Example problem: Build All Subsets.
