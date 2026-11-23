---
title: "Merge Intervals"
summary: "Sort ranges by start and keep one merged range open at a time."
---

## Sort by start time

After sorting, the next start is always at or after the last start you processed\.

## Combine the first overlap

2 ≤ 3\. Merge \[1, 3\] and \[2, 6\] into \[1, 6\]\.

## Open a new range at the gap

8 \> 6\. Add \[8, 10\] as a new interval\.

## Extend the last range

9 ≤ 10\. Extend the second output range to 12\. Return the two merged ranges\.
