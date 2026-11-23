from bisect import bisect_left, bisect_right

class BPlusPage:
    def __init__(self, keys, children=()):
        self.keys = list(keys)
        self.children = list(children)
        self.next_leaf = None

def split_plus_leaf(leaf):
    mid = len(leaf.keys) // 2
    right = BPlusPage(leaf.keys[mid:])
    leaf.keys = leaf.keys[:mid]
    right.next_leaf, leaf.next_leaf = leaf.next_leaf, right
    return right.keys[0], right

def scan_keys(root, low, high):
    page = root
    while page.children:
        page = page.children[bisect_right(page.keys, low)]
    i = bisect_left(page.keys, low)
    while page is not None:
        while i < len(page.keys):
            key = page.keys[i]
            if key > high:
                return
            yield key
            i += 1
        page, i = page.next_leaf, 0
