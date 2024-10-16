import Queue from '../../../data_structures/queue/Queue';
import { TreeNode } from '../../../data_structures/tree/BinaryTree';

export default class BreadthFirstSearch<T> {
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  // O(V+E) (V = vertices, E = edges)
  public search(startNode: TreeNode<T>, searchTerm: T): TreeNode<T> | null {
    const searchQueue = new Queue<TreeNode<T>>();
    searchQueue.enqueue(startNode);

    while (searchQueue.getSize() > 0) {
      const temp = searchQueue.dequeue();
      if (!temp) continue;

      if (this.comparator(temp.data, searchTerm)) return temp;
      if (temp.leftChild) searchQueue.enqueue(temp.leftChild);
      if (temp.rightChild) searchQueue.enqueue(temp.rightChild);
    }

    return null;
  }
}
