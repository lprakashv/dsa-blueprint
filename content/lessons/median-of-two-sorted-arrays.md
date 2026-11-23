---
title: "Median of Two Sorted Arrays"
summary: "Search for a cut in the shorter array that puts every left-side value before every right-side value."
---

## Fix the size of the left half

With 6 values, put 3 on each side\. Search only the cut i in the shorter array\. Set the other cut j to 3 − i\. Because the first array is shorter, every candidate i gives an in\-range j\.

## Compare the two cross-array boundaries

Try i = 1 and j = 2\. The left includes 6, but the right includes 4\. The first cut is too far right\. Moving it even farther right can only raise its left boundary and lower the other right boundary\.

## Move in the direction of the failed check

If the second left boundary exceeds the first right boundary, move the first cut right\. Here that check is already satisfied\. Reduce the upper bound and try i = 0, j = 3\.

## Treat an empty boundary as infinity

No first\-array value is on the left, so use −∞ there\. The two cross checks are −∞ ≤ 5 and 4 ≤ 6\. Each array is already sorted, so these checks put every left value at or below every right value\.

## Read the median from the cut

The largest value on the left is 4 and the smallest on the right is 5\. Average them when the total is even\. When the total is odd, the left side has one extra value, so return its maximum\.
