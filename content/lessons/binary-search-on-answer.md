---
title: "Binary Search on the Answer"
summary: "Find the smallest candidate that passes a check when every larger candidate also passes."
---

## Choose a feasible upper bound

Finish piles \[3, 5, 8\] in 6 hours\. Each hour works on one pile\. Rate 8 needs one hour per pile, so the minimum feasible rate is between 1 and 8\.

## Test the middle rate

Rate 4 needs 1 \+ 2 \+ 2 = 5 hours\. It passes\. Every faster rate also passes, so keep 4 and discard candidates above it\.

## Discard an infeasible lower half

Rate 2 needs 2 \+ 3 \+ 4 = 9 hours\. It fails\. Any smaller rate needs at least as much time\.

## Stop when one candidate remains

Rate 3 needs 1 \+ 2 \+ 3 = 6 hours\. It passes\. Both bounds are now 3, the smallest rate that meets the deadline\.
