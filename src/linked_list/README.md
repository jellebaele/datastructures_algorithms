# Linked list

## Singly linked list vs. Doubly linked list

https://www.geeksforgeeks.org/difference-between-singly-linked-list-and-doubly-linked-list/?ref=next_article

| Singly linked list                                                                                                      | Doubly linked list                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LL nodes contains 2 field -data field and next link field.                                                              | DLL nodes contains 3 fields -data field, a previous link field and a next link field.                                                                                                           |
| In SLL, the traversal can be done using the next node link only. Thus traversal is possible in one direction only.      | In DLL, the traversal can be done using the previous node link or the next node link. Thus traversal is possible in both directions (forward and backward).                                     |
| Supports lesser number of operations in constant time                                                                   | Supports additional operations like insert before, delete previous, delete current node and delete last in O(1) time. Since it supports delete last, it is used to efficiently implement Deque. |
| The SLL occupies less memory than DLL as it has only 2 fields.                                                          | The DLL occupies more memory than SLL as it has 3 fields.                                                                                                                                       |
| Complexity of deletion with a given node is O(n), because the previous node needs to be known, and traversal takes O(n) | Complexity of deletion with a given node is O(1) because the previous node can be accessed easily                                                                                               |
| A singly linked list consumes less memory as compared to the doubly linked list.                                        | The doubly linked list consumes more memory as compared to the singly linked list.                                                                                                              |

**Advantages of Doubly Linked List**

- Efficient traversal in both directions: Doubly linked lists allow for efficient traversal of the
  list in both directions, making it suitable for applications where frequent insertions and
  deletions are required.
- Easy insertion and deletion of nodes: The presence of pointers to both the previous and next nodes
  makes it easy to insert or delete nodes from the list, without having to traverse the entire list.
- Can be used to implement a stack or queue: Doubly linked lists can be used to implement both
  stacks and queues, which are common data structures used in programming.

**Disadvantages of Doubly Linked List**

- More complex than singly linked lists: Doubly linked lists are more complex than singly linked
  lists, as they require additional pointers for each node.
- More memory overhead: Doubly linked lists require more memory overhead than singly linked lists,
  as each node stores two pointers instead of one.
