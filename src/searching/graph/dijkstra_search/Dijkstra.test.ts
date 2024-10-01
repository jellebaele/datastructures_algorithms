/* eslint-disable @typescript-eslint/no-non-null-assertion */
import WeightedGraph from '../../../data_structures/graph/WeightedGraph';
import Dijkstra from './Dijkstra';

describe('Dijkstra', () => {
  let weightedGraph: WeightedGraph<string>;
  let dijkstra: Dijkstra<string>;

  beforeEach(() => {
    weightedGraph = new WeightedGraph<string>();

    weightedGraph.addVertex('start', 'start');
    weightedGraph.addVertex('A', 'p1');
    weightedGraph.addVertex('B', 'p2');
    weightedGraph.addVertex('finish', 'finish');

    weightedGraph.addEdge('start', 'A', 6);
    weightedGraph.addEdge('start', 'B', 2);
    weightedGraph.addEdge('B', 'A', 3);
    weightedGraph.addEdge('A', 'finish', 1);
    weightedGraph.addEdge('B', 'finish', 5);

    dijkstra = new Dijkstra(weightedGraph);
  });

  test('should return the shortest path between start and finish', () => {
    const start = weightedGraph.getVertex('start')!;
    const finish = weightedGraph.getVertex('finish')!;

    const result = dijkstra.search(start, finish);
    expect(result).toEqual(['start', 'B', 'A', 'finish']);
  });

  test('should return the shortest path when only one edge exists between two vertices', () => {
    const simpleGraph = new WeightedGraph<string>();
    const v1 = simpleGraph.addVertex('v1', 'v1');
    const v2 = simpleGraph.addVertex('v2', 'v2');
    simpleGraph.addEdge('v1', 'v2', 4);

    const simpleDijkstra = new Dijkstra(simpleGraph);
    const result = simpleDijkstra.search(v1, v2);

    expect(result).toEqual(['v1', 'v2']);
  });

  test('should throw an error if no path is found between start and finish', () => {
    const newGraph = new WeightedGraph<string>();
    const v1 = newGraph.addVertex('v1', 'v1');
    newGraph.addVertex('v2', 'v2');
    const v3 = newGraph.addVertex('v3', 'v3'); // v3 is disconnected

    newGraph.addEdge('v1', 'v2', 1);

    const newDijkstra = new Dijkstra(newGraph);
    expect(() => newDijkstra.search(v1, v3)).toThrow();
  });

  test('should correctly update the parents and distances in complex graph', () => {
    const v1 = weightedGraph.getVertex('start')!;
    const v2 = weightedGraph.getVertex('finish')!;
    const result = dijkstra.search(v1, v2);

    expect(result).toEqual(['start', 'B', 'A', 'finish']);
  });

  test('should correctly find the shortes path when there is a short in the graph', () => {
    weightedGraph.addEdge('start', 'finish', 2);
    const start = weightedGraph.getVertex('start')!;
    const finish = weightedGraph.getVertex('finish')!;

    const result = dijkstra.search(start, finish);
    console.log(result);

    expect(result).toEqual(['start', 'finish']);
  });
});
