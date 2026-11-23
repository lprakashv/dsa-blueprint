class ListNode:
    def __init__(self, value=0, next_node=None):
        self.value = value
        self.next = next_node

def reverse_k_group(head, k):
    # Assume k is positive.
    dummy = ListNode(next_node=head)
    before = dummy
    while True:
        end = before
        for _ in range(k):
            end = end.next
            if end is None:
                return dummy.next
        first = before.next
        after = end.next
        prev, current = after, first
        while current is not after:
            next_node = current.next
            current.next = prev
            prev, current = current, next_node
        before.next = end
        before = first
