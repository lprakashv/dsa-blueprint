import java.util.*;

class Solution {
    static class BPlusPage {
        List<Integer> keys; List<BPlusPage> children; BPlusPage nextLeaf;
        BPlusPage(List<Integer> keys, List<BPlusPage> children) {
            this.keys = new ArrayList<>(keys); this.children = new ArrayList<>(children);
        }
    }
    static BPlusPage splitPlusLeaf(BPlusPage leaf) {
        int mid = leaf.keys.size() / 2;
        BPlusPage right = new BPlusPage(leaf.keys.subList(mid, leaf.keys.size()), List.of());
        leaf.keys.subList(mid, leaf.keys.size()).clear();
        right.nextLeaf = leaf.nextLeaf; leaf.nextLeaf = right;
        return right; // The separator is right.keys.get(0).
    }
    static List<Integer> scanKeys(BPlusPage root, int low, int high) {
        BPlusPage page = root;
        while (!page.children.isEmpty()) {
            int i = 0; while (i < page.keys.size() && page.keys.get(i) <= low) i++;
            page = page.children.get(i);
        }
        List<Integer> result = new ArrayList<>();
        while (page != null) {
            for (int key : page.keys) {
                if (key > high) return result;
                if (key >= low) result.add(key);
            }
            page = page.nextLeaf;
        }
        return result;
    }
}
