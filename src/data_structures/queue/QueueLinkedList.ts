import Collection from '../Collection';
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
    throw new Error('Method not implemented.');
  }
  enqueue(element: T): void {
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

    throw new Error('Method not implemented.');
  }
  peek(): T | undefined {
    throw new Error('Method not implemented.');
  }

  private makeNode(element: T, next: Node<T> | null = null): Node<T> {
    return {
      data: element,
      next: next,
    };
  }
}
