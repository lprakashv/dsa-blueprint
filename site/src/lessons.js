import { binarySearch, slidingWindow, twoPointers } from './trace.js'
import { step, code, quiz, row } from './lesson-content.js'
import { indexTrees } from './index-tree-lessons.js'
import { connectivity } from './graph-lessons.js'
import { matrices } from './grid-lessons.js'
import { minimumWindow, largestRectangle, wordLadder, obstaclePath, burstBalloons } from './challenge-lessons.js'
import { prefixBalance, linkedGap, treePostorder, extremesDP, knapsack, answerSearch, arrayIndex } from './interview-pattern-lessons.js'
import { miscLessons } from './misc-lessons.js'
const lanes = (rows, caption) => ({ type: 'lanes', rows, caption })
const intervals = (groups, end, caption) => ({ type: 'intervals', groups, end, caption })

const pairs = [1, 2, 4, 6, 8, 12]
const twoPointerFrames = twoPointers(pairs, 10).steps
twoPointerFrames[2].label = 'Move right'
twoPointerFrames[3].label = 'Move left'
twoPointerFrames[3].title = 'Move Left and check again'
twoPointerFrames[3].body = 'Move Left from index 0 to index 1. Now 2 + 8 = 10. The new pair has the target sum.'
twoPointerFrames.push(step('Return pair', 'Return the two indices',
  'Return indices [1, 4]. Each comparison removes one candidate until you find a pair or the pointers meet.',
  row(pairs, { 1: 'L', 4: 'R' }, { range: [1, 4], matched: [1, 4], equation: 'Answer = [1, 4]' }),
  [['Target sum', 10], ['Comparisons', 3], ['Result', '[1, 4]']]))

