---
title: "0/1 Knapsack and Subset Sum"
summary: "Track reachable totals and update them from right to left so each item can be used once."
---

## Reduce equal partition to subset sum

The values \[2, 3, 4, 1\] sum to 10\. Find one subset that sums to 5\. The remaining values will also sum to 5\. An odd total cannot be split equally\.

## Read from the previous item state

With item 2, scan sums from 5 down to 2\. When you check 4, sum 2 is still false\. Only sum 2 becomes reachable\.

## Build on earlier items

With item 3, sum 5 reads the old state for sum 2\. Sum 3 reads sum 0\. Both become reachable\.

## Stop when the target is reachable

The subset \[2, 3\] reaches 5\. The remaining values \[4, 1\] also reach 5\. Later items cannot make a reachable sum unreachable\.
