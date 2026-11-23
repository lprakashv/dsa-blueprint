---
title: "B+ Tree"
summary: "Descend to the first matching leaf, then follow leaf links to scan the range in order."
---

## An insert fills a leaf past capacity

Each leaf can hold three records in this example\. Insert 40 after 30\. The diagram shows record keys only\.

## Copy up the first key in the right leaf

Split into \[10, 20\] and \[30, 40\]\. Copy 30 into the new root and link the leaves\. The record with key 30 stays in the right leaf\.

## Find the leaf for the range start

Scan the inclusive range \[20, 35\]\. Since 20 is less than 30, go left\. The first key in range is 20\.

## Read the next leaf directly

Follow the leaf link\. Read 30, then stop at 40 because it is greater than 35\.

## Return the keys in order

The result is \[20, 30\]\. The scan made one descent, then followed the leaf links\.
