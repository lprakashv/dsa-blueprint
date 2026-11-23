import java.util.*;

class Solution {
    static Set<Integer> reachable(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> seen = new HashSet<>();
        visit(graph, start, seen); return seen;
    }
    static void visit(Map<Integer, List<Integer>> graph, int node, Set<Integer> seen) {
        if (!seen.add(node)) return;
        for (int next : graph.getOrDefault(node, List.of())) visit(graph, next, seen);
    }
}
