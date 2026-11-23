---
title: "Topological Sort"
summary: "Process tasks with no unmet prerequisites and remove their outgoing edges."
---

## Count incoming dependencies

A unlocks B and C\. Both B and C unlock D\. Only A starts with in\-degree zero\.

## Process A and unlock B and C

Remove A’s outgoing edges\. B and C each drop to zero\.

## Wait for both prerequisites

B lowers the count of D to 1\. C lowers it to 0\. Now D is ready\.

## Check that every task ran

Process D\. All four tasks are in the output, so this order is valid\.
