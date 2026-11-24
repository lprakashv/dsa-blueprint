---
title: Stacks
summary: Use a stack to close the most recent opening bracket first.
---

## Start with an empty stack

```step
diagram:
  type: html
  src: diagrams/stack/1.html
  alt: "Stacks: Start with an empty stack"
```

### Problem

Given a string of opening and closing brackets, decide whether it is valid. Each closing bracket must match the most recent unmatched opening bracket, and no bracket may remain unmatched. For example, {[]} is valid.

### Walkthrough

Read \{ \[ \] \} from left to right\. Each closing bracket must match the top of the stack\.

## Store each opening bracket

```step
diagram:
  type: html
  src: diagrams/stack/2.html
  alt: "Stacks: Store each opening bracket"
```

Push \{ and then \[\. The \[ is now the top\.

## Close the latest opening bracket

```step
diagram:
  type: html
  src: diagrams/stack/3.html
  alt: "Stacks: Close the latest opening bracket"
```

The \] matches \[\. Pop \[\. The \{ stays on the stack\.

## Confirm the stack is empty

```step
diagram:
  type: html
  src: diagrams/stack/4.html
  alt: "Stacks: Confirm the stack is empty"
```

The \} matches \{\. Pop \{\. There are no unmatched brackets\.

## Pattern notes

```step
id: notes
```

- **Example problem:** Validate Paired Brackets
- **Difficulty:** Beginner
- **Estimated study time:** 6 min

| Time | Extra space |
| --- | --- |
| O(n) | O(n) |

### When to use this pattern

Look for nested brackets, undo operations, or a need to resolve the most recent item.

### Invariant

The stack holds unmatched opening brackets in the order you read them.

### Common error

Check for an empty stack before a pop. At the end, the stack must also be empty.

## Practice

```step
id: practice
```

Why does (\[)\] fail?

1. The string has an odd length
2. The ) does not match the top bracket
3. The string starts with (

[Check the answer](#/stack/answer).

## Answer and exercises

```step
id: answer
```

**Answer 2: The ) does not match the top bracket**

When ) arrives, the last unmatched opening bracket is \[. The closing order is invalid.

### Follow-up exercises

- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
- [Min Stack](https://leetcode.com/problems/min-stack/)
- [Decode String](https://leetcode.com/problems/decode-string/)

For each problem, explain why the pattern fits. State its time and space costs.

## Python example

```step
id: python
snippet:
  src: python/stack.py
  language: python
```

Example problem: Validate Paired Brackets.

## Java example

```step
id: java
snippet:
  src: java/stack.java
  language: java
```

Example problem: Validate Paired Brackets.
