import java.util.*;

class Solution {
    static List<Integer> taskOrder(Map<Integer, List<Integer>> graph) {
        Map<Integer, Integer> degree = new HashMap<>();
        for (int node : graph.keySet()) degree.putIfAbsent(node, 0);
        for (List<Integer> neighbors : graph.values())
            for (int node : neighbors) degree.merge(node, 1, Integer::sum);
        Queue<Integer> ready = new ArrayDeque<>();
        degree.forEach((node, count) -> { if (count == 0) ready.add(node); });
        List<Integer> order = new ArrayList<>();
        while (!ready.isEmpty()) {
            int node = ready.remove(); order.add(node);
            for (int next : graph.getOrDefault(node, List.of()))
                if (degree.merge(next, -1, Integer::sum) == 0) ready.add(next);
        }
        return order.size() == degree.size() ? order : null;
    }
}
