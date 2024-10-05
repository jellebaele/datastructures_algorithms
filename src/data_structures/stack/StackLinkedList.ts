import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Node from '../shared/Node';
import IStack from './IStack';

export default class StackLinkedList<T> implements IStack<T> {
  private capacity: number;
  private front: Node<T> | null = null;
  private size = 0;

  constructor(capacity = 1000) {
    this.capacity = capacity;
  }

  getSize(): number {
    return this.size;
  }

  push(element: T): void {
    if (this.isFull()) throw new IndexOutOfBoundsError();

    const newNode = new Node(element);
    if (this.front) {
      newNode.next = this.front;
    }

    this.front = newNode;
    this.size++;
  }

  pop(): T | undefined {
    if (!this.front) return undefined;

    const temp = this.front;
    this.front = temp.next;
    this.size--;

    return temp.data;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  peek(): T | undefined {
    return this.front?.data ? this.front.data : undefined;
  }
}
