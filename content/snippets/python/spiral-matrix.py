def spiral_order(grid):
    if not grid or not grid[0]:
        return []
    top, bottom = 0, len(grid) - 1
    left, right = 0, len(grid[0]) - 1
    result = []
    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            result.append(grid[top][col])
        top += 1
        for row in range(top, bottom + 1):
            result.append(grid[row][right])
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(grid[bottom][col])
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(grid[row][left])
            left += 1
    return result
