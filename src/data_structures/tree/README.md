# Trees

The Tree data structure is similar to Linked Lists in that each node contains data and can be linked to other nodes.

Data structures like Arrays, Linked Lists, Stacks, and Queues are all linear structures, which means that each element follows directly after another in a sequence. Trees however, are different. In a Tree, a single element can have multiple 'next' elements,
allowing the data structure to branch out in various directions. 

The data structure is called a "tree" because it looks like a tree, only upside down.

The Tree data structure can be useful in many cases:

- Hierarchical Data: one reason to use trees might be because you want to store information that naturally forms a hierarchy. For example, the file system on a computer, organizational models, etc.
- Databases: Used for quick data retrieval.
- Routing Tables: Used for routing data in network algorithms.
- Sorting/Searching: Used for sorting data and searching for data.
- Priority Queues: Priority queue data structures are commonly implemented using trees, such as binary heaps.

## Types of Trees

Trees are a fundamental data structure in computer science, used to represent hierarchical
relationships.

- Binary Trees: Each node has up to two children, the left child node and the right child node. This structure is the foundation for more complex tree types like Binay Search Trees and AVL Trees.
- Ternary Tree: A tree data structure in which each node has at most three child nodes, usually distinguished as “left”, “mid” and “right”.
- Binary Search Trees (BSTs): A type of Binary Tree where for each node, the left child node has a lower value, and the right child node has a higher value.
- AVL Trees: A type of Binary Search Tree that self-balances so that for every node, the difference in height between the left and right subtrees is at most one. This balance is maintained through rotations when nodes are inserted or deleted.
- Red-Black Tree: A red-black tree is a kind of self-balancing binary search tree where each node has an extra bit, and that bit is often interpreted as the color (red or black). These colors are used to ensure that the tree remains balanced during insertions and deletions. Although the balance of the tree is not perfect, it is good enough to reduce the searching time and maintain it around O(log n) time, where n is the total number of elements in the tree.
- B-Tree: A special type of self-balancing search tree in which each node can contain more than one key and can have more than two children. It is a generalized form of the binary search tree.

### Binary Tree

https://www.w3schools.com/dsa/dsa_data_binarytrees.php

### Binary Trees vs Arrays and Linked Lists

- **Arrays** are fast when you want to access an element directly, like element number 700 in an array of 1000 elements for example. But inserting and deleting elements require other elements to shift in memory to make place for the new element, or to take the deleted elements place, and that is  time consuming.
- **Linked Lists** are fast when inserting or deleting nodes, no memory shifting needed, but to access an element inside the list, the list must be traversed, and that takes time.
- **Binary Trees**, such as Binary Search Trees and AVL Trees, are great compared to Arrays and Linked Lists because they provide **moderate** access/search (quicker than Linked List and slower than arrays), **AND moderate** insertion/deletion (quicker than Arrays and slower than Unordered Linked Lists), with no shifts in memory needed.
- Like Linked Lists and unlike Arrays, Trees don’t have an upper limit on the number of nodes as nodes are linked using pointers.

### Binary Tree vs HashMap
- https://stackoverflow.com/questions/4846468/hash-table-vs-balanced-binary-tree
- https://www.baeldung.com/java-treemap-vs-hashmap

A **HashMap** doesn’t provide any guarantee over the way the elements are arranged in the Map. It means, we can’t assume any order while iterating over keys and values of a HashMap. 

However, items in a **TreeMap** are sorted according to their natural order.

HashMap, being a hashtable-based implementation, internally uses an array-based data structure to organize its elements according to the hash function.

Properties HashMap:
- A HashMap requires way more memory than is needed to hold its data
- A HashMap shouldn’t be more than 70% – 75% full. If it gets close, it gets resized and entries rehashed
- Rehashing requires n operations which is costly wherein our constant time insert becomes of order O(n)
- It’s the hashing algorithm which determines the order of inserting the objects in the HashMap
- HashMap provides expected constant-time performance O(1) for most operations like add(), remove() and contains(). Therefore, it’s significantly faster than a TreeMap.

Properties Tree:
- TreeMap provides a performance of O(log(n)) for most operations like add(), remove() and contains()
- A Treemap can save memory (in comparison to HashMap) because it only uses the amount of memory needed to hold its items, unlike a HashMap which uses contiguous region of memory
- A tree should maintain its balance in order to keep its intended performance, this requires a considerable amount of effort, hence complicates the implementation

Choose HashTable when:
- Hash tables are generally better if there isn't any need to keep the data in any sort of sequence. 
- we prioritize performance over memory consumption.

Choose a (balanced tree) when:
- We want to keep our entries sorted
- Memory limitations have to be taken into consideration
