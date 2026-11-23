import java.util.*;

class Solution {
    static class ListNode {
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
    }
}
