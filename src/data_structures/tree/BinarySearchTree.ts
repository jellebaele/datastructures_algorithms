import BinaryTree from './BinaryTree';
import ITree from './ITree';
import TreeNode from './TreeNode';

export default class BinarySearchTree<T> extends BinaryTree<T> implements ITree<T> {
  public insert(key: T): TreeNode<T> {
    if (!this.root) {
      this.root = new TreeNode(key);
      return this.root;
    }

    return this.insertRecursively(key, this.root);
  }

  private insertRecursively(key: T, node: TreeNode<T> | null): TreeNode<T> {
    if (!node) return new TreeNode(key);

    if (key < node.data) {
      node.leftChild = this.insertRecursively(key, node.leftChild);
    } else if (key > node.data) {
      node.rightChild = this.insertRecursively(key, node.rightChild);
    }

    return node;
  }

  // O(h) with h = height
  public search(element: T): TreeNode<T> | null {
    if (!this.root) return null;

    return this.searchRecursively(element, this.root);
  }

  private searchRecursively(element: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;
    else if (node.data === element) return node;
    else if (element < node.data) return this.searchRecursively(element, node.leftChild);
    else return this.searchRecursively(element, node.rightChild);
  }

  public remove(key: T): void {
    this.root = this.removeRecursively(key, this.root);
  }

  private removeRecursively(key: T, node: TreeNode<T> | null): TreeNode<T> | null {
    if (!node) return null;

    if (key < node.data) node.leftChild = this.removeRecursively(key, node.leftChild);
    else if (key > node.data) node.rightChild = this.removeRecursively(key, node.rightChild);
    else {
      if (node.isLeaf()) {
        node = null;
      } else if (!node.leftChild) {
        const temp = node.rightChild;
        node.rightChild = null;
        return temp;
      } else if (!node.rightChild) {
        const temp = node.leftChild;
        node.leftChild = null;
        return temp;
      } else {
        node.data = this.getLeftmostNode(node).data;
        node.leftChild = this.removeRecursively(node.data, node.leftChild);
      }
    }
    return node;
  }

  private getLeftmostNode(startNode: TreeNode<T>): TreeNode<T> {
    let result = startNode;

    while (result.leftChild) {
      result = result.leftChild;
    }

    return result;
  }
}
