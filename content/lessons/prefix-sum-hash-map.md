---
title: "Prefix Sum + Hash Map"
summary: "Store the first position of each prefix balance to find the longest range with equal counts."
---

## Give 0 and 1 opposite weights

Count a 1 as \+1 and a 0 as −1\. A range with equal counts makes no net change\. Start at boundary 0 before the first element\.

## Save the first boundary for each balance

Read 1 and reach balance 1 at boundary 1\. Record this boundary\. Later matches can subtract it to find a zero\-sum range\.

## Subtract the earlier boundary

The next 0 brings the balance back to 0 at boundary 2\. The range between boundaries 0 and 2 is balanced\. Keep boundary 0 for future matches\.

## Keep the largest distance

The balance returns to 0 at boundary 6\. The original boundary 0 gives the longest balanced range\. For a target sum k, look up current prefix minus k\.
