interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  peek(): T | undefined;
  size: number;
}

export default IStack;
