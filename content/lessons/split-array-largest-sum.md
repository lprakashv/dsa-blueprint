---
title: "Split Array Largest Sum"
summary: "Binary-search a maximum group sum. Greedily pack each group to test that limit."
---

## Turn the optimization into a yes or no test

Ask if there is a split with every group sum at most cap\. Search from 6, the largest item, through 20, the total\. A larger cap accepts every split that a smaller one accepts\.

## Take the longest prefix that fits each group

At cap 13, the first group reaches sum 12 before the next item would make it 15\. It covers at least as many items as any valid first group\. Moving those items into the first group only removes nonnegative values from later groups\. Repeat this argument for each group\.

## Raise the lower bound when the scan needs too many groups

The next cap 9 needs three groups, so search \[10, 13\]\. Then cap 11 still needs three groups\. No cap at or below 11 can fit two groups\.

## Check whether the first remaining cap works

Cap 12 fits the two groups \[4, 2, 6\] and \[3, 5\]\. If a scan uses fewer than k groups, split groups into smaller nonempty groups until there are k\. Their sums cannot increase\.

## Report the first feasible cap

Both bounds are 12\. Each cap check visits the array once, and each binary\-search step removes about half the remaining caps\.
