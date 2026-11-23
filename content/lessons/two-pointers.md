---
title: "Two Pointers"
summary: "Scan a sorted array from both ends to find a pair that adds up to a target."
---

## Start at both ends

Put Left at the first element and Right at the last\. The array is sorted, so you can rule out one end after each comparison\.

## The sum is too high

13 \> 10\. Every other left value is at least 1, so index 5 cannot be in the answer\. Move Right left\.

## The sum is too low

9 \< 10\. Every other right value is at most 8, so index 0 cannot be in the answer\. Move Left right\.

## Move Left and check again

Move Left from index 0 to index 1\. Now 2 \+ 8 = 10\. The new pair has the target sum\.

## Return the two indices

Return indices \[1, 4\]\. Each comparison removes one candidate until you find a pair or the pointers meet\.
