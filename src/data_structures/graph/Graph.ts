import NodeAlreadyExistsError from './errors/NodeAlreadyExistsError';
import NodeNotFoundError from './errors/NodeNotFoundError';
import Node from './Node';

export type NodeName = string;
export type IsEdge = 0 | 1;

export default class Graph<T> {
  protected nodes: Map<NodeName, Node<T>>;
  private adjacencyMatrix: Array<Array<IsEdge>>;

  constructor() {
    this.nodes = new Map();
    this.adjacencyMatrix = [];
  }

  public addNode(id: string, data: T): Node<T> {
    if (this.nodes.has(id)) throw new NodeAlreadyExistsError(id);

    const newNode = new Node(id, data);
    this.nodes.set(id, newNode);

    // Extract to private functions to explain why this happens
    this.adjacencyMatrix.map(subMatrix => subMatrix.push(0));
    this.adjacencyMatrix.push(new Array(this.nodes.size).fill(0));

    return newNode;
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

    const nodeArray = Array.from(this.nodes.keys());
    const indexNodeA = nodeArray.indexOf(nodeA.id);
    const indexNodeB = nodeArray.indexOf(nodeB.id);

    this.adjacencyMatrix[indexNodeA][indexNodeB] = 1;
    this.adjacencyMatrix[indexNodeB][indexNodeA] = 1;
  }

  public replaceData(nodeId: string, newData: T) {
    const node = this.nodes.get(nodeId);

    if (!node) throw new NodeNotFoundError(nodeId);
    else node.data = newData;
  }

  public toString(): string {
    const graphConnectionsString = this.visualizeGraphConnections();
    const adjecencyMatrixString = this.visualizeAdjacencyMatrix();

    return graphConnectionsString + '\n' + adjecencyMatrixString;
  }

  private visualizeGraphConnections(): string {
    let result = 'Graph connections:\n';

    this.nodes.forEach(node => {
      result += `${node.id}: `;
      const neighborArray = Array.from(node.neighbors.values());
      neighborArray.forEach(
        (neighbor, index) =>
          (result += `${neighbor.id}${index === neighborArray.length - 1 ? '' : ' '}`),
      );
      result += '\n';
    });

    return result;
  }

  private visualizeAdjacencyMatrix(): string {
    let result = 'AdjacencyMatrix:\n   ';

    const nodeKeysArray = Array.from(this.nodes.keys());
    nodeKeysArray.forEach(
      (key, index) => (result += `${key}${index === nodeKeysArray.length - 1 ? '\n' : '  '}`),
    );

    this.adjacencyMatrix.forEach((adjacencRow, index) => {
      result += `${nodeKeysArray[index]} [`;
      adjacencRow.forEach(
        (element, index) =>
          (result += `${element}${index === adjacencRow.length - 1 ? ']\n' : ', '}`),
      );
    });

    return result;
  }
}
