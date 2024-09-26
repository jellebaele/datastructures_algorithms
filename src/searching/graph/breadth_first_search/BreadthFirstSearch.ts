import Vertex from '../../../data_structures/graph/Vertex';
import Queue from '../../../data_structures/queue/Queue';

export default class BreadthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  // O(V+E) (V = vertices, E = edges)
  public search(startVertex: Vertex<T>, searchTerm: T): boolean {
    const searchQueue = new Queue<Vertex<T>>();
    const visitedVertices = new Set();

    searchQueue.enqueue(startVertex);
    while (searchQueue.getSize() > 0) {
      const vertex = searchQueue.dequeue();

      if (!vertex || visitedVertices.has(vertex.id)) continue;

      visitedVertices.add(vertex.id);
      if (this.comparator(vertex.data, searchTerm)) {
        return true;
      } else {
        vertex.neighbors.forEach(neighbor => searchQueue.enqueue(neighbor));
      }
    }

    return false;
  }
}
