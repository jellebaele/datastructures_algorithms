import Node from '../../../data_structures/graph/Node';
import Queue from '../../../data_structures/queue/Queue';

export default class BreadthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  // O(V+E) (V = vertices, E = edges)
  public search(startNode: Node<T>, searchTerm: T): boolean {
    const searchQueue = new Queue<Node<T>>();
    const visitedNodes = new Set();

    searchQueue.enqueue(startNode);
    while (searchQueue.getSize() > 0) {
      const node = searchQueue.dequeue();

      if (!node || visitedNodes.has(node.id)) continue;

      visitedNodes.add(node.id);
      if (this.comparator(node.data, searchTerm)) {
        return true;
      } else {
        node.neighbors.forEach(neighbor => searchQueue.enqueue(neighbor));
      }
    }

    return false;
  }
}
