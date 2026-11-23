def build_prefix(nums):
    prefix = [0]
    for value in nums:
        prefix.append(prefix[-1] + value)
    return prefix

def range_sum(prefix, left, right):
    return prefix[right + 1] - prefix[left]
