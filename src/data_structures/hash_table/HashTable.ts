// https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/
// https://algs4.cs.princeton.edu/34hash/

import { modularHash } from '../../shared/utils/hashing';

type HashTableAllowedTypes = number | string | object;

interface IHashTable<T extends HashTableAllowedTypes> {
  getSize(): number;
  clear(): void;
  delete(key: string): void;
  get(key: string): T | undefined;
  set(key: string, value: T): void;
  has(key: string): boolean;
}

export default class HashTable<T extends HashTableAllowedTypes> implements IHashTable<T> {
  private size: number;
  private table: [string, T][][];
  private initialBaseArraySize: number;

  // Normally the initialSize would not be exposed, it's just for the sake of testing
  constructor(initialSize = 1000) {
    this.size = 0;
    this.initialBaseArraySize = initialSize;
    this.table = new Array(this.initialBaseArraySize);
  }

  getSize(): number {
    return this.size;
  }

  clear(): void {
    this.size = 0;
    this.table = new Array(this.initialBaseArraySize);
  }

  delete(key: string): void {
    const hashedKey = modularHash(key, this.table.length);

    const entries = this.table[hashedKey];
    if (entries) {
      const entryIndex = entries.findIndex(key => key === key);

      if (entryIndex !== -1) {
        this.table[hashedKey].splice(entryIndex, 1);
        this.size--;
      }
    }
  }

  get(key: string): T | undefined {
    const hashedKey = modularHash(key, this.table.length);

    const entries = this.table[hashedKey];
    if (!entries) return undefined;

    // O(n)
    const entry = entries.find(x => x[0] === key);

    return entry && entry.length === 2 ? entry[1] : undefined;
  }

  /**
   * Using Separate chaining with a 2 dimensional array for dealing with collisions.
   * Other possible methods include: using a linked list with Separate chaining,
   * linear probing, quadratic probing, double hashing...
   */
  set(key: string, value: T): void {
    const loadFactor = this.size / this.table.length;
    if (loadFactor > 0.8) this.resizeTable();

    this.setValueInTable(this.table, key, value);

    this.size++;
  }

  has(key: string): boolean {
    const hashedKey = modularHash(key, this.table.length);

    return this.table[hashedKey] && this.table[hashedKey].length > 0 ? true : false;
  }

  private resizeTable() {
    const newTable = new Array(this.table.length * 2);

    this.table.forEach(entries => {
      if (entries && entries.length > 0) {
        entries.forEach(entry => {
          this.setValueInTable(newTable, entry[0], entry[1]);
        });
      }
    });

    this.table = newTable;
  }

  private setValueInTable(table: [string, T][][], key: string, value: T): void {
    const hashedKey = modularHash(key, table.length);

    if (table[hashedKey]) {
      const entry = table[hashedKey].find(x => x[0] === key);
      if (!entry) {
        table[hashedKey].push([key, value]);
      } else {
        entry[1] = value;
      }
    } else {
      table[hashedKey] = [[key, value]];
    }
  }
}
