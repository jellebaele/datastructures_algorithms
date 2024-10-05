# Queues

This is a way of organizing elements in a FIFO-manner: First In First Out.

Basic operations we can do on a queue are:

- Enqueue: Adds a new element to the queue.
- Dequeue: Removes and returns the first (front) element from the queue.
- Peek: Returns the first element in the queue.
- isEmpty: Checks if the queue is empty.
- Size: Finds the number of elements in the queue.

## Queue Implementation using Arrays vs Linked Lists
You can implement a queue using either an array or a linked list. Both have advantages and disadvantages.

### Array-based
#### Advantages
- **Memory Efficient**: Array elements do not hold the next elements address like linked list nodes do.
- **Easier to implement** and understand: Using arrays to implement queues require less code than using linked lists, and for this reason it is typically easier to understand as well.
- **It is faster compared to a list-based** queue due to contigous memory allocation.

#### Disadvantages
- **Fixed size**: An array occupies a fixed part of the memory. This means that it could take up more memory than needed, or if the array fills up, it cannot hold more elements. And resizing an array can be costly.
- **Shifting cost**: Dequeue causes the first element in a queue to be removed, and the other elements must be shifted to take the removed elements' place. This is inefficient and can cause problems, especially if the queue is long.

### Linked list-based
#### Advantages
- **Dynamic size**: The queue can grow and shrink dynamically, unlike with arrays.
- **No shifting**: The front element of the queue can be removed (enqueue) without having to shift other elements in the memory.

#### Disadvantages
- **Extra memory**: Each queue element must contain the address to the next element (the next linked list node) in addition to the actual data.
- **Readability**: The code might be harder to read and write for some because it is longer and more complex.