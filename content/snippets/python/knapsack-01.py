def can_partition(nums):
    # Assume all values are positive integers.
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    reachable = [True] + [False] * target
    for value in nums:
        for goal in range(target, value - 1, -1):
            reachable[goal] |= reachable[goal - value]
        if reachable[target]:
            return True
    return reachable[target]
