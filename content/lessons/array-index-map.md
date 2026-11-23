---
title: "Dense Array + Index Map"
summary: "Use an array for uniform sampling and a map for direct access. Move the last element to fill a deletion gap."
---

## Keep both views of the values

The array has \[7, 4, 9\]\. The map associates each value with its index\.

## Find the gap with the map

Remove 4\. Its index is 1\. Shifting every later element would take time proportional to the array length\.

## Move the last element into the gap

Put 9 at index 1 and update the map entry for 9\. Pop the last slot and delete the entry for 4\.

## Pick an occupied index uniformly

Choose either array index with probability 1/2\. Every stored value has one index, so both values have the same probability\.
