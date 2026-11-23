def compatible_meetings(intervals):
    chosen = []
    for start, end in sorted(intervals, key=lambda item: item[1]):
        if not chosen or start >= chosen[-1][1]:
            chosen.append((start, end))
    return chosen
