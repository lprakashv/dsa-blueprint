import { code, quiz, step } from './lesson-content.js'

const lanes = (rows, caption) => ({ type: 'lanes', rows, caption })

const bits = [1, 0, 1, 1, 0, 0]
const balance = (values, marked, caption) => lanes([
  ['Input', bits], ['Balance', values, marked],
], caption)

export const prefixBalance = {
  id: 'prefix-sum-hash-map', title: 'Prefix Sum + Hash Map', problem: 'Find the Longest Balanced Binary Subarray',
  summary: 'Store the first position of each prefix balance to find the longest range with equal counts.',
  difficulty: 'Intermediate', minutes: 10, time: 'O(n) expected', space: 'O(n)',
  signal: 'Look for contiguous ranges with a target sum or equal counts when values can cancel each other.',
  invariant: 'first[balance] is the earliest boundary where that balance occurred.',
  pitfall: 'Seed balance 0 at boundary 0. For a longest range, keep the earliest boundary. For a count of ranges, store frequencies instead.',
  steps: [
    step('Encode', 'Give 0 and 1 opposite weights', 'Count a 1 as +1 and a 0 as −1. A range with equal counts makes no net change. Start at boundary 0 before the first element.',
      balance([0], [0], 'first = {0: 0}')),
    step('Record', 'Save the first boundary for each balance', 'Read 1 and reach balance 1 at boundary 1. Record this boundary. Later matches can subtract it to find a zero-sum range.',
      balance([0, 1], [1], 'first = {0: 0, 1: 1}')),
    step('Match', 'Subtract the earlier boundary', 'The next 0 brings the balance back to 0 at boundary 2. The range between boundaries 0 and 2 is balanced. Keep boundary 0 for future matches.',
      balance([0, 1, 0], [0, 2], 'Best length = 2 − 0 = 2')),
    step('Return', 'Keep the largest distance', 'The balance returns to 0 at boundary 6. The original boundary 0 gives the longest balanced range. For a target sum k, look up current prefix minus k.',
      balance([0, 1, 0, 1, 2, 1, 0], [0, 6], 'Best length = 6 − 0 = 6')),
  ],
  code: code(
    'def longest_balanced(bits):',
    '    first = {0: 0}',
    '    balance = best = 0',
    '    for boundary, bit in enumerate(bits, 1):',
    '        balance += 1 if bit == 1 else -1',
    '        earliest = first.setdefault(balance, boundary)',
    '        best = max(best, boundary - earliest)',
    '    return best',
  ),
  practice: quiz('Why keep the first boundary for a repeated balance?',
    ['It gives the longest range that ends at this boundary', 'It makes the prefix sum increase', 'It counts every matching range'], 0,
    'All boundaries with the same balance give a zero-sum range. The earliest one gives the greatest distance.',
    [['Contiguous Array', 'contiguous-array'], ['Subarray Sum Equals K', 'subarray-sum-equals-k'],
      ['Continuous Subarray Sum', 'continuous-subarray-sum']]),
}

const letters = ['dummy', 'A', 'B', 'C', 'D', 'null']
const gap = (fast, slow, caption) => lanes([
  ['Lead', letters, [fast]], ['Follow', letters, [slow]],
], caption)

