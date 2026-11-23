---
title: "Prefix Sum"
summary: "Prepare cumulative totals once, then answer each range query in constant time."
---

## Start with an empty prefix

The sum of zero values is 0\. Put this value at index 0\.

## Add one input value at a time

To add the second value, start with 2 and add 4\. Store 6 at prefix\[2\]\.

## Find both boundaries

To sum indices 1 through 3, take the totals at prefix\[1\] and prefix\[4\]\.

## Remove the part before the range

The total through index 3 is 10\. Subtract 2, the total before index 1\. The answer is 8\.
