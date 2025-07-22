import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Node from '../shared/Node';
import IQueue from './IQueue';

export default class QueueLinkedList<T> implements IQueue<T> {
  private capacity: number;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size = 0;

  constructor(capacity = Infinity) {
    this.capacity = capacity;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  isFull(): boolean {
    return this._size === this.capacity;
  }

  public get size(): number {
    return this._size;
  }

  enqueueList(elements: T[] | undefined): void {
    if (!elements) return undefined;
    if (elements.length + this._size >= this.capacity) throw new IndexOutOfBoundsError();

    for (const element of elements) {
      this.enqueue(element);
    }
  }

  enqueue(element: T): void {
    if (this.size === this.capacity) throw new IndexOutOfBoundsError();

    const newNode = new Node(element);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this._size++;
    return;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    if (!this.head) return undefined;

    const node = this.head;
    this.head = this.head.next;
    this._size--;
    return node.data;
  }

  peek(): T | undefined {
    return this.head?.data;
  }
}
