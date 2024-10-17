import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Node from '../shared/Node';
import IStack from './IStack';

export default class StackLinkedList<T> implements IStack<T> {
  private capacity: number;
  private front: Node<T> | null = null;
  private _size = 0;

  constructor(capacity = 1000) {
    this.capacity = capacity;
  }

  get size(): number {
    return this._size;
  }

  push(element: T): void {
    if (this.isFull()) throw new IndexOutOfBoundsError();

    const newNode = new Node(element);
    if (this.front) {
      newNode.next = this.front;
    }

    this.front = newNode;
    this._size++;
  }

  pop(): T | undefined {
    if (!this.front) return undefined;

    const temp = this.front;
    this.front = temp.next;
    this._size--;

    return temp.data;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  isFull(): boolean {
    return this._size === this.capacity;
  }

  peek(): T | undefined {
    return this.front?.data ? this.front.data : undefined;
  }
}
