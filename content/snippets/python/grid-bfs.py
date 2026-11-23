from collections import deque

def nearest_source(grid):
    if not grid or not grid[0]:
        return []
    rows, cols = len(grid), len(grid[0])
    distance = [[-1] * cols for _ in range(rows)]
    queue = deque()
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 0:
                distance[row][col] = 0
                queue.append((row, col))
    while queue:
        r, c = queue.popleft()
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                    and grid[nr][nc] != -1 and distance[nr][nc] == -1):
                distance[nr][nc] = distance[r][c] + 1
                queue.append((nr, nc))
    return distance
