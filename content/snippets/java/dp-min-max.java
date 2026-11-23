import java.util.*;

class Solution {
    // Assume nums is nonempty.
    static int maximumProduct(int[] nums) {
        int low = nums[0], high = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int a = nums[i] * low, b = nums[i] * high;
            low = Math.min(nums[i], Math.min(a, b)); high = Math.max(nums[i], Math.max(a, b));
            best = Math.max(best, high);
        }
        return best;
    }
}