const arrays = [
  {
    id: 'two-pointers', title: 'Two Pointers', problem: 'Two Sum on a Sorted Array',
    summary: 'Scan a sorted array from both ends to find a pair that adds up to a target.',
    difficulty: 'Beginner', minutes: 6, time: 'O(n)', space: 'O(1)',
    signal: 'Look for a sorted array and a pair of values. The order tells you which end to move.',
    invariant: 'If a solution remains, both indices are between Left and Right.',
    pitfall: 'Stop when the pointers meet. One element cannot form a pair with itself.',
    steps: twoPointerFrames,
    code: code('def pair_sum(nums, target):', '    left, right = 0, len(nums) - 1', '    while left < right:',
      '        total = nums[left] + nums[right]', '        if total == target:', '            return left, right',
      '        if total < target:', '            left += 1', '        else:', '            right -= 1', '    return None'),
    practice: quiz('The sum is larger than the target. Which pointer moves?', ['Left moves right', 'Right moves left', 'Both move inward'], 1,
      'Right points to the largest remaining value. Moving it left can lower the sum.',
      [['Two Sum II', 'two-sum-ii-input-array-is-sorted'], ['Container With Most Water', 'container-with-most-water'],
        ['Valid Palindrome II', 'valid-palindrome-ii'],
        ['For one allowed deletion, test both remaining ranges at the first mismatch.']]),
  },
  {
    id: 'sliding-window', title: 'Sliding Window', problem: 'Maximum Sum of K Adjacent Values',
    summary: 'Update a running sum as a fixed-size window moves across an array.',
    difficulty: 'Beginner', minutes: 7, time: 'O(n)', space: 'O(1)',
    signal: 'A fixed window keeps the same length. A variable window moves its left edge when doing so can restore or improve a valid range.',
    invariant: 'The running sum equals the sum of exactly k elements in the current window.',
    pitfall: 'Initialize the maximum from the first window. A zero default fails when all values are negative.',
    steps: slidingWindow([2, 1, 5, 1, 3, 2], 3).steps,
    code: code('def max_window(nums, k):', '    if not 1 <= k <= len(nums):', '        raise ValueError("Invalid window size")',
      '    total = sum(nums[i] for i in range(k))', '    best = total', '    for right in range(k, len(nums)):',
      '        total += nums[right] - nums[right - k]', '        best = max(best, total)', '    return best'),
    practice: quiz('A fixed window moves one index to the right. How do you update its sum?',
      ['Subtract the outgoing value and add the incoming value', 'Add both boundary values', 'Recompute every value in the window'], 0,
      'The overlapping elements stay in the window. Only its first and last positions change membership.',
      [['Maximum Average Subarray I', 'maximum-average-subarray-i'], ['Max Consecutive Ones III', 'max-consecutive-ones-iii'],
        ['Longest Substring Without Repeating Characters', 'longest-substring-without-repeating-characters']]),
  },
  {
    id: 'prefix-sum', title: 'Prefix Sum', problem: 'Sum an Inclusive Range',
    summary: 'Prepare cumulative totals once, then answer each range query in constant time.',
    difficulty: 'Beginner', minutes: 6, time: 'O(n) build · O(1) query', space: 'O(n)',
    signal: 'Look for repeated range sums over an array with fixed values.',
    invariant: 'prefix[i] is the sum of the first i input elements.',
    pitfall: 'An inclusive right endpoint r needs prefix[r + 1].',
    steps: [
      step('Seed', 'Start with an empty prefix', 'The sum of zero values is 0. Put this value at index 0.',
        lanes([['Input', [2, 4, 1, 3]], ['Prefix', [0]]], 'prefix[0] = 0')),
      step('Accumulate', 'Add one input value at a time', 'To add the second value, start with 2 and add 4. Store 6 at prefix[2].',
        lanes([['Input', [2, 4, 1, 3], [1]], ['Prefix', [0, 2, 6], [2]]], 'prefix[2] = 2 + 4')),
      step('Query', 'Find both boundaries', 'To sum indices 1 through 3, take the totals at prefix[1] and prefix[4].',
        lanes([['Input', [2, 4, 1, 3], [1, 2, 3]], ['Prefix', [0, 2, 6, 7, 10], [1, 4]]], 'Sum indices [1, 3]')),
      step('Subtract', 'Remove the part before the range', 'The total through index 3 is 10. Subtract 2, the total before index 1. The answer is 8.',
        lanes([['Prefix', [0, 2, 6, 7, 10], [1, 4]], ['Result', [8], [0]]], 'prefix[4] − prefix[1] = 8')),
    ],
    code: code('def build_prefix(nums):', '    prefix = [0]', '    for value in nums:', '        prefix.append(prefix[-1] + value)',
      '    return prefix', '', 'def range_sum(prefix, left, right):', '    return prefix[right + 1] - prefix[left]'),
    practice: quiz('Which formula sums the inclusive range [0, 2]?', ['prefix[2] − prefix[0]', 'prefix[3] − prefix[1]', 'prefix[3] − prefix[0]'], 2,
      'prefix[3] includes the first three items, and prefix[0] subtracts zero.',
      [['Range Sum Query', 'range-sum-query-immutable'], ['Find Pivot Index', 'find-pivot-index']]),
  },
  {
    id: 'hash-map', title: 'Hash Map Lookup', problem: 'Two Sum on an Unsorted Array',
    summary: 'Store elements you already saw and check for the complement in one pass.',
    difficulty: 'Beginner', minutes: 6, time: 'O(n) average', space: 'O(n)',
    signal: 'Look for frequent membership tests, value-to-index lookups, or counts.',
    invariant: 'Before you check index i, the map contains values from earlier indices.',
    pitfall: 'Look up the complement before insertion so one index cannot match itself.',
    steps: [
      step('Start', 'Start with an empty map', 'Given target 9, scan the unsorted array once. For each value x, look up 9 − x.',
        lanes([['Input', [4, 1, 5, 8], [0]], ['Seen', []]], 'Target = 9')),
      step('Store', 'Record the first index', 'The complement of 4 is 5. The map is empty, so store 4 at index 0.',
        lanes([['Input', [4, 1, 5, 8], [0]], ['Seen', ['4 → 0'], [0]]], 'Need 5 · missing')),
      step('Advance', 'Check the next complement', 'The complement of 1 is 8. It is missing, so store 1 at index 1.',
        lanes([['Input', [4, 1, 5, 8], [1]], ['Seen', ['4 → 0', '1 → 1'], [1]]], 'Need 8 · missing')),
      step('Match', 'Find the earlier index', 'For value 5, the complement is 4. The map gives index 0. Return indices [0, 2].',
        lanes([['Input', [4, 1, 5, 8], [0, 2]], ['Seen', ['4 → 0', '1 → 1'], [0]]], 'Need 4 · found at index 0')),
    ],
    code: code('def two_sum(nums, target):', '    seen = {}', '    for index, value in enumerate(nums):',
      '        need = target - value', '        if need in seen:', '            return seen[need], index', '        seen[value] = index', '    return None'),
    practice: quiz('What should the map store if the answer needs indices?', ['Value → index', 'Index → value', 'Target → list length'], 0,
      'The complement is a value. Use it as the key to retrieve an earlier index directly.',
      [['Two Sum', 'two-sum'], ['Group Anagrams', 'group-anagrams']]),
  },
]

