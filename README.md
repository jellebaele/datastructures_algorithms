# Datastructure and Algorithms

## Data Structures

### General overview

General table average time complexity of different data structures for different operations:

| Data Structure     | Access   | Search   | Insertion | Deletion |
| ------------------ | -------- | -------- | --------- | -------- |
| Array              | O(1)     | O(N)     | O(N)      | O(N)     |
| Stack              | O(N)     | O(N)     | O(1)      | O(1)     |
| Queue              | O(N)     | O(N)     | O(1)      | O(1)     |
| Singly Linked List | O(N)     | O(N)     | O(1)      | O(1)     |
| Doubly Linked List | O(N)     | O(N)     | O(1)      | O(1)     |
| Hash Table         | O(1)     | O(1)     | O(1)      | O(1)     |
| Binary Search Tree | O(log N) | O(log N) | O(log N)  | O(log N) |
| AVL Tree           | O(log N) | O(log N) | O(log N)  | O(log N) |
| B Tree             | O(log N) | O(log N) | O(log N)  | O(log N) |
| Red Black Tree     | O(log N) | O(log N) | O(log N)  | O(log N) |

TODO GRAPH?

#### Conclusion

1. **Array**

   - **Use When**: You need fast access to elements by index (O(1) time complexity) and the size of the data does not change frequently.
   - **Avoid When**: Frequent insertions or deletions are required, as these operations are costly (O(N)).

2. **Stack**
   - **Use When**: You need Last-In-First-Out (LIFO) order for elements, such as in undo mechanisms,parsing expressions, and function call management.
   - **Avoid When**: Random access or searching within the stack is needed, as these operations are O(N).

3. **Queue**

   - **Use When**: You need First-In-First-Out (FIFO) order, such as in scheduling, task management, and breadth-first traversal of graphs.
   - **Avoid When**: You need random access or searching within the queue, as these operations are O(N).

4. **Singly Linked List**

   - **Use When**: You need frequent insertions and deletions, especially at the beginning or end, and access/search times are not critical.
   - **Avoid When**: Fast access or searching is required, as accessing and searching take O(N) time.

5. **Doubly Linked List**

   - **Use When**: You need bidirectional traversal, and frequent insertions and deletions from both ends are required.
   - **Avoid When**: Access or search times are critical, similar to a singly linked list.

6. **Hash Table**

   - **Use When**: You need fast access, insertion, and deletion by key (average O(1) time complexity), such as in caching, lookup tables, and managing sets of data.
   - **Avoid When**: There is a need for ordered data or when hash collisions degrade performance.

7. **Binary Search Tree (BST)**
   - **Use When**: You need sorted data with reasonably fast access, insertion, and deletion (O(logN)). Useful for dynamic data that needs to be kept sorted.
   - **Avoid When**: The data is unbalanced, which can degrade performance to O(N).

8. **AVL Tree**
   - **Use When**: You need a balanced BST with guaranteed O(log N) performance for access, insertion, and deletion, such as in databases and memory management.
   - **Avoid When**: Overhead of maintaining balance is not justified, such as when data doesn't require frequent modifications.

9. **B Tree**

   - **Use When**: You need balanced multi-way search trees for disk storage and databases, as they handle large blocks of data efficiently.
   - **Avoid When**: Data is small or resides in memory where simpler structures like AVL or Red-Black Trees suffice.

10. **Red-Black Tree**
    - **Use When**: You need a self-balancing BST with good performance guarantees (O(log N)),commonly used in libraries (e.g., Java's TreeMap, C++'s map).
    - **Avoid When**: Memory overhead of maintaining color information isn't justified.

TODO: GRPAH?

#### Javascript specific

