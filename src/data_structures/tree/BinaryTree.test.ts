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
    expect(tree.root?.data).toBe(1);
    expect(tree.root?.leftChild).toBeNull();
    expect(tree.root?.rightChild).toBeNull();
  });

  test('should insert nodes correctly using BFS', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    // Root node
    expect(tree.root?.data).toBe(1);
    // Left and right children of the root
    expect(tree.root?.leftChild?.data).toBe(2);
    expect(tree.root?.rightChild?.data).toBe(3);
    // Children of the left child
    expect(tree.root?.leftChild?.leftChild?.data).toBe(4);
    expect(tree.root?.leftChild?.rightChild?.data).toBe(5);
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

  test('should remove a node and maintain correct level-order traversal', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    tree.remove(2);

    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);

    expect(result).toEqual([1, 3, 4, 5]);
  });

  test('should remove the root node and maintain correct structure', () => {
    tree.insert(2);
    tree.insert(3);

    tree.remove(1);
    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);

    expect(result).toEqual([3, 2]);
  });

  test('should remove a leaf node and maintain correct structure', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);

    tree.remove(4);
    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should not affect the tree when trying to remove a non-existent node', () => {
    tree.insert(2);
    tree.insert(3);
    tree.remove(10);

    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should remove the only node in the tree', () => {
    tree.remove(1);

    const result = tree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL);
    expect(result).toEqual([]);
  });

  it('should return 0 as height for an empty tree', () => {
    tree.root = null;

    expect(tree.height).toBe(0);
  });

  it('should return 1 as height for a tree with only the root node', () => {
    expect(tree.height).toBe(1);
  });

  it('should return 2 as height for a tree with a root and one child', () => {
    tree.insert(5);

    expect(tree.height).toBe(2);
  });

  it('should return 2 as height for a tree with a root and two children', () => {
    tree.insert(5);
    tree.insert(15);

    expect(tree.height).toBe(2);
  });

  it('should return 3 as height for a balanced tree with three levels', () => {
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(13);
    tree.insert(17);

    expect(tree.height).toBe(3);
  });

  it('should return the correct height for an unbalanced tree', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);

    tree.remove(4);
    tree.remove(5);
    tree.remove(6);

    expect(tree.height).toBe(3);
  });

  it('getLevel should return -1 for an empty tree', () => {
    tree.root = null;

    expect(tree.getLevel(10)).toBe(-1);
  });

  it('getLevel should return 1 for the root element', () => {
    expect(tree.getLevel(1)).toBe(1);
  });

  it('getLevel should return 2 for a direct child of the root', () => {
    tree.insert(2);
    tree.insert(3);

    expect(tree.getLevel(2)).toBe(2);
    expect(tree.getLevel(3)).toBe(2);
  });

  it('getLevel should return 3 for a child of a child', () => {
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);

    expect(tree.getLevel(3)).toBe(3);
  });

  it('getLevel should return -1 for an element not in the tree', () => {
    tree.insert(5);
    tree.insert(15);

    expect(tree.getLevel(20)).toBe(-1);
  });

  test('getLeafs should return an empty array for an empty tree', () => {
    tree.root = null;

    const result = tree.getLeafs();
    expect(result).toEqual([]);
  });

  test('getLeafs should return the only node as a leaf in a single-node tree', () => {
    const result = tree.getLeafs();
    expect(result).toEqual([1]);
  });

  test('getLeafs should return all nodes as leaves in a tree with only leaf nodes', () => {
    tree.insert(2);
    tree.insert(3);

    const result = tree.getLeafs();
    expect(result).toEqual([3, 2]);
  });

  test('getLeafs should return the correct leaf nodes in a balanced tree', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    const result = tree.getLeafs();
    expect(result).toEqual([3, 5, 4]);
  });

  test('getLeafs should return the correct leaf nodes in an unbalanced tree', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.remove(3);

    const result = tree.getLeafs();
    expect(result).toEqual([6, 5, 4]);
  });

  test('getLeafs should return leaf nodes at different levels', () => {
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(7);
    tree.insert(8);

    const result = tree.getLeafs();
    expect(result).toEqual([7, 6, 5, 8]);
  });
});
