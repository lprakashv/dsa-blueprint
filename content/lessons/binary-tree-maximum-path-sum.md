---
title: "Binary Tree Maximum Path Sum"
summary: "Use postorder to keep one branch for the parent and score paths that join two branches at their highest node."
---

## Give each completed node two jobs

For each node, compute a downward gain for its parent\. Also score a path whose highest node is this one\. Process the children first so their gains are available\.

## Start with one-node paths

The leaves under 4 return 3 and −6\. Each also supplies a one\-node candidate for the overall answer\. Keep negative gains as return values so the parent can decide whether to use them\.

## Drop the child gain that lowers the sum

At node 4, take the gain 3 and omit the gain −6\. The best path through 4 has sum 7\. Its return gain is also 7 because it uses only one child\.

## Score both branches at the highest node

The leaf 8 returns 8\. At −5, the full path uses both gains, 7 and 8, for a total of 10\. A parent could extend only the better branch, whose gain with −5 is 3\.

## Keep the best nonempty path found anywhere

Every path has a highest node, and each such node was checked once\. Return 10\. With all\-negative input, every child gain is omitted, so the best answer is the largest individual node value\.
