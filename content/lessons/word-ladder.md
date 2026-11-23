---
title: "Word Ladder"
summary: "Run breadth-first search over a graph whose neighbors are valid one-letter edits."
---

## Put the start in the first layer

Start with cold at chain length 1\. The start does not need to be in the dictionary\.

## Generate the first valid edit

Cold has one dictionary neighbor: cord\. Change its third letter\. Add cord to the next layer\.

## Explore both candidates at the same depth

Cord can change to word or card\. Both have chain length 3\. Queue word first when you generate edits left to right\.

## Add ward once

Word discovers ward at length 4\. Card also reaches ward, but it cannot improve the chain\. Skip the duplicate\.

## Return the number of words

Ward changes to warm\. BFS first reaches it with four edits, so the output is five words\.
