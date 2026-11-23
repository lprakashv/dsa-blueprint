import java.util.*;

class Solution {
    static int climbStairs(int n) {
        if (n < 0) throw new IllegalArgumentException("Step count must be nonnegative");
        int previous = 1, current = 1;
        for (int i = 2; i <= n; i++) { int next = previous + current; previous = current; current = next; }
        return current;
    }
}
