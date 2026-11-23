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
    // Assume root is non-null.
    static int maxPathSum(TreeNode root) {
        Deque<Frame> stack = new ArrayDeque<>(); stack.push(new Frame(root, false));
        Map<TreeNode, Integer> gains = new HashMap<>(); int best = root.val;
        while (!stack.isEmpty()) {
            Frame frame = stack.pop(); TreeNode node = frame.node;
            if (!frame.done) {
                stack.push(new Frame(node, true));
                if (node.right != null) stack.push(new Frame(node.right, false));
                if (node.left != null) stack.push(new Frame(node.left, false));
            } else {
                int left = node.left == null ? 0 : Math.max(0, gains.remove(node.left));
                int right = node.right == null ? 0 : Math.max(0, gains.remove(node.right));
                best = Math.max(best, node.val + left + right); gains.put(node, node.val + Math.max(left, right));
            }
        }
        return best;
    }
}
