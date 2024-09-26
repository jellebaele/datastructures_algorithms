import VertexAlreadyExistsError from './errors/VertexAlreadyExistsError';
import VertexNotFoundError from './errors/VertexNotFoundError';
import Vertex from './Vertex';

export type VertexName = string;
export type IsEdge = 0 | 1;

export default class Graph<T> {
  protected vertices: Map<VertexName, Vertex<T>>;
  private adjacencyMatrix: Array<Array<IsEdge>>;

  constructor() {
    this.vertices = new Map();
    this.adjacencyMatrix = [];
  }

  public addVertex(id: string, data: T): Vertex<T> {
    if (this.vertices.has(id)) throw new VertexAlreadyExistsError(id);

    const newVertex = new Vertex(id, data);
    this.vertices.set(id, newVertex);

    // Extract to private functions to explain why this happens
    this.adjacencyMatrix.map(subMatrix => subMatrix.push(0));
    this.adjacencyMatrix.push(new Array(this.vertices.size).fill(0));

    return newVertex;
  }

  public getVertex(vertexId: string): Vertex<T> | undefined {
    return this.vertices.get(vertexId);
  }

  public addEdge(vertexIdA: string, vertexIdB: string): void {
    const vertexA = this.vertices.get(vertexIdA);
    const vertexB = this.vertices.get(vertexIdB);

    if (!vertexA) throw new VertexNotFoundError(vertexIdA);
    if (!vertexB) throw new VertexNotFoundError(vertexIdB);

    // Bidirectional?
    vertexA.addNeighbor(vertexB);
    vertexB.addNeighbor(vertexA);

    const vertexArray = Array.from(this.vertices.keys());
    const indexVertexA = vertexArray.indexOf(vertexA.id);
    const indexVertexB = vertexArray.indexOf(vertexB.id);

    this.adjacencyMatrix[indexVertexA][indexVertexB] = 1;
    this.adjacencyMatrix[indexVertexB][indexVertexA] = 1;
  }

  public replaceData(vertexId: string, newData: T) {
    const vertex = this.vertices.get(vertexId);

    if (!vertex) throw new VertexNotFoundError(vertexId);
    else vertex.data = newData;
  }

  public toString(): string {
    const graphConnectionsString = this.visualizeGraphConnections();
    const adjecencyMatrixString = this.visualizeAdjacencyMatrix();

    return graphConnectionsString + '\n' + adjecencyMatrixString;
  }

  private visualizeGraphConnections(): string {
    let result = 'Graph connections:\n';

    this.vertices.forEach(vertex => {
      result += `${vertex.id}: `;
      const neighborArray = Array.from(vertex.neighbors.values());
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

    const vertexKeysArray = Array.from(this.vertices.keys());
    vertexKeysArray.forEach(
      (key, index) => (result += `${key}${index === vertexKeysArray.length - 1 ? '\n' : '  '}`),
    );

    this.adjacencyMatrix.forEach((adjacencRow, index) => {
      result += `${vertexKeysArray[index]} [`;
      adjacencRow.forEach(
        (element, index) =>
          (result += `${element}${index === adjacencRow.length - 1 ? ']\n' : ', '}`),
      );
    });

    return result;
  }
}