[Unveiling the Speed of JavaScript Collections: Set vs. Map vs. Array vs. Object](https://medium.com/@dm_md/unveiling-the-speed-of-javascript-collections-set-vs-map-vs-array-vs-object-3f6e44f24505#:~:text=Map%20is%20optimized%20for%20key,leading%20to%20higher%20memory%20usage.)

- Use Set when you need to store unique values and perform fast lookups.
- Use Map when you need to associate values with keys and perform fast lookups based on keys.
- Use Array when you need to maintain an ordered collection of items and perform operations that benefit from the array's index-based access.
- Use Object when you need a simple key-value store and don't require the additional features provided by Map.

#### Key Takeaway

- **Arrays** are best for static data where random access is key.
- **Stacks** and **queues** are ideal for managing sequential access with specific LIFO or FIFO requirements.
- **Linked lists** are suitable for dynamic data with frequent insertions/deletions.
- **Hash tables** provide fast access when key lookups are frequent.
- **Trees** (BST, AVL, Red-Black, B-Tree) are optimal for maintaining sorted order with fast access, insertion, and deletion, particularly when balance is critical.

Sources:

- [8 basic data structures plus a guide to algorithms](https://www.godaddy.com/resources/in/web-pro-in/8-basic-data-structures-every-programmer-should-know#h-1-nbsp-nbsp-arrays)
- [Elements of Programming: Fundamental Data Structures](https://medium.com/geekculture/elements-of-programming-fundamental-data-structures-882a6e57245f)
- [Data Structures: A Comprehensive Introduction](https://dev.to/m__mdy__m/data-structures-a-comprehensive-introduction-2o13#:~:text=Data%20structures%20define%20the%20organization,character%20strings%20used%20as%20tags.)
- [Time complexities of different data structures](https://www.geeksforgeeks.org/time-complexities-of-different-data-structures/)
- Grokking Algorithms

### Array

An array is a fundamental data structure that stores a fixed-size, ordered collection of elements of the same data type. Elements are accessed using a numerical index, starting from 0. It's like a shelf where each item has a designated position.

#### Time Complexity

- **Access**: O(1) - Constant time. Arrays allow direct retrieval of any element using its index,
  providing exceptionally fast access.
- **Search**: O(n) - Linear time in the worst case. Searching for an element without knowing its
  index can be slow, as it may require traversing the entire array.
- **Insertion**: O(n) - Linear time in the worst case. Inserting in the middle requires shifting elements, making it costly. Insertion at the beginning or end can be optimized to O(1) in some implementations.
- **Deletion**: O(n) - Linear time in the worst case. Deleting an element in the middle requires shifting elements. Deletion at the beginning or end can be O(1) in some implementations.

#### Applications of Arrays

- **Storing Large Datasets**: Efficient for storing extensive collections like student grades, inventory items, or image pixel values.
- **Building Block for Other Structures**: Used to construct matrices, stacks, and queues.
- **Random Access Operations**: Ideal when frequent retrieval of elements by position is crucial.

#### Advantages of Arrays

- **Efficient Random Access**: Constant time access (O(1)) using indices.
- **Straightforward Implementation**: Simple and intuitive to use.
- **Cache-Friendly Access**: Contiguous memory allocation optimizes CPU cache usage.

#### Disadvantages of Arrays

- **Fixed Size Limitation**: Arrays cannot be resized once created.
- **Costly Insertions/Deletions in the Middle**: Shifting elements makes these operations expensive.
- **Potential Memory Wastage**: Unused allocated space leads to inefficiency.

### Linked Lists

Linked lists offer a dynamic alternative to arrays, particularly when dealing with data of varying sizes or requiring frequent insertions and deletions. Unlike arrays, linked lists are dynamic data
structures, meaning their size can adjust as needed at runtime. This flexibility comes at the cost of slightly slower random access compared to arrays.

#### Understanding the Structure

A linked list is a collection of nodes, where each node stores two pieces of information:

- **Data**: The actual element held by the node (can be of any data type).
- **Pointer (or reference)**: A reference (address) to the next node in the sequence. The last node's pointer typically points to null (or an equivalent value), indicating the end of the list.

#### Time Complexity

- **Access**: O(n) - Linear time in the worst case. Random access is slower than arrays as you need to traverse the list from the beginning, following pointers, until you reach the desired node.
- **Search**: O(n) - Linear time in the worst case. Similar to access, searching for a specific
  element involves iterating through the list.
- **Insertion**: O(1) - Constant time in the average case. Inserting a new node at the beginning of
  a singly linked list is a constant time operation, as you only need to update the head pointer.
  Insertion at any other position can also be done in constant time with appropriate pointer
  manipulation.
- **Deletion**: O(1) - Constant time in the average case, assuming you have a reference to the node to be deleted. Deletion involves adjusting pointers to bypass the unwanted node.

#### Applications of Linked Lists

- **Implementing Stacks and Queues**: They are the foundation for building stacks (LIFO -
  Last-In-First-Out) and queues (FIFO - First-In-First-Out) due to their efficient insertion and
  deletion operations at specific ends.
- **Sparse Data Representation**: When dealing with sparse data structures like adjacency lists for graphs, where most elements might be empty, linked lists avoid wasting memory compared to arrays that allocate space for all elements.
- **Dynamic Data Management**: They are well-suited for situations where the data collection's size is unknown beforehand or needs to grow or shrink during program execution.

#### Advantages

- **Dynamic Size**: Linked lists can grow or shrink as needed, making them ideal for data of varying sizes.
- **Efficient Insertions/Deletions**: Inserting or deleting elements at any point in the list is generally a constant time operation (O(1)), especially at the beginning or end, unlike arrays that require shifting elements.
- **No Memory Wastage**: Memory is allocated only for the nodes that are present in the list, avoiding wasted space for unused elements in arrays.

#### Disadvantages

- **Slower Random Access**: Compared to arrays, accessing elements by their index is slower (O(n)) as you need to traverse the list.
- **More Complex Implementation**: The pointer-based structure can introduce additional complexity compared to the simpler contiguous memory allocation of arrays.
- **Memory Overhead**: Each node stores an extra pointer reference, which can lead to slightly higher memory usage compared to arrays for storing basic data types.

#### Simple Example

Imagine a train with linked cabins. Each cabin (node) has:

- Passengers (data)
- A door leading to the next cabin (pointer)

The first cabin (head) has a special marker indicating it's the beginning. The last cabin's door leads to nowhere (null pointer), signifying the end. To add a new cabin, you simply connect it to
the existing train. To remove a cabin, you adjust the pointers to bypass it.

### Stack

A stack is a fundamental data structure that adheres to the LIFO(Last-In-First-Out) principle.
Imagine a stack of plates: the last plate added (pushed) is the first one retrieved (popped). Stacks excel in scenarios where the order of element insertion and removal is crucial.

#### Time Complexity Analysis

- **Push**: O(1) - Constant time. Adding an element (pushing a plate) to the top of the stack is a quick operation, typically involving updating a single pointer (reference) to the top element.
- **Pop**: O(1) - Constant time. Removing the top element (popping a plate) is also a constant time operation, as you simply access and remove the element referenced by the top pointer.
- **Peek**: O(1) - Constant time. In some implementations, you can examine the top element without removing it (peeking at the top plate). This operation usually takes constant time as well.
- **Search**: O(n) - Linear time in the worst case. While pushing and popping are efficient, searching for a specific element within the stack can be slow (O(n)) in the worst case. You might need to traverse the entire stack to find the desired element.

#### Applications of Stacks

- **Function Call Stack**: Used by computer systems to manage function calls. When a function is called, its arguments and local variables are pushed onto the stack. When the function returns, its information is popped off the stack.
- **Expression Evaluation**: Stacks are instrumental in evaluating expressions using postfix or prefix notation. Operators and operands are pushed onto the stack, and calculations are performed based on the LIFO order.
- **Undo/Redo Functionality**: Stacks are used to implement undo/redo functions in various software applications. Each action can be pushed onto the stack, allowing users to revert to previous states by popping elements off the stack.
- **Backtracking Algorithms**: Stacks are employed in backtracking algorithms, where exploration paths are pushed onto the stack. If an unsuitable path is encountered, the stack can be used to  backtrack and explore alternative paths.

#### Advantages of Stacks

- **LIFO Order Guarantee**: The LIFO principle ensures a well-defined order for element access, making stacks suitable for operations that rely on processing elements in the reverse order they were added.
- **Efficient Push/Pop**: Adding and removing elements from the top of the stack are constant time operations, offering efficient management of the topmost element.
- **Simple Implementation**: The core concept of stacks is relatively straightforward, making them a good starting point for understanding data structures.

#### Disadvantages of Stacks

- **Limited Access**: Random access to elements within the stack is generally not supported efficiently. You can only access the top element directly, and searching for a specific element can be slow.
- **Fixed-Size Limitation (Optional)**: Some stack implementations might have a predefined size limit, restricting the number of elements that can be stored.

#### Simple Example

Imagine a stack of plates at a cafeteria. People take plates from the top (push operation) and return them by placing them on top (pop operation). This adheres to the LIFO principle. Here's a real-world analogy for each operation:

- **Push**: Adding a new item to your shopping cart (pushing an item onto the stack).
- **Pop**: Taking the topmost item out of your backpack (popping an item from the stack).
- **Peek**: Checking the topmost item in your laundry basket without removing it (peeking at the top element of the stack).

### Queue

A queue adheres to the FIFO (First-In-First-Out) principle, similar to a waiting line at a store. The first element added (enqueued) is the first element removed (dequeued). Queues are ideal for managing tasks or data that needs to be processed in the order they were received.

#### Time Complexity Analysis

- **Enqueue**: O(1) - Constant time. Adding an element (joining the back of the line) is a quick operation, typically involving updating a pointer (reference) to the last element in the queue.
- **Dequeue**: O(1) - Constant time. Removing the front element (the one who has been waiting the longest) is also a constant time operation, as you simply access and remove the element referenced by the front pointer.
- **Peek**: O(1) - Constant time. In some implementations, you can examine the front element without removing it (peeking at the front of the line). This operation usually takes constant time as well.
- **Search**: O(n) - Linear time in the worst case. While enqueue and dequeue are efficient, searching for a specific element within the queue can be slow (O(n)) in the worst case. You might need to traverse the entire queue to find the desired element.

#### Applications of Queues

- **Task Scheduling**: Operating systems use queues to manage processes waiting for CPU resources. Processes are enqueued, and the CPU dequeues them for execution in a FIFO order.
- **Breadth-First Search (BFS) Algorithms**: Queues are employed in BFS algorithms for graph traversal. Nodes are explored level by level, with neighbors of the current node enqueued for
  future exploration.
- **Data Processing Pipelines**: Queues can be used to buffer data between different stages of a processing pipeline. Data is enqueued as it becomes available, and processing units dequeue and handle it in the order it was received.
- **Message Passing Systems**: Queues are used in message passing systems to manage the transmission and reception of messages between different components. Messages are enqueued and then dequeued for processing by the receiving component.

#### Advantages of Queues

- **FIFO Order Guarantee**: The FIFO principle ensures elements are processed in the order they were added, making queues suitable for scenarios where the order of processing is crucial.
- **Efficient Enqueue/Dequeue**: Adding and removing elements from the front and back of the queue are constant time operations, offering efficient management of elements.
- **Simple Implementation**: The concept of queues is intuitive, making them a fundamental building block for more complex data management strategies.

#### Disadvantages of Queues

- **Limited Access**: Only the front and back elements can be accessed directly. Random access to other elements within the queue is not supported efficiently.
- **Fixed-Size Limitation (Optional)**: Some queue implementations may have size constraints, restricting the number of elements that can be stored.

#### Simple Example

Imagine a line of people waiting for a movie ticket. People join the back of the line (enqueue operation) and get their tickets when they reach the front (dequeue operation). This follows the FIFO principle, ensuring fair and orderly processing.

### Binary Tree

Binary trees are fundamental data structures that organize elements in a tree-like structure, where each node can have at most two child nodes (left and right). They excel at representing hierarchical relationships and enabling efficient searching, sorting, and traversal operations.

#### Time Complexity Analysis (Average Case)

- **Access**: O(log n) - Logarithmic time in the number of nodes (n). Due to the hierarchical structure, accessing a specific element involves traversing the tree, which can be done efficiently in log n time on average.
- **Search**: O(log n) - Logarithmic time. Similar to access, searching for a specific element within a binary tree is a log n operation on average, assuming the tree is balanced.
- **Insertion**: O(log n) - Logarithmic time. Inserting a new element into a balanced binary tree typically takes log n time to find the appropriate insertion point.
- **Deletion**: O(log n) - Logarithmic time. Deleting an element from a balanced binary tree also involves log n time on average for locating and restructuring the tree.

#### Applications of Binary Trees

- **Binary Search Trees (BSTs)**: A specific type of binary tree where each node's value is greater than all elements in its left subtree and less than all elements in its right subtree. BSTs enable efficient searching and sorting of data.
- **Heaps**: Specialized binary trees where the value of a node adheres to a specific order (max-heap or min-heap). Heaps are ideal for priority queues and efficient retrieval of the element with the highest or lowest value.
- **Trie Data Structures**: Employ binary trees to store strings efficiently, allowing for fast retrieval of prefixes or words with a common beginning.
- **File Systems**: Hierarchical directory structures in file systems can be represented using binary trees.

#### Advantages of Binary Trees

- **Efficient Search and Access**: Binary trees offer efficient searching and access operations (log n on average) due to their hierarchical organization.
- **Dynamic Data Management**: Binary trees can grow or shrink as needed, adapting to the size of the data set.
- **Foundation for Other Structures**: Binary trees serve as the basis for more advanced data structures like BSTs, heaps, and tries, which offer specialized functionalities.

#### Disadvantages of Binary Trees

- **Performance Relies on Balance**: The efficiency of binary trees depends heavily on their balance. Imbalanced trees can lead to O(n) worst-case time complexity for operations like search and insertion.
- **Limited Functionality for Unsorted Data**: Basic binary trees are not inherently sorted, making them less efficient for general-purpose sorting compared to sorted arrays or balanced binary search trees.

#### Simple Example

Imagine a family tree. Each person is a node in the binary tree, with parents as the parent nodes and children as the child nodes. This structure allows for efficient navigation (finding a specific ancestor or descendant) based on the hierarchical relationships between family members.

### Binary Search Tree (BST)

A Binary Search Tree (BST) is a hierarchical data structure where each node can have a maximum of two child nodes: a left child and a right child. Nodes contain data of any type, and each node's value maintains the property that values in the left subtree are less than the node, while values in
the right subtree are greater. This structure enables efficient searching, insertion, and deletion
operations.

#### Time Complexity Analysis

- **Access**: O(h) - Linear time in the height of the tree in the worst case. Random access (finding
  a specific node) can be slow in unbalanced trees, requiring traversing down to the target node
  based on its value. However, balanced trees like AVL trees or red-black trees guarantee O(log n)
  access time on average.
- **Search**: O(h) - Linear time in the height of the tree in the worst case. Similar to access,
  searching for a specific value can be slow in unbalanced trees. Balanced trees offer O(log n)
  search time on average.
- **Insertion**: O(h) - Linear time in the height of the tree in the worst case. Inserting a new
  node can be slow in unbalanced trees, requiring finding the appropriate position for insertion.
  Balanced trees maintain their structure during insertion, keeping insertion time at O(log n) on
  average.
- **Deletion**: O(h) - Linear time in the height of the tree in the worst case. Deleting a node can
  be complex in unbalanced trees, potentially requiring restructuring the tree. Balanced trees
  maintain their balance during deletion, keeping deletion time at O(log n) on average.

#### Applications of Binary Search Trees

- **File Systems**: Hierarchical directory structures in file systems are often represented using
  binary trees, where folders act as nodes and files are stored as leaves.
- **Search Trees**: BSTs allow efficient searching (O(log n) on average) and traversal of elements
  in sorted order.
- **Expression Trees**: Binary trees can be used to represent mathematical expressions. Nodes hold
  operators or operands, and the tree structure reflects the order of operations.
- **Huffman Coding**: Binary trees are used in Huffman coding for data compression, where frequently
  occurring symbols are assigned shorter codes for efficient storage and transmission.

#### Advantages of Binary Search Trees

- **Hierarchical Representation**: BSTs are well-suited for representing hierarchical relationships
  between data elements, making them ideal for modeling file systems, organizational structures, or
  family trees.
- **Efficient Searching (Balanced Trees)**: Balanced BSTs (AVL trees, red-black trees) offer
  efficient searching and sorting algorithms with O(log n) average time complexity.
- **Dynamic Structure**: BSTs can grow or shrink as needed, allowing them to adapt to changing data
  sets.

#### Disadvantages of Binary Search Trees

- **Performance Relies on Balance**: Unbalanced BSTs can lead to poor performance for access,
  search, insertion, and deletion operations.
- **Not Self-Balancing (Basic Binary Trees)**: Basic BST implementations require manual balancing to
  ensure optimal performance. Balanced tree variants like AVL trees or red-black trees address this
  automatically.
- **More Complex Implementation**: Compared to arrays or linked lists, BSTs involve more complex
  logic for navigating the tree structure and maintaining balance.

#### Simple Example

Imagine an ancestral family tree. Each person is a node in the tree, with parents as the left and
right children. The root node represents the oldest ancestor. Traversing the tree allows you to find
relationships between family members efficiently. However, an unbalanced family tree (e.g., with all
children on one side) would be less efficient for searching specific ancestors.

### Hashing

Hashing data structures offer a powerful technique for storing and retrieving data based on a key.
They excel in scenarios where fast access to specific elements is crucial, especially when dealing
with large datasets.

#### Key Concepts

- **Hash Function**: A function that takes a key (data) and maps it to a unique index (hash value)
  within a hash table. Ideally, the hash function should distribute keys uniformly across the hash
  table to minimize collisions.
- **Hash Table**: An array-like structure where elements are stored at positions determined by their
  hash values.

#### Time Complexity Analysis (Average Case)

- **Access**: O(1) - Constant time. The beauty of hashing lies in its ability to retrieve elements
  based on their key in constant time on average, assuming a good hash function and minimal
  collisions.
- **Search**: O(1) - Constant time on average. Similar to access, searching for a specific element
  using its key is a constant time operation on average.
- **Insertion**: O(1) - Constant time on average. Inserting a new key-value pair into the hash table
  can be done in constant time on average, assuming the hash table is not overloaded (too many
  elements for its size).
- **Deletion**: O(1) - Constant time on average. Deleting a key-value pair from the hash table can
  also be done in constant time on average, provided efficient collision resolution techniques are
  employed.

#### Applications of Hashing

- **Symbol Tables**: Hash tables are a cornerstone for implementing symbol tables, which map
  symbolic names (keys) to their corresponding values (variables, functions). This allows for quick
  lookup of variables based on their names in programming languages.
- **Databases (Key-Value Stores)**: Many databases employ hash tables internally for efficient
  retrieval of data based on unique keys (e.g., user ID, product ID).
- **Memcached (Caching)**: Caching systems often utilize hash tables to store frequently accessed
  data for rapid retrieval, improving overall application performance.
- **Spell Checkers and Autocomplete**: Hash tables are used in spell checkers to efficiently
  identify misspelled words and suggest corrections. Similarly, they power autocomplete
  functionality by providing quick suggestions based on partially typed input.

#### Advantages of Hashing

- **Fast Average-Case Access**: Hashing offers exceptional speed for retrieving elements based on
  their key, making it ideal for large datasets.
- **Dynamic Data Management**: Hash tables can grow or shrink as needed, adapting to the size of the
  data collection.
- **Efficient for Sparse Data**: For data sets with many empty keys, hash tables can be more
  space-efficient compared to storing all possible keys in an array-like structure.

#### Disadvantages of Hashing

- **Worst-Case Performance**: If the hash function is poor or the hash table becomes overloaded,
  collisions (multiple keys mapping to the same index) can occur, leading to slower O(n) lookup
  times in the worst case.
- **Limited Ordering**: Hash tables do not inherently preserve the order of elements based on their
  keys. If order is important, alternative data structures like sorted arrays or binary search trees
  might be a better fit.
- **Storage Overhead**: Hash tables require additional space for storing hash values and potentially
  managing collisions.

#### Simple Example

Imagine a phone book as a hash table. Names (keys) are mapped to phone numbers (values) using a hash
function (e.g., the first letter of the name). When you look up a friend's name (key), the hash
function quickly directs you to the appropriate section of the phone book (hash table bucket), where
you can find their number (value) efficiently. This avoids the need to scan through the entire phone
book (linear search), making lookups significantly faster, especially for large phone books.

### Graph

A graph is a fundamental data structure that models relationships between objects. It consists of a
collection of vertices (also called nodes or points) and edges (links or lines) that connect these
vertices. Graphs excel at representing networks, social connections, geographical maps, and other
scenarios where relationships between entities are crucial.

#### Time Complexity Analysis

The time complexity of operations on graphs depends on several factors, including the number of
vertices (V) and edges (E) in the graph, as well as the specific algorithm used:

- **Traversal (DFS, BFS)**: O(V + E) - Linear time in the number of vertices and edges. Traversing a
  graph (depth-first search or breadth-first search) involves visiting each vertex and its connected
  edges. In a well-structured graph, this can be done in linear time.
- **Shortest Path (Dijkstra's Algorithm)**: O(V^2) or O(E log V) - The time complexity of finding
  the shortest path between two vertices depends on the specific algorithm used. Dijkstra's
  algorithm has a complexity of O(V^2) in the worst case, but more efficient algorithms like A\*
  search can achieve O(E log V) in some scenarios.
- **Minimum Spanning Tree (Prim's Algorithm)**: O(E log V) - Finding the minimum spanning tree (a
  subset of edges that connects all vertices with minimal total edge weight) can be done in O(E log
  V) time using Prim's algorithm.
- **Topological Sort**: O(V + E) - Topological sorting, which orders vertices such that for every
  directed edge from u to v, u appears before v in the ordering, can be done in linear time (O(V +
  E)).

#### Applications of Graphs

- **Social Networks**: Social media platforms like Facebook or Twitter can be represented as graphs,
  where users are vertices and friendships are edges.
- **Navigation Systems**: GPS navigation apps use graph algorithms to find the shortest path between
  two locations on a road network (vertices) connected by roads (edges).
- **Recommendation Systems**: Online recommendation systems for products or movies can be modeled as
  graphs, where items are vertices and user preferences or similarities are edges.
- **Circuit Analysis**: Electrical circuits can be represented as graphs, where components are
  vertices and wires connecting them are edges.

#### Advantages of Graphs

- **Versatility**: Graphs can model a wide range of real-world relationships, making them a flexible
  data structure for various applications.
- **Efficient Navigation**: Algorithms like DFS, BFS, and shortest path algorithms allow for
  efficient exploration and traversal of graph structures.
- **Network Analysis**: Graphs are instrumental in analyzing network properties like connectivity,
  centrality, and clustering, which provide valuable insights in social network analysis,
  recommendation systems, and other domains.

#### Disadvantages of Graphs

- **Memory Usage**: Storing and manipulating large graphs can be memory-intensive, especially for
  dense graphs with many edges.
- **Search Complexity (Some Operations)**: Finding specific elements within a graph (e.g., a node
  with a particular property) can be slower (linear time in the worst case) compared to data
  structures like sorted arrays or binary search trees.
- **Algorithmic Choice**: Choosing the most efficient graph algorithm depends on the specific
  problem and graph properties.

#### Simple Example

Imagine a map of a city with streets as edges and intersections as vertices. A graph can represent
this map, where you can use graph algorithms to find the shortest path between two points
(navigation), identify central locations (centrality analysis), or explore connected areas (BFS).

## Algorithms

[Basic Algorithms](https://dev.to/m__mdy__m/basic-algorithms-5bep)

### Algorithm Efficiency

The efficiency of an algorithm depends on two parameters:

#### 1. Time Complexity

Time Complexity is defined as the number of times a particular instruction set is executed, rather
than the total time taken. This is because the total time also depends on external factors such as
the compiler used, the processor’s speed, etc.

#### 2. Space Complexity

Space Complexity refers to the total memory space required by the program for its execution.

### Types of Time Complexity

Both complexities are calculated as a function of input size (n). It's important to note that the
efficiency of an algorithm also depends on the nature and size of the input.

There are three types:

- **Best Time Complexity**: This defines the input for which the algorithm takes the least time or
  minimum time. In this case, we calculate the lower bound of an algorithm.  
  _Example_: In linear search, if the search data is present at the first location in a large
  dataset, the best case occurs.

- **Average Time Complexity**: This considers all random inputs and calculates the computation time
  for all inputs, which is then divided by the total number of inputs.

- **Worst Time Complexity**: This defines the input for which the algorithm takes the longest time
  or maximum time. In this case, we calculate the upper bound of an algorithm.  
  _Example_: In linear search, if the search data is present at the last location in a large
  dataset, the worst case occurs.

### Sorting

#### General overview

| Algorithm      | Best Time Complexity | Average Time Complexity | Worst Time Complexity | Worst Space Complexity |
| -------------- | -------------------- | ----------------------- | --------------------- | ---------------------- |
| Selection Sort | O(n²)                | O(n²)                   | O(n²)                 | O(1)                   |
| Bubble Sort    | O(n)                 | O(n²)                   | O(n²)                 | O(1)                   |
| Insertion Sort | O(n)                 | O(n²)                   | O(n²)                 | O(1)                   |
| Heap Sort      | O(n log(n))          | O(n log(n))             | O(n log(n))           | O(1)                   |
| Quick Sort     | O(n log(n))          | O(n log(n))             | O(n²)                 | O(n)                   |
| Merge Sort     | O(n log(n))          | O(n log(n))             | O(n log(n))           | O(n)                   |
| Bucket Sort    | O(n + k)             | O(n + k)                | O(n²)                 | O(n)                   |
| Radix Sort     | O(nk)                | O(nk)                   | O(nk)                 | O(n + k)               |
| Count Sort     | O(n + k)             | O(n + k)                | O(n + k)              | O(k)                   |
| Shell Sort     | O(n log(n))          | O(n log(n))             | O(n²)                 | O(1)                   |
| Tim Sort       | O(n)                 | O(n log(n))             | O(n log(n))           | O(n)                   |
| Tree Sort      | O(n log(n))          | O(n log(n))             | O(n²)                 | O(n)                   |
| Cube Sort      | O(n)                 | O(n log(n))             | O(n log(n))           | O(n)                   |

### Searching

Linear Search Sentinel Linear Search Binary Search Meta Binary Search | One-Sided Binary Search
Ternary Search Jump Search Interpolation Search Exponential Search Fibonacci Search The Ubiquitous
Binary Search

| Algorithm                    | Best Time Complexity | Average Time Complexity | Worst Time Complexity | Worst Space Complexity |
| ---------------------------- | -------------------- | ----------------------- | --------------------- | ---------------------- |
| Linear Search                | O(1)                 | O(n)                    | O(n)                  | O(1)                   |
| Sentinel Linear Search       | O(1)                 | O(n)                    | O(n)                  | O(1)                   |
| Binary Search                | O(1)                 | O(log n)                | O(log n)              | O(1)                   |
| Ternary Search               | O(1)                 | O(log n)                | O(log n)              | O(1)                   |
| Jump Search                  | O(1)                 | O(√n)                   | O(√n)                 | O(1)                   |
| Interpolation Search         | O(1)                 | O(log log n)            | O(n)                  | O(1)                   |
| Exponential Search           | O(1)                 | O(log n)                | O(log n)              | O(1)                   |
| Fibonacci Search             | O(1)                 | O(log n)                | O(log n)              | O(1)                   |
| The Ubiquitous Binary Search | O(1)                 | O(log n)                | O(log n)              | O(1)                   |

### Tree Traversal Algorithms
