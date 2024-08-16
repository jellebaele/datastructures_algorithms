type Node<T> = {
  data: T;
  next: Node<T> | null;
};

export default class LinkedList<T> {
  private size = 0;
  private head: Node<T> | null;
  private tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize() {
    return this.size;
  }

  public add(element: T) {
    const newNode = this.makeNode(element);

    if (this.size === 0) this.head = newNode;
    if (this.tail) this.tail.next = newNode;

    this.tail = newNode;
    this.size++;

    return element;
  }

  public addFirst(element: T) {
    if (!this.head) this.add(element);
    const newNode = this.makeNode(element, this.head);

    this.head = newNode;
    this.size++;

    return element;
  }

  public insert(index: number, element: T): T {
    if (index > this.size) throw new Error('Index out of bounds');
    if (index === this.size || !this.head) return this.add(element);

    let nextNode = this.head;

    let i = 0;
    while (nextNode && i < index) {
      nextNode = nextNode.next as Node<T>;
      i++;
    }
    const prevNode = this.findNodeBefore(nextNode);
    if (prevNode) {
      const newNode = this.makeNode(element, nextNode);
      prevNode.next = newNode;
    }

    this.size++;

    return element;
  }

  public get(index: number): T | null {
    if (this.size === 0 || !this.head || !this.tail) return null;

    let node: Node<T> | null = this.head;
    for (let i = 0; i < index; i++) {
      if (node) node = node.next;
    }

    if (node) return node.data;
    return null;
  }

  public getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  public getLast(): T | null {
    return this.tail ? this.tail.data : null;
  }

  public clear(): void {
    let currentNode = this.head;

    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = null; // Break the link to help garbage collection
      currentNode = nextNode;
    }

    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public toString(): string {
    let result = '';

    let node = this.head;
    while (node && node.next) {
      result += node.data + ' -> ';
      node = node.next;
    }

    if (this.tail) result += this.tail?.data;

    return result;
  }

  private makeNode(element: T, next: Node<T> | null = null): Node<T> {
    return {
      data: element,
      next: next,
    };
  }

  private findNodeBefore(node: Node<T> | null) {
    if (!node) return null;
    if (node === this.head) return null;

    let current = this.head;
    while (current) {
      if (current.next === node) break;
      current = current.next;
    }

    return current;
  }
}
