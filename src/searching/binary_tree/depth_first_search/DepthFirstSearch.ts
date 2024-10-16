import Stack from '../../../data_structures/stack/Stack';
import { TreeNode } from '../../../data_structures/tree/BinaryTree';

export default class DepthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  public search(node: TreeNode<T>, searchElement: T): TreeNode<T> | null {
    const stack = new Stack<TreeNode<T>>(10);
    stack.push(node);

    while (stack.getSize() > 0) {
      const temp = stack.pop();

      if (!temp) continue;

      if (this.comparator(temp.data, searchElement)) return temp;

      if (temp.rightChild) stack.push(temp.rightChild);
      if (temp.leftChild) stack.push(temp.leftChild);
    }

    return null;
  }
}
