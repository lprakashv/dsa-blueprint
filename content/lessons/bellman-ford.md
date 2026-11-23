---
title: "Bellman–Ford"
summary: "Relax every edge in repeated passes and detect a negative cycle reachable from the source."
---

## Start with only the source reachable

Set A to 0 and all other distances to infinity\. For this trace, visit edges in order C → D, B → C, A → B, A → C\.

## Discover the immediate neighbors

The first two edges start at nodes with unknown distances\. The last two edges set B to 4 and C to 5\.

## Use the edge with negative cost

C → D first gives D a distance of 6\. Then B → C lowers C’s distance from 5 to 2\.

## Use the improved distance to C

C → D uses the new distance to C\. The path A → B → C → D costs 4 − 2 \+ 1 = 3\.

## Check for a reachable negative cycle

After V − 1 passes, try each edge once more\. No distance improves here\. If any reachable edge still improves a distance, a reachable negative cycle exists\.
