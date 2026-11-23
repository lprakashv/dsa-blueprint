---
title: "Binary Search"
summary: "Cut the search range in half after each comparison."
---

## Start with the whole range

Search for 11 in this sorted array\. Set Low to 0 and High to 6\.

## Keep the right half

Index 3 contains 7\. The sorted order lets you discard index 3 and everything to its left\.

## The middle value matches

Index 5 contains 11\. Return this index\.

## Know when to stop

For an absent target, keep narrowing the range until Low is greater than High\. Return −1\.
