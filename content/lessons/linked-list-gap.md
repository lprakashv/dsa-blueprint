---
title: "Fixed-Gap Linked List Pointers"
summary: "Keep two pointers a fixed number of links apart to locate a node from the end."
---

## Add a predecessor before the head

Remove the second node from the end of A → B → C → D\. Put both pointers at a dummy node that points to A\.

## Move the lead pointer two links

Move the lead pointer to B\. Keep the follow pointer at the dummy node\.

## Move both pointers to keep the gap

Stop when the lead pointer reaches D, the last node\. The follow pointer is at B, immediately before C\.

## Bypass the node after the follow pointer

Set B\.next to D\. Return dummy\.next so the same code works when the head is removed\.
