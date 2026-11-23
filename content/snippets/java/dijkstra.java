import java.util.*;

class Solution {
    // Edges are pairs [neighbor, nonnegative weight].
    static Map<Integer, Integer>[] dijkstra(Map<Integer, List<int[]>> graph, int start) {
        Map<Integer, Integer> distance = new HashMap<>(), previous = new HashMap<>();
        PriorityQueue<int[]> queue = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        distance.put(start, 0); queue.add(new int[]{0, start});
        while (!queue.isEmpty()) {
            int[] item = queue.remove(); int cost = item[0], node = item[1];
            if (cost != distance.get(node)) continue;
            for (int[] edge : graph.getOrDefault(node, List.of())) {
                int candidate = cost + edge[1];
                if (candidate < distance.getOrDefault(edge[0], Integer.MAX_VALUE)) {
                    distance.put(edge[0], candidate); previous.put(edge[0], node);
                    queue.add(new int[]{candidate, edge[0]});
                }
            }
        }
        return new Map[]{distance, previous};
    }
}
