interface ILinkedList<T> {
  isEmpty(): boolean;
  getSize(): number;
  add(element: T): T;
  addFirst(element: T): T;
  insert(index: number, element: T): T;
  get(index: number): T | null;
  getFirst(): T | null;
  getLast(): T | null;
  search(element: T): number;
  remove(index: number): T | null;
  removeFirst(): T | null;
  removeLast(): T | null;
  clear(): void;
  contains(element: T): boolean;
  indexOf(element: T): number;
  toString(): string;
}

export default ILinkedList;
