from heapq import heappush, heapreplace

def top_k(nums, k):
    if k <= 0:
        return []
    heap = []
    for value in nums:
        if len(heap) < k:
            heappush(heap, value)
        elif value > heap[0]:
            heapreplace(heap, value)
    return heap
