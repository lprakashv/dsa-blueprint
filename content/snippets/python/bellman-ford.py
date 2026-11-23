def bellman_ford(n, edges, start):
    distance = [float("inf")] * n
    distance[start] = 0
    for _ in range(n - 1):
        changed = False
        for source, target, weight in edges:
            candidate = distance[source] + weight
            if candidate < distance[target]:
                distance[target] = candidate
                changed = True
        if not changed:
            return distance
    if any(distance[a] + w < distance[b] for a, b, w in edges):
        raise ValueError("Reachable negative cycle")
    return distance
