---
title: "Hash Map Lookup"
summary: "Store elements you already saw and check for the complement in one pass."
---

## Start with an empty map

Given target 9, scan the unsorted array once\. For each value x, look up 9 − x\.

## Record the first index

The complement of 4 is 5\. The map is empty, so store 4 at index 0\.

## Check the next complement

The complement of 1 is 8\. It is missing, so store 1 at index 1\.

## Find the earlier index

For value 5, the complement is 4\. The map gives index 0\. Return indices \[0, 2\]\.
