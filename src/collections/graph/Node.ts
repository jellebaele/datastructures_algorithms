import NodeAlreadyExistsError from './errors/NodeAlreadyExistsError';

export default class Node<T> {
  public id: string;
  public data: T;
  public neighbors: Set<Node<T>>;

  constructor(id: string, data: T) {
    this.id = id;
    this.data = data;
    this.neighbors = new Set<Node<T>>();
  }

  public addNeighbor(node: Node<T>): void {
    if (this.neighbors.has(node)) throw new NodeAlreadyExistsError(node.id);
    this.neighbors.add(node);
  }

  public toString(): string {
    return `${this.id}: ${this.data}`;
  }
}