const ranges = [[1, 3], [2, 6], [8, 10], [9, 12]]
const ordered = [
  {
    id: 'binary-search', title: 'Binary Search', problem: 'Find a Target in a Sorted Array',
    summary: 'Cut the search range in half after each comparison.',
    difficulty: 'Beginner', minutes: 7, time: 'O(log n)', space: 'O(1)',
    signal: 'Look for sorted values or a predicate that switches once from false to true.',
    invariant: 'If the target exists and you have not found it, it is in the inclusive range [lo, hi].',
    pitfall: 'Remove mid after a mismatch. Setting lo = mid can stall when two candidates remain.',
    steps: [
      step('Set bounds', 'Start with the whole range', 'Search for 11 in this sorted array. Set Low to 0 and High to 6.',
        row([1, 3, 5, 7, 9, 11, 13], { 0: 'LO', 6: 'HI' }, { range: [0, 6] }),
        [['Target', 11], ['Low index', 0], ['High index', 6]]),
      ...binarySearch([1, 3, 5, 7, 9, 11, 13], 11).steps,
      step('Check miss', 'Know when to stop', 'For an absent target, keep narrowing the range until Low is greater than High. Return −1.',
        row([1, 3, 5, 7, 9, 11, 13], {}, { range: [7, 6], equation: 'Empty range → −1' })),
    ],
    code: code('def binary_search(nums, target):', '    lo, hi = 0, len(nums) - 1', '    while lo <= hi:',
      '        mid = lo + (hi - lo) // 2', '        if nums[mid] == target:', '            return mid',
      '        if nums[mid] < target:', '            lo = mid + 1', '        else:', '            hi = mid - 1', '    return -1'),
    practice: quiz('nums[mid] is smaller than the target. What changes?', ['hi = mid − 1', 'lo = mid + 1', 'lo = mid'], 1,
      'Everything at or below mid is too small. The next candidate starts at mid + 1.',
      [['Binary Search', 'binary-search'], ['Search in Rotated Sorted Array', 'search-in-rotated-sorted-array']]),
  },
  {
    id: 'intervals', title: 'Merge Intervals', problem: 'Combine Overlapping Ranges',
    summary: 'Sort ranges by start and keep one merged range open at a time.',
    difficulty: 'Intermediate', minutes: 7, time: 'O(n log n)', space: 'O(n)',
    signal: 'Look for overlapping time ranges, bookings, or segments.',
    invariant: 'The output is sorted and disjoint. Only its last interval can overlap the next input.',
    pitfall: 'Use the larger end when you merge. A contained interval must not shorten the current range.',
    steps: [
      step('Sort', 'Sort by start time', 'After sorting, the next start is always at or after the last start you processed.',
        intervals([['Sorted', ranges], ['Output', []]], 12, 'Closed intervals')),
      step('Extend', 'Combine the first overlap', '2 ≤ 3. Merge [1, 3] and [2, 6] into [1, 6].',
        intervals([['Sorted', ranges, [0, 1]], ['Output', [[1, 6]], [0]]], 12, 'Overlap · extend to 6')),
      step('Split', 'Open a new range at the gap', '8 > 6. Add [8, 10] as a new interval.',
        intervals([['Sorted', ranges, [2]], ['Output', [[1, 6], [8, 10]], [1]]], 12, 'Gap · start at 8')),
      step('Finish', 'Extend the last range', '9 ≤ 10. Extend the second output range to 12. Return the two merged ranges.',
        intervals([['Output', [[1, 6], [8, 12]], [0, 1]]], 12, 'Result · two disjoint ranges')),
    ],
    code: code('def merge_intervals(intervals):', '    merged = []', '    for start, end in sorted(intervals):',
      '        if not merged or start > merged[-1][1]:', '            merged.append([start, end])',
      '        else:', '            merged[-1][1] = max(merged[-1][1], end)', '    return merged'),
    practice: quiz('What is the merge of [1, 9] and [2, 4]?', ['[1, 4]', '[2, 9]', '[1, 9]'], 2,
      'The second interval is contained in the first. The larger end remains 9.',
      [['Merge Intervals', 'merge-intervals'], ['Insert Interval', 'insert-interval']]),
  },
]

