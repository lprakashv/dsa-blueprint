import java.util.*;

class Solution {
    // Each edge is [source, target, weight]. Infinity denotes an unreachable node.
    static double[] bellmanFord(int n, int[][] edges, int start) {
        double[] distance = new double[n]; Arrays.fill(distance, Double.POSITIVE_INFINITY);
        distance[start] = 0;
        for (int i = 1; i < n; i++) {
            boolean changed = false;
            for (int[] edge : edges) {
                double candidate = distance[edge[0]] + edge[2];
                if (candidate < distance[edge[1]]) { distance[edge[1]] = candidate; changed = true; }
            }
            if (!changed) return distance;
        }
        for (int[] edge : edges)
            if (distance[edge[0]] + edge[2] < distance[edge[1]])
                throw new IllegalArgumentException("Reachable negative cycle");
        return distance;
    }
}
