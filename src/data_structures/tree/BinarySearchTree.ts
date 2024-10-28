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

  private searchRecursively(data: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;
    else if (node.data === data) return node;
    else if (node.data > data) return this.searchRecursively(data, node.leftChild);
    else return this.searchRecursively(data, node.rightChild);
  }

  remove(key: T): void {
    this.root = this.removeRecursively(key, this.root);
  }

  private removeRecursively(data: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;

    if (data < node.data) {
      node.leftChild = this.removeRecursively(data, node.leftChild);
    } else if (data > node.data) {
      node.rightChild = this.removeRecursively(data, node.rightChild);
    } else {
      if (node.isLeaf()) {
        node = null;
        return node;
      } else if (!node.leftChild) {
        const temp = node.rightChild;
        node = null;
        return temp;
      } else if (!node.rightChild) {
        const temp = node.leftChild;
        node = null;
        return temp;
      } else {
        node.data = this.getLeftmostNode(node.rightChild).data;
        node.rightChild = this.removeRecursively(node.data, node.rightChild);
      }
    }

    return node;
  }

  private getLeftmostNode(node: TreeNode<T>): TreeNode<T> {
    let result = node;

    while (result.leftChild) {
      result = result.leftChild;
    }

    return result;
  }
}