const stack = (input, values, focus) => ({ type: 'stack', input, values, focus })
const linked = (links, active, caption) => ({ type: 'linked', values: ['A', 'B', 'C'], links, active, caption })

const heap = (values, caption) => {
  const [root, first, second] = values
  return {
    type: 'graph', nodes: [[root, 50, 25], [first, 30, 71], [second, 70, 71]],
    edges: [[root, first], [root, second]], active: root, visited: [], caption, kind: 'heap',
  }
}

const structures = [
  {
    id: 'stack', title: 'Stacks', problem: 'Validate Paired Brackets',
    summary: 'Use a stack to close the most recent opening bracket first.',
    difficulty: 'Beginner', minutes: 6, time: 'O(n)', space: 'O(n)',
    signal: 'Look for nested brackets, undo operations, or a need to resolve the most recent item.',
    invariant: 'The stack holds unmatched opening brackets in the order you read them.',
    pitfall: 'Check for an empty stack before a pop. At the end, the stack must also be empty.',
    steps: [
      step('Read', 'Start with an empty stack', 'Read { [ ] } from left to right. Each closing bracket must match the top of the stack.',
        stack(['{', '[', ']', '}'], [], 0)),
      step('Push', 'Store each opening bracket', 'Push { and then [. The [ is now the top.',
        stack(['{', '[', ']', '}'], ['{', '['], 1)),
      step('Pop', 'Close the latest opening bracket', 'The ] matches [. Pop [. The { stays on the stack.',
        stack(['{', '[', ']', '}'], ['{'], 2)),
      step('Finish', 'Confirm the stack is empty', 'The } matches {. Pop {. There are no unmatched brackets.',
        stack(['{', '[', ']', '}'], [], 3)),
    ],
    code: code('def valid_brackets(text):', '    opening = {"}": "{", "]": "[", ")": "("}', '    stack = []',
      '    for char in text:', '        if char in "{[(":', '            stack.append(char)',
      '        elif char not in opening or not stack or stack.pop() != opening[char]:',
      '            return False', '    return not stack'),
    practice: quiz('Why does ([)] fail?', ['The string has an odd length', 'The ) does not match the top bracket', 'The string starts with ('], 1,
      'When ) arrives, the last unmatched opening bracket is [. The closing order is invalid.',
      [['Valid Parentheses', 'valid-parentheses'], ['Min Stack', 'min-stack'], ['Decode String', 'decode-string']]),
  },
  {
    id: 'linked-list', title: 'Linked List Reversal', problem: 'Reverse a Singly Linked List',
    summary: 'Reverse each link in place while keeping a reference to the rest of the list.',
    difficulty: 'Intermediate', minutes: 7, time: 'O(n)', space: 'O(1)',
    signal: 'Look for a linked-list problem that asks you to change the order in place.',
    invariant: 'prev heads the reversed prefix. cur heads the untouched suffix.',
    pitfall: 'Save cur.next before overwriting it. Otherwise the untouched suffix can become unreachable.',
    steps: [
      step('Start', 'Set the starting references', 'Set prev to null and cur to A. The original list is A → B → C.',
        linked([1, 2, -1], 0, 'prev = null · cur = A')),
      step('Flip A', 'Save B, then reverse A’s link', 'Save B before you set A.next to null. Put prev at A and cur at B.',
        linked([-1, 2, -1], 1, 'prev = A · cur = B')),
      step('Flip B', 'Save C, then link B to A', 'Set B.next to A. Move prev to B and cur to C.',
        linked([-1, 0, -1], 2, 'prev = B · cur = C')),
      step('Return', 'Link C to B and return C', 'Now cur is null. Return prev, the head of the reversed list C → B → A.',
        linked([-1, 0, 1], -1, 'prev = C · cur = null')),
    ],
    code: code('def reverse_list(head):', '    prev, cur = None, head', '    while cur:',
      '        next_node = cur.next', '        cur.next = prev', '        prev, cur = cur, next_node', '    return prev'),
    practice: quiz('Which reference must you save before you change cur.next?', ['The original head', 'The original cur.next', 'The new head'], 1,
      'The original next node is the entry point for the untouched suffix.',
      [['Reverse Linked List', 'reverse-linked-list'], ['Reverse Linked List II', 'reverse-linked-list-ii'],
        ['Reorder List', 'reorder-list']]),
  },
  {
    id: 'heap', title: 'Heap / Top K', problem: 'Find the K Largest Values',
    summary: 'Keep the K largest candidates in a min-heap and remove the smallest as needed.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(n log k) for k ≥ 2', space: 'O(k)',
    signal: 'Look for top K, repeated access to an extreme, or a stream of values.',
    invariant: 'After k inputs, the heap holds the k largest values seen so far.',
    pitfall: 'Use a min-heap for the k largest values. The smallest retained value is the one to replace.',
    steps: [
      step('Seed', 'Add the first three values', 'Find the three largest values in [4, 1, 7, 3, 9]. Add 4, 1, and 7 to the heap. Its root is 1.',
        heap(['1', '4', '7'], 'Minimum retained = 1')),
      step('Replace 1', 'Compare 3 with the root', '3 > 1. Remove 1 and insert 3. The new root is 3.',
        heap(['3', '4', '7'], 'Keep 3 · drop 1')),
      step('Replace 3', 'Compare 9 with the root', '9 > 3. Replace 3 with 9 and restore heap order. The new root is 4.',
        heap(['4', '9', '7'], 'Keep 9 · drop 3')),
      step('Return', 'Return the retained values', 'The heap contains 4, 7, and 9. Sort these three values only if the result requires sorted order.',
        heap(['4', '9', '7'], 'Top three · {4, 7, 9}')),
    ],
    code: code('from heapq import heappush, heapreplace', '', 'def top_k(nums, k):',
      '    if k <= 0:', '        return []', '    heap = []', '    for value in nums:',
      '        if len(heap) < k:', '            heappush(heap, value)', '        elif value > heap[0]:',
      '            heapreplace(heap, value)', '    return heap'),
    practice: quiz('What does the root represent in a min-heap of the top K values?',
      ['The largest value seen', 'The smallest value retained', 'The next value to read'], 1,
      'The root is the threshold. A larger incoming value can replace it.',
      [['Kth Largest Element in an Array', 'kth-largest-element-in-an-array'], ['Top K Frequent Elements', 'top-k-frequent-elements']]),
  },
]

