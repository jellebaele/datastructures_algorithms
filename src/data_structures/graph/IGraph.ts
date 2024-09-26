import Vertex from './Vertex';

interface IGraph<T> {
  addVertex(vertexId: string, data: T): Vertex<T>;
  getVertex(vertexId: string): Vertex<T> | undefined;
  addEdge(vertexIdA: string, vertexIdB: string, weight?: number): void;
  replaceData(vertexId: string, newData: T): void;
  toString(): string;
}

export default IGraph;
