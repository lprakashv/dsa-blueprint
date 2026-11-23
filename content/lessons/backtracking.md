---
title: "Backtracking"
summary: "Make a choice, explore its results, and undo the choice before trying the next one."
---

## Record the empty subset

For input \[1, 2\], start with an empty path\. Record a copy before making any choice\.

## Take the first option

Append 1\. Record \[1\]\. From here, only later indices are available\.

## Explore a deeper choice

Append 2 to the current path\. Record \[1, 2\]\. No later index remains\.

## Return to the empty path

Undo 2\. Then undo 1\. Choose 2 directly from the empty path and record \[2\]\.
