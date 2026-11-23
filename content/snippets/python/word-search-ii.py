def find_words(board, words):
    if not board or not board[0]:
        return []
    trie = {}
    for word in words:
        node = trie
        for char in word:
            node = node.setdefault(char, {})
        node[None] = word

    rows, cols = len(board), len(board[0])
    found = []

    def visit(r, c, parent):
        char = board[r][c]
        if char not in parent:
            return
        node = parent[char]
        word = node.pop(None, None)
        if word is not None:
            found.append(word)
        board[r][c] = "#"
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                visit(nr, nc, node)
        board[r][c] = char
        if not node:
            del parent[char]

    for r in range(rows):
        for c in range(cols):
            visit(r, c, trie)
    return found
