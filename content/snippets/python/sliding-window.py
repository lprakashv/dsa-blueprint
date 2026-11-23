def max_window(nums, k):
    if not 1 <= k <= len(nums):
        raise ValueError("Invalid window size")
    total = sum(nums[i] for i in range(k))
    best = total
    for right in range(k, len(nums)):
        total += nums[right] - nums[right - k]
        best = max(best, total)
    return best
