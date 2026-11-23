import java.util.*;

class Solution {
    static List<Integer> topK(int[] nums, int k) {
        if (k < 0 || k > nums.length) throw new IllegalArgumentException("Invalid k");
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int value : nums) {
            if (heap.size() < k) heap.add(value);
            else if (k > 0 && value > heap.peek()) { heap.poll(); heap.add(value); }
        }
        List<Integer> result = new ArrayList<>(heap);
        result.sort(Collections.reverseOrder());
        return result;
    }
}
