import java.util.*;

class Solution {
    // Assume all values are positive integers.
    static boolean canPartition(int[] nums) {
        int total = Arrays.stream(nums).sum();
        if (total % 2 != 0) return false;
        int target = total / 2; boolean[] reachable = new boolean[target + 1]; reachable[0] = true;
        for (int value : nums) {
            for (int goal = target; goal >= value; goal--) reachable[goal] |= reachable[goal - value];
            if (reachable[target]) return true;
        }
        return reachable[target];
    }
}
