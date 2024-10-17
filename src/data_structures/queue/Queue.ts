import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Collection from '../Collection';
import IQueue from './IQueue';

const DEFAULT_CAPACITY = 1000;

export default class Queue<T> extends Collection<T> implements IQueue<T> {
  constructor(capacity = DEFAULT_CAPACITY) {
    super(capacity);
  }

  enqueue(element: T): void {
    if (this.isFull()) throw new IndexOutOfBoundsError();
    else this.data.push(element);
  }

  enqueueList(elements: T[] | undefined): void {
    if (!elements) return;
    if (elements.length + this.size > this.capacity) throw new IndexOutOfBoundsError();

    for (const element of elements) {
      this.enqueue(element);
    }
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }
}
