/* eslint-disable @typescript-eslint/no-non-null-assertion */
import VertexAlreadyExistsError from './errors/VertexAlreadyExistsError';
import VertexNotFoundError from './errors/VertexNotFoundError';
import WeightedGraph from './WeightedGraph';

describe('WeightedGraph', () => {
  let weightedGraph: WeightedGraph<number>;

  beforeEach(() => {
    weightedGraph = new WeightedGraph<number>();
  });

  test('should add a new vertex and retrieve it', () => {
    const vertexId = 'A';
    weightedGraph.addVertex(vertexId, 1);
    const vertex = weightedGraph.getVertex(vertexId);

    expect(vertex).toBeDefined();
    expect(vertex?.id).toBe('A');
    expect(vertex?.data).toBe(1);
  });

  test('should throw an error when adding a vertex with a duplicate ID', () => {
    weightedGraph.addVertex('A', 1);

    expect(() => weightedGraph.addVertex('A', 2)).toThrow(VertexAlreadyExistsError);
  });

  test('should add an edge between two existing vertices', () => {
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);

    weightedGraph.addEdge('A', 'B', 1);

    const vertexA = weightedGraph.getVertex('A');
    const vertexB = weightedGraph.getVertex('B');

    expect(vertexA?.neighbors).toContain(vertexB);
    expect(vertexB?.neighbors).not.toContain(vertexA);
  });

  test('should throw an error when adding an edge if one vertex does not exist', () => {
    weightedGraph.addVertex('A', 1);

    expect(() => weightedGraph.addEdge('A', 'B', 1)).toThrow(VertexNotFoundError);
    expect(() => weightedGraph.addEdge('B', 'A', 2)).toThrow(VertexNotFoundError);
  });

  test('should correctly represent the graph as a string', () => {
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);
    weightedGraph.addVertex('C', 3);

    weightedGraph.addEdge('A', 'B', 2);
    weightedGraph.addEdge('A', 'C', 1);

    const graphString = weightedGraph.toString();

    expect(graphString).toContain(
      'Graph connections:\nA: B C\nB: \nC: \n\nAdjacencyMatrix:\n   A  B  C\nA [0, 1, 1]\nB [0, 0, 0]\nC [0, 0, 0]\n\nWeightsMatrix:\n   A  B  C\nA [0, 2, 1]\nB [0, 0, 0]\nC [0, 0, 0]',
    );
  });

  test('should return undefined when trying to get a vertex that does not exist', () => {
    const vertex = weightedGraph.getVertex('Z');

    expect(vertex).toBeUndefined();
  });

  test('should create a cyclic graph', () => {
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);
    weightedGraph.addVertex('C', 3);

    weightedGraph.addEdge('A', 'B', 3);
    weightedGraph.addEdge('B', 'C', 4);
    weightedGraph.addEdge('C', 'A', 2); // Creating a cycle

    const vertexA = weightedGraph.getVertex('A');
    const vertexB = weightedGraph.getVertex('B');
    const vertexC = weightedGraph.getVertex('C');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();

    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexC!.neighbors.has(vertexA!)).toBe(true); // Cycle exists
  });

  test('should create a disconnected graph with multiple subgraphs', () => {
    // Subgraph 1
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);
    weightedGraph.addEdge('A', 'B', 5);

    // Subgraph 2
    weightedGraph.addVertex('C', 3);
    weightedGraph.addVertex('D', 4);
    weightedGraph.addEdge('C', 'D', 1);

    const vertexA = weightedGraph.getVertex('A');
    const vertexB = weightedGraph.getVertex('B');
    const vertexC = weightedGraph.getVertex('C');
    const vertexD = weightedGraph.getVertex('D');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();
    expect(vertexD).toBeDefined();

    // Check connections in subgraph 1
    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);

    // Check connections in subgraph 2
    expect(vertexC!.neighbors.has(vertexD!)).toBe(true);

    // Ensure subgraph 1 is not connected to subgraph 2
    expect(vertexA!.neighbors.has(vertexC!)).toBe(false);
  });

  test('should add edges to create a fully connected graph (clique)', () => {
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);
    weightedGraph.addVertex('C', 3);
    weightedGraph.addVertex('D', 4);

    weightedGraph.addEdge('A', 'B', 1);
    weightedGraph.addEdge('A', 'C', 1);
    weightedGraph.addEdge('A', 'D', 1);
    weightedGraph.addEdge('B', 'C', 1);
    weightedGraph.addEdge('B', 'D', 1);
    weightedGraph.addEdge('C', 'D', 1);

    const vertexA = weightedGraph.getVertex('A');
    const vertexB = weightedGraph.getVertex('B');
    const vertexC = weightedGraph.getVertex('C');
    const vertexD = weightedGraph.getVertex('D');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();
    expect(vertexD).toBeDefined();

    // Verify full connectivity (each vertex should be connected to every other vertex)
    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexA!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexA!.neighbors.has(vertexD!)).toBe(true);

    expect(vertexB!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexD!)).toBe(true);

    expect(vertexC!.neighbors.has(vertexD!)).toBe(true);
  });

  test('should handle a graph with a single vertex and no edges', () => {
    weightedGraph.addVertex('A', 1);

    const vertexA = weightedGraph.getVertex('A');

    expect(vertexA).toBeDefined();
    expect(vertexA!.neighbors.size).toBe(0);
  });

  test('should replace data for an existing vertex', () => {
    weightedGraph.addVertex('A', 1);

    weightedGraph.replaceData('A', 10);

    const vertexA = weightedGraph.getVertex('A');
    expect(vertexA).toBeDefined();
    expect(vertexA!.data).toBe(10);
  });

  test('should throw an error when trying to replace data for a non-existent vertex', () => {
    expect(() => weightedGraph.replaceData('Z', 100)).toThrow(VertexNotFoundError);
  });

  test('should maintain connections after replacing data', () => {
    weightedGraph.addVertex('A', 1);
    weightedGraph.addVertex('B', 2);
    weightedGraph.addEdge('A', 'B', 2);

    weightedGraph.replaceData('A', 10);

    const vertexA = weightedGraph.getVertex('A');
    const vertexB = weightedGraph.getVertex('B');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();

    expect(vertexA?.data).toBe(10);
    expect(vertexA?.neighbors.has(vertexB!)).toBe(true);
  });
});
