import java.util.*;

class Solution {
    static class BTreeNode {
        List<Integer> keys = new ArrayList<>();
        List<BTreeNode> children = new ArrayList<>();
        int position(int key) {
            int i = 0; while (i < keys.size() && keys.get(i) < key) i++; return i;
        }
        boolean contains(int key) {
            int i = position(key);
            return i < keys.size() && keys.get(i) == key || !children.isEmpty() && children.get(i).contains(key);
        }
        void splitChild(int i) {
            BTreeNode child = children.get(i), right = new BTreeNode();
            keys.add(i, child.keys.get(1));
            right.keys.add(child.keys.get(2));
            child.keys.subList(1, 3).clear();
            if (!child.children.isEmpty()) {
                right.children.addAll(child.children.subList(2, 4));
                child.children.subList(2, 4).clear();
            }
            children.add(i + 1, right);
        }
        void insertNonfull(int key) {
            int i = position(key);
            if (children.isEmpty()) { keys.add(i, key); return; }
            if (children.get(i).keys.size() == 3) {
                splitChild(i);
                if (key > keys.get(i)) i++;
            }
            children.get(i).insertNonfull(key);
        }
        BTreeNode insert(int key) {
            if (contains(key)) return this;
            BTreeNode root = this;
            if (keys.size() == 3) {
                root = new BTreeNode(); root.children.add(this); root.splitChild(0);
            }
            root.insertNonfull(key); return root;
        }
    }
}
