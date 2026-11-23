def largest_rectangle(heights):
    stack, best = [], 0
    for right in range(len(heights) + 1):
        height = heights[right] if right < len(heights) else 0
        while stack and heights[stack[-1]] > height:
            peak = stack.pop()
            left = stack[-1] if stack else -1
            best = max(best, heights[peak] * (right - left - 1))
        if right < len(heights):
            stack.append(right)
    return best
