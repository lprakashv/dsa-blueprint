---
title: "Stacks"
summary: "Use a stack to close the most recent opening bracket first."
---

## Start with an empty stack

Read \{ \[ \] \} from left to right\. Each closing bracket must match the top of the stack\.

## Store each opening bracket

Push \{ and then \[\. The \[ is now the top\.

## Close the latest opening bracket

The \] matches \[\. Pop \[\. The \{ stays on the stack\.

## Confirm the stack is empty

The \} matches \{\. Pop \{\. There are no unmatched brackets\.
