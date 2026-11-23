import java.util.*;

class Solution {
    static int shortestDistance(Map<Integer, List<Integer>> graph, int start, int target) {
        Queue<int[]> queue = new ArrayDeque<>(); queue.add(new int[]{start, 0});
        Set<Integer> seen = new HashSet<>(); seen.add(start);
        while (!queue.isEmpty()) {
            int[] item = queue.remove();
            if (item[0] == target) return item[1];
            for (int next : graph.getOrDefault(item[0], List.of()))
                if (seen.add(next)) queue.add(new int[]{next, item[1] + 1});
        }
        return -1;
    }
}