export const linkedGap = {
  id: 'linked-list-gap', title: 'Fixed-Gap Linked List Pointers', problem: 'Remove the Nth Node From the End',
  summary: 'Keep two pointers a fixed number of links apart to locate a node from the end.',
  difficulty: 'Intermediate', minutes: 9, time: 'O(n)', space: 'O(1)',
  signal: 'Use a fixed pointer gap when you know a position relative to the tail. Use different speeds to find the middle or detect a cycle.',
  invariant: 'After setup, the lead pointer is N links ahead of the follow pointer.',
  pitfall: 'N = 1 removes the tail. N equal to the length removes the head. A dummy node gives the head a predecessor.',
  steps: [
    step('Start', 'Add a predecessor before the head', 'Remove the second node from the end of A → B → C → D. Put both pointers at a dummy node that points to A.',
      gap(0, 0, 'N = 2')),
    step('Set gap', 'Move the lead pointer two links', 'Move the lead pointer to B. Keep the follow pointer at the dummy node.',
      gap(2, 0, 'Lead = B · Follow = dummy')),
    step('Advance', 'Move both pointers to keep the gap', 'Stop when the lead pointer reaches D, the last node. The follow pointer is at B, immediately before C.',
      gap(4, 2, 'Lead = D · Follow = B')),
    step('Remove', 'Bypass the node after the follow pointer', 'Set B.next to D. Return dummy.next so the same code works when the head is removed.',
      lanes([['Result', ['A', 'B', 'D'], [1, 2]]], 'B now points to D')),
  ],
  code: code(
    'class ListNode:',
    '    def __init__(self, value=0, next_node=None):',
    '        self.value = value',
    '        self.next = next_node',
    '',
    'def remove_nth(head, n):',
    '    # Assume 1 <= n <= the length of the list.',
    '    dummy = ListNode(next_node=head)',
    '    fast = slow = dummy',
    '    for _ in range(n):',
    '        fast = fast.next',
    '    while fast.next:',
    '        fast, slow = fast.next, slow.next',
    '    slow.next = slow.next.next',
    '    return dummy.next',
  ),
  practice: quiz('Where does the follow pointer stop when N equals the list length?',
    ['At the last node', 'At the dummy node', 'At the head'], 1,
    'The lead pointer reaches the tail during setup. The follow pointer stays at the dummy and can unlink the head.',
    [['Remove Nth Node From End of List', 'remove-nth-node-from-end-of-list'],
      ['Middle of the Linked List', 'middle-of-the-linked-list'], ['Linked List Cycle II', 'linked-list-cycle-ii'],
      ['If the problem says to remove the head when N exceeds the length, handle that case during the lead scan.']]),
}

