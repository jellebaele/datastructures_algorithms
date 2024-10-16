// https://dtjv.io/the-generic-tree-data-structure/

import BreadthFirstSearch from '../../searching/binary_tree/breadth_first_search/BreadthFirstSearch';
import DepthFirstSearch from '../../searching/binary_tree/depth_first_search/DepthFirstSearch';
import Queue from '../queue/Queue';
import { SearchStrategy, TraversalStrategy } from './ITree';

interface IBinaryTree<T> {
  insert(element: T): void;
  remove(element: T): void;
  get height(): number;
  get depth(): number;
  getLevel(targetNodeId: string): number;
  getLeafs(): Array<T>;
  toArray(traversalStrategy: TraversalStrategy): Array<T>;
  search(element: T, traversalStrategy: TraversalStrategy): boolean;
}

export class TreeNode<T> {
  data: T;
  leftChild: TreeNode<T> | undefined;
  rightChild: TreeNode<T> | undefined;

  constructor(
    data: T,
    leftChild: TreeNode<T> | undefined = undefined,
    rightChild: TreeNode<T> | undefined = undefined,
  ) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

export default class BinaryTree<T> {
  root: TreeNode<T>;

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
    while (queue.getSize() > 0) {
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
    return null;
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

  // In-order DFS: Left, Root, Right
  private inOrderTraversal(node?: TreeNode<T>, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    this.inOrderTraversal(node.leftChild, arr);
    arr.push(node.data);
    this.inOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Pre-order DFS: Root, Left, Right
  private preOrderTraversal(node?: TreeNode<T>, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    arr.push(node.data);
    this.preOrderTraversal(node.leftChild, arr);
    this.preOrderTraversal(node.rightChild, arr);

    return arr;
  }

  // Post-order DFS: Left, Right, Root
  private postOrderTraversal(node?: TreeNode<T>, arr: Array<T> = []): Array<T> {
    if (!node) return [];

    this.postOrderTraversal(node.leftChild, arr);
    this.postOrderTraversal(node.rightChild, arr);
    arr.push(node.data);

    return arr;
  }

  // BFS
  private levelOrderTraversel(node?: TreeNode<T>): Array<T> {
    if (!node) return [];

    const arr: Array<T> = [];
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(node);

    while (queue.getSize() > 0) {
      const temp = queue.dequeue();
      if (!temp) break;

      arr.push(temp.data);

      if (temp.leftChild) queue.enqueue(temp.leftChild);
      if (temp.rightChild) queue.enqueue(temp.rightChild);
    }

    return arr;
  }
}
