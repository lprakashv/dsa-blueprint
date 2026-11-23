import java.util.*;

class Solution {
    static int maxWindow(int[] nums, int k) {
        if (k < 1 || k > nums.length) throw new IllegalArgumentException("Invalid window size");
        int sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        int best = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            best = Math.max(best, sum);
        }
        return best;
    }
}
