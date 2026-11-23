from collections import deque
from string import ascii_lowercase

def ladder_length(start, end, words):
    unseen = set(words)
    if end not in unseen:
        return 0
    unseen.discard(start)
    queue = deque([(start, 1)])
    while queue:
        word, length = queue.popleft()
        if word == end:
            return length
        for i in range(len(word)):
            prefix, suffix = word[:i], word[i + 1:]
            for char in ascii_lowercase:
                candidate = prefix + char + suffix
                if candidate in unseen:
                    unseen.remove(candidate)
                    queue.append((candidate, length + 1))
    return 0
