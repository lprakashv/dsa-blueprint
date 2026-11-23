---
title: "Burst Balloons"
summary: "Choose the last balloon in each interval so its neighbors are known and its subproblems are independent."
---

## Give the row two fixed boundaries

Add a 1 at each end\. The two added values stay in place and contribute to a score when an edge balloon is removed\.

## Split the interval at the last balloon

If 3 is last in the full interval, its neighbors are the two outer 1s\. Everything to its left can be solved before that final score of 3\.

## Build the shorter intervals first

Adjacent boundaries enclose zero balloons\. The interval between values 2 and 3 encloses only 4, so dp\[1\]\[3\] equals 2 × 4 × 3 = 24\.

## Try every last balloon in the full interval

The totals for making 2, 4, or 3 last are 32, 24, and 33\. Choose 33 and store it at dp\[0\]\[4\]\.

## Check the best order

Remove 4 for 24 coins, then 2 for 6, then 3 for 3\. Return 33\.
