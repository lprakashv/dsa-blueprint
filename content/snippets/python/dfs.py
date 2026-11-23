def reachable(graph, start):
    seen = set()

    def visit(node):
        if node in seen:
            return
        seen.add(node)
        for neighbor in graph.get(node, ()):
            visit(neighbor)

    visit(start)
    return seen
