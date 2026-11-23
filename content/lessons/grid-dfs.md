---
title: "Grid DFS & Flood Fill"
summary: "Treat each land cell as a node and visit all land in its component before counting the next island."
---

## Decide which cells touch

A 1 is land and a 0 is water\. Cells share an island when you can reach one from the other by moving along edges\.

## Visit all land reachable from (0, 0)

The first land cell starts a depth\-first search\. Visit (0, 1) and (1, 1)\. Mark those three cells as one island\.

## Keep scanning for fresh land

Skip water and marked cells\. Start the second search at (1, 3)\. It reaches (2, 3)\.

## Count the isolated cell

The land at (2, 0) has no land neighbor\. It is the third island\. Return 3\.
