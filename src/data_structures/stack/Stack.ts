import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Collection from '../Collection';
import IStack from './IStack';

const DEFAULT_CAPACITY = 1000;

export default class Stack<T> extends Collection<T> implements IStack<T> {
  constructor(capacity = DEFAULT_CAPACITY) {
    super(capacity);
  }

  push(element: T): void {
    if (this.isFull()) throw new IndexOutOfBoundsError();
    else this.data.push(element);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
}
