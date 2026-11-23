from collections import Counter

def minimum_window(source, target):
    if not target:
        return ""
    need = Counter(target)
    missing = len(target)
    left, best_start, best_length = 0, 0, len(source) + 1
    for right, char in enumerate(source):
        if char in need:
            if need[char] > 0:
                missing -= 1
            need[char] -= 1
        while missing == 0:
            length = right - left + 1
            if length < best_length:
                best_start, best_length = left, length
            outgoing = source[left]
            if outgoing in need:
                need[outgoing] += 1
                if need[outgoing] > 0:
                    missing += 1
            left += 1
    if best_length > len(source):
        return ""
    return source[best_start:best_start + best_length]
