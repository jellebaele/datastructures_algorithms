import TreeNode from '../../../data_structures/tree/TreeNode';
import BreadthFirstSearch from './BreadthFirstSearch';

describe('BreadthFirstSearch', () => {
  const comparator = (a: number, b: number) => (a === b ? 1 : 0);
  const bfs = new BreadthFirstSearch(comparator);

  const createTree = () => {
    const root = new TreeNode(1);
    root.leftChild = new TreeNode(2);
    root.rightChild = new TreeNode(3);
    root.leftChild.leftChild = new TreeNode(4);
    root.leftChild.rightChild = new TreeNode(5);
    root.rightChild.leftChild = new TreeNode(6);
    root.rightChild.rightChild = new TreeNode(7);

    return root;
  };

  test('should find a node with the given value', () => {
    const root = createTree();
    const result = bfs.search(5, root);
    expect(result).not.toBeNull();
    expect(result?.data).toBe(5);
  });

  test('should return null if the node with the value does not exist', () => {
    const root = createTree();
    const result = bfs.search(8, root);
    expect(result).toBeNull();
  });

  test('should return null when searching an empty tree', () => {
    const result = bfs.search(1, null as unknown as TreeNode<number>);
    expect(result).toBeNull();
  });

  test('should find a leaf node', () => {
    const root = createTree();
    const result = bfs.search(7, root);
    expect(result).not.toBeNull();
    expect(result?.data).toBe(7);
  });
});
