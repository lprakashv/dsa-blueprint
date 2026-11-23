---
title: "Word Search II"
summary: "Combine grid backtracking with a trie so all words that share a prefix use the same search."
---

## Store shared prefixes once

Build a trie from the words\. Store a full word at the node where it ends\. The prefix at marks a match and still has children for ate and ata\.

## Record a word and continue from its prefix

Start at the top\-left a\. Move right to t and record at\. Remove its word marker to prevent a duplicate\. Keep the trie branches for ate and ata\.

## Use only unused cells with a valid next letter

Move right to e and record ate\. The other possible extension would need a fresh a adjacent to t\. The start cell is marked while this path is active, so it cannot be used again\.

## Undo cell marks and discard exhausted trie branches

Restore e, then t and a as the calls return\. Remove a trie edge only when its child has no word marker or child edges left\. The at branch still has an untested word, ata\.

## Search from each cell that can begin a word

Start at the lower t to find tat through the upper\-left a\. From the upper t, go through e to find tea\. Either t reaches o to find to\. S is the total dictionary length, and L is the longest word length\. Each path has at most four first moves and three choices per later move\.
