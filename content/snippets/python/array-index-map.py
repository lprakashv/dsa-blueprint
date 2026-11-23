from random import choice

class RandomizedSet:
    def __init__(self):
        self.values = []
        self.positions = {}

    def insert(self, value):
        if value in self.positions:
            return False
        self.positions[value] = len(self.values)
        self.values.append(value)
        return True

    def remove(self, value):
        if value not in self.positions:
            return False
        index = self.positions[value]
        last = self.values[-1]
        self.values[index] = last
        self.positions[last] = index
        self.values.pop()
        del self.positions[value]
        return True

    def get_random(self):
        # Assume the set is nonempty.
        return choice(self.values)
