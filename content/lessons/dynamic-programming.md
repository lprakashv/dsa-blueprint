---
title: "Dynamic Programming"
summary: "Solve small states once and use their answers to build larger states."
---

## Set the first two answers

There is one way to stay at step 0 and one way to reach step 1\.

## Count paths into step 2

The last move came from step 0 or 1\. Add their counts to get 2\.

## Reuse the results at step 3

Add the counts at 1 and 2\. Step 3 has three paths\.

## Compute the final state

Add the counts at 2 and 3 to get 5\. Only the last two counts are needed at each step\.
