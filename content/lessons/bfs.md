---
title: "Breadth-First Search"
summary: "Explore an unweighted graph one distance from the start at a time."
---

## Start at distance zero

Put A in a first\-in, first\-out queue\. Mark it discovered\.

## Find the first layer

Remove A\. Add its neighbors B and C with distance 1\.

## Add nodes at distance two

Remove B\. Add D and E to the back\. C will still run before D and E\.

## Finish at the target

Remove C and discover F at distance 2\. The shortest path is A → C → F\.
