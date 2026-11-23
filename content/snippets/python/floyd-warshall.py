def floyd_warshall(n, edges):
    distance = [[float("inf")] * n for _ in range(n)]
    for node in range(n):
        distance[node][node] = 0
    for a, b, weight in edges:
        distance[a][b] = min(distance[a][b], weight)
    for pivot in range(n):
        for start in range(n):
            for end in range(n):
                through = distance[start][pivot] + distance[pivot][end]
                distance[start][end] = min(distance[start][end], through)
    if any(distance[node][node] < 0 for node in range(n)):
        raise ValueError("Negative cycle")
    return distance
