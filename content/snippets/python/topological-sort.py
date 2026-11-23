from collections import deque

def task_order(graph):
    degree = dict.fromkeys(graph, 0)
    for neighbors in graph.values():
        for node in neighbors:
            degree[node] = degree.get(node, 0) + 1
    ready = deque(node for node in degree if degree[node] == 0)
    order = []
    while ready:
        node = ready.popleft()
        order.append(node)
        for neighbor in graph.get(node, ()):
            degree[neighbor] -= 1
            if degree[neighbor] == 0:
                ready.append(neighbor)
    return order if len(order) == len(degree) else None
