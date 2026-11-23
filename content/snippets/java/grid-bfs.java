import java.util.*;

class Solution {
    static int[][] nearestSource(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return new int[0][0];
        int rows = grid.length, cols = grid[0].length;
        int[][] distance = new int[rows][cols], dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        Queue<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < rows; r++) {
            Arrays.fill(distance[r], -1);
            for (int c = 0; c < cols; c++) if (grid[r][c] == 0) {
                distance[r][c] = 0; queue.add(new int[]{r,c});
            }
        }
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            for (int[] d : dirs) {
                int r = cell[0] + d[0], c = cell[1] + d[1];
                if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] != -1 && distance[r][c] == -1) {
                    distance[r][c] = distance[cell[0]][cell[1]] + 1; queue.add(new int[]{r,c});
                }
            }
        }
        return distance;
    }
}
