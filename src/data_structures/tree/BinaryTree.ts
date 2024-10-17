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
      const temp = queue.dequeue();
      if (!temp) break;

      if (!temp.leftChild) {
        temp.leftChild = new TreeNode(key);
        return temp.leftChild;
      } else {
        queue.enqueue(temp.leftChild);
      }

      if (!temp.rightChild) {
        temp.rightChild = new TreeNode(key);
        return temp.rightChild;
      } else {
        queue.enqueue(temp.rightChild);
      }
    }

    throw new Error('Unable to insert a new node');
  }

  // Any traversal method can be used to search.
  // The most common methods are depth-first search (DFS)
  // and breadth-first search (BFS)
  public search(element: T, searchStrategy: SearchStrategy): TreeNode<T> | null {
    const comparator = (a: T, b: T) => (a === b ? 1 : 0);
    // DFS
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
        return;
      }
      return;
    }

    const { nodeToDelete, rightmostNode } = this.getKeyAndRightmostNode(key, this.root);

    if (nodeToDelete) {
      const data = rightmostNode.data;
      this.removeNode(this.root, rightmostNode);
      nodeToDelete.data = data;
    }
  }

  private getKeyAndRightmostNode(
    key: T,
    startNode: TreeNode<T>,
  ): {
    nodeToDelete: TreeNode<T> | null;
    rightmostNode: TreeNode<T>;
  } {
    let nodeToDelete: TreeNode<T> | null = null;
    let currentNode: TreeNode<T> | undefined;
    const stack = new Stack<TreeNode<T>>();
    stack.push(startNode);

    // DFS
    while (stack.size > 0) {
      currentNode = stack.pop();

      if (!currentNode) continue;

      if (currentNode.data === key) nodeToDelete = currentNode;
      if (currentNode.rightChild) stack.push(currentNode.rightChild);
      if (currentNode.leftChild) stack.push(currentNode.leftChild);
    }

    if (currentNode === undefined) throw new NotFoundError();

    return { nodeToDelete, rightmostNode: currentNode };
  }

  private removeNode(startNode: TreeNode<T>, nodeToDelete: TreeNode<T>): void {
    const stack = new Stack<TreeNode<T>>();
    stack.push(startNode);

    while (stack.size > 0) {
      let currentNode: TreeNode<T> | null | undefined = stack.pop();

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
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode<T> | null): number {
    if (!node) return 0;

    const leftDepth = this.getHeight(node.leftChild);
    const rightDepth = this.getHeight(node.rightChild);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  getLevel(key: T): number {
    if (!this.root) return -1;
    let level = 1;

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.size > 0) {
      const qSize = queue.size;

      for (let i = 0; i < qSize; i++) {
        const curr = queue.dequeue();
        if (!curr) continue;

        if (curr.data === key) return level;
        if (curr.leftChild) queue.enqueue(curr.leftChild);
        if (curr.rightChild) queue.enqueue(curr.rightChild);
      }

      level++;
    }

    return -1;
  }

  getLeafs(): T[] {
    const leafNodes: Array<T> = [];

    if (!this.root) return leafNodes;

    const stack = new Stack<TreeNode<T>>();
    stack.push(this.root);

    while (stack.size > 0) {
      const currentNode = stack.pop();
      if (!currentNode) continue;

      if (currentNode.isLeaf()) leafNodes.push(currentNode.data);
      if (currentNode.leftChild) stack.push(currentNode.leftChild);
      if (currentNode.rightChild) stack.push(currentNode.rightChild);
    }

    return leafNodes;
  }

  // In-order DFS: Left, Root, Right
  private inOrderTraversal(node?: TreeNode<T> | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    this.inOrderTraversal(node.leftChild, arr);
    arr.push(node.data);
    this.inOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Pre-order DFS: Root, Left, Right
  private preOrderTraversal(node?: TreeNode<T> | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    arr.push(node.data);
    this.preOrderTraversal(node.leftChild, arr);
    this.preOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Post-order DFS: Left, Right, Root
  private postOrderTraversal(node?: TreeNode<T> | null, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    this.postOrderTraversal(node.leftChild, arr);
    this.postOrderTraversal(node.rightChild, arr);
    arr.push(node.data);

    return arr;
  }

  // BFS
  private levelOrderTraversel(node?: TreeNode<T> | null): Array<T> {
    if (!node) return [];

    const arr: Array<T> = [];
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(node);

    while (queue.size > 0) {
      const temp = queue.dequeue();
      if (!temp) break;

      arr.push(temp.data);

      if (temp.leftChild) queue.enqueue(temp.leftChild);
      if (temp.rightChild) queue.enqueue(temp.rightChild);
    }

    return arr;
  }
}
