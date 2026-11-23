import java.util.*;

class Solution {
    static class RandomizedSet {
        List<Integer> values = new ArrayList<>();
        Map<Integer, Integer> positions = new HashMap<>();
        Random random = new Random();
        boolean insert(int value) {
            if (positions.containsKey(value)) return false;
            positions.put(value, values.size()); values.add(value); return true;
        }
        boolean remove(int value) {
            Integer index = positions.remove(value);
            if (index == null) return false;
            int last = values.get(values.size() - 1);
            values.set(index, last);
            values.remove(values.size() - 1);
            if (index < values.size()) positions.put(last, index);
            return true;
        }
        int getRandom() { return values.get(random.nextInt(values.size())); }
    }
}
