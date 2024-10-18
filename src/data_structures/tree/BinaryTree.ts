// https://dtjv.io/the-generic-tree-data-structure/

import BreadthFirstSearch from '../../searching/binary_tree/breadth_first_search/BreadthFirstSearch';
import DepthFirstSearch from '../../searching/binary_tree/depth_first_search/DepthFirstSearch';
import NotFoundError from '../../shared/errors/NotFoundError';
import Queue from '../queue/Queue';
import Stack from '../stack/Stack';
import { SearchStrategy, TraversalStrategy } from './ITree';

interface IBinaryTree<T> {
  insert(key: T): TreeNode<T>;
  remove(key: T): void;
  get height(): number;
  getLevel(key: T): number;
  getLeafs(): Array<T>;
  toArray(traversalStrategy: TraversalStrategy): Array<T>;
  search(element: T, searchStrategy: SearchStrategy): TreeNode<T> | null;
}

export class TreeNode<T> {
  data: T;
  leftChild: TreeNode<T> | null;
  rightChild: TreeNode<T> | null;

  constructor(
    data: T,
    leftChild: TreeNode<T> | null = null,
    rightChild: TreeNode<T> | null = null,
  ) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

  public isLeaf(): boolean {
    return !this.leftChild && !this.rightChild;
  }
}

export default class BinaryTree<T> implements IBinaryTree<T> {
  root: TreeNode<T> | null;

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

    // BFS to insert a new node
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
  public search(element: T, searchStrategy: SearchStrategy): TreeNode<T> | null {
    const comparator = (a: T, b: T) => (a === b ? 1 : 0);

    switch (searchStrategy) {
      case SearchStrategy.BFS:
        return new BreadthFirstSearch(comparator).search(element, this.root);
      case SearchStrategy.DFS:
        return new DepthFirstSearch(comparator).search(element, this.root);
    }
  }

  public toArray(traversalStrategy: TraversalStrategy): Array<T> {
    switch (traversalStrategy) {
      case TraversalStrategy.IN_ORDER_TRAVERSAL:
        return this.inOrderTraversal(this.root);
      case TraversalStrategy.PRE_ORDER_TRAVERSAL:
        return this.preOrderTraversal(this.root);
      case TraversalStrategy.POST_ORDER_TRAVERSAL:
        return this.postOrderTraversal(this.root);
      case TraversalStrategy.LEVEL_ORDER_TRAVERSAL:
        return this.levelOrderTraversel(this.root);
    }
  }

  remove(key: T): void {
    if (!this.root) return;

    if (this.root.isLeaf()) {
      if (this.root.data === key) {
        this.root = null;
      }
      return;
    }

    const { nodeToDelete, rightmostNode } = this.getNodeToDeleteAndRightmostNode(key, this.root);

    if (nodeToDelete) {
      const newData = rightmostNode.data;
      this.removeNode(rightmostNode, this.root);
      nodeToDelete.data = newData;
    }
  }

  private getNodeToDeleteAndRightmostNode(key: T, startNode: TreeNode<T>) {
    let nodeToDelete: TreeNode<T> | null = null;
    let currNode: TreeNode<T> | undefined;
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(startNode);

    while (queue.size > 0) {
      currNode = queue.dequeue();
      if (!currNode) continue;

      if (currNode.data === key) nodeToDelete = currNode;
      if (currNode.leftChild) queue.enqueue(currNode.leftChild);
      if (currNode.rightChild) queue.enqueue(currNode.rightChild);
    }

    if (currNode === undefined)
      throw new NotFoundError('Cannot delete as the rightmost node is not found.');

    return { nodeToDelete, rightmostNode: currNode };
  }

  private removeNode(nodeToDelete: TreeNode<T>, startNode: TreeNode<T>) {
    const stack = new Stack<TreeNode<T> | null>();
    stack.push(startNode);

    while (stack.size > 0) {
      let currentNode = stack.pop();
      if (!currentNode) continue;

      if (currentNode.data === nodeToDelete.data) {
        currentNode = null;
        return;
      }

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
    if (this.root.isLeaf()) return 1;

    let height = 0;
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const sQize = queue.size;

      for (let i = 0; i < sQize; i++) {
        const currNode = queue.dequeue();
        if (!currNode) continue;

        if (currNode.leftChild) queue.enqueue(currNode.leftChild);
        if (currNode.rightChild) queue.enqueue(currNode.rightChild);
      }

      height++;
    }

    return height;
  }

  getLevel(key: T): number {
    if (!this.root) return -1;
    if (this.root.data === key) return 1;

    let level = 1;
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const qSize = queue.size;

      for (let i = 0; i < qSize; i++) {
        const currNode = queue.dequeue();
        if (!currNode) continue;

        if (currNode.data === key) return level;
        if (currNode.leftChild) queue.enqueue(currNode.leftChild);
        if (currNode.rightChild) queue.enqueue(currNode.rightChild);
      }

      level++;
    }

    return -1;
  }

  getLeafs(): T[] {
    if (!this.root) return [];
    if (this.root.isLeaf()) return [this.root.data];

    const result: T[] = [];
    const stack = new Stack<TreeNode<T>>();
    stack.push(this.root);

    while (stack.size > 0) {
      const currNode = stack.pop();
      if (!currNode) continue;

      if (currNode.isLeaf()) result.push(currNode.data);
      if (currNode.leftChild) stack.push(currNode.leftChild);
      if (currNode.rightChild) stack.push(currNode.rightChild);
    }

    return result;
  }

  // In-order DFS: Left, Root, Right
  private inOrderTraversal(node: TreeNode<T> | null | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    if (node.leftChild) this.inOrderTraversal(node.leftChild, arr);
    arr.push(node.data);
    if (node.rightChild) this.inOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Pre-order DFS: Root, Left, Right
  private preOrderTraversal(node: TreeNode<T> | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    arr.push(node.data);
    if (node.leftChild) this.preOrderTraversal(node.leftChild, arr);
    if (node.rightChild) this.preOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Post-order DFS: Left, Right, Root
  private postOrderTraversal(node?: TreeNode<T> | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    if (node.leftChild) this.postOrderTraversal(node.leftChild, arr);
    if (node.rightChild) this.postOrderTraversal(node.rightChild, arr);
    arr.push(node.data);

    return arr;
  }

  // BFS
  private levelOrderTraversel(node: TreeNode<T> | null): Array<T> {
    const result: Array<T> = [];
    if (!node) return result;

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(node);

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
