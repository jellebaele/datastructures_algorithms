/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Graph from '../../data_structures/graph/Graph';
import VertexAlreadyExistsError from './errors/VertexAlreadyExistsError';
import VertexNotFoundError from './errors/VertexNotFoundError';

describe('Graph', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph<number>();
  });

  test('should add a new vertex and retrieve it', () => {
    const vertexId = 'A';
    graph.addVertex(vertexId, 1);
    const vertex = graph.getVertex(vertexId);

    expect(vertex).toBeDefined();
    expect(vertex?.id).toBe('A');
    expect(vertex?.data).toBe(1);
  });

  test('should throw an error when adding a vertex with a duplicate ID', () => {
    graph.addVertex('A', 1);

    expect(() => graph.addVertex('A', 2)).toThrow(VertexAlreadyExistsError);
  });

  test('should add an edge between two existing vertexs', () => {
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);

    graph.addEdge('A', 'B');

    const vertexA = graph.getVertex('A');
    const vertexB = graph.getVertex('B');

    expect(vertexA?.neighbors).toContain(vertexB);
    expect(vertexB?.neighbors).toContain(vertexA);
  });

  test('should throw an error when adding an edge if one vertex does not exist', () => {
    graph.addVertex('A', 1);

    expect(() => graph.addEdge('A', 'B')).toThrow(VertexNotFoundError);
    expect(() => graph.addEdge('B', 'A')).toThrow(VertexNotFoundError);
  });

  test('should correctly represent the graph as a string', () => {
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addVertex('C', 3);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');

    const graphString = graph.toString();

    expect(graphString).toBe(
      'Graph connections:\nA: B C\nB: A\nC: A\n\nAdjacencyMatrix:\n   A  B  C\nA [0, 1, 1]\nB [1, 0, 0]\nC [1, 0, 0]\n',
    );
  });

  test('should return undefined when trying to get a vertex that does not exist', () => {
    const vertex = graph.getVertex('Z');

    expect(vertex).toBeUndefined();
  });

  test('should create a cyclic graph', () => {
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addVertex('C', 3);

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Creating a cycle

    const vertexA = graph.getVertex('A');
    const vertexB = graph.getVertex('B');
    const vertexC = graph.getVertex('C');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();

    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexC!.neighbors.has(vertexA!)).toBe(true); // Cycle exists
  });

  test('should create a disconnected graph with multiple subgraphs', () => {
    // Subgraph 1
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addEdge('A', 'B');

    // Subgraph 2
    graph.addVertex('C', 3);
    graph.addVertex('D', 4);
    graph.addEdge('C', 'D');

    const vertexA = graph.getVertex('A');
    const vertexB = graph.getVertex('B');
    const vertexC = graph.getVertex('C');
    const vertexD = graph.getVertex('D');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();
    expect(vertexD).toBeDefined();

    // Check connections in subgraph 1
    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexA!)).toBe(true);

    // Check connections in subgraph 2
    expect(vertexC!.neighbors.has(vertexD!)).toBe(true);
    expect(vertexD!.neighbors.has(vertexC!)).toBe(true);

    // Ensure subgraph 1 is not connected to subgraph 2
    expect(vertexA!.neighbors.has(vertexC!)).toBe(false);
    expect(vertexB!.neighbors.has(vertexD!)).toBe(false);
  });

  test('should add edges to create a fully connected graph (clique)', () => {
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addVertex('C', 3);
    graph.addVertex('D', 4);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'D');

    const vertexA = graph.getVertex('A');
    const vertexB = graph.getVertex('B');
    const vertexC = graph.getVertex('C');
    const vertexD = graph.getVertex('D');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
    expect(vertexC).toBeDefined();
    expect(vertexD).toBeDefined();

    // Verify full connectivity (each vertex should be connected to every other vertex)
    expect(vertexA!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexA!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexA!.neighbors.has(vertexD!)).toBe(true);

    expect(vertexB!.neighbors.has(vertexA!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexC!)).toBe(true);
    expect(vertexB!.neighbors.has(vertexD!)).toBe(true);

    expect(vertexC!.neighbors.has(vertexA!)).toBe(true);
    expect(vertexC!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexC!.neighbors.has(vertexD!)).toBe(true);

    expect(vertexD!.neighbors.has(vertexA!)).toBe(true);
    expect(vertexD!.neighbors.has(vertexB!)).toBe(true);
    expect(vertexD!.neighbors.has(vertexC!)).toBe(true);
  });

  test('should handle a graph with a single vertex and no edges', () => {
    graph.addVertex('A', 1);

    const vertexA = graph.getVertex('A');

    expect(vertexA).toBeDefined();
    expect(vertexA!.neighbors.size).toBe(0);
  });

  test('should replace data for an existing vertex', () => {
    graph.addVertex('A', 1);

    graph.replaceData('A', 10);

    const vertexA = graph.getVertex('A');
    expect(vertexA).toBeDefined();
    expect(vertexA!.data).toBe(10);
  });

  test('should throw an error when trying to replace data for a non-existent vertex', () => {
    expect(() => graph.replaceData('Z', 100)).toThrow(VertexNotFoundError);
  });

  test('should maintain connections after replacing data', () => {
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addEdge('A', 'B');

    graph.replaceData('A', 10);

    const vertexA = graph.getVertex('A');
    const vertexB = graph.getVertex('B');

    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();

    expect(vertexA?.data).toBe(10);
    expect(vertexA?.neighbors.has(vertexB!)).toBe(true);
    expect(vertexB?.neighbors.has(vertexA!)).toBe(true);
  });
});
