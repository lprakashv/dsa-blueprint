---
title: "Minimum Window Substring"
summary: "Track how many required characters are missing, then tighten each window that covers the target."
---

## Track missing occurrences

The target AAB needs two copies of A and one of B\. Start with three missing occurrences\.

## A set of letters is not enough

The first three letters are CAB\. The window has both kinds of required letter, but it still needs one more A\.

## Find the first valid window

Read the next A to form CABA\. The window covers the target\. Save its length of 4 before moving the left edge\.

## Remove letters while the window stays valid

Drop C to get ABA and save length 3\. Dropping the next A would make the window invalid, so stop shrinking\.

## Keep the shortest cover

Scan the remaining suffix\. No window can beat 3 because three occurrences are required\. Return ABA\.
