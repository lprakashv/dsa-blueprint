import java.util.*;

class Solution {
    static int burstBalloons(int[] balloons) {
        int n = balloons.length + 2; int[] values = new int[n];
        values[0] = values[n-1] = 1; System.arraycopy(balloons, 0, values, 1, balloons.length);
        int[][] best = new int[n][n];
        for (int width = 2; width < n; width++) for (int left = 0; left + width < n; left++) {
            int right = left + width;
            for (int last = left + 1; last < right; last++)
                best[left][right] = Math.max(best[left][right], best[left][last] + best[last][right] + values[left]*values[last]*values[right]);
        }
        return best[0][n-1];
    }
}
