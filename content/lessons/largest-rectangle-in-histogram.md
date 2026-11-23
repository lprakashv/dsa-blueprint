---
title: "Largest Rectangle in Histogram"
summary: "Use a monotonic stack to find the left and right limits of each bar in a single pass."
---

## Keep the first bar unresolved

At index 0, push height 2\. You cannot tell how far its rectangle extends until you see a shorter bar\.

## Close the first rectangle

Height 1 at index 1 stops the rectangle for height 2\. Its width is 1\. Pop index 0, then push index 1\.

## Keep taller bars on top

Push indices 2 and 3, with heights 4 and 5\. Both are still waiting for a shorter bar to the right\.

## Use the shorter bar to find the width

Index 4 has height 2\. Pop height 5 for area 5\. Then pop height 4\. The new stack top is index 1, so the width is 4 − 1 − 1 = 2\.

## Close any open rectangles

Push index 4, then process a virtual height 0 after the last bar\. Remaining positive heights yield areas 6 and 5\. Keep 8\.
