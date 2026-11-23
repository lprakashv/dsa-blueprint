def count_islands(grid):
    if not grid or not grid[0]:
        return 0
    rows, cols = len(grid), len(grid[0])
    directions = ((-1, 0), (1, 0), (0, -1), (0, 1))
    seen, count = set(), 0
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] != 1 or (row, col) in seen:
                continue
            count += 1
            seen.add((row, col))
            stack = [(row, col)]
            while stack:
                r, c = stack.pop()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if (0 <= nr < rows and 0 <= nc < cols
                            and grid[nr][nc] == 1 and (nr, nc) not in seen):
                        seen.add((nr, nc))
                        stack.append((nr, nc))
    return count
