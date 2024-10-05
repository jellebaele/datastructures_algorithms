interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  isEmpty(): boolean;
  isFull(): boolean;
  peek(): T | undefined;
  getSize(): number;
}

export default IStack;
