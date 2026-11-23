def climb_stairs(n):
    if n < 0:
        raise ValueError("Step count must be nonnegative")
    previous, current = 1, 1
    for _ in range(2, n + 1):
        previous, current = current, previous + current
    return current
