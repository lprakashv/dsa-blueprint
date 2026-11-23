---
title: "Spiral Matrix"
summary: "Read the outer edges, then shrink four boundaries to reach the next inner ring."
---

## Read the top row left to right

Start with the entire rectangle\. Read 1, 2, 3, and 4\. Move the top boundary down by one\.

## Read the right column downward

The top row is already excluded\. Read 8 and 12, then move the right boundary left\.

## Read the bottom row right to left

The right boundary moved inward\. Read 11, 10, and 9\. Then move the bottom boundary up\.

## Read the left column upward

Only 5 remains in the left column of this ring\. Read it and move the left boundary right\.

## Check bounds before every edge

The inner rectangle has one row\. Read 6 and 7\. The row bounds cross, so the traversal is complete\.
