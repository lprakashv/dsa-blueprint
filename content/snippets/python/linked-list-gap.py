class ListNode:
    def __init__(self, value=0, next_node=None):
        self.value = value
        self.next = next_node

def remove_nth(head, n):
    # Assume 1 <= n <= the length of the list.
    dummy = ListNode(next_node=head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast, slow = fast.next, slow.next
    slow.next = slow.next.next
    return dummy.next
