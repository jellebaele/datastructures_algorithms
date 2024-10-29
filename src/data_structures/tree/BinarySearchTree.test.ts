import BinarySearchTree from './BinarySearchTree';
import { TraversalStrategy } from './ITree';

describe('BinarySearchTree', () => {
  let binarySearchTree: BinarySearchTree<number>;

  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(1);
  });

  describe('insert', () => {
    it('should insert all higher values to the right child', () => {
      binarySearchTree.insert(2);
      binarySearchTree.insert(3);
      binarySearchTree.insert(4);

      expect(binarySearchTree.root?.data).toBe(1);
      expect(binarySearchTree.root?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.data).toBe(2);
      expect(binarySearchTree.root?.rightChild?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.rightChild?.data).toBe(3);
      expect(binarySearchTree.root?.rightChild?.rightChild?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.rightChild?.rightChild?.data).toBe(4);
    });

    it('should hanlde inserting in left and right correctly', () => {
      binarySearchTree.insert(4);
      binarySearchTree.insert(3);
      binarySearchTree.insert(5);

      expect(binarySearchTree.root?.data).toBe(1);
      expect(binarySearchTree.root?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.data).toBe(4);
      expect(binarySearchTree.root?.rightChild?.leftChild?.data).toBe(3);
      expect(binarySearchTree.root?.rightChild?.rightChild?.data).toBe(5);
    });

    it('should not insert duplicate nodes', () => {
      binarySearchTree.insert(2);
      binarySearchTree.insert(2);

      expect(binarySearchTree.root?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.data).toBe(2);
      expect(binarySearchTree.root?.rightChild?.leftChild).toBeNull();
      expect(binarySearchTree.root?.rightChild?.rightChild).toBeNull();
    });
  });

  describe('search', () => {
    it('should find the root node', () => {
      const node = binarySearchTree.search(1);

      expect(node?.data).toBe(1);
    });

    it('should find a node in the left subtree', () => {
      populateBinarySearchTree(binarySearchTree);

      const node = binarySearchTree.search(5);
      expect(node?.data).toBe(5);
    });

    it('should find a node in the right subtree', () => {
      populateBinarySearchTree(binarySearchTree);

      const node = binarySearchTree.search(15);
      expect(node?.data).toBe(15);
    });

    it('should find a leaf node', () => {
      populateBinarySearchTree(binarySearchTree);

      const node = binarySearchTree.search(7);
      expect(node?.data).toBe(7);
    });

    it('should return null when the node is not present', () => {
      populateBinarySearchTree(binarySearchTree);
      const node = binarySearchTree.search(20);
      expect(node).toBeNull();
    });

    it('should return null when searching for a value smaller than any in the tree', () => {
      populateBinarySearchTree(binarySearchTree);

      const node = binarySearchTree.search(-1);
      expect(node).toBeNull();
    });

    it('should return null when searching for a value larger than any in the tree', () => {
      populateBinarySearchTree(binarySearchTree);

      const node = binarySearchTree.search(30);
      expect(node).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove the root node in a tree with only one node', () => {
      binarySearchTree.remove(1);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([]);
    });

    it('should remove a leaf node', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(3);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 5, 15, 7, 18, 12,
      ]);
    });

    it('should remove a node with only a left child', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.insert(17);
      binarySearchTree.remove(18);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 5, 3, 15, 7, 17, 12,
      ]);
    });

    it('should remove a node with only a right child', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(7);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 5, 3, 15, 12, 18,
      ]);
    });

    it('should remove root correctly', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(1);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        5, 3, 15, 7, 18, 12,
      ]);
    });

    it('should remove a node with two children in the middle of the three case 1', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(15);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 5, 3, 7, 12, 18,
      ]);
    });

    it('should remove a node with two children in the middle of the three case 2', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(5);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 3, 15, 7, 18, 12,
      ]);
    });

    it('should not modify the tree when removing a non-existent element', () => {
      populateBinarySearchTree(binarySearchTree);
      binarySearchTree.remove(100);

      expect(binarySearchTree.toArray(TraversalStrategy.LEVEL_ORDER_TRAVERSAL)).toEqual([
        1, 5, 3, 15, 7, 18, 12,
      ]);
    });
  });

  function populateBinarySearchTree(binarySearchTree: BinarySearchTree<number>) {
    binarySearchTree.insert(5);
    binarySearchTree.insert(15);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(12);
    binarySearchTree.insert(18);
  }
});
