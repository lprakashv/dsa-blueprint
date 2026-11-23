import java.util.*;

class Solution {
    static int largestRectangle(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>(); int best = 0;
        for (int right = 0; right <= heights.length; right++) {
            int height = right < heights.length ? heights[right] : 0;
            while (!stack.isEmpty() && heights[stack.peek()] > height) {
                int peak = stack.pop(), left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, heights[peak] * (right - left - 1));
            }
            if (right < heights.length) stack.push(right);
        }
        return best;
    }
}
