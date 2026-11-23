def build_matrix_prefix(grid):
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            prefix[r][c] = (grid[r - 1][c - 1] + prefix[r - 1][c]
                            + prefix[r][c - 1] - prefix[r - 1][c - 1])
    return prefix

def rectangle_sum(prefix, top, left, bottom, right):
    return (prefix[bottom + 1][right + 1] - prefix[top][right + 1]
            - prefix[bottom + 1][left] + prefix[top][left])
