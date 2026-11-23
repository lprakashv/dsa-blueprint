def subsets(nums):
    paths, path = [], []

    def visit(start):
        paths.append(path.copy())
        for index in range(start, len(nums)):
            path.append(nums[index])
            visit(index + 1)
            path.pop()

    visit(0)
    return paths
