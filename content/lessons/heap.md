---
title: "Heap / Top K"
summary: "Keep the K largest candidates in a min-heap and remove the smallest as needed."
---

## Add the first three values

Find the three largest values in \[4, 1, 7, 3, 9\]\. Add 4, 1, and 7 to the heap\. Its root is 1\.

## Compare 3 with the root

3 \> 1\. Remove 1 and insert 3\. The new root is 3\.

## Compare 9 with the root

9 \> 3\. Replace 3 with 9 and restore heap order\. The new root is 4\.

## Return the retained values

The heap contains 4, 7, and 9\. Sort these three values only if the result requires sorted order\.
