import java.util.*;

class Solution {
    static List<int[]> compatibleMeetings(int[][] intervals) {
        int[][] sorted = intervals.clone(); Arrays.sort(sorted, Comparator.comparingInt(a -> a[1]));
        List<int[]> chosen = new ArrayList<>();
        for (int[] interval : sorted)
            if (chosen.isEmpty() || interval[0] >= chosen.get(chosen.size() - 1)[1]) chosen.add(interval);
        return chosen;
    }
}
