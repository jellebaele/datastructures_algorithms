# Stack
A stack is a fundamental data structure that adheres to the LIFO(Last-In-First-Out) principle.
Imagine a stack of plates: the last plate added (pushed) is the first one retrieved (popped). Stacks excel in scenarios where the order of element insertion and removal is crucial.

Basic operations we can do on a stack are:

- Push: Adds a new element on the stack.
- Pop: Removes and returns the top element from the stack.
- Peek: Returns the top element on the stack.
- isEmpty: Checks if the stack is empty.
- Size: Finds the number of elements in the stack.

## Stack Implementation using Arrays vs Linked Lists
You can implement a stack using either an array or a linked list. Both have advantages and disadvantages.

### Array-based
#### Advantages
- **Memory Efficient**: Array elements do not hold the next elements address like linked list nodes do.
- **Easier to implement** and understand: Using arrays to implement queues require less code than using linked lists, and for this reason it is typically easier to understand as well.
- **It is faster compared to a list-based** queue due to contigous memory allocation.

#### Disadvantages
- **Fixed size**: An array occupies a fixed part of the memory. This means that it could take up more memory than needed, or if the array fills up, it cannot hold more elements. And resizing an array can be costly.

In contrast to the queue, there is no shifting cost, as the last element is poppend from the array.

### Linked list-based
#### Advantages
- **Dynamic size**: The queue can grow and shrink dynamically, unlike with arrays.

#### Disadvantages
- **Extra memory**: Each queue element must contain the address to the next element (the next linked list node) in addition to the actual data.
- **Readability**: The code might be harder to read and write for some because it is longer and more complex.
