import BinarySearchTree from './BinarySearchTree';

describe('BinarySearchTree', () => {
  let binarySearchTree: BinarySearchTree<number>;

  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(1);
  });

  describe('insert', () => {
    it('should insert al right correctly', () => {
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
});
