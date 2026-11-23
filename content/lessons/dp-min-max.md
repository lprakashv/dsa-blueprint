---
title: "Minimum and Maximum DP States"
summary: "Track both product extremes because a negative multiplier reverses their order."
---

## Start with the first element

The only nonempty range that ends at index 0 is \[2\]\. Both extremes and the best product start at 2\.

## Compare a new range with an extension

At −3, start with −3 or extend 2 to get −6\. Keep −6 as the minimum and −3 as the maximum ending here\.

## Use the old minimum to get a new maximum

Multiply −6 by −2 to get 12\. Tracking only the old maximum of −3 would miss the best range\.

## Allow a range to start after a zero

Both products become 0 at zero\. At 4, starting a new range gives 4\. The best over all endpoints stays 12\.
