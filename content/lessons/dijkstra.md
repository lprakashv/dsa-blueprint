---
title: "Dijkstra’s Algorithm"
summary: "Use a min-heap to settle the nearest node and improve distances along its outgoing edges."
---

## Give only the source a finite distance

Start at A with distance 0\. The other nodes have no known path yet\.

## Relax the edges out of A

Pop A\. The path to B costs 4 and the path to C costs 1\. Put both candidates in the heap\.

## Replace B’s earlier distance

C is next\. A → C → B costs 3, which beats 4\. The first known path to D costs 7\.

## Improve the path to D

Pop B at distance 3\. B → D costs 1, so reduce D’s distance from 7 to 4\.

## Read the shortest path

Skip the old heap entry for B at distance 4\. When D is popped at distance 4, its distance is final\. Follow the predecessor links back to A\.
