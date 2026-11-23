import java.util.*;

class Solution {
    static int ladderLength(String start, String end, List<String> words) {
        Set<String> unseen = new HashSet<>(words);
        if (!unseen.contains(end)) return 0;
        unseen.remove(start); Queue<String> queue = new ArrayDeque<>(); queue.add(start);
        int length = 1;
        while (!queue.isEmpty()) {
            for (int count = queue.size(); count > 0; count--) {
                String word = queue.remove(); if (word.equals(end)) return length;
                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char original = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[i] = c; String candidate = new String(chars);
                        if (unseen.remove(candidate)) queue.add(candidate);
                    }
                    chars[i] = original;
                }
            }
            length++;
        }
        return 0;
    }
}
