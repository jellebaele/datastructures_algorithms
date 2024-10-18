import BinaryTree from './BinaryTree';
import ITree from './ITree';
import TreeNode from './TreeNode';

export default class BinarySearchTree<T> extends BinaryTree<T> implements ITree<T> {
  private comparator: (a: T, b: T) => number;

  constructor(rootData: T, comparator?: (a: T, b: T) => number) {
    super(rootData);
    this.comparator = comparator ? comparator : (a: T, b: T) => (a < b ? 1 : 0);
  }

  insert(data: T): TreeNode<T> {
    if (!this.root) {
      this.root = new TreeNode(data);
      return this.root;
    }

    return this._insert(data, this.root);
  }

  private _insert(data: T, node: TreeNode<T> | null): TreeNode<T> {
    if (!node) return new TreeNode(data);

    if (this.comparator(data, node.data)) node.leftChild = this._insert(data, node.leftChild);
    else if (this.comparator(node.data, data))
      node.rightChild = this._insert(data, node.rightChild);

    return node;
  }

  remove(key: T): void {
    throw new Error('Method not implemented.');
  }

  search(element: T): TreeNode<T> | null {
    throw new Error('Method not implemented.');
  }
}
