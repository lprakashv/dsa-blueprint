// Each snippet is a standalone Java class. All use only the Java standard library.
const bodies = {
  'two-pointers': `static int[] pairSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[]{left, right};
        if (sum < target) left++; else right--;
    }
    return null;
}`,
  'sliding-window': `static int maxWindow(int[] nums, int k) {
    if (k < 1 || k > nums.length) throw new IllegalArgumentException("Invalid window size");
    int sum = 0;
    for (int i = 0; i < k; i++) sum += nums[i];
    int best = sum;
    for (int i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        best = Math.max(best, sum);
    }
    return best;
}`,
  'prefix-sum': `static int[] buildPrefix(int[] nums) {
    int[] prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];
    return prefix;
}
static int rangeSum(int[] prefix, int left, int right) {
    return prefix[right + 1] - prefix[left];
}`,
  'hash-map': `static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) return new int[]{seen.get(need), i};
        seen.put(nums[i], i);
    }
    return null;
}`,
  'prefix-sum-hash-map': `static int longestBalanced(int[] bits) {
    Map<Integer, Integer> first = new HashMap<>();
    first.put(0, -1);
    int balance = 0, best = 0;
    for (int i = 0; i < bits.length; i++) {
        balance += bits[i] == 0 ? -1 : 1;
        if (first.containsKey(balance)) best = Math.max(best, i - first.get(balance));
        else first.put(balance, i);
    }
    return best;
}`,
  'binary-search': `static int binarySearch(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
    return -1;
}`,
  'intervals': `static List<int[]> mergeIntervals(int[][] intervals) {
    int[][] sorted = intervals.clone();
    Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : sorted) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0])
            merged.add(interval.clone());
        else {
            int[] last = merged.get(merged.size() - 1);
            last[1] = Math.max(last[1], interval[1]);
        }
    }
    return merged;
}`,
  'binary-search-on-answer': `static int minimumRate(int[] piles, int hours) {
    int lo = 1, hi = Arrays.stream(piles).max().orElseThrow();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long needed = 0;
        for (int pile : piles) needed += (pile + (long) mid - 1) / mid;
        if (needed <= hours) hi = mid; else lo = mid + 1;
    }
    return lo;
}`,
  'stack': `static boolean validBrackets(String text) {
    Map<Character, Character> opening = Map.of(')', '(', ']', '[', '}', '{');
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : text.toCharArray()) {
        if (opening.containsValue(c)) stack.push(c);
        else if (opening.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != opening.get(c)) return false;
        } else return false;
    }
    return stack.isEmpty();
}`,
  'linked-list': `static class ListNode {
    int value; ListNode next;
    ListNode(int value) { this.value = value; }
}
static ListNode reverseList(ListNode head) {
    ListNode prev = null, current = head;
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}`,
  'heap': `static List<Integer> topK(int[] nums, int k) {
    if (k < 0 || k > nums.length) throw new IllegalArgumentException("Invalid k");
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for (int value : nums) {
        if (heap.size() < k) heap.add(value);
        else if (k > 0 && value > heap.peek()) { heap.poll(); heap.add(value); }
    }
    List<Integer> result = new ArrayList<>(heap);
    result.sort(Collections.reverseOrder());
    return result;
}`,
  'linked-list-gap': `static class ListNode {
    int value; ListNode next;
    ListNode(int value) { this.value = value; }
}
static ListNode removeNth(ListNode head, int n) {
    ListNode dummy = new ListNode(0); dummy.next = head;
    ListNode fast = dummy, slow = dummy;
    for (int i = 0; i < n; i++) {
        fast = fast.next;
        if (fast == null) throw new IllegalArgumentException("Invalid n");
    }
    if (n <= 0) throw new IllegalArgumentException("Invalid n");
    while (fast.next != null) { fast = fast.next; slow = slow.next; }
    slow.next = slow.next.next;
    return dummy.next;
}`,
  'array-index-map': `static class RandomizedSet {
    List<Integer> values = new ArrayList<>();
    Map<Integer, Integer> positions = new HashMap<>();
    Random random = new Random();
    boolean insert(int value) {
        if (positions.containsKey(value)) return false;
        positions.put(value, values.size()); values.add(value); return true;
    }
    boolean remove(int value) {
        Integer index = positions.remove(value);
        if (index == null) return false;
        int last = values.get(values.size() - 1);
        values.set(index, last);
        values.remove(values.size() - 1);
        if (index < values.size()) positions.put(last, index);
        return true;
    }
    int getRandom() { return values.get(random.nextInt(values.size())); }
}`,
  'b-tree': `static class BTreeNode {
    List<Integer> keys = new ArrayList<>();
    List<BTreeNode> children = new ArrayList<>();
    int position(int key) {
        int i = 0; while (i < keys.size() && keys.get(i) < key) i++; return i;
    }
    boolean contains(int key) {
        int i = position(key);
        return i < keys.size() && keys.get(i) == key || !children.isEmpty() && children.get(i).contains(key);
    }
    void splitChild(int i) {
        BTreeNode child = children.get(i), right = new BTreeNode();
        keys.add(i, child.keys.get(1));
        right.keys.add(child.keys.get(2));
        child.keys.subList(1, 3).clear();
        if (!child.children.isEmpty()) {
            right.children.addAll(child.children.subList(2, 4));
            child.children.subList(2, 4).clear();
        }
        children.add(i + 1, right);
    }
    void insertNonfull(int key) {
        int i = position(key);
        if (children.isEmpty()) { keys.add(i, key); return; }
        if (children.get(i).keys.size() == 3) {
            splitChild(i);
            if (key > keys.get(i)) i++;
        }
        children.get(i).insertNonfull(key);
    }
    BTreeNode insert(int key) {
        if (contains(key)) return this;
        BTreeNode root = this;
        if (keys.size() == 3) {
            root = new BTreeNode(); root.children.add(this); root.splitChild(0);
        }
        root.insertNonfull(key); return root;
    }
}`,
  'b-plus-tree': `static class BPlusPage {
    List<Integer> keys; List<BPlusPage> children; BPlusPage nextLeaf;
    BPlusPage(List<Integer> keys, List<BPlusPage> children) {
        this.keys = new ArrayList<>(keys); this.children = new ArrayList<>(children);
    }
}
static BPlusPage splitPlusLeaf(BPlusPage leaf) {
    int mid = leaf.keys.size() / 2;
    BPlusPage right = new BPlusPage(leaf.keys.subList(mid, leaf.keys.size()), List.of());
    leaf.keys.subList(mid, leaf.keys.size()).clear();
    right.nextLeaf = leaf.nextLeaf; leaf.nextLeaf = right;
    return right; // The separator is right.keys.get(0).
}
static List<Integer> scanKeys(BPlusPage root, int low, int high) {
    BPlusPage page = root;
    while (!page.children.isEmpty()) {
        int i = 0; while (i < page.keys.size() && page.keys.get(i) <= low) i++;
        page = page.children.get(i);
    }
    List<Integer> result = new ArrayList<>();
    while (page != null) {
        for (int key : page.keys) {
            if (key > high) return result;
            if (key >= low) result.add(key);
        }
        page = page.nextLeaf;
    }
    return result;
}`,
  'bfs': `static int shortestDistance(Map<Integer, List<Integer>> graph, int start, int target) {
    Queue<int[]> queue = new ArrayDeque<>(); queue.add(new int[]{start, 0});
    Set<Integer> seen = new HashSet<>(); seen.add(start);
    while (!queue.isEmpty()) {
        int[] item = queue.remove();
        if (item[0] == target) return item[1];
        for (int next : graph.getOrDefault(item[0], List.of()))
            if (seen.add(next)) queue.add(new int[]{next, item[1] + 1});
    }
    return -1;
}`,
  'dfs': `static Set<Integer> reachable(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> seen = new HashSet<>();
    visit(graph, start, seen); return seen;
}
static void visit(Map<Integer, List<Integer>> graph, int node, Set<Integer> seen) {
    if (!seen.add(node)) return;
    for (int next : graph.getOrDefault(node, List.of())) visit(graph, next, seen);
}`,
  'topological-sort': `static List<Integer> taskOrder(Map<Integer, List<Integer>> graph) {
    Map<Integer, Integer> degree = new HashMap<>();
    for (int node : graph.keySet()) degree.putIfAbsent(node, 0);
    for (List<Integer> neighbors : graph.values())
        for (int node : neighbors) degree.merge(node, 1, Integer::sum);
    Queue<Integer> ready = new ArrayDeque<>();
    degree.forEach((node, count) -> { if (count == 0) ready.add(node); });
    List<Integer> order = new ArrayList<>();
    while (!ready.isEmpty()) {
        int node = ready.remove(); order.add(node);
        for (int next : graph.getOrDefault(node, List.of()))
            if (degree.merge(next, -1, Integer::sum) == 0) ready.add(next);
    }
    return order.size() == degree.size() ? order : null;
}`,
  'union-find': `static class UnionFind {
    int[] parent, size;
    UnionFind(int n) {
        parent = new int[n]; size = new int[n];
        for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    }
    int find(int node) {
        if (parent[node] != node) parent[node] = find(parent[node]);
        return parent[node];
    }
    boolean union(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (size[a] < size[b]) { int t = a; a = b; b = t; }
        parent[b] = a; size[a] += size[b]; return true;
    }
}`,
  'tree-postorder': `static class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
static class Frame {
    TreeNode node; boolean done;
    Frame(TreeNode node, boolean done) { this.node = node; this.done = done; }
}
static int diameter(TreeNode root) {
    if (root == null) return 0;
    Deque<Frame> stack = new ArrayDeque<>(); stack.push(new Frame(root, false));
    Map<TreeNode, Integer> height = new HashMap<>(); int best = 0;
    while (!stack.isEmpty()) {
        Frame frame = stack.pop(); TreeNode node = frame.node;
        if (!frame.done) {
            stack.push(new Frame(node, true));
            if (node.right != null) stack.push(new Frame(node.right, false));
            if (node.left != null) stack.push(new Frame(node.left, false));
        } else {
            int left = node.left == null ? 0 : height.remove(node.left);
            int right = node.right == null ? 0 : height.remove(node.right);
            best = Math.max(best, left + right); height.put(node, 1 + Math.max(left, right));
        }
    }
    return best;
}`,
  'dijkstra': `// Edges are pairs [neighbor, nonnegative weight].
static Map<Integer, Integer>[] dijkstra(Map<Integer, List<int[]>> graph, int start) {
    Map<Integer, Integer> distance = new HashMap<>(), previous = new HashMap<>();
    PriorityQueue<int[]> queue = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    distance.put(start, 0); queue.add(new int[]{0, start});
    while (!queue.isEmpty()) {
        int[] item = queue.remove(); int cost = item[0], node = item[1];
        if (cost != distance.get(node)) continue;
        for (int[] edge : graph.getOrDefault(node, List.of())) {
            int candidate = cost + edge[1];
            if (candidate < distance.getOrDefault(edge[0], Integer.MAX_VALUE)) {
                distance.put(edge[0], candidate); previous.put(edge[0], node);
                queue.add(new int[]{candidate, edge[0]});
            }
        }
    }
    return new Map[]{distance, previous};
}`,
  'bellman-ford': `// Each edge is [source, target, weight]. Infinity denotes an unreachable node.
static double[] bellmanFord(int n, int[][] edges, int start) {
    double[] distance = new double[n]; Arrays.fill(distance, Double.POSITIVE_INFINITY);
    distance[start] = 0;
    for (int i = 1; i < n; i++) {
        boolean changed = false;
        for (int[] edge : edges) {
            double candidate = distance[edge[0]] + edge[2];
            if (candidate < distance[edge[1]]) { distance[edge[1]] = candidate; changed = true; }
        }
        if (!changed) return distance;
    }
    for (int[] edge : edges)
        if (distance[edge[0]] + edge[2] < distance[edge[1]])
            throw new IllegalArgumentException("Reachable negative cycle");
    return distance;
}`,
  'floyd-warshall': `// Each edge is [source, target, weight]. Infinity denotes an unreachable node.
static double[][] floydWarshall(int n, int[][] edges) {
    double[][] distance = new double[n][n];
    for (int i = 0; i < n; i++) { Arrays.fill(distance[i], Double.POSITIVE_INFINITY); distance[i][i] = 0; }
    for (int[] edge : edges) distance[edge[0]][edge[1]] = Math.min(distance[edge[0]][edge[1]], edge[2]);
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
    for (int i = 0; i < n; i++) if (distance[i][i] < 0) throw new IllegalArgumentException("Negative cycle");
    return distance;
}`,
  'grid-dfs': `static int countIslands(int[][] grid) {
    if (grid.length == 0 || grid[0].length == 0) return 0;
    int rows = grid.length, cols = grid[0].length, count = 0;
    boolean[][] seen = new boolean[rows][cols]; int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) {
        if (grid[r][c] != 1 || seen[r][c]) continue;
        count++; seen[r][c] = true; Deque<int[]> stack = new ArrayDeque<>(); stack.push(new int[]{r,c});
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            for (int[] d : dirs) {
                int nr = cell[0] + d[0], nc = cell[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !seen[nr][nc]) {
                    seen[nr][nc] = true; stack.push(new int[]{nr,nc});
                }
            }
        }
    }
    return count;
}`,
  'grid-bfs': `static int[][] nearestSource(int[][] grid) {
    if (grid.length == 0 || grid[0].length == 0) return new int[0][0];
    int rows = grid.length, cols = grid[0].length;
    int[][] distance = new int[rows][cols], dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    Queue<int[]> queue = new ArrayDeque<>();
    for (int r = 0; r < rows; r++) {
        Arrays.fill(distance[r], -1);
        for (int c = 0; c < cols; c++) if (grid[r][c] == 0) {
            distance[r][c] = 0; queue.add(new int[]{r,c});
        }
    }
    while (!queue.isEmpty()) {
        int[] cell = queue.remove();
        for (int[] d : dirs) {
            int r = cell[0] + d[0], c = cell[1] + d[1];
            if (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] != -1 && distance[r][c] == -1) {
                distance[r][c] = distance[cell[0]][cell[1]] + 1; queue.add(new int[]{r,c});
            }
        }
    }
    return distance;
}`,
  'spiral-matrix': `static List<Integer> spiralOrder(int[][] grid) {
    List<Integer> result = new ArrayList<>();
    if (grid.length == 0 || grid[0].length == 0) return result;
    int top = 0, bottom = grid.length - 1, left = 0, right = grid[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) result.add(grid[top][c]); top++;
        for (int r = top; r <= bottom; r++) result.add(grid[r][right]); right--;
        if (top <= bottom) { for (int c = right; c >= left; c--) result.add(grid[bottom][c]); bottom--; }
        if (left <= right) { for (int r = bottom; r >= top; r--) result.add(grid[r][left]); left++; }
    }
    return result;
}`,
  'matrix-prefix-sum': `static int[][] buildMatrixPrefix(int[][] grid) {
    int rows = grid.length, cols = rows == 0 ? 0 : grid[0].length;
    int[][] prefix = new int[rows + 1][cols + 1];
    for (int r = 1; r <= rows; r++) for (int c = 1; c <= cols; c++)
        prefix[r][c] = grid[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1];
    return prefix;
}
static int rectangleSum(int[][] p, int top, int left, int bottom, int right) {
    return p[bottom+1][right+1] - p[top][right+1] - p[bottom+1][left] + p[top][left];
}`,
  'backtracking': `static List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    visit(nums, 0, new ArrayList<>(), result); return result;
}
static void visit(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]); visit(nums, i + 1, path, result); path.remove(path.size() - 1);
    }
}`,
  'dynamic-programming': `static int climbStairs(int n) {
    if (n < 0) throw new IllegalArgumentException("Step count must be nonnegative");
    int previous = 1, current = 1;
    for (int i = 2; i <= n; i++) { int next = previous + current; previous = current; current = next; }
    return current;
}`,
  'greedy': `static List<int[]> compatibleMeetings(int[][] intervals) {
    int[][] sorted = intervals.clone(); Arrays.sort(sorted, Comparator.comparingInt(a -> a[1]));
    List<int[]> chosen = new ArrayList<>();
    for (int[] interval : sorted)
        if (chosen.isEmpty() || interval[0] >= chosen.get(chosen.size() - 1)[1]) chosen.add(interval);
    return chosen;
}`,
  'knapsack-01': `// Assume all values are positive integers.
static boolean canPartition(int[] nums) {
    int total = Arrays.stream(nums).sum();
    if (total % 2 != 0) return false;
    int target = total / 2; boolean[] reachable = new boolean[target + 1]; reachable[0] = true;
    for (int value : nums) {
        for (int goal = target; goal >= value; goal--) reachable[goal] |= reachable[goal - value];
        if (reachable[target]) return true;
    }
    return reachable[target];
}`,
  'dp-min-max': `// Assume nums is nonempty.
static int maximumProduct(int[] nums) {
    int low = nums[0], high = nums[0], best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        int a = nums[i] * low, b = nums[i] * high;
        low = Math.min(nums[i], Math.min(a, b)); high = Math.max(nums[i], Math.max(a, b));
        best = Math.max(best, high);
    }
    return best;
}`,
  'minimum-window-substring': `static String minimumWindow(String source, String target) {
    if (target.isEmpty()) return "";
    Map<Character, Integer> need = new HashMap<>();
    for (char c : target.toCharArray()) need.merge(c, 1, Integer::sum);
    int missing = target.length(), left = 0, bestStart = 0, bestLength = source.length() + 1;
    for (int right = 0; right < source.length(); right++) {
        char c = source.charAt(right);
        if (need.containsKey(c)) { if (need.get(c) > 0) missing--; need.put(c, need.get(c) - 1); }
        while (missing == 0) {
            int length = right - left + 1;
            if (length < bestLength) { bestStart = left; bestLength = length; }
            char outgoing = source.charAt(left++);
            if (need.containsKey(outgoing)) {
                int count = need.get(outgoing) + 1; need.put(outgoing, count);
                if (count > 0) missing++;
            }
        }
    }
    return bestLength > source.length() ? "" : source.substring(bestStart, bestStart + bestLength);
}`,
  'largest-rectangle-in-histogram': `static int largestRectangle(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>(); int best = 0;
    for (int right = 0; right <= heights.length; right++) {
        int height = right < heights.length ? heights[right] : 0;
        while (!stack.isEmpty() && heights[stack.peek()] > height) {
            int peak = stack.pop(), left = stack.isEmpty() ? -1 : stack.peek();
            best = Math.max(best, heights[peak] * (right - left - 1));
        }
        if (right < heights.length) stack.push(right);
    }
    return best;
}`,
  'word-ladder': `static int ladderLength(String start, String end, List<String> words) {
    Set<String> unseen = new HashSet<>(words);
    if (!unseen.contains(end)) return 0;
    unseen.remove(start); Queue<String> queue = new ArrayDeque<>(); queue.add(start);
    int length = 1;
    while (!queue.isEmpty()) {
        for (int count = queue.size(); count > 0; count--) {
            String word = queue.remove(); if (word.equals(end)) return length;
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[i] = c; String candidate = new String(chars);
                    if (unseen.remove(candidate)) queue.add(candidate);
                }
                chars[i] = original;
            }
        }
        length++;
    }
    return 0;
}`,
  'grid-obstacle-elimination': `// Assume a nonempty grid with open start and end cells.
static int shortestWithRemovals(int[][] grid, int k) {
    int rows = grid.length, cols = grid[0].length, direct = rows + cols - 2;
    if (k >= direct) return direct;
    int[][] best = new int[rows][cols], dirs = {{1,0},{0,1},{-1,0},{0,-1}};
    for (int[] row : best) Arrays.fill(row, -1);
    best[0][0] = k; Queue<int[]> queue = new ArrayDeque<>(); queue.add(new int[]{0,0,k,0});
    while (!queue.isEmpty()) {
        int[] cell = queue.remove();
        if (cell[0] == rows - 1 && cell[1] == cols - 1) return cell[3];
        for (int[] d : dirs) {
            int r = cell[0] + d[0], c = cell[1] + d[1];
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                int budget = cell[2] - grid[r][c];
                if (budget >= 0 && budget > best[r][c]) {
                    best[r][c] = budget; queue.add(new int[]{r,c,budget,cell[3]+1});
                }
            }
        }
    }
    return -1;
}`,
  'burst-balloons': `static int burstBalloons(int[] balloons) {
    int n = balloons.length + 2; int[] values = new int[n];
    values[0] = values[n-1] = 1; System.arraycopy(balloons, 0, values, 1, balloons.length);
    int[][] best = new int[n][n];
    for (int width = 2; width < n; width++) for (int left = 0; left + width < n; left++) {
        int right = left + width;
        for (int last = left + 1; last < right; last++)
            best[left][right] = Math.max(best[left][right], best[left][last] + best[last][right] + values[left]*values[last]*values[right]);
    }
    return best[0][n-1];
}`,
  'median-of-two-sorted-arrays': `static double medianSorted(int[] first, int[] second) {
    if (first.length > second.length) return medianSorted(second, first);
    int m = first.length, n = second.length;
    if (m + n == 0) throw new IllegalArgumentException("At least one array must contain a value");
    int half = (m + n + 1) / 2, lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2, j = half - i;
        double lf = i == 0 ? Double.NEGATIVE_INFINITY : first[i-1];
        double rf = i == m ? Double.POSITIVE_INFINITY : first[i];
        double ls = j == 0 ? Double.NEGATIVE_INFINITY : second[j-1];
        double rs = j == n ? Double.POSITIVE_INFINITY : second[j];
        if (lf > rs) hi = i - 1;
        else if (ls > rf) lo = i + 1;
        else return (m + n) % 2 == 1 ? Math.max(lf, ls) : (Math.max(lf, ls) + Math.min(rf, rs)) / 2;
    }
    throw new IllegalArgumentException("No valid partition");
}`,
  'binary-tree-maximum-path-sum': `static class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
static class Frame {
    TreeNode node; boolean done;
    Frame(TreeNode node, boolean done) { this.node = node; this.done = done; }
}
// Assume root is non-null.
static int maxPathSum(TreeNode root) {
    Deque<Frame> stack = new ArrayDeque<>(); stack.push(new Frame(root, false));
    Map<TreeNode, Integer> gains = new HashMap<>(); int best = root.val;
    while (!stack.isEmpty()) {
        Frame frame = stack.pop(); TreeNode node = frame.node;
        if (!frame.done) {
            stack.push(new Frame(node, true));
            if (node.right != null) stack.push(new Frame(node.right, false));
            if (node.left != null) stack.push(new Frame(node.left, false));
        } else {
            int left = node.left == null ? 0 : Math.max(0, gains.remove(node.left));
            int right = node.right == null ? 0 : Math.max(0, gains.remove(node.right));
            best = Math.max(best, node.val + left + right); gains.put(node, node.val + Math.max(left, right));
        }
    }
    return best;
}`,
  'reverse-nodes-in-k-group': `static class ListNode {
    int value; ListNode next;
    ListNode(int value) { this.value = value; }
}
// Assume k is positive.
static ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0); dummy.next = head; ListNode before = dummy;
    while (true) {
        ListNode end = before;
        for (int i = 0; i < k; i++) { end = end.next; if (end == null) return dummy.next; }
        ListNode first = before.next, after = end.next, prev = after, current = first;
        while (current != after) {
            ListNode next = current.next; current.next = prev; prev = current; current = next;
        }
        before.next = end; before = first;
    }
}`,
  'word-search-ii': `static class Trie {
    Map<Character, Trie> children = new HashMap<>(); String word;
}
static List<String> findWords(char[][] board, List<String> words) {
    List<String> found = new ArrayList<>();
    if (board.length == 0 || board[0].length == 0) return found;
    Trie root = new Trie();
    for (String word : words) {
        Trie node = root;
        for (char c : word.toCharArray()) node = node.children.computeIfAbsent(c, key -> new Trie());
        node.word = word;
    }
    for (int r = 0; r < board.length; r++) for (int c = 0; c < board[0].length; c++) visit(board, r, c, root, found);
    return found;
}
static void visit(char[][] board, int r, int c, Trie parent, List<String> found) {
    char ch = board[r][c]; Trie node = parent.children.get(ch);
    if (node == null) return;
    if (node.word != null) { found.add(node.word); node.word = null; }
    board[r][c] = '#'; int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && board[nr][nc] != '#') visit(board, nr, nc, node, found);
    }
    board[r][c] = ch;
    if (node.children.isEmpty()) parent.children.remove(ch);
}`,
  'split-array-largest-sum': `// Assume nums is nonempty and nonnegative, with 1 <= k <= nums.length.
static long splitLargestSum(int[] nums, int k) {
    long lo = 0, hi = 0;
    for (int value : nums) { lo = Math.max(lo, value); hi += value; }
    while (lo < hi) {
        long mid = lo + (hi - lo) / 2, sum = 0; int groups = 1;
        for (int value : nums) {
            if (sum + value > mid) { groups++; sum = 0; }
            sum += value;
        }
        if (groups <= k) hi = mid; else lo = mid + 1;
    }
    return lo;
}`,
}

export const javaSolutions = Object.fromEntries(Object.entries(bodies).map(([id, body]) => [
  id, `import java.util.*;\n\nclass Solution {\n${body.split('\n').map(line => `    ${line}`).join('\n')}\n}`,
]))
