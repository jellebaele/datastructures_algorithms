import Vertex from '../../../data_structures/graph/Vertex';
import Stack from '../../../data_structures/stack/Stack';

export default class DepthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public search(startVertex: Vertex<T>, searchElement: T): boolean {
    /**
     * instead of queueing -> stacking
     */
    const searchStack = new Stack<Vertex<T>>();
    const visitedVertices: Set<string> = new Set();

    searchStack.push(startVertex);

    while (searchStack.getSize() > 0) {
      const vertex = searchStack.pop();

      if (!vertex || visitedVertices.has(vertex.id)) continue;

      visitedVertices.add(vertex.id);
      if (this.comparator(vertex.data, searchElement)) {
        return true;
      } else {
        vertex.neighbors.forEach(neighbor => searchStack.push(neighbor));
      }
    }

    return false;
  }
}
