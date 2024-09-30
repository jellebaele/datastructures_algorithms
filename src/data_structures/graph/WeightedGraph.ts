import WeightUndefinedError from './errors/WeightUndefinedError';
import VertexNotFoundError from './errors/VertexNotFoundError';
import Vertex from './Vertex';
import BaseGraph from './BaseGraph';

export default class WeightedGraph<T> extends BaseGraph<T> {
  private weightsMatrix: Array<Array<number>>;

  constructor() {
    super();
    this.weightsMatrix = [];
  }

  public addVertex(vertexId: string, data: T): Vertex<T> {
    const newVertex = super.addVertex(vertexId, data);

    this.weightsMatrix.map(row => row.push(0));
    this.weightsMatrix.push(new Array(this.vertices.size).fill(0));

    return newVertex;
  }

  public addEdge(vertexIdA: string, vertexIdB: string): void;
  public addEdge(vertexIdA: string, vertexIdB: string, weight: number): void;

  public addEdge(vertexIdA: string, vertexIdB: string, weight?: number): void {
    if (!weight) throw new WeightUndefinedError();

    const vertexA = this.vertices.get(vertexIdA);
    const vertexB = this.vertices.get(vertexIdB);

    if (!vertexA) throw new VertexNotFoundError(vertexIdA);
    if (!vertexB) throw new VertexNotFoundError(vertexIdB);

    // Undirected
    vertexA.addNeighbor(vertexB);

    const vertexArray = Array.from(this.vertices.keys());
    const indexVertexA = vertexArray.indexOf(vertexA.id);
    const indexVertexB = vertexArray.indexOf(vertexB.id);

    this.adjacencyMatrix[indexVertexA][indexVertexB] = 1;
    this.weightsMatrix[indexVertexA][indexVertexB] = weight;
  }

  public getWeight(vertexA: Vertex<T>, vertexB: Vertex<T>): number {
    const vertexArray = Array.from(this.vertices.keys());

    const indexVertexA = vertexArray.indexOf(vertexA.id);
    const indexVertexB = vertexArray.indexOf(vertexB.id);

    return this.weightsMatrix[indexVertexA][indexVertexB];
  }

  public toString(): string {
    const weightMatrixString = this.visualizeWeightsMatrix();

    return super.toString() + '\n' + weightMatrixString;
  }

  private visualizeWeightsMatrix(): string {
    return this.visualizeMatrix(this.weightsMatrix, 'WeightsMatrix');
  }
}
