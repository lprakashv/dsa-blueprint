import java.util.*;

class Solution {
    static boolean validBrackets(String text) {
        Map<Character, Character> opening = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : text.toCharArray()) {
            if (opening.containsValue(c)) stack.push(c);
            else if (opening.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != opening.get(c)) return false;
            } else return false;
        }
        return stack.isEmpty();
    }
}
