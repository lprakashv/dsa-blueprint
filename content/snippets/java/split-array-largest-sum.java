import java.util.*;

class Solution {
    // Assume nums is nonempty and nonnegative, with 1 <= k <= nums.length.
    static long splitLargestSum(int[] nums, int k) {
        long lo = 0, hi = 0;
        for (int value : nums) { lo = Math.max(lo, value); hi += value; }
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2, sum = 0; int groups = 1;
            for (int value : nums) {
                if (sum + value > mid) { groups++; sum = 0; }
                sum += value;
            }
            if (groups <= k) hi = mid; else lo = mid + 1;
        }
        return lo;
    }
}
