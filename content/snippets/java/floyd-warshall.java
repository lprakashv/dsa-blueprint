import java.util.*;

class Solution {
    // Each edge is [source, target, weight]. Infinity denotes an unreachable node.
    static double[][] floydWarshall(int n, int[][] edges) {
        double[][] distance = new double[n][n];
        for (int i = 0; i < n; i++) { Arrays.fill(distance[i], Double.POSITIVE_INFINITY); distance[i][i] = 0; }
        for (int[] edge : edges) distance[edge[0]][edge[1]] = Math.min(distance[edge[0]][edge[1]], edge[2]);
        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++)
                    distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
        for (int i = 0; i < n; i++) if (distance[i][i] < 0) throw new IllegalArgumentException("Negative cycle");
        return distance;
    }
}
