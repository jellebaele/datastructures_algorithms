import IndexOutOfBoundsError from '../../shared/errors/IndexOutOfBoundsError';

export default class MyArray<T> {
  private data: { [index: number]: T } = {};
  private maxLength: number;
  private currentLength = 0;

  constructor(length: number) {
    this.maxLength = length;
  }

  public getLength(): number {
    return this.currentLength;
  }

  public push(element: T): void {
    if (this.currentLength === this.maxLength) throw new IndexOutOfBoundsError();

    this.data[this.currentLength] = element;
    this.currentLength++;
  }

  public get(index: number): T {
    return this.data[index];
  }

  public pop(): T | undefined {
    if (this.currentLength === 0) return undefined;

    const data = this.data[this.currentLength - 1];
    delete this.data[this.currentLength];
    this.currentLength--;

    return data;
  }

  public delete(index: number): void {
    if (index > this.currentLength) return;

    delete this.data[index];

    for (let i = index + 1; i < this.currentLength; i++) {
      const originalData = this.data[i];
      this.data[i - 1] = originalData;
    }

    this.currentLength--;
  }

  public insert(index: number, element: T) {
    if (this.currentLength >= this.maxLength || index < 0 || index > this.currentLength)
      throw new IndexOutOfBoundsError();

    this.shiftItemsRight(index);
    this.data[index] = element;
    this.currentLength++;
  }

  public toString(): string {
    let result = '[ ';
    for (let i = 0; i < this.currentLength; i++) {
      result += this.data[i];
      if (i !== this.currentLength - 1) result += ',';
      result += ' ';
    }
    return result + ']';
  }

  private shiftItemsRight(startIndex: number) {
    for (let i = startIndex; i < this.currentLength; i++) {
      const originalData = this.data[i];
      this.data[i + 1] = originalData;
    }
  }
}