const diameterNodes = [['A', 50, 15], ['B', 29, 48], ['C', 72, 48], ['D', 14, 81], ['E', 42, 81]]
const diameterScene = (active, visited, caption, activeEdges = []) => ({
  type: 'graph', nodes: diameterNodes, edges: [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E']],
  active, visited, caption, activeEdges,
})

export const treePostorder = {
  id: 'tree-postorder', title: 'Postorder Tree Aggregation', problem: 'Find the Diameter of a Binary Tree',
  summary: 'Combine child results after both children are done. Return one branch to the parent and record the best path.',
  difficulty: 'Intermediate', minutes: 10, time: 'O(n)', space: 'O(h) for tree height h',
  signal: 'Use postorder when a node needs its children’s height, balance, or best downward score before it can finish.',
  invariant: 'Each completed subtree gives its height in nodes. The best diameter includes every node processed so far as a possible turning point.',
  pitfall: 'A path through a node can use both children. A branch extended by its parent can include only one of them.',
  steps: [
    step('Schedule', 'Visit children before their parent', 'Put a return visit for A on the stack. Process the children before that return visit. An empty subtree has height zero.',
      diameterScene('A', [], 'Postorder: D, E, B, C, A')),
    step('Leaves', 'Pass height 1 up from each leaf', 'D and E each have no children. Store height 1 for each. Their local paths have zero edges.',
      diameterScene('E', ['D', 'E'], 'Height(D) = Height(E) = 1')),
    step('Combine', 'Keep a local path and a return value', 'At B, the path D → B → E has 2 edges. Give A the height of one branch from B, which is 2 nodes.',
      diameterScene('B', ['D', 'E', 'B'], 'Local path = 2 edges · Height(B) = 2', [['B', 'D'], ['B', 'E']])),
    step('Return', 'Use the largest path seen anywhere', 'C gives height 1. At A, the path D → B → A → C has 3 edges. A different tree could have its best path entirely inside a child.',
      diameterScene('A', ['B', 'C', 'D', 'E'], 'Diameter = 3 edges', [['A', 'B'], ['A', 'C'], ['B', 'D']])),
  ],
  code: code(
    'def diameter(root):',
    '    # Each node has left and right child references.',
    '    if root is None:',
    '        return 0',
    '    stack, heights, best = [(root, False)], {}, 0',
    '    while stack:',
    '        node, children_done = stack.pop()',
    '        if children_done:',
    '            left = heights.pop(id(node.left), 0)',
    '            right = heights.pop(id(node.right), 0)',
    '            best = max(best, left + right)',
    '            heights[id(node)] = 1 + max(left, right)',
    '        else:',
    '            stack.append((node, True))',
    '            for child in (node.right, node.left):',
    '                if child is not None:',
    '                    stack.append((child, False))',
    '    return best',
  ),
  practice: quiz('The left and right subtree heights are 2 and 3 nodes. What does this node pass to its parent?',
    ['3 nodes', '4 nodes', '5 nodes'], 1,
    'A branch uses the taller child of height 3 and this node. The full path through both children has 5 edges.',
    [['Diameter of Binary Tree', 'diameter-of-binary-tree'], ['Balanced Binary Tree', 'balanced-binary-tree'],
      ['Binary Tree Tilt', 'binary-tree-tilt']]),
}

const nums = [2, -3, -2, 0, 4]
const products = (low, high, caption) => lanes([
  ['Input', nums, [high.length - 1]], ['Minimum', low], ['Maximum', high],
], caption)

export const extremesDP = {
  id: 'dp-min-max', title: 'Minimum and Maximum DP States', problem: 'Find the Maximum Product Subarray',
  summary: 'Track both product extremes because a negative multiplier reverses their order.',
  difficulty: 'Intermediate', minutes: 10, time: 'O(n)', space: 'O(1)',
  signal: 'Keep both extremes when a later operation can make the smallest value become the largest, as with multiplication by a negative number.',
  invariant: 'low and high are the minimum and maximum product of a nonempty subarray that ends at the current index.',
  pitfall: 'Compute both next states from the same previous pair. In grid variants, delay modulo until the final answer to preserve ordering.',
  steps: [
    step('Initialize', 'Start with the first element', 'The only nonempty range that ends at index 0 is [2]. Both extremes and the best product start at 2.',
      products([2], [2], 'Best = 2')),
    step('Choose', 'Compare a new range with an extension', 'At −3, start with −3 or extend 2 to get −6. Keep −6 as the minimum and −3 as the maximum ending here.',
      products([2, -6], [2, -3], 'Best = 2')),
    step('Flip', 'Use the old minimum to get a new maximum', 'Multiply −6 by −2 to get 12. Tracking only the old maximum of −3 would miss the best range.',
      products([2, -6, -2], [2, -3, 12], 'Best = 12')),
    step('Restart', 'Allow a range to start after a zero', 'Both products become 0 at zero. At 4, starting a new range gives 4. The best over all endpoints stays 12.',
      products([2, -6, -2, 0, 0], [2, -3, 12, 0, 4], 'Best = 12')),
  ],
  code: code(
    'def maximum_product(nums):',
    '    # Assume nums contains at least one value.',
    '    low = high = best = nums[0]',
    '    for index in range(1, len(nums)):',
    '        value = nums[index]',
    '        options = (value, value * low, value * high)',
    '        low, high = min(options), max(options)',
    '        best = max(best, high)',
    '    return best',
  ),
  practice: quiz('Why keep the minimum product that ends here?',
    ['It gives the product of the full array', 'A later negative value can turn it into the maximum', 'It allows you to skip zero'], 1,
    'Multiplication by a negative value reverses the order of its operands. Starting a new range remains a separate option.',
    [['Maximum Product Subarray', 'maximum-product-subarray'],
      ['Maximum Non Negative Product in a Matrix', 'maximum-non-negative-product-in-a-matrix']]),
}

const sums = [0, 1, 2, 3, 4, 5]
const subsetSums = (marked, caption) => lanes([['Sum', sums, marked]], caption)

export const knapsack = {
  id: 'knapsack-01', title: '0/1 Knapsack and Subset Sum', problem: 'Partition Values Into Two Equal Sums',
  summary: 'Track reachable totals and update them from right to left so each item can be used once.',
  difficulty: 'Intermediate', minutes: 11, time: 'O(n × target)', space: 'O(target)',
  signal: 'Use a table of totals when each item can be picked at most once and the target sum is small enough to index.',
  invariant: 'After an item is processed, reachable[s] says whether processed items can form sum s.',
  pitfall: 'Descending updates prevent reuse in 0/1 knapsack. With an item that can be reused, ascending updates let the same item contribute again.',
  steps: [
    step('Set target', 'Reduce equal partition to subset sum', 'The values [2, 3, 4, 1] sum to 10. Find one subset that sums to 5. The remaining values will also sum to 5. An odd total cannot be split equally.',
      subsetSums([0], 'Target = 5 · Initially reachable: 0')),
    step('Use 2', 'Read from the previous item state', 'With item 2, scan sums from 5 down to 2. When you check 4, sum 2 is still false. Only sum 2 becomes reachable.',
      subsetSums([0, 2], 'Reachable: 0, 2')),
    step('Use 3', 'Build on earlier items', 'With item 3, sum 5 reads the old state for sum 2. Sum 3 reads sum 0. Both become reachable.',
      subsetSums([0, 2, 3, 5], 'Reachable: 0, 2, 3, 5')),
    step('Return', 'Stop when the target is reachable', 'The subset [2, 3] reaches 5. The remaining values [4, 1] also reach 5. Later items cannot make a reachable sum unreachable.',
      lanes([['Subset', [2, 3], [0, 1]], ['Remainder', [4, 1], [0, 1]]], 'Both sums = 5')),
  ],
  code: code(
    'def can_partition(nums):',
    '    # Assume all values are positive integers.',
    '    total = sum(nums)',
    '    if total % 2:',
    '        return False',
    '    target = total // 2',
    '    reachable = [True] + [False] * target',
    '    for value in nums:',
    '        for goal in range(target, value - 1, -1):',
    '            reachable[goal] |= reachable[goal - value]',
    '        if reachable[target]:',
    '            return True',
    '    return reachable[target]',
  ),
  practice: quiz('What would go wrong if you scanned sums upward for item 2?',
    ['You could read past target', 'A new result for sum 2 could make sum 4 reachable using the same item', 'Sum 0 would become unreachable'], 1,
    'The value at sum 2 would already include the current item. Descending order reads states from before that item.',
    [['Partition Equal Subset Sum', 'partition-equal-subset-sum'], ['Target Sum', 'target-sum'],
      ['Coin Change', 'coin-change']]),
}

const rates = [1, 2, 3, 4, 5, 6, 7, 8]
const candidates = (marked, caption) => lanes([['Rate', rates, marked]], caption)

export const answerSearch = {
  id: 'binary-search-on-answer', title: 'Binary Search on the Answer', problem: 'Find the Minimum Eating Rate',
  summary: 'Find the smallest candidate that passes a check when every larger candidate also passes.',
  difficulty: 'Intermediate', minutes: 10, time: 'O(n log(U + 1)) for maximum pile U', space: 'O(1)',
  signal: 'Look for a minimum feasible rate, capacity, or limit. Define a quick yes/no test and prove that it changes in one direction.',
  invariant: 'The smallest feasible answer stays inside the current search range, and the upper bound is feasible.',
  pitfall: 'If mid passes, keep it as the new upper bound. It can be the first feasible value. Round up each pile separately.',
  steps: [
    step('Bound', 'Choose a feasible upper bound', 'Finish piles [3, 5, 8] in 6 hours. Each hour works on one pile. Rate 8 needs one hour per pile, so the minimum feasible rate is between 1 and 8.',
      candidates([0, 7], 'Search [1, 8]')),
    step('Pass', 'Test the middle rate', 'Rate 4 needs 1 + 2 + 2 = 5 hours. It passes. Every faster rate also passes, so keep 4 and discard candidates above it.',
      candidates([3], 'Rate 4 passes · Search [1, 4]')),
    step('Fail', 'Discard an infeasible lower half', 'Rate 2 needs 2 + 3 + 4 = 9 hours. It fails. Any smaller rate needs at least as much time.',
      candidates([1], 'Rate 2 fails · Search [3, 4]')),
    step('Return', 'Stop when one candidate remains', 'Rate 3 needs 1 + 2 + 3 = 6 hours. It passes. Both bounds are now 3, the smallest rate that meets the deadline.',
      candidates([2], 'Minimum feasible rate = 3')),
  ],
  code: code(
    'def minimum_rate(piles, hours):',
    '    # Assume piles is nonempty, piles are positive, and hours >= len(piles).',
    '    lo, hi = 1, max(piles)',
    '    while lo < hi:',
    '        rate = (lo + hi) // 2',
    '        required = sum((pile + rate - 1) // rate for pile in piles)',
    '        if required <= hours:',
    '            hi = rate',
    '        else:',
    '            lo = rate + 1',
    '    return lo',
  ),
  practice: quiz('If rate 4 passes, why keep it in the search range?',
    ['It could be the smallest passing rate', 'It proves 3 also passes', 'The upper bound must fail'], 0,
    'The test proves 4 is feasible. A smaller feasible candidate may exist, so retain 4 as the upper bound.',
    [['Koko Eating Bananas', 'koko-eating-bananas'], ['Capacity To Ship Packages Within D Days', 'capacity-to-ship-packages-within-d-days'],
      ['Minimum Number of Days to Make m Bouquets', 'minimum-number-of-days-to-make-m-bouquets']]),
}

const dense = (values, positions, caption, marked = []) => lanes([
  ['Values', values, marked], ['Indices by value', positions],
], caption)

export const arrayIndex = {
  id: 'array-index-map', title: 'Dense Array + Index Map', problem: 'Insert, Remove, and Sample a Value',
  summary: 'Use an array for uniform sampling and a map for direct access. Move the last element to fill a deletion gap.',
  difficulty: 'Intermediate', minutes: 10, time: 'O(1) average per operation', space: 'O(n)',
  signal: 'Use a dense array and index map for constant-time membership and deletion when order can change.',
  invariant: 'Each stored value occurs once. Its map entry points to its current array index.',
  pitfall: 'Update the index of the moved value before removing the deleted value’s map entry. The deleted value can already be last.',
  steps: [
    step('Store', 'Keep both views of the values', 'The array has [7, 4, 9]. The map associates each value with its index.',
      dense([7, 4, 9], ['7→0', '4→1', '9→2'], 'Three occupied indices')),
    step('Locate', 'Find the gap with the map', 'Remove 4. Its index is 1. Shifting every later element would take time proportional to the array length.',
      dense([7, 4, 9], ['7→0', '4→1', '9→2'], 'Remove index 1', [1])),
    step('Fill', 'Move the last element into the gap', 'Put 9 at index 1 and update the map entry for 9. Pop the last slot and delete the entry for 4.',
      dense([7, 9], ['7→0', '9→1'], 'Index 1 now stores 9', [1])),
    step('Sample', 'Pick an occupied index uniformly', 'Choose either array index with probability 1/2. Every stored value has one index, so both values have the same probability.',
      dense([7, 9], ['7→0', '9→1'], 'Each value has probability 1/2', [0, 1])),
  ],
  code: code(
    'from random import choice',
    '',
    'class RandomizedSet:',
    '    def __init__(self):',
    '        self.values = []',
    '        self.positions = {}',
    '',
    '    def insert(self, value):',
    '        if value in self.positions:',
    '            return False',
    '        self.positions[value] = len(self.values)',
    '        self.values.append(value)',
    '        return True',
    '',
    '    def remove(self, value):',
    '        if value not in self.positions:',
    '            return False',
    '        index = self.positions[value]',
    '        last = self.values[-1]',
    '        self.values[index] = last',
    '        self.positions[last] = index',
    '        self.values.pop()',
    '        del self.positions[value]',
    '        return True',
    '',
    '    def get_random(self):',
    '        # Assume the set is nonempty.',
    '        return choice(self.values)',
  ),
  practice: quiz('When the last value fills a gap, which map entry changes index?',
    ['Every entry after the gap', 'Only the entry for the value moved into the gap', 'The map needs no change'], 1,
    'No other value moves. If the removed value was already last, the update is harmless because its entry is deleted next.',
    [['Insert Delete GetRandom O(1)', 'insert-delete-getrandom-o1'],
      ['Random Pick Index', 'random-pick-index']]),
}