const branchNodes = [['A', 50, 15], ['B', 29, 47], ['C', 71, 47], ['D', 15, 80], ['E', 42, 80], ['F', 80, 80]]
const branchEdges = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F']]
const tree = (active, visited, caption) => ({ type: 'graph', nodes: branchNodes, edges: branchEdges, active, visited, caption })

const graphs = [
  {
    id: 'bfs', title: 'Breadth-First Search', problem: 'Find the Fewest Edges to a Node',
    summary: 'Explore an unweighted graph one distance from the start at a time.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(V + E)', space: 'O(V)',
    signal: 'Look for minimum moves with equal cost or level-order traversal.',
    invariant: 'The queue processes nodes in order of nondecreasing distance from the start.',
    pitfall: 'Mark a node when you enqueue it. This stops two neighbors from adding the same node twice.',
    steps: [
      step('Enqueue A', 'Start at distance zero', 'Put A in a first-in, first-out queue. Mark it discovered.',
        tree('A', [], 'Queue: [A] · Distance 0')),
      step('Expand A', 'Find the first layer', 'Remove A. Add its neighbors B and C with distance 1.',
        tree('B', ['A'], 'Queue: [B, C] · Distance 1')),
      step('Expand B', 'Add nodes at distance two', 'Remove B. Add D and E to the back. C will still run before D and E.',
        tree('C', ['A', 'B'], 'Queue: [C, D, E]')),
      step('Reach F', 'Finish at the target', 'Remove C and discover F at distance 2. The shortest path is A → C → F.',
        tree('F', ['A', 'B', 'C'], 'Path: A → C → F · Distance 2')),
    ],
    code: code('from collections import deque', '', 'def shortest_distance(graph, start, target):',
      '    queue = deque([(start, 0)])', '    seen = {start}', '    while queue:',
      '        node, distance = queue.popleft()', '        if node == target:', '            return distance',
      '        for neighbor in graph.get(node, ()):', '            if neighbor not in seen:',
      '                seen.add(neighbor)', '                queue.append((neighbor, distance + 1))', '    return -1'),
    practice: quiz('When can BFS guarantee a shortest path measured in total cost?',
      ['When all edges have the same positive cost', 'When edge costs are all different', 'Whenever the graph has a cycle'], 0,
      'BFS minimizes the number of edges. With equal positive cost per edge, that also minimizes cost.',
      [['Binary Tree Level Order Traversal', 'binary-tree-level-order-traversal'],
        ['Shortest Path in Binary Matrix', 'shortest-path-in-binary-matrix']]),
  },
  {
    id: 'dfs', title: 'Depth-First Search', problem: 'Explore a Connected Component',
    summary: 'Follow one branch to its end before you explore another branch.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(V + E)', space: 'O(V)',
    signal: 'Look for connectivity, reachability, or a need to explore all branches.',
    invariant: 'Every node enters the visited set before you explore its neighbors.',
    pitfall: 'In graphs, skip visited nodes. In large graphs, use an explicit stack to avoid recursion limits.',
    steps: [
      step('Enter A', 'Start at the root', 'Mark A visited. Explore B before C for this example.',
        tree('A', [], 'Path: A')),
      step('Go deeper', 'Follow the left branch', 'From B, visit D first. D has no unvisited neighbor.',
        tree('D', ['A', 'B'], 'Path: A → B → D')),
      step('Backtrack', 'Return to the last branch point', 'Return to B and visit E. C is still waiting.',
        tree('E', ['A', 'B', 'D'], 'Path: A → B → E')),
      step('Finish', 'Explore the other branch', 'Return to A. Visit C and then F. All six reachable nodes are now visited.',
        tree('F', ['A', 'B', 'D', 'E', 'C'], 'Visit order: A, B, D, E, C, F')),
    ],
    code: code('def reachable(graph, start):', '    seen = set()', '', '    def visit(node):',
      '        if node in seen:', '            return', '        seen.add(node)',
      '        for neighbor in graph.get(node, ()):', '            visit(neighbor)',
      '', '    visit(start)', '    return seen'),
    practice: quiz('What prevents DFS from looping on a cycle?', ['A queue', 'A visited set', 'Sorting the edges'], 1,
      'Mark each node before exploring its neighbors so a cycle cannot re-enter it.',
      [['Number of Islands', 'number-of-islands'], ['Clone Graph', 'clone-graph']]),
  },
  {
    id: 'topological-sort', title: 'Topological Sort', problem: 'Order Tasks With Dependencies',
    summary: 'Process tasks with no unmet prerequisites and remove their outgoing edges.',
    difficulty: 'Intermediate', minutes: 9, time: 'O(V + E)', space: 'O(V) auxiliary',
    signal: 'Look for prerequisites, build dependencies, or any order that must respect directed edges.',
    invariant: 'A node is ready exactly when its count of unmet prerequisites reaches zero.',
    pitfall: 'If you process fewer nodes than the graph contains, a cycle blocks the remaining nodes.',
    steps: [
      step('Count', 'Count incoming dependencies', 'A unlocks B and C. Both B and C unlock D. Only A starts with in-degree zero.',
        lanes([['Task', ['A', 'B', 'C', 'D'], [0]], ['In-degree', [0, 1, 1, 2], [0]]], 'Ready: [A]')),
      step('Unlock', 'Process A and unlock B and C', 'Remove A’s outgoing edges. B and C each drop to zero.',
        lanes([['Order', ['A'], [0]], ['In-degree', ['—', 0, 0, 2], [1, 2]]], 'Ready: [B, C]')),
      step('Join', 'Wait for both prerequisites', 'B lowers the count of D to 1. C lowers it to 0. Now D is ready.',
        lanes([['Order', ['A', 'B', 'C'], [1, 2]], ['In-degree', ['—', '—', '—', 0], [3]]], 'Ready: [D]')),
      step('Return', 'Check that every task ran', 'Process D. All four tasks are in the output, so this order is valid.',
        lanes([['Order', ['A', 'B', 'C', 'D'], [3]]], 'Processed: 4 / 4')),
    ],
    code: code('from collections import deque', '', 'def task_order(graph):',
      '    degree = dict.fromkeys(graph, 0)', '    for neighbors in graph.values():',
      '        for node in neighbors:', '            degree[node] = degree.get(node, 0) + 1',
      '    ready = deque(node for node in degree if degree[node] == 0)', '    order = []',
      '    while ready:', '        node = ready.popleft()', '        order.append(node)',
      '        for neighbor in graph.get(node, ()):', '            degree[neighbor] -= 1',
      '            if degree[neighbor] == 0:', '                ready.append(neighbor)',
      '    return order if len(order) == len(degree) else None'),
    practice: quiz('The queue is empty but one task is still blocked. What does this indicate?',
      ['There is a cycle', 'The queue needs to be sorted', 'The graph has two connected components'], 0,
      'All unprocessed tasks have an unmet dependency. Following those dependencies must eventually revisit a task.',
      [['Course Schedule', 'course-schedule'], ['Course Schedule II', 'course-schedule-ii']]),
  },
]

