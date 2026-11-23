def longest_balanced(bits):
    first = {0: 0}
    balance = best = 0
    for boundary, bit in enumerate(bits, 1):
        balance += 1 if bit == 1 else -1
        earliest = first.setdefault(balance, boundary)
        best = max(best, boundary - earliest)
    return best
