---
title: "Union-Find"
summary: "Use disjoint sets, also called DSU, to merge components and check whether two nodes share a root."
---

## Start with four separate sets

Each node is its own root\. A find on any node returns that node\.

## Join two pairs by their roots

Union(0, 1) links 1 to 0\. Union(2, 3) links 3 to 2\. When sizes are equal, this example keeps the first root\.

## Join the two remaining sets

Union(0, 2) links root 2 to root 0\. Node 3 still points to 2, so find(3) follows 3 → 2 → 0\.

## Point directly to the root

Find(3) rewrites parent\[3\] to 0\. The component stays the same\. The next find from 3 needs one hop\.
