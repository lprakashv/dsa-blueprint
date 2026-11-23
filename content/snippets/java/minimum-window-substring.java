import java.util.*;

class Solution {
    static String minimumWindow(String source, String target) {
        if (target.isEmpty()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : target.toCharArray()) need.merge(c, 1, Integer::sum);
        int missing = target.length(), left = 0, bestStart = 0, bestLength = source.length() + 1;
        for (int right = 0; right < source.length(); right++) {
            char c = source.charAt(right);
            if (need.containsKey(c)) { if (need.get(c) > 0) missing--; need.put(c, need.get(c) - 1); }
            while (missing == 0) {
                int length = right - left + 1;
                if (length < bestLength) { bestStart = left; bestLength = length; }
                char outgoing = source.charAt(left++);
                if (need.containsKey(outgoing)) {
                    int count = need.get(outgoing) + 1; need.put(outgoing, count);
                    if (count > 0) missing++;
                }
            }
        }
        return bestLength > source.length() ? "" : source.substring(bestStart, bestStart + bestLength);
    }
}
