import DirectedGraph from '../../../data_structures/graph/DirectedGraph';
import DepthFirstSearch from './DepthFirstSearch';

describe('DepthFirstSearch', () => {
  let comparator: (a: number, b: number) => number;

  beforeEach(() => {
    comparator = (a: number, b: number) => (a === b ? 1 : 0);
  });

  test('Should return true or false if an element with correct data is present or not in unconnected graph', () => {
    const graph = new DirectedGraph<number>();
    const startVertex = graph.addVertex('A', 1);

    const depthFirstSearch = new DepthFirstSearch<number>(comparator);

    expect(depthFirstSearch.search(startVertex, 1)).toBeTruthy();
    expect(depthFirstSearch.search(startVertex, 2)).toBeFalsy();
  });

  test('Should return true or false if an element with correct data is present or not in a connected graph', () => {
    const graph = new DirectedGraph<number>();
    const vertexA = graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addVertex('C', 3);
    graph.addVertex('D', 4);
    graph.addVertex('E', 5);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('D', 'E');

    const depthFirstSearch = new DepthFirstSearch<number>(comparator);

    expect(depthFirstSearch.search(vertexA, 1)).toBeTruthy();
    expect(depthFirstSearch.search(vertexA, 2)).toBeTruthy();
    expect(depthFirstSearch.search(vertexA, 5)).toBeTruthy();
  });

  test('Should return true or false if an element with correct data is present or not in a connected graph and undirected', () => {
    const graph = new DirectedGraph<number>();
    graph.addVertex('A', 1);
    graph.addVertex('B', 2);
    graph.addVertex('C', 3);
    graph.addVertex('D', 4);
    const startVertex = graph.addVertex('E', 5);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('D', 'E');

    const depthFirstSearch = new DepthFirstSearch<number>(comparator);

    expect(depthFirstSearch.search(startVertex, 1)).toBeTruthy();
    expect(depthFirstSearch.search(startVertex, 2)).toBeTruthy();
    expect(depthFirstSearch.search(startVertex, 5)).toBeTruthy();
  });
});
