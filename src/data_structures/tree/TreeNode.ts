export default class TreeNode<T> {
  data: T;
  leftChild: TreeNode<T> | null;
  rightChild: TreeNode<T> | null;

  constructor(
    data: T,
    leftChild: TreeNode<T> | null = null,
    rightChild: TreeNode<T> | null = null,
  ) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }

  public isLeaf(): boolean {
    return !this.leftChild && !this.rightChild;
  }
}