const decisionNodes = [['∅', 50, 15], ['1', 29, 47], ['2', 71, 47], ['1, 2', 18, 80]]
const decisions = (active, visited, caption) => ({
  type: 'graph', nodes: decisionNodes, edges: [['∅', '1'], ['∅', '2'], ['1', '1, 2']], active, visited, caption,
})
const meetings = [[1, 3], [2, 4], [3, 5], [5, 7]]
const decisionsLessons = [
  {
    id: 'backtracking', title: 'Backtracking', problem: 'Build All Subsets',
    summary: 'Make a choice, explore its results, and undo the choice before trying the next one.',
    difficulty: 'Intermediate', minutes: 9, time: 'O(n · 2ⁿ)', space: 'O(n) auxiliary',
    signal: 'Look for all subsets, permutations, combinations, or valid arrangements.',
    invariant: 'The working path contains only the choices on the current branch.',
    pitfall: 'Copy the current path when saving an answer. Later edits would otherwise change saved results.',
    steps: [
      step('Start', 'Record the empty subset', 'For input [1, 2], start with an empty path. Record a copy before making any choice.',
        decisions('∅', [], 'Output: [[]]')),
      step('Choose 1', 'Take the first option', 'Append 1. Record [1]. From here, only later indices are available.',
        decisions('1', ['∅'], 'Output: [[], [1]]')),
      step('Choose 2', 'Explore a deeper choice', 'Append 2 to the current path. Record [1, 2]. No later index remains.',
        decisions('1, 2', ['∅', '1'], 'Output: [[], [1], [1, 2]]')),
      step('Undo', 'Return to the empty path', 'Undo 2. Then undo 1. Choose 2 directly from the empty path and record [2].',
        decisions('2', ['∅', '1', '1, 2'], 'Output: [[], [1], [1, 2], [2]]')),
    ],
    code: code('def subsets(nums):', '    paths, path = [], []', '', '    def visit(start):',
      '        paths.append(path.copy())', '        for index in range(start, len(nums)):',
      '            path.append(nums[index])', '            visit(index + 1)', '            path.pop()',
      '', '    visit(0)', '    return paths'),
    practice: quiz('Why does the code pop after a recursive call?', ['To sort the result', 'To restore the path for the next choice', 'To discard every saved result'], 1,
      'Each sibling branch must start from the same path that existed before the choice.',
      [['Subsets', 'subsets'], ['Combination Sum', 'combination-sum'],
        ['Split a String Into the Max Number of Unique Substrings', 'split-a-string-into-the-max-number-of-unique-substrings'],
        ['For unique splits, keep a set on the current branch. Prune when the remaining characters cannot improve the best count.']]),
  },
  {
    id: 'dynamic-programming', title: 'Dynamic Programming', problem: 'Count Ways to Climb Stairs',
    summary: 'Solve small states once and use their answers to build larger states.',
    difficulty: 'Intermediate', minutes: 9, time: 'O(n)', space: 'O(1) optimized',
    signal: 'Look for a count or optimal value with overlapping subproblems.',
    invariant: 'ways[i] is the number of ways to arrive at step i using moves of one or two.',
    pitfall: 'Define the state before writing its recurrence. Here ways[0] = 1 counts the empty path.',
    steps: [
      step('Base cases', 'Set the first two answers', 'There is one way to stay at step 0 and one way to reach step 1.',
        lanes([['Step', [0, 1, 2, 3, 4]], ['Ways', [1, 1, '—', '—', '—'], [0, 1]]], 'Base: ways[0] = ways[1] = 1')),
      step('Transition', 'Count paths into step 2', 'The last move came from step 0 or 1. Add their counts to get 2.',
        lanes([['Step', [0, 1, 2, 3, 4], [0, 1]], ['Ways', [1, 1, 2, '—', '—'], [2]]], 'ways[2] = 1 + 1 = 2')),
      step('Reuse', 'Reuse the results at step 3', 'Add the counts at 1 and 2. Step 3 has three paths.',
        lanes([['Step', [0, 1, 2, 3, 4], [1, 2]], ['Ways', [1, 1, 2, 3, '—'], [3]]], 'ways[3] = 1 + 2 = 3')),
      step('Return', 'Compute the final state', 'Add the counts at 2 and 3 to get 5. Only the last two counts are needed at each step.',
        lanes([['Step', [0, 1, 2, 3, 4], [2, 3]], ['Ways', [1, 1, 2, 3, 5], [4]]], 'ways[4] = 2 + 3 = 5')),
    ],
    code: code('def climb_stairs(n):', '    if n < 0:', '        raise ValueError("Step count must be nonnegative")',
      '    previous, current = 1, 1', '    for _ in range(2, n + 1):',
      '        previous, current = current, previous + current', '    return current'),
    practice: quiz('What does ways[i] depend on in this lesson?', ['ways[i − 1] and ways[i − 2]', 'ways[i + 1]', 'Only ways[0]'], 0,
      'The last move is either one or two steps, so each path comes from exactly one of those two states.',
      [['Climbing Stairs', 'climbing-stairs'], ['House Robber', 'house-robber']]),
  },
  {
    id: 'greedy', title: 'Greedy Choice', problem: 'Schedule the Most Meetings',
    summary: 'Select the meeting that ends first to leave the most time for later meetings.',
    difficulty: 'Intermediate', minutes: 8, time: 'O(n log n)', space: 'O(n)',
    signal: 'Look for a local choice you can prove is safe for the objective.',
    invariant: 'After each selection, the remaining time starts as early as possible for that number of selections.',
    pitfall: 'Earliest start and shortest duration do not guarantee the most compatible meetings.',
    steps: [
      step('Sort', 'Order meetings by end time', 'Sort by when each meeting ends. A meeting can start at the previous meeting’s end.',
        intervals([['Order', meetings], ['Chosen', []]], 7, 'Objective: maximum count')),
      step('Choose', 'Take the earliest finish', 'Choose [1, 3]. Replacing any first meeting with this earlier finish leaves at least as much room.',
        intervals([['Order', meetings, [0]], ['Chosen', [[1, 3]], [0]]], 7, 'Free at 3')),
      step('Skip', 'Skip the overlapping meeting', 'The next start, 2, is less than 3. Skip it. Choose [3, 5] because it starts at 3.',
        intervals([['Order', meetings, [2]], ['Chosen', [[1, 3], [3, 5]], [1]]], 7, 'Free at 5')),
      step('Finish', 'Choose the last meeting', 'Choose [5, 7]. The three chosen meetings do not overlap.',
        intervals([['Chosen', [[1, 3], [3, 5], [5, 7]], [0, 1, 2]]], 7, 'Maximum count = 3')),
    ],
    code: code('def compatible_meetings(intervals):', '    chosen = []',
      '    for start, end in sorted(intervals, key=lambda item: item[1]):',
      '        if not chosen or start >= chosen[-1][1]:',
      '            chosen.append((start, end))', '    return chosen'),
    practice: quiz('Which property makes earliest finish safe here?',
      ['It leaves at least as much room for future meetings', 'It always gives the shortest meeting', 'It depends on choosing the longest possible input'], 0,
      'Replace an optimal solution’s first meeting with the earliest finish. Every later meeting still fits.',
      [['Non-overlapping Intervals', 'non-overlapping-intervals'], ['Maximum Length of Pair Chain', 'maximum-length-of-pair-chain']]),
  },
]

export const miscProblems = {
  name: 'Misc Problems', icon: 'target', color: 'orange',
  lessons: [minimumWindow, largestRectangle, wordLadder, obstaclePath, burstBalloons, ...miscLessons],
}

export const modules = [
  { name: 'Arrays & Strings', icon: 'array', color: 'purple', lessons: [...arrays, prefixBalance] },
  { name: 'Search & Sorting', icon: 'search', color: 'blue', lessons: [...ordered, answerSearch] },
  { name: 'Data Structures', icon: 'layers', color: 'teal', lessons: [...structures, linkedGap, arrayIndex, ...indexTrees] },
  { name: 'Trees & Graphs', icon: 'branch', color: 'orange', lessons: [...graphs, treePostorder, ...connectivity] },
  { name: 'Matrices & Grids', icon: 'grid', color: 'blue', lessons: matrices },
  { name: 'Optimization', icon: 'bolt', color: 'pink', lessons: [...decisionsLessons, knapsack, extremesDP] },
  miscProblems,
]

export const lessons = modules.flatMap(module => module.lessons)
