def diameter(root):
    # Each node has left and right child references.
    if root is None:
        return 0
    stack, heights, best = [(root, False)], {}, 0
    while stack:
        node, children_done = stack.pop()
        if children_done:
            left = heights.pop(id(node.left), 0)
            right = heights.pop(id(node.right), 0)
            best = max(best, left + right)
            heights[id(node)] = 1 + max(left, right)
        else:
            stack.append((node, True))
            for child in (node.right, node.left):
                if child is not None:
                    stack.append((child, False))
    return best
