import java.util.*;

class Solution {
    static class UnionFind {
        int[] parent, size;
        UnionFind(int n) {
            parent = new int[n]; size = new int[n];
            for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
        }
        int find(int node) {
            if (parent[node] != node) parent[node] = find(parent[node]);
            return parent[node];
        }
        boolean union(int a, int b) {
            a = find(a); b = find(b);
            if (a == b) return false;
            if (size[a] < size[b]) { int t = a; a = b; b = t; }
            parent[b] = a; size[a] += size[b]; return true;
        }
    }
}
