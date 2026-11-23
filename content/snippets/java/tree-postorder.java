import java.util.*;

class Solution {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }
    static class Frame {
        TreeNode node; boolean done;
        Frame(TreeNode node, boolean done) { this.node = node; this.done = done; }
    }
    static int diameter(TreeNode root) {
        if (root == null) return 0;
        Deque<Frame> stack = new ArrayDeque<>(); stack.push(new Frame(root, false));
        Map<TreeNode, Integer> height = new HashMap<>(); int best = 0;
        while (!stack.isEmpty()) {
            Frame frame = stack.pop(); TreeNode node = frame.node;
            if (!frame.done) {
                stack.push(new Frame(node, true));
                if (node.right != null) stack.push(new Frame(node.right, false));
                if (node.left != null) stack.push(new Frame(node.left, false));
            } else {
                int left = node.left == null ? 0 : height.remove(node.left);
                int right = node.right == null ? 0 : height.remove(node.right);
                best = Math.max(best, left + right); height.put(node, 1 + Math.max(left, right));
            }
        }
        return best;
    }
}
