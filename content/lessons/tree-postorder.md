---
title: "Postorder Tree Aggregation"
summary: "Combine child results after both children are done. Return one branch to the parent and record the best path."
---

## Visit children before their parent

Put a return visit for A on the stack\. Process the children before that return visit\. An empty subtree has height zero\.

## Pass height 1 up from each leaf

D and E each have no children\. Store height 1 for each\. Their local paths have zero edges\.

## Keep a local path and a return value

At B, the path D → B → E has 2 edges\. Give A the height of one branch from B, which is 2 nodes\.

## Use the largest path seen anywhere

C gives height 1\. At A, the path D → B → A → C has 3 edges\. A different tree could have its best path entirely inside a child\.
