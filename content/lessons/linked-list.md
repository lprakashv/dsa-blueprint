---
title: "Linked List Reversal"
summary: "Reverse each link in place while keeping a reference to the rest of the list."
---

## Set the starting references

Set prev to null and cur to A\. The original list is A → B → C\.

## Save B, then reverse A’s link

Save B before you set A\.next to null\. Put prev at A and cur at B\.

## Save C, then link B to A

Set B\.next to A\. Move prev to B and cur to C\.

## Link C to B and return C

Now cur is null\. Return prev, the head of the reversed list C → B → A\.
