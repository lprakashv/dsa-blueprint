---
title: "Floyd–Warshall"
summary: "Use a distance matrix to test whether routing through each vertex improves a path."
---

## Fill the matrix from direct edges

Set each diagonal entry to 0\. Enter 3 for A → B, 2 for B → C, and 10 for A → C\. Use infinity when there is no direct edge\.

## Ask if a stop at B helps

Pivot A did not improve a route\. With B as the pivot, compare the direct cost A → C with the sum of A → B and B → C\.

## Replace the expensive direct route

The path via B costs 5, so update the entry for A → C from 10 to 5\.

## Read any pair’s shortest distance

Pivot C makes no further improvement\. The entry at row A, column C is 5\. An infinity entry, such as C → A, means no path exists\.
