import VertexAlreadyExistsError from './errors/VertexAlreadyExistsError';

export default class Vertex<T> {
  public id: string;
  public data: T;
  public neighbors: Set<Vertex<T>>;

  constructor(id: string, data: T) {
    this.id = id;
    this.data = data;
    this.neighbors = new Set<Vertex<T>>();
  }

  public addNeighbor(vertex: Vertex<T>): void {
    if (this.neighbors.has(vertex)) throw new VertexAlreadyExistsError(vertex.id);
    this.neighbors.add(vertex);
  }

  public toString(): string {
    return `${this.id}: ${this.data}`;
  }
}
