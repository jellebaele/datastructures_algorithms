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
  insert(element: T): void;
  remove(elemnt: T): void;
  get height(): number;
  get depth(): number;
  getLevel(targetNodeId: string): number;
  getLeafs(): Array<T>;
  toArray(traversalStrategy: TraversalStrategy): Array<T>;
  search(element: T, traversalStrategy: TraversalStrategy): boolean;
}

export default ITree;
