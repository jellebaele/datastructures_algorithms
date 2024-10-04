# Trees

The Tree data structure is similar to Linked Lists in that each node contains data and can be linked to other nodes.

We have previously covered data structures like Arrays, Linked Lists, Stacks, and Queues. These are all linear structures, which means that each element follows directly after another in a sequence. Trees however, are different. In a Tree, a single element can have multiple 'next' elements,
allowing the data structure to branch out in various directions.

The data structure is called a "tree" because it looks like a tree, only upside down.

The Tree data structure can be useful in many cases:

- Hierarchical Data: File systems, organizational models, etc.
- Databases: Used for quick data retrieval.
- Routing Tables: Used for routing data in network algorithms.
- Sorting/Searching: Used for sorting data and searching for data.
- Priority Queues: Priority queue data structures are commonly implemented using trees, such as
  binary heaps.

## Types of Trees

Trees are a fundamental data structure in computer science, used to represent hierarchical
relationships. This tutorial covers several key types of trees.

- Binary Trees: Each node has up to two children, the left child node and the right child node. This structure is the foundation for more complex tree types like Binay Search Trees and AVL Trees.
- Ternary Tree: A tree data structure in which each node has at most three child nodes, usually distinguished as “left”, “mid” and “right”.
- Binary Search Trees (BSTs): A type of Binary Tree where for each node, the left child node has a lower value, and the right child node has a higher value.
- AVL Trees: A type of Binary Search Tree that self-balances so that for every node, the difference in height between the left and right subtrees is at most one. This balance is maintained through rotations when nodes are inserted or deleted.
- Red-Black Tree: A red-black tree is a kind of self-balancing binary search tree where each node has an extra bit, and that bit is often interpreted as the color (red or black). These colors are used to ensure that the tree remains balanced during insertions and deletions. Although the balance of the tree is not perfect, it is good enough to reduce the searching time and maintain it around O(log n) time, where n is the total number of elements in the tree.
- B-Tree: A special type of self-balancing search tree in which each node can contain more than one key and can have more than two children. It is a generalized form of the binary search tree.

### Binary Tree

https://www.w3schools.com/dsa/dsa_data_binarytrees.php

### Binary Trees vs Arrays and Linked Lists

Benefits of Binary Trees over Arrays and Linked Lists:

- Arrays are fast when you want to access an element directly, like element number 700 in an array of 1000 elements for example. But inserting and deleting elements require other elements to shift in memory to make place for the new element, or to take the deleted elements place, and that is  time consuming.
- Linked Lists are fast when inserting or deleting nodes, no memory shifting needed, but to access an element inside the list, the list must be traversed, and that takes time.
- Binary Trees, such as Binary Search Trees and AVL Trees, are great compared to Arrays and Linked Lists because they are BOTH fast at accessing a node, AND fast when it comes to deleting or inserting a node, with no shifts in memory needed.

### Binary Tree vs HashMap
https://stackoverflow.com/questions/4846468/hash-table-vs-balanced-binary-tree

Hash tables are generally better if there isn't any need to keep the data in any sort of sequence. Binary trees are better if the data must be kept sorted.


Hash tables are faster lookups:
- You need a key that generates an even distribution (otherwise you'll miss a lot and have to rely on something other than hash; like a linear search).
- Hash's can use a lot of empty space. You may reserve 256 entries but only need 8 (so far).

Binary trees:
- Deterministic. O(log n) I think...
- Don't need extra space like hash tables can
- Must be kept sorted. Adding an element in the middle means moving the rest around.