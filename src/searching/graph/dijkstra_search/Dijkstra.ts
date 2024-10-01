/* eslint-disable @typescript-eslint/no-non-null-assertion */
import VertexNotFoundError from '../../../data_structures/graph/errors/VertexNotFoundError';
import Vertex from '../../../data_structures/graph/Vertex';
import WeightedGraph from '../../../data_structures/graph/WeightedGraph';

export default class Dijkstra<T> {
  private graph: WeightedGraph<T>;

  constructor(graph: WeightedGraph<T>) {
    this.graph = graph;
  }

  search(startVertex: Vertex<T>, targetVertex: Vertex<T>): Array<string> {
    if (!this.graph.getVertex(startVertex.id)) throw new VertexNotFoundError(startVertex.id);
    if (!this.graph.getVertex(targetVertex.id)) throw new VertexNotFoundError(targetVertex.id);
    const distances = new Map<Vertex<T>, number>();
    const visitedVertices = new Set<string>();
    const parents = new Map<string, string>();

    this.initializeDistances(startVertex, distances);
    let closestVertex = this.getClosestVertex(distances, visitedVertices);

    while (closestVertex !== null) {
      const distance = distances.get(closestVertex);
      if (distance === undefined)
        throw new Error(`No distance found for Vertex '${closestVertex.id}'`);

      closestVertex.neighbors.forEach(neighbor => {
        const newDistance = distance + this.graph.getWeight(closestVertex!, neighbor);
        const oldDistance = distances.get(neighbor);

        if (oldDistance && oldDistance > newDistance) {
          distances.set(neighbor, newDistance);
          parents.set(neighbor.id, closestVertex!.id);
        }
      });

      visitedVertices.add(closestVertex.id);
      closestVertex = this.getClosestVertex(distances, visitedVertices);
    }

    return this.buildPath(parents, startVertex.id, targetVertex.id);
  }

  private initializeDistances(startVertex: Vertex<T>, distances: Map<Vertex<T>, number>) {
    this.graph.getVertices().forEach(vertex => {
      vertex.id === startVertex.id ? distances.set(vertex, 0) : distances.set(vertex, Infinity);
    });
  }

  private getClosestVertex(
    distances: Map<Vertex<T>, number>,
    visited: Set<string>,
  ): Vertex<T> | null {
    let closestVertex: Vertex<T> | null = null;
    let closestDistance = Infinity;

    for (const [vertex, distance] of distances) {
      if (distance < closestDistance && !visited.has(vertex.id)) {
        closestDistance = distance;
        closestVertex = vertex;
      }
    }

    return closestVertex;
  }

  private buildPath(
    parents: Map<string, string>,
    startId: string,
    targetId: string,
  ): Array<string> {
    if (!parents.has(targetId)) throw new Error('Unable to create path');
    const path: string[] = [];
    let currentId = targetId;

    while (currentId !== startId) {
      path.push(currentId);
      currentId = parents.get(currentId) !== undefined ? parents.get(currentId)! : startId;
    }

    path.push(startId);
    return path.reverse();
  }
}
