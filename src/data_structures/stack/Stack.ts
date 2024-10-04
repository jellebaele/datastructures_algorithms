import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';
import Collection from '../Collection';

export interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  peek(): T | undefined;
}

export default class Stack<T> extends Collection<T> implements IStack<T> {
  constructor(capacity = 1000) {
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
