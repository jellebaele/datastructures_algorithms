import NodeAlreadyExistsError from './errors/NodeAlreadyExistsError';
import NodeNotFoundError from './errors/NodeNotFoundError';
import Node from './Node';

export type NodeName = string;

export default class Graph<T> {
  private nodes: Map<NodeName, Node<T>>;

  constructor() {
    this.nodes = new Map();
  }

  public addNode(id: string, data: T): string {
    if (this.nodes.has(id)) throw new NodeAlreadyExistsError(id);
    this.nodes.set(id, new Node(id, data));

    return id;
  }

  public getNode(nodeId: string): Node<T> | undefined {
    return this.nodes.get(nodeId);
  }

  public addEdge(nodeIdA: string, nodeIdB: string): void {
    const nodeA = this.nodes.get(nodeIdA);
    const nodeB = this.nodes.get(nodeIdB);

    if (!nodeA) throw new NodeNotFoundError(nodeIdA);
    if (!nodeB) throw new NodeNotFoundError(nodeIdB);

    // Bidirectional?
    nodeA.addNeighbor(nodeB);
    nodeB.addNeighbor(nodeA);
  }

  public replaceData(nodeId: string, newData: T) {
    const node = this.nodes.get(nodeId);

    if (!node) throw new NodeNotFoundError(nodeId);
    else node.data = newData;
  }

  public toString(): string {
    let result = 'Graph connections:\n';

    this.nodes.forEach(node => {
      result += `${node.id}: `;
      node.neighbors.forEach(neighbor => (result += `${neighbor.id} `));
      result += '\n';
    });

    return result;
  }
}
