def split_largest_sum(nums, k):
    # Assume nums is nonempty and nonnegative, with 1 <= k <= len(nums).
    lo, hi = max(nums), sum(nums)

    def fits(cap):
        groups, current = 1, 0
        for value in nums:
            if current + value > cap:
                groups += 1
                if groups > k:
                    return False
                current = 0
            current += value
        return True

    while lo < hi:
        mid = (lo + hi) // 2
        if fits(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
