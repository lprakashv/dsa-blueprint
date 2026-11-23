import java.util.*;

class Solution {
    static class ListNode {
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
    }
}
