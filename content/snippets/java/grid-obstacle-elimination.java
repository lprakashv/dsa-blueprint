import java.util.*;

class Solution {
    // Assume a nonempty grid with open start and end cells.
    static int shortestWithRemovals(int[][] grid, int k) {
        int rows = grid.length, cols = grid[0].length, direct = rows + cols - 2;
        if (k >= direct) return direct;
        int[][] best = new int[rows][cols], dirs = {{1,0},{0,1},{-1,0},{0,-1}};
        for (int[] row : best) Arrays.fill(row, -1);
        best[0][0] = k; Queue<int[]> queue = new ArrayDeque<>(); queue.add(new int[]{0,0,k,0});
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            if (cell[0] == rows - 1 && cell[1] == cols - 1) return cell[3];
            for (int[] d : dirs) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && r < rows && c >= 0 && c < cols) {
                    int budget = cell[2] - grid[r][c];
                    if (budget >= 0 && budget > best[r][c]) {
                        best[r][c] = budget; queue.add(new int[]{r,c,budget,cell[3]+1});
                    }
                }
            }
        }
        return -1;
    }
}
