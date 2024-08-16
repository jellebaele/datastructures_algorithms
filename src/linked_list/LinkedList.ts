type Node<T> = {
  data: T;
  next: Node<T> | null;
};

export default class LinkedList<T> {
  private size = 0;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

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
    const newNode = this.makeNode(element, this.head);

    this.head = newNode;
    if (this.size === 0) this.tail = newNode;
    this.size++;

    return element;
  }

  public insert(index: number, element: T): T {
    if (index < 0 || index > this.size) throw new Error('Index out of bounds');
    if (index === this.size) return this.add(element);
    if (index === 0) return this.addFirst(element);

    const prevNode = this.findNodeBefore(index);
    if (prevNode) {
      const newNode = this.makeNode(element, prevNode.next);
      prevNode.next = newNode;
      this.size++;
    }

    return element;
  }

  public get(index: number): T | null {
    if (index < 0 || index >= this.size) return null;

    let node: Node<T> | null = this.head;
    for (let i = 0; i < index; i++) {
      node = node?.next || null;
    }

    return node ? node.data : null;
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

    while (node) {
      result += node.data + (node.next ? ' -> ' : '');
      node = node.next;
    }

    return result;
  }

  private makeNode(element: T, next: Node<T> | null = null): Node<T> {
    return {
      data: element,
      next: next,
    };
  }

  private findNodeBefore(index: number): Node<T> | null {
    if (index < 1 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (current) current = current.next;
    }

    return current;
  }
}
