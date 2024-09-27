import BaseGraph from './BaseGraph';
import VertexNotFoundError from './errors/VertexNotFoundError';
export type VertexName = string;
export type IsEdge = 0 | 1;

export default class DirectedGraph<T> extends BaseGraph<T> {
  public addEdge(vertexIdA: string, vertexIdB: string): void {
    const vertexA = this.vertices.get(vertexIdA);
    const vertexB = this.vertices.get(vertexIdB);

    if (!vertexA) throw new VertexNotFoundError(vertexIdA);
    if (!vertexB) throw new VertexNotFoundError(vertexIdB);

    // Directed
    vertexA.addNeighbor(vertexB);
    vertexB.addNeighbor(vertexA);

    const vertexArray = Array.from(this.vertices.keys());
    const indexVertexA = vertexArray.indexOf(vertexA.id);
    const indexVertexB = vertexArray.indexOf(vertexB.id);

    this.adjacencyMatrix[indexVertexA][indexVertexB] = 1;
    this.adjacencyMatrix[indexVertexB][indexVertexA] = 1;
  }
}
