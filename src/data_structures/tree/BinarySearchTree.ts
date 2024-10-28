import NotImplementedError from '../../shared/errors/NotImplementedError';
import BinaryTree from './BinaryTree';
import ITree from './ITree';
import TreeNode from './TreeNode';

export default class BinarySearchTree<T> extends BinaryTree<T> implements ITree<T> {
  constructor(rootData: T) {
    super(rootData);
  }

  insert(data: T): TreeNode<T> {
    return this.insertRecursively(data, this.root);
  }

  private insertRecursively(data: T, node: TreeNode<T> | null): TreeNode<T> {
    if (!node) {
      const newNode = new TreeNode(data);
      if (!this.root) this.root = newNode;
      return newNode;
    }

    if (data < node.data) node.leftChild = this.insertRecursively(data, node.leftChild);
    else if (data > node.data) node.rightChild = this.insertRecursively(data, node.rightChild);

    return node;
  }

  // O(h) with h = height
  search(element: T): TreeNode<T> | null {
    return this.searchRecursively(element, this.root);
  }

  private searchRecursively(element: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;
    else if (node.data === element) return node;
    else if (node.data > element) return this.searchRecursively(element, node.leftChild);
    else return this.searchRecursively(element, node.rightChild);
  }

  remove(key: T): void {
    throw new NotImplementedError();
  }
}
