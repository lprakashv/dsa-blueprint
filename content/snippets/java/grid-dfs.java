import java.util.*;

class Solution {
    static int countIslands(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        int rows = grid.length, cols = grid[0].length, count = 0;
        boolean[][] seen = new boolean[rows][cols]; int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
            if (grid[r][c] != 1 || seen[r][c]) continue;
            count++; seen[r][c] = true; Deque<int[]> stack = new ArrayDeque<>(); stack.push(new int[]{r,c});
            while (!stack.isEmpty()) {
                int[] cell = stack.pop();
                for (int[] d : dirs) {
                    int nr = cell[0] + d[0], nc = cell[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !seen[nr][nc]) {
                        seen[nr][nc] = true; stack.push(new int[]{nr,nc});
                    }
                }
            }
        }
        return count;
    }
}
