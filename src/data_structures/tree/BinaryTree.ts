// https://dtjv.io/the-generic-tree-data-structure/

import BreadthFirstSearch from '../../searching/binary_tree/breadth_first_search/BreadthFirstSearch';
import Queue from '../queue/Queue';
import Stack from '../stack/Stack';
import ITree, { TraversalStrategy } from './ITree';
import TreeNode from './TreeNode';

export default class BinaryTree<T> implements ITree<T> {
  public root: TreeNode<T> | null;

  constructor(rootData: T) {
    this.root = new TreeNode(rootData);
  }

  public insert(key: T): TreeNode<T> {
    if (!this.root) {
      this.root = new TreeNode(key);
      return this.root;
    }

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const currNode = queue.dequeue();
      if (!currNode) continue;

      if (!currNode.leftChild) {
        currNode.leftChild = new TreeNode(key);
        return currNode.leftChild;
      } else {
        queue.enqueue(currNode.leftChild);
      }

      if (!currNode.rightChild) {
        currNode.rightChild = new TreeNode(key);
        return currNode.rightChild;
      } else {
        queue.enqueue(currNode.rightChild);
      }
    }

    throw new Error(`Unable to insert a new TreeNode for key ${key}'.`);
  }

  // Any traversal method can be used to search.
  // The most common methods are depth-first search (DFS)
  // and breadth-first search (BFS)
  public search(element: T): TreeNode<T> | null {
    const comparator = (a: T, b: T) => (a === b ? 1 : 0);

    return new BreadthFirstSearch(comparator).search(element, this.root);
  }

  remove(key: T): void {
    if (!this.root) return;

    if (this.root.isLeaf() && this.root.data === key) {
      this.root = null;
      return;
    }

    const { nodeToRemove, rightmostNode } = this.getNodeToRemoveAndRightmostNode(key);

    if (nodeToRemove) {
      const newData = rightmostNode.data;
      this.removeNode(rightmostNode);
      nodeToRemove.data = newData;
    }
  }

  private getNodeToRemoveAndRightmostNode(key: T) {
    let nodeToRemove: TreeNode<T> | null = null;
    let currNode: TreeNode<T> | undefined = undefined;
    if (!this.root) return { nodeToRemove: null, rightmostNode: null };

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      currNode = queue.dequeue();
      if (!currNode) continue;

      if (currNode.data === key) nodeToRemove = currNode;
      if (currNode.leftChild) queue.enqueue(currNode.leftChild);
      if (currNode.rightChild) queue.enqueue(currNode.rightChild);
    }

    if (!currNode) throw new Error('Unable to find the rightmost node.');

    return { nodeToRemove, rightmostNode: currNode };
  }

  private removeNode(nodeToDelete: TreeNode<T>): void {
    if (!this.root) return;

    const stack = new Stack<TreeNode<T> | null>();
    stack.push(this.root);

    while (stack.size > 0) {
      const currentNode = stack.pop();
      if (!currentNode) continue;

      if (currentNode.leftChild) {
        if (currentNode.leftChild.data === nodeToDelete.data) {
          currentNode.leftChild = null;
          return;
        } else {
          stack.push(currentNode.leftChild);
        }
      }

      if (currentNode.rightChild) {
        if (currentNode.rightChild.data === nodeToDelete.data) {
          currentNode.rightChild = null;
          return;
        } else {
          stack.push(currentNode.rightChild);
        }
      }
    }
  }

  get height(): number {
    if (!this.root) return 0;

    let height = 0;
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const currLevelSize = queue.size;
      height++;

      for (let i = 0; i < currLevelSize; i++) {
        const currNode = queue.dequeue();

        if (currNode?.leftChild) queue.enqueue(currNode.leftChild);
        if (currNode?.rightChild) queue.enqueue(currNode.rightChild);
      }
    }

    return height;
  }

  getLevel(key: T): number {
    if (!this.root) return -1;

    let level = 0;
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const currentLevelSize = queue.size;
      level++;

      for (let i = 0; i < currentLevelSize; i++) {
        const currNode = queue.dequeue();

        if (currNode?.data === key) return level;
        if (currNode?.leftChild) queue.enqueue(currNode.leftChild);
        if (currNode?.rightChild) queue.enqueue(currNode.rightChild);
      }
    }

    return -1;
  }

  getLeafs(): T[] {
    if (!this.root) return [];

    const result: T[] = [];
    const stack = new Stack<TreeNode<T>>();
    stack.push(this.root);

    while (stack.size > 0) {
      const currNode = stack.pop();

      if (currNode?.isLeaf()) result.push(currNode.data);
      if (currNode?.leftChild) stack.push(currNode.leftChild);
      if (currNode?.rightChild) stack.push(currNode.rightChild);
    }

    return result;
  }

  toArray(traversalStrategy: TraversalStrategy): T[] {
    switch (traversalStrategy) {
      case TraversalStrategy.IN_ORDER_TRAVERSAL:
        return this.toArrayInOrder(this.root);
      case TraversalStrategy.PRE_ORDER_TRAVERSAL:
        return this.toArrayPreOrder(this.root);
      case TraversalStrategy.POST_ORDER_TRAVERSAL:
        return this.toArrayPostOrder(this.root);
      case TraversalStrategy.LEVEL_ORDER_TRAVERSAL:
        return this.toArrayLevelOrder();
    }
  }

  // Left, Root, Right
  private toArrayInOrder(node: TreeNode<T> | null, arr: T[] = []): T[] {
    if (!node) return [];

    this.toArrayInOrder(node.leftChild, arr);
    arr.push(node.data);
    this.toArrayInOrder(node.rightChild, arr);

    return arr;
  }

  // Root, Left, Right
  private toArrayPreOrder(node: TreeNode<T> | null, arr: T[] = []): T[] {
    if (!node) return [];

    arr.push(node.data);
    this.toArrayPreOrder(node.leftChild, arr);
    this.toArrayPreOrder(node.rightChild, arr);

    return arr;
  }

  // Left, Right, Root
  private toArrayPostOrder(node: TreeNode<T> | null, arr: T[] = []): T[] {
    if (!node) return [];

    this.toArrayPostOrder(node.leftChild, arr);
    this.toArrayPostOrder(node.rightChild, arr);
    arr.push(node.data);

    return arr;
  }

  // BFS
  private toArrayLevelOrder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const currNode = queue.dequeue();
      if (!currNode) continue;

      result.push(currNode.data);

      if (currNode.leftChild) queue.enqueue(currNode.leftChild);
      if (currNode.rightChild) queue.enqueue(currNode.rightChild);
    }

    return result;
  }
}
