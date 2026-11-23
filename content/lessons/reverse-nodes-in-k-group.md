---
title: "Reverse Nodes in k-Group"
summary: "Find the end of each complete group, reverse its links, and reconnect both boundaries."
---

## Confirm that two nodes are available

Start at a dummy node\. Count two links to find the group end at 3\. Save 8 as the old first node and 5 as the node after the group\.

## Reverse links until the saved successor

Initialize prev to 5\. Save 8’s next link, then set 8\.next to 5\. Save 3’s next link, then set 3\.next to 8\. Stop when the current node is 5\.

## Attach the new head and move to the new tail

Set dummy\.next to 3\. Node 8 is already linked to 5\. Set before to 8 so the next scan starts at the end of the completed group\.

## Apply the same rules to the second group

Find group \[5, 2\] and save successor 9\. Reverse its links with prev = 9\. Set 8\.next to 2, and set before to 5\.

## Leave the incomplete suffix intact

The lookahead finds 9 and then reaches the end\. Return dummy\.next\. Each node participates in at most one group scan and one reversal\.
