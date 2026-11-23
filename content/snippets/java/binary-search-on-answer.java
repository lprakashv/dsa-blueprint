import java.util.*;

class Solution {
    static int minimumRate(int[] piles, int hours) {
        int lo = 1, hi = Arrays.stream(piles).max().orElseThrow();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            long needed = 0;
            for (int pile : piles) needed += (pile + (long) mid - 1) / mid;
            if (needed <= hours) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
}
