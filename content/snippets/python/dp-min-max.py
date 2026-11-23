def maximum_product(nums):
    # Assume nums contains at least one value.
    low = high = best = nums[0]
    for index in range(1, len(nums)):
        value = nums[index]
        options = (value, value * low, value * high)
        low, high = min(options), max(options)
        best = max(best, high)
    return best
