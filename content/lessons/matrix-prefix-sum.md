---
title: "2D Prefix Sum"
summary: "Build a table of cumulative rectangle sums, then answer each query with four lookups."
---

## Mark the inclusive rectangle

Sum rows 1 through 2 and columns 1 through 2\. Use a prefix table so each later rectangle costs the same to query\.

## Add a zero row and column

For each entry, add its top and left totals and the current input\. Subtract the top\-left total once\. The full matrix sums to 45\.

## Subtract the two strips outside the query

Start with prefix\[3\]\[3\] = 45\. Remove the top strip of 6 and the left strip of 12\. This removes the top\-left 1 twice\.

## Add the shared corner once

Add prefix\[1\]\[1\] = 1\. The remaining total is 28\. The same four lookups work for any rectangle\.
