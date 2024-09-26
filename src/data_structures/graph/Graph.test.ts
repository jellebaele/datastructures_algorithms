/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Graph from '../../data_structures/graph/Graph';
import NodeAlreadyExistsError from './errors/NodeAlreadyExistsError';
import NodeNotFoundError from './errors/NodeNotFoundError';

describe('Graph', () => {
  let graph: Graph<number>;

  beforeEach(() => {
    graph = new Graph<number>();
  });

  test('should add a new node and retrieve it', () => {
    const nodeId = 'A';
    graph.addNode(nodeId, 1);
    const node = graph.getNode(nodeId);

    expect(node).toBeDefined();
    expect(node?.id).toBe('A');
    expect(node?.data).toBe(1);
  });

  test('should throw an error when adding a node with a duplicate ID', () => {
    graph.addNode('A', 1);

    expect(() => graph.addNode('A', 2)).toThrow(NodeAlreadyExistsError);
  });

  test('should add an edge between two existing nodes', () => {
    graph.addNode('A', 1);
    graph.addNode('B', 2);

    graph.addEdge('A', 'B');

    const nodeA = graph.getNode('A');
    const nodeB = graph.getNode('B');

    expect(nodeA?.neighbors).toContain(nodeB);
    expect(nodeB?.neighbors).toContain(nodeA);
  });

  test('should throw an error when adding an edge if one node does not exist', () => {
    graph.addNode('A', 1);

    expect(() => graph.addEdge('A', 'B')).toThrow(NodeNotFoundError);
    expect(() => graph.addEdge('B', 'A')).toThrow(NodeNotFoundError);
  });

  test('should correctly represent the graph as a string', () => {
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addNode('C', 3);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');

    const graphString = graph.toString();

    expect(graphString).toBe(
      'Graph connections:\nA: B C\nB: A\nC: A\n\nAdjacencyMatrix:\n   A  B  C\nA [0, 1, 1]\nB [1, 0, 0]\nC [1, 0, 0]\n',
    );
  });

  test('should return undefined when trying to get a node that does not exist', () => {
    const node = graph.getNode('Z');

    expect(node).toBeUndefined();
  });

  test('should create a cyclic graph', () => {
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addNode('C', 3);

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('C', 'A'); // Creating a cycle

    const nodeA = graph.getNode('A');
    const nodeB = graph.getNode('B');
    const nodeC = graph.getNode('C');

    expect(nodeA).toBeDefined();
    expect(nodeB).toBeDefined();
    expect(nodeC).toBeDefined();

    expect(nodeA!.neighbors.has(nodeB!)).toBe(true);
    expect(nodeB!.neighbors.has(nodeC!)).toBe(true);
    expect(nodeC!.neighbors.has(nodeA!)).toBe(true); // Cycle exists
  });

  test('should create a disconnected graph with multiple subgraphs', () => {
    // Subgraph 1
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addEdge('A', 'B');

    // Subgraph 2
    graph.addNode('C', 3);
    graph.addNode('D', 4);
    graph.addEdge('C', 'D');

    const nodeA = graph.getNode('A');
    const nodeB = graph.getNode('B');
    const nodeC = graph.getNode('C');
    const nodeD = graph.getNode('D');

    expect(nodeA).toBeDefined();
    expect(nodeB).toBeDefined();
    expect(nodeC).toBeDefined();
    expect(nodeD).toBeDefined();

    // Check connections in subgraph 1
    expect(nodeA!.neighbors.has(nodeB!)).toBe(true);
    expect(nodeB!.neighbors.has(nodeA!)).toBe(true);

    // Check connections in subgraph 2
    expect(nodeC!.neighbors.has(nodeD!)).toBe(true);
    expect(nodeD!.neighbors.has(nodeC!)).toBe(true);

    // Ensure subgraph 1 is not connected to subgraph 2
    expect(nodeA!.neighbors.has(nodeC!)).toBe(false);
    expect(nodeB!.neighbors.has(nodeD!)).toBe(false);
  });

  test('should add edges to create a fully connected graph (clique)', () => {
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addNode('C', 3);
    graph.addNode('D', 4);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'D');

    const nodeA = graph.getNode('A');
    const nodeB = graph.getNode('B');
    const nodeC = graph.getNode('C');
    const nodeD = graph.getNode('D');

    expect(nodeA).toBeDefined();
    expect(nodeB).toBeDefined();
    expect(nodeC).toBeDefined();
    expect(nodeD).toBeDefined();

    // Verify full connectivity (each node should be connected to every other node)
    expect(nodeA!.neighbors.has(nodeB!)).toBe(true);
    expect(nodeA!.neighbors.has(nodeC!)).toBe(true);
    expect(nodeA!.neighbors.has(nodeD!)).toBe(true);

    expect(nodeB!.neighbors.has(nodeA!)).toBe(true);
    expect(nodeB!.neighbors.has(nodeC!)).toBe(true);
    expect(nodeB!.neighbors.has(nodeD!)).toBe(true);

    expect(nodeC!.neighbors.has(nodeA!)).toBe(true);
    expect(nodeC!.neighbors.has(nodeB!)).toBe(true);
    expect(nodeC!.neighbors.has(nodeD!)).toBe(true);

    expect(nodeD!.neighbors.has(nodeA!)).toBe(true);
    expect(nodeD!.neighbors.has(nodeB!)).toBe(true);
    expect(nodeD!.neighbors.has(nodeC!)).toBe(true);
  });

  test('should handle a graph with a single node and no edges', () => {
    graph.addNode('A', 1);

    const nodeA = graph.getNode('A');

    expect(nodeA).toBeDefined();
    expect(nodeA!.neighbors.size).toBe(0);
  });

  test('should replace data for an existing node', () => {
    graph.addNode('A', 1);

    graph.replaceData('A', 10);

    const nodeA = graph.getNode('A');
    expect(nodeA).toBeDefined();
    expect(nodeA!.data).toBe(10);
  });

  test('should throw an error when trying to replace data for a non-existent node', () => {
    expect(() => graph.replaceData('Z', 100)).toThrow(NodeNotFoundError);
  });

  test('should maintain connections after replacing data', () => {
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addEdge('A', 'B');

    graph.replaceData('A', 10);

    const nodeA = graph.getNode('A');
    const nodeB = graph.getNode('B');

    expect(nodeA).toBeDefined();
    expect(nodeB).toBeDefined();

    expect(nodeA?.data).toBe(10);
    expect(nodeA?.neighbors.has(nodeB!)).toBe(true);
    expect(nodeB?.neighbors.has(nodeA!)).toBe(true);
  });
});
