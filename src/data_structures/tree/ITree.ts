import TreeNode from './TreeNode';

export enum TraversalStrategy {
  PRE_ORDER_TRAVERSAL,
  IN_ORDER_TRAVERSAL,
  POST_ORDER_TRAVERSAL,
  LEVEL_ORDER_TRAVERSAL,
}

export enum SearchStrategy {
  DFS,
  BFS,
}

interface ITree<T> {
  insert(key: T): TreeNode<T>;
  remove(key: T): void;
  get height(): number;
  getLevel(key: T): number;
  getLeafs(): Array<T>;
  toArray(traversalStrategy: TraversalStrategy): Array<T>;
  search(element: T): TreeNode<T> | null;
}

export default ITree;
