def minimum_rate(piles, hours):
    # Assume piles is nonempty, piles are positive, and hours >= len(piles).
    lo, hi = 1, max(piles)
    while lo < hi:
        rate = (lo + hi) // 2
        required = sum((pile + rate - 1) // rate for pile in piles)
        if required <= hours:
            hi = rate
        else:
            lo = rate + 1
    return lo
