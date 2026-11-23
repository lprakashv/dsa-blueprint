import java.util.*;

class Solution {
    static class Trie {
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
    }
}
