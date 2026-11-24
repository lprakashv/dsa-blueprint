---
title: Minimum Window Substring
summary: Track how many required characters are missing, then tighten each window that covers the target.
---

## Track missing occurrences

```step
diagram:
  type: html
  src: diagrams/minimum-window-substring/1.html
  alt: "Minimum Window Substring: Track missing occurrences"
```

### Problem

Find the shortest contiguous piece of source that covers every letter in target, including its repeated letters. Return an empty string if a cover does not exist. If two shortest covers tie, return the one that starts first.

### Example

```text
Input
source = "CABACBD"
target = "AAB"

Output
"ABA"
```

ABA contains two copies of A and one B. A shorter window cannot contain all three letters.

### Walkthrough

The target AAB needs two copies of A and one of B\. Start with three missing occurrences\.

### Example state

| Measure | Value |
| --- | --- |
| Missing | 3 |
| Best length | — |

[Read the constraints and hints](#/minimum-window-substring/practice).

## A set of letters is not enough

```step
diagram:
  type: html
  src: diagrams/minimum-window-substring/2.html
  alt: "Minimum Window Substring: A set of letters is not enough"
```

The first three letters are CAB\. The window has both kinds of required letter, but it still needs one more A\.

### Example state

| Measure | Value |
| --- | --- |
| Missing | 1 |
| Best length | — |

## Find the first valid window

```step
diagram:
  type: html
  src: diagrams/minimum-window-substring/3.html
  alt: "Minimum Window Substring: Find the first valid window"
```

Read the next A to form CABA\. The window covers the target\. Save its length of 4 before moving the left edge\.

### Example state

| Measure | Value |
| --- | --- |
| Missing | 0 |
| Best length | 4 |

## Remove letters while the window stays valid

```step
diagram:
  type: html
  src: diagrams/minimum-window-substring/4.html
  alt: "Minimum Window Substring: Remove letters while the window stays valid"
```

Drop C to get ABA and save length 3\. Dropping the next A would make the window invalid, so stop shrinking\.

### Example state

| Measure | Value |
| --- | --- |
| Missing | 0 |
| Best length | 3 |

## Keep the shortest cover

```step
diagram:
  type: html
  src: diagrams/minimum-window-substring/5.html
  alt: "Minimum Window Substring: Keep the shortest cover"
```

Scan the remaining suffix\. No window can beat 3 because three occurrences are required\. Return ABA\.

### Example state

| Measure | Value |
| --- | --- |
| Target length | 3 |
| Best length | 3 |

## Pattern notes

```step
id: notes
```

- **Example problem:** Cover a Target With the Shortest Window
- **Difficulty:** Hard
- **Estimated study time:** 15 min

| Time | Extra space |
| --- | --- |
| O(m + n) | O(u) for distinct target letters |

### When to use this pattern

Use a variable-size sliding window when you need the shortest contiguous match that contains a required set of counts.

### Invariant

A window is valid exactly when the number of missing occurrences is zero.

### Common error

Count occurrences. A set cannot tell whether you have both copies of a repeated letter.

## Practice

```step
id: practice
```

### Problem

Find the shortest contiguous piece of source that covers every letter in target, including its repeated letters. Return an empty string if a cover does not exist. If two shortest covers tie, return the one that starts first.

### Example

```text
Input
source = "CABACBD"
target = "AAB"

Output
"ABA"
```

ABA contains two copies of A and one B. A shorter window cannot contain all three letters.

### Constraints

- Each string contains 1 to 100,000 English letters.
- Match uppercase and lowercase letters separately.

[Solve on LeetCode](https://leetcode.com/problems/minimum-window-substring/) · [Read the hints](#/minimum-window-substring/hints)

### Check your reasoning

The count for A rises from −1 to 0 when A leaves the window. What happens?

1. The window now needs one A
2. The window still has enough copies of A
3. The target length increases

[Check the answer](#/minimum-window-substring/answer).

## Hints

```step
id: hints
```

### Hint 1

For each target letter, track how many more copies the current window needs. A count can go below zero when the window has surplus copies.

### Hint 2

When all required copies are present, record the window and move the left edge until a requirement breaks. A removal creates a shortage only when that letter’s count becomes positive.

## Answer and exercises

```step
id: answer
```

**Answer 2: The window still has enough copies of A**

A count of −1 means the window has one extra A. Removing that copy leaves exactly enough.

### Follow-up exercises

- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
- Explain why each end of the window moves at most m times.

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/minimum-window-substring.py
  language: python
```

Example problem: Cover a Target With the Shortest Window.

## Java example

```step
id: java
snippet:
  src: java/minimum-window-substring.java
  language: java
```

Example problem: Cover a Target With the Shortest Window.
