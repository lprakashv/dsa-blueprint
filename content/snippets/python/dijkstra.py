from heapq import heappop, heappush
from itertools import count

def dijkstra(graph, start):
    distance, previous = {start: 0}, {}
    order = count()
    queue = [(0, next(order), start)]
    while queue:
        cost, _, node = heappop(queue)
        if cost != distance[node]:
            continue
        for neighbor, weight in graph.get(node, ()):
            candidate = cost + weight
            if candidate < distance.get(neighbor, float("inf")):
                distance[neighbor] = candidate
                previous[neighbor] = node
                heappush(queue, (candidate, next(order), neighbor))
    return distance, previous
