---
title: "Shortest Path With Obstacle Elimination"
summary: "Extend grid BFS to track both the current cell and how many removals are left."
---

## Start with one removal available

Use a state (row, column, remaining)\. The initial state is (0, 0, 1)\.

## A short arrival can use up the budget

Reach (0, 2) in two moves through (0, 1)\. This uses the only removal\. The obstacles next to the goal still block that route\.

## Keep a later arrival with more budget

Go down and across row 1, then up to (0, 2)\. This takes four moves and still has one removal\. Add this state even though the cell was seen\.

## Use the saved removal at the goal entrance

Follow row 0 to column 4\. Enter obstacle (1, 4) and then goal (2, 4)\. This route has eight moves\. BFS finds no shorter route within the budget\.
