from bisect import bisect_left, insort

class BTreeNode:
    def __init__(self):
        self.keys = []
        self.children = []

    def contains(self, key):
        i = bisect_left(self.keys, key)
        if i < len(self.keys) and self.keys[i] == key:
            return True
        return bool(self.children) and self.children[i].contains(key)

    def split_child(self, i):
        child = self.children[i]
        right = BTreeNode()
        self.keys.insert(i, child.keys[1])
        right.keys, child.keys = child.keys[2:], child.keys[:1]
        right.children, child.children = child.children[2:], child.children[:2]
        self.children.insert(i + 1, right)

    def insert_nonfull(self, key):
        if not self.children:
            insort(self.keys, key)
            return
        i = bisect_left(self.keys, key)
        if len(self.children[i].keys) == 3:
            self.split_child(i)
            if key > self.keys[i]:
                i += 1
        self.children[i].insert_nonfull(key)

    def insert(self, key):
        if self.contains(key):
            return self
        root = self
        if len(self.keys) == 3:
            root = BTreeNode()
            root.children.append(self)
            root.split_child(0)
        root.insert_nonfull(key)
        return root
