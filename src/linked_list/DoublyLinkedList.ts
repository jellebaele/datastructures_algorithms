import IndexOutOfBoundsError from '../shared/errors/IndexOutOfBoundsError';

type Node<T> = {
  data: T;
  prev: Node<T> | null;
  next: Node<T> | null;
};

export default class DoublyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size = 0;

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  public addFirst(element: T): T {
    const newNode = this.makeNode(element);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      const originalHead = this.head;
      this.head = newNode;
      this.head.next = originalHead;
    }

    this.size++;

    return element;
  }

  // O(1)
  public add(element: T): T {
    const newNode = this.makeNode(element);

    if (this.size === 0) this.head = newNode;
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    this.size++;

    return element;
  }

  // O(N)
  public get(index: number): T | null {
    if (index < 0 || index >= this.size) throw new IndexOutOfBoundsError();

    let node: Node<T> | null = this.head;
    for (let i = 0; i < index; i++) {
      node = node ? node.next : null;
    }

    return node ? node.data : null;
  }

  // O(N)
  public search(element: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === element) return index;

      index++;
      current = current.next;
    }

    return -1;
  }

  public getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  public getLast(): T | null {
    return this.tail ? this.tail.data : null;
  }

  // O(n)
  public toString(): string {
    let result = '';
    let currentNode = this.head;

    while (currentNode) {
      result += currentNode.data + (currentNode.next ? ' <-> ' : '');
      currentNode = currentNode.next;
    }

    return result;
  }

  private makeNode(element: T, prev: Node<T> | null = null, next: Node<T> | null = null): Node<T> {
    return {
      data: element,
      prev: prev,
      next: next,
    };
  }
}
