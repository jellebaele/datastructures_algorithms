import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import IQueue from './IQueue';

type Node<T> = {
  data: T;
  next: Node<T> | null;
};

export default class QueueLinkedList<T> implements IQueue<T> {
  private capacity: number;
  private front: Node<T> | null = null;
  private rear: Node<T> | null = null;
  private size = 0;

  constructor(capacity = 1000) {
    this.capacity = capacity;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  public getSize(): number {
    return this.size;
  }

  enqueueList(elements: T[] | undefined): void {
    if (elements && elements.length > this.size + this.capacity) throw new IndexOutOfBoundsError();

    elements?.forEach(element => {
      this.enqueue(element);
    });
  }

  enqueue(element: T): void {
    if (this.getSize() === this.capacity) throw new IndexOutOfBoundsError();

    const newNode = this.makeNode(element);
    if (!this.rear) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
    return;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    if (!this.front) return undefined;

    const node = this.front;
    this.front = this.front.next;
    this.size--;
    return node.data;
  }

  peek(): T | undefined {
    return this.front?.data;
  }

  private makeNode(element: T, next: Node<T> | null = null): Node<T> {
    return {
      data: element,
      next: next,
    };
  }
}
