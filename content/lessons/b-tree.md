---
title: "B-Tree"
summary: "Group sorted keys into pages and split a full page to keep the tree balanced."
---

## Start with a full root page

This example uses minimum degree 2, so each page holds at most three keys\. The root is a full leaf\. Insert 40 next\.

## Promote the median key

Move 20 into a new root\. Keep 10 in the left leaf and 30 in the right leaf\. The tree grows by one level\.

## Descend to the right leaf

40 is greater than 20, so take the right branch\. Insert 40 after 30 in the right leaf\.

## A match can be in an internal page

The root contains 20\. Return a match at the root\. Search for 40 would go down to the right leaf\.
