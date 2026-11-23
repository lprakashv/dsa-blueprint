import java.util.*;

class Solution {
    static double medianSorted(int[] first, int[] second) {
        if (first.length > second.length) return medianSorted(second, first);
        int m = first.length, n = second.length;
        if (m + n == 0) throw new IllegalArgumentException("At least one array must contain a value");
        int half = (m + n + 1) / 2, lo = 0, hi = m;
        while (lo <= hi) {
            int i = (lo + hi) / 2, j = half - i;
            double lf = i == 0 ? Double.NEGATIVE_INFINITY : first[i-1];
            double rf = i == m ? Double.POSITIVE_INFINITY : first[i];
            double ls = j == 0 ? Double.NEGATIVE_INFINITY : second[j-1];
            double rs = j == n ? Double.POSITIVE_INFINITY : second[j];
            if (lf > rs) hi = i - 1;
            else if (ls > rf) lo = i + 1;
            else return (m + n) % 2 == 1 ? Math.max(lf, ls) : (Math.max(lf, ls) + Math.min(rf, rs)) / 2;
        }
        throw new IllegalArgumentException("No valid partition");
    }
}
