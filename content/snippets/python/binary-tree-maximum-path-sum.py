def max_path_sum(root):
    # Assume a nonempty tree with val, left, and right on each node.
    best = root.val
    stack, gains = [(root, False)], {}
    while stack:
        node, children_done = stack.pop()
        if children_done:
            left = max(0, gains.pop(id(node.left), 0))
            right = max(0, gains.pop(id(node.right), 0))
            best = max(best, node.val + left + right)
            gains[id(node)] = node.val + max(left, right)
        else:
            stack.append((node, True))
            for child in (node.right, node.left):
                if child is not None:
                    stack.append((child, False))
    return best
