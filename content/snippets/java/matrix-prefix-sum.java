import java.util.*;

class Solution {
    static int[][] buildMatrixPrefix(int[][] grid) {
        int rows = grid.length, cols = rows == 0 ? 0 : grid[0].length;
        int[][] prefix = new int[rows + 1][cols + 1];
        for (int r = 1; r <= rows; r++) for (int c = 1; c <= cols; c++)
            prefix[r][c] = grid[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1];
        return prefix;
    }
    static int rectangleSum(int[][] p, int top, int left, int bottom, int right) {
        return p[bottom+1][right+1] - p[top][right+1] - p[bottom+1][left] + p[top][left];
    }
}
