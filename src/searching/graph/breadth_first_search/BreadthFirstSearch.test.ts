import Graph from '../../../data_structures/graph/Graph';
import BreadthFirstSearch from './BreadthFirstSearch';

describe('BreadthFirstSearch', () => {
  let comparator: (a: number, b: number) => number;

  beforeEach(() => {
    comparator = (a: number, b: number) => (a === b ? 1 : 0);
  });

  test('Should return true or false if an element with correct data is present or not in unconnected graph', () => {
    const graph = new Graph<number>();
    const startNode = graph.addNode('A', 1);

    const breadthFirstSearch = new BreadthFirstSearch<number>(comparator);

    expect(breadthFirstSearch.search(startNode, 1)).toBeTruthy();
    expect(breadthFirstSearch.search(startNode, 2)).toBeFalsy();
  });

  test('Should return true or false if an element with correct data is present or not in a connected graph', () => {
    const graph = new Graph<number>();
    const nodeA = graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addNode('C', 3);
    graph.addNode('D', 4);
    graph.addNode('E', 5);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('D', 'E');

    const breadthFirstSearch = new BreadthFirstSearch<number>(comparator);

    expect(breadthFirstSearch.search(nodeA, 1)).toBeTruthy();
    expect(breadthFirstSearch.search(nodeA, 2)).toBeTruthy();
    expect(breadthFirstSearch.search(nodeA, 5)).toBeTruthy();
  });

  test('Should return true or false if an element with correct data is present or not in a connected graph and undirected', () => {
    const graph = new Graph<number>();
    graph.addNode('A', 1);
    graph.addNode('B', 2);
    graph.addNode('C', 3);
    graph.addNode('D', 4);
    const startNode = graph.addNode('E', 5);

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('D', 'E');

    const breadthFirstSearch = new BreadthFirstSearch<number>(comparator);

    expect(breadthFirstSearch.search(startNode, 1)).toBeTruthy();
    expect(breadthFirstSearch.search(startNode, 2)).toBeTruthy();
    expect(breadthFirstSearch.search(startNode, 5)).toBeTruthy();
  });
});
