---
title: "Multi-Source Grid BFS"
summary: "Start breadth-first search from every source at once and fill the grid in layers."
---

## Put both sources in the initial queue

Each move costs one\. The top\-left and bottom\-right sources both start at distance 0\. A wall cannot be crossed\.

## Reach the cells one move away

Expand both source cells\. Each new open neighbor gets distance 1 before you enqueue it\.

## Let the waves move around the walls

Expand distance\-1 cells\. A cell already assigned a distance is skipped, even if another wave reaches it\.

## Read the last layer

Two cells first appear at distance 3\. The queue then empties\. An open cell that never appeared would keep distance −1\.
