import VertexAlreadyExistsError from './errors/VertexAlreadyExistsError';
import VertexNotFoundError from './errors/VertexNotFoundError';
import Vertex from './Vertex';

export type VertexName = string;
export type IsEdge = 0 | 1;

export default abstract class BaseGraph<T> {
  protected vertices: Map<VertexName, Vertex<T>>;
  protected adjacencyMatrix: Array<Array<IsEdge>>;

  constructor() {
    this.vertices = new Map();
    this.adjacencyMatrix = [];
  }

  public addVertex(vertexId: string, data: T): Vertex<T> {
    if (this.vertices.has(vertexId)) throw new VertexAlreadyExistsError(vertexId);

    const newVertex = new Vertex(vertexId, data);
    this.vertices.set(vertexId, newVertex);

    // Extract to private functions to explain why this happens
    this.adjacencyMatrix.map(row => row.push(0));
    this.adjacencyMatrix.push(new Array(this.vertices.size).fill(0));

    return newVertex;
  }

  public getVertex(vertexId: string): Vertex<T> | undefined {
    return this.vertices.get(vertexId);
  }

  public getVertices(): Map<VertexName, Vertex<T>> {
    return this.vertices;
  }

  public abstract addEdge(vertexIdA: string, vertexIdB: string): void;

  public replaceData(vertexId: string, newData: T): void {
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
    return this.visualizeMatrix(this.adjacencyMatrix, 'AdjacencyMatrix');
  }

  protected visualizeMatrix(matrix: Array<Array<number>>, title: string) {
    let result = `${title}:\n   `;

    const vertexKeysArray = Array.from(this.vertices.keys());
    vertexKeysArray.forEach(
      (key, index) => (result += `${key}${index === vertexKeysArray.length - 1 ? '\n' : '  '}`),
    );

    matrix.forEach((adjacencRow, index) => {
      result += `${vertexKeysArray[index]} [`;
      adjacencRow.forEach(
        (element, index) =>
          (result += `${element}${index === adjacencRow.length - 1 ? ']\n' : ', '}`),
      );
    });

    return result;
  }
}
