import BinaryTree from './BinaryTree';
import { TraversalStrategy } from './ITree';

describe('BinaryTree', () => {
  let tree: BinaryTree<number>;

  beforeEach(() => {
    // Initialize a new tree before each test
    tree = new BinaryTree<number>(1);
  });

  test('should create a new tree with a root node', () => {
    expect(tree.root).toBeDefined();
    expect(tree.root.data).toBe(1);
    expect(tree.root.leftChild).toBeUndefined();
    expect(tree.root.rightChild).toBeUndefined();
  });

  test('should insert nodes correctly using BFS', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    // Root node
    expect(tree.root.data).toBe(1);
    // Left and right children of the root
    expect(tree.root.leftChild?.data).toBe(2);
    expect(tree.root.rightChild?.data).toBe(3);
    // Children of the left child
    expect(tree.root.leftChild?.leftChild?.data).toBe(4);
    expect(tree.root.leftChild?.rightChild?.data).toBe(5);
  });

  test('should perform in-order traversal correctly', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    const result = tree.toArray(TraversalStrategy.IN_ORDER_TRAVERSAL);
    expect(result).toEqual([4, 2, 5, 1, 3]);
  });

  test('should perform pre-order traversal correctly', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    const result = tree.toArray(TraversalStrategy.PRE_ORDER_TRAVERSAL);
    expect(result).toEqual([1, 2, 4, 5, 3]);
  });

  test('should perform post-order traversal correctly', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    const result = tree.toArray(TraversalStrategy.POST_ORDER_TRAVERSAL);
    expect(result).toEqual([4, 5, 2, 3, 1]);
  });

  test('should perform level-order traversal correctly', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});
