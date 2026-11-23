def median_sorted(first, second):
    if len(first) > len(second):
        first, second = second, first
    m, n = len(first), len(second)
    if m + n == 0:
        raise ValueError("At least one array must contain a value")
    half = (m + n + 1) // 2
    infinity = float("inf")
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        left_first = first[i - 1] if i else -infinity
        right_first = first[i] if i < m else infinity
        left_second = second[j - 1] if j else -infinity
        right_second = second[j] if j < n else infinity
        if left_first > right_second:
            hi = i - 1
        elif left_second > right_first:
            lo = i + 1
        else:
            left_max = max(left_first, left_second)
            if (m + n) % 2:
                return left_max
            return (left_max + min(right_first, right_second)) / 2
    raise ValueError("No valid partition")
