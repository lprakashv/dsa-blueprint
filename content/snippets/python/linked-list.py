def reverse_list(head):
    prev, cur = None, head
    while cur:
        next_node = cur.next
        cur.next = prev
        prev, cur = cur, next_node
    return prev
