def burst_balloons(balloons):
    values = [1, *balloons, 1]
    size = len(values)
    best = [[0] * size for _ in values]
    for width in range(2, size):
        for left in range(size - width):
            right = left + width
            for last in range(left + 1, right):
                gain = values[left] * values[last] * values[right]
                score = best[left][last] + best[last][right] + gain
                best[left][right] = max(best[left][right], score)
    return best[0][-1]
