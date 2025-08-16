# Hash table

https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/


## 1. Core Structure and Time/Space Complexity

A hash map uses an array as its primary storage mechanism. Each position in this array is a **bucket**. The size of this array, often called the **capacity**, is different from the number of elements currently stored, which is the **size**. This distinction is key to understanding the **load factor**.

The $O(1)$ average time complexity for operations like insertion and lookup is a result of a good hash function that distributes keys evenly. However, the worst-case is $O(n)$ if all keys hash to the same bucket, forcing you to linearly traverse all $n$ elements in a single chain. The space complexity is $O(n)$ because you're storing $n$ key-value pairs.

---

## 2. Hashing and Distribution

The hash function's goal is to convert any key into a small, non-negative integer. The modulo operator, `hash_code % capacity`, then maps this integer to an index within the table's bounds.

For strings, a simple hash function might be to sum the ASCII values of the characters. However, this is prone to collisions (e.g., "ab" and "ba" would have the same hash). A better approach is the **polynomial rolling hash function**:

$h(S) = (S_0 \cdot p^0 + S_1 \cdot p^1 + S_2 \cdot p^2 + \dots + S_{n-1} \cdot p^{n-1}) \pmod m$

* $S$: The string of length $n$.
* $S_i$: The character at index $i$.
* $p$: A small prime number (e.g., 31 or 37).
* $m$: The modulus, often the capacity of the hash table. Using a large prime for `m` can also help distribute hashes better. 

---

## 3. Deeper into Separate Chaining

In separate chaining, each bucket holds a collection of key-value pairs.

**Why a Linked List over an Array?**

While you could use a dynamic array (like JavaScript's `Array` or C++'s `std::vector`) within each bucket, a **linked list** is generally a more natural fit for separate chaining for a couple of reasons:

* **Efficient Insertion**: Adding a new item to a linked list is always an $O(1)$ operation, regardless of the list's current size. With a dynamic array, you might need to reallocate and copy all elements if the array runs out of space, which can be an expensive $O(k)$ operation, where $k$ is the number of elements in that bucket.
* **Memory Efficiency**: Linked lists only allocate memory for the nodes they need, avoiding the potentially wasted space of a dynamic array's pre-allocated capacity. This can be more memory-efficient if many buckets only contain one or two elements.

While searching within a linked list is $O(k)$, where $k$ is the chain length, a good hash function keeps these chains short, making the operation fast in practice.

---

## 4. Deeper into Open Addressing and Deletions

Open addressing places all key-value pairs directly in the main table. When a collision occurs, a probing sequence is used to find the next empty slot.

**Quadratic Probing** is a more sophisticated method than linear probing to avoid **primary clustering**, where consecutive elements form long chains. The formula for the probing sequence is:

$h(key, i) = (h(key) + i^2) \pmod{capacity}$

* $i$: The probe number (0, 1, 2, ...).
* $h(key)$: The initial hash of the key.

This method "jumps" to different parts of the table, helping to distribute elements more evenly.

**The Deletion Problem**

The main drawback of open addressing is deletion complexity. If you simply remove an element, you create a "hole" in the table. This breaks the probe sequence for any other key that was placed in a subsequent slot after probing past the deleted element. The solution is **lazy deletion** using a **tombstone** marker. When an element is deleted, its slot is not truly emptied but marked with a special flag. A lookup operation will skip over a tombstone, but an insertion operation can overwrite it. This solves the immediate problem but leads to **table fragmentation**, which eventually requires a full rehash to restore performance. 

---

## 5. Resizing: Load Factor and Threshold

The **load factor ($\lambda$)** is a key metric for determining when to resize:

$\lambda = \frac{\text{number of elements}}{\text{capacity}}$

The **threshold** is a predetermined value for the load factor, typically between **0.7 and 0.8**. When $\lambda$ exceeds this threshold, the hash map's performance begins to degrade due to an increasing number of collisions. To fix this, you perform a **resize**:

1.  Create a new table, usually with double the capacity.
2.  Iterate through all the key-value pairs in the old table.
3.  For each pair, **rehash** the key and insert it into the new table. This is necessary because the modulo operation will produce a different index with the new capacity.

This process is expensive, but it's crucial for maintaining the hash map's $O(1)$ average-case performance.