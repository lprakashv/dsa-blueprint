import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { compileCourse } from '@lprakashv/course-board'

const { chapters } = await compileCourse('.')
const lessons = chapters.flatMap(chapter => chapter.lessons).filter(lesson => lesson.id !== 'pattern-cheatsheets')

const checks = {
  'two-pointers': 'Arrays.equals(S.pairSum(new int[]{1,2,4,6,8,12},10), new int[]{1,4}) && S.pairSum(new int[]{1,2},5) == null',
  'sliding-window': 'S.maxWindow(new int[]{2,1,5,1,3,2},3)==9 && S.maxWindow(new int[]{-4,-2},1)==-2',
  'prefix-sum': 'S.rangeSum(S.buildPrefix(new int[]{2,4,1,3}),1,3)==8',
  'hash-map': 'Arrays.equals(S.twoSum(new int[]{4,1,5,8},9),new int[]{0,2}) && S.twoSum(new int[]{4},8)==null',
  'prefix-sum-hash-map': 'S.longestBalanced(new int[]{1,0,1,1,0,0})==6 && S.longestBalanced(new int[]{1,1})==0',
  'binary-search': 'S.binarySearch(new int[]{1,3,5,7,9,11,13},11)==5 && S.binarySearch(new int[]{},1)==-1',
  intervals: 'Arrays.deepEquals(S.mergeIntervals(new int[][]{{1,3},{2,6},{8,10},{9,12}}).toArray(),new int[][]{{1,6},{8,12}})',
  'binary-search-on-answer': 'S.minimumRate(new int[]{3,5,8},6)==3',
  stack: 'S.validBrackets("{[]}") && !S.validBrackets("([)]") && !S.validBrackets("<")',
  'linked-list': 'checkReverse()',
  heap: 'S.topK(new int[]{4,1,7,3,9},3).equals(List.of(9,7,4))',
  'linked-list-gap': 'checkRemove()',
  'array-index-map': 'checkSet()',
  'b-tree': 'checkTree()',
  'b-plus-tree': 'checkPlus()',
  bfs: 'S.shortestDistance(Map.of(1,List.of(2,3),2,List.of(4),3,List.of(5)),1,5)==2',
  dfs: 'S.reachable(Map.of(1,List.of(2,3),2,List.of(1,4)),1).equals(Set.of(1,2,3,4))',
  'topological-sort': 'S.taskOrder(Map.of(1,List.of(2),2,List.of(1)))==null && S.taskOrder(Map.of(1,List.of(2))).equals(List.of(1,2))',
  'tree-postorder': 'checkDiameter()',
  'union-find': 'checkUnion()',
  dijkstra: 'checkDijkstra()',
  'bellman-ford': 'Arrays.equals(S.bellmanFord(4,new int[][]{{2,3,1},{1,2,-2},{0,1,4},{0,2,5}},0),new double[]{0,4,2,3}) && checkCycle()',
  'floyd-warshall': 'Arrays.equals(S.floydWarshall(3,new int[][]{{0,1,3},{0,2,10},{1,2,2}})[0],new double[]{0,3,5}) && checkCycle()',
  'grid-dfs': 'S.countIslands(new int[][]{{1,1,0,0},{0,1,0,1},{1,0,0,1}})==3 && S.countIslands(new int[][]{})==0',
  'grid-bfs': 'Arrays.deepEquals(S.nearestSource(new int[][]{{0,-1,1}}),new int[][]{{0,-1,-1}})',
  'spiral-matrix': 'S.spiralOrder(new int[][]{{1,2,3},{4,5,6}}).equals(List.of(1,2,3,6,5,4))',
  'matrix-prefix-sum': 'S.rectangleSum(S.buildMatrixPrefix(new int[][]{{1,2,3},{4,5,6},{7,8,9}}),1,1,2,2)==28',
  backtracking: 'S.subsets(new int[]{1,2}).equals(List.of(List.of(),List.of(1),List.of(1,2),List.of(2)))',
  'dynamic-programming': 'S.climbStairs(4)==5 && S.climbStairs(0)==1',
  greedy: 'Arrays.deepEquals(S.compatibleMeetings(new int[][]{{1,3},{2,4},{3,5},{5,7}}).toArray(),new int[][]{{1,3},{3,5},{5,7}})',
  'knapsack-01': 'S.canPartition(new int[]{2,3,4,1}) && !S.canPartition(new int[]{2,3,7})',
  'dp-min-max': 'S.maximumProduct(new int[]{2,-3,-2,0,4})==12',
  'minimum-window-substring': 'S.minimumWindow("CABACBD","AAB").equals("ABA") && S.minimumWindow("AB","AA").equals("")',
  'largest-rectangle-in-histogram': 'S.largestRectangle(new int[]{2,1,4,5,2})==8',
  'word-ladder': 'S.ladderLength("cold","warm",List.of("cord","card","word","ward","warm"))==5',
  'grid-obstacle-elimination': 'S.shortestWithRemovals(new int[][]{{0,1,0,0,0},{0,0,0,1,1},{0,0,1,1,0}},1)==8',
  'burst-balloons': 'S.burstBalloons(new int[]{2,4,3})==33',
  'median-of-two-sorted-arrays': 'S.medianSorted(new int[]{6,8},new int[]{1,3,4,5})==4.5',
  'binary-tree-maximum-path-sum': 'checkPath()',
  'reverse-nodes-in-k-group': 'checkGroups()',
  'word-search-ii': 'checkWords()',
  'split-array-largest-sum': 'S.splitLargestSum(new int[]{4,2,6,3,5},2)==12',
}

const helpers = {
  'linked-list': 'static boolean checkReverse(){ S.ListNode a=new S.ListNode(1), b=new S.ListNode(2); a.next=b; return S.reverseList(a)==b && b.next==a && a.next==null; }',
  'linked-list-gap': 'static boolean checkRemove(){ S.ListNode a=new S.ListNode(1), b=new S.ListNode(2); a.next=b; return S.removeNth(a,2)==b; }',
  'array-index-map': 'static boolean checkSet(){ S.RandomizedSet s=new S.RandomizedSet(); return s.insert(7) && s.insert(9) && !s.insert(7) && s.remove(7) && s.getRandom()==9 && !s.remove(7); }',
  'b-tree': 'static boolean checkTree(){ S.BTreeNode root=new S.BTreeNode(); for(int i=1;i<=50;i++) root=root.insert(i); for(int i=1;i<=50;i++) if(!root.contains(i)) return false; return !root.contains(51); }',
  'b-plus-tree': 'static boolean checkPlus(){ S.BPlusPage leaf=new S.BPlusPage(List.of(10,20,30,40),List.of()); S.BPlusPage right=S.splitPlusLeaf(leaf); S.BPlusPage root=new S.BPlusPage(List.of(30),List.of(leaf,right)); return S.scanKeys(root,20,35).equals(List.of(20,30)); }',
  'tree-postorder': 'static boolean checkDiameter(){ S.TreeNode root=new S.TreeNode(1); root.left=new S.TreeNode(2); root.left.left=new S.TreeNode(3); root.right=new S.TreeNode(4); return S.diameter(root)==3 && S.diameter(null)==0; }',
  'union-find': 'static boolean checkUnion(){ S.UnionFind u=new S.UnionFind(4); return u.union(0,1) && u.union(2,3) && u.union(0,2) && u.find(3)==u.find(1) && !u.union(3,1); }',
  dijkstra: 'static boolean checkDijkstra(){ Map<Integer,Integer>[] result=S.dijkstra(Map.of(0,List.of(new int[]{1,4},new int[]{2,1}),2,List.of(new int[]{1,2})),0); return result[0].get(1)==3 && result[1].get(1)==2; }',
  'bellman-ford': 'static boolean checkCycle(){ try { S.bellmanFord(2,new int[][]{{0,1,0},{1,0,-1}},0); return false; } catch(IllegalArgumentException e){ return true; } }',
  'floyd-warshall': 'static boolean checkCycle(){ try { S.floydWarshall(2,new int[][]{{0,1,0},{1,0,-1}}); return false; } catch(IllegalArgumentException e){ return true; } }',
  'binary-tree-maximum-path-sum': 'static boolean checkPath(){ S.TreeNode root=new S.TreeNode(-5); root.left=new S.TreeNode(4); root.left.left=new S.TreeNode(3); root.left.right=new S.TreeNode(-6); root.right=new S.TreeNode(8); return S.maxPathSum(root)==10; }',
  'reverse-nodes-in-k-group': 'static boolean checkGroups(){ S.ListNode a=new S.ListNode(1), b=new S.ListNode(2), c=new S.ListNode(3); a.next=b; b.next=c; return S.reverseKGroup(a,2)==b && b.next==a && a.next==c && c.next==null; }',
  'word-search-ii': 'static boolean checkWords(){ char[][] b={{\'a\',\'t\',\'e\'},{\'t\',\'o\',\'a\'}}; List<String> result=S.findWords(b,List.of("at","ate","to","tea","tat","ata")); return new HashSet<>(result).equals(Set.of("at","ate","tat","tea","to")) && Arrays.deepEquals(b,new char[][]{{\'a\',\'t\',\'e\'},{\'t\',\'o\',\'a\'}}); }',
}

test('Java implementations compile and solve each lesson example', () => {
  assert.deepEqual(Object.keys(checks).sort(), lessons.map(lesson => lesson.id).sort())
  // Compile all examples once. Nest each case so repeated Solution and helper names stay isolated.
  const source = ['import java.util.*;', 'class JavaExamples {']
  lessons.forEach((lesson, i) => {
    source.push(`static class Case${i} {`)
    const java = lesson.steps.find(step => step.snippet?.language === 'java')
    assert.ok(java?.snippet.text, `Missing Java source for ${lesson.id}`)
    source.push(java.snippet.text.replace('import java.util.*;\n\nclass Solution {', 'static class S {'))
    source.push(helpers[lesson.id] ?? '')
    source.push(`static void check() { if (!(${checks[lesson.id]})) throw new AssertionError("${lesson.id}"); }`, '}')
  })
  source.push(`public static void main(String[] args) { ${lessons.map((_, i) => `Case${i}.check();`).join(' ')} }`, '}')
  const dir = mkdtempSync(join(tmpdir(), 'dsa-java-'))
  try {
    writeFileSync(join(dir, 'JavaExamples.java'), source.join('\n'))
    const compile = spawnSync('javac', ['JavaExamples.java'], { cwd: dir, encoding: 'utf8', timeout: 30000 })
    assert.ifError(compile.error)
    assert.equal(compile.status, 0, compile.stderr)
    const run = spawnSync('java', ['-cp', dir, 'JavaExamples'], { encoding: 'utf8', timeout: 10000 })
    assert.ifError(run.error)
    assert.equal(run.status, 0, run.stderr)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
