from collections import deque

def shortest_with_removals(grid, k):
    rows, cols = len(grid), len(grid[0])
    direct = rows + cols - 2
    if k >= direct:
        return direct
    best = [[-1] * cols for _ in range(rows)]
    best[0][0] = k
    queue = deque([(0, 0, k, 0)])
    while queue:
        row, col, remaining, moves = queue.popleft()
        if (row, col) == (rows - 1, cols - 1):
            return moves
        for dr, dc in ((1, 0), (0, 1), (-1, 0), (0, -1)):
            r, c = row + dr, col + dc
            if 0 <= r < rows and 0 <= c < cols:
                budget = remaining - grid[r][c]
                if budget >= 0 and budget > best[r][c]:
                    best[r][c] = budget
                    queue.append((r, c, budget, moves + 1))
    return -1
