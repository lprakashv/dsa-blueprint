import java.util.*;

class Solution {
    static int longestBalanced(int[] bits) {
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int balance = 0, best = 0;
        for (int i = 0; i < bits.length; i++) {
            balance += bits[i] == 0 ? -1 : 1;
            if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));
            else first.put(balance, i);
        }
        return best;
    }
}
