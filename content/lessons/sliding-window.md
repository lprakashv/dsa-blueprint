---
title: "Sliding Window"
summary: "Update a running sum as a fixed-size window moves across an array."
---

## Add the first window

Add the first 3 values\. This sum is the first candidate for the maximum\.

## Update the running sum

Subtract the outgoing value 2 and add the incoming value 1\. The new sum is 7\.

## Update the running sum

Subtract the outgoing value 1 and add the incoming value 3\. The new sum is 9\.

## Update the running sum

Subtract the outgoing value 5 and add the incoming value 2\. The new sum is 6\.

## Return the maximum

The best window starts at index 2\. Its sum is 9\.
