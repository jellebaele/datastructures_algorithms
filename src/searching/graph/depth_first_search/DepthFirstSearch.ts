import Node from '../../../data_structures/graph/Node';
import Stack from '../../../data_structures/stack/Stack';

export default class DepthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public search(startNode: Node<T>, searchElement: T): boolean {
    /**
     * instead of queueing -> stacking
     */
    const searchStack = new Stack<Node<T>>();
    const visitedNodes: Set<string> = new Set();

    searchStack.push(startNode);

    while (searchStack.getSize() > 0) {
      const node = searchStack.pop();

      if (!node || visitedNodes.has(node.id)) continue;

      visitedNodes.add(node.id);
      if (this.comparator(node.data, searchElement)) {
        return true;
      } else {
        node.neighbors.forEach(neighbor => searchStack.push(neighbor));
      }
    }

    return false;
  }
}
