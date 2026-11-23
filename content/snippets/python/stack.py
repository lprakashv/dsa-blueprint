def valid_brackets(text):
    opening = {"}": "{", "]": "[", ")": "("}
    stack = []
    for char in text:
        if char in "{[(":
            stack.append(char)
        elif char not in opening or not stack or stack.pop() != opening[char]:
            return False
    return not stack
