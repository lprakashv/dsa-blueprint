import java.util.*;

class Solution {
    static class ListNode {
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
    }
}
