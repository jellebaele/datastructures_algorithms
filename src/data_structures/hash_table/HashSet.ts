import HashMap from './HashMap';
import { HashTableAllowedKeyTypes, HashTableAllowedValueTypes } from './HashTableAllowTypes';

export interface IHashSet<T extends HashTableAllowedValueTypes> {
  get size(): number;
  clear(): void;
  remove(key: T): boolean;
  entries(): IterableIterator<[T, T]>;
  forEach(callback: (key: T, map: IHashSet<T>) => void): void;
  has(key: T): boolean;
  keys(): IterableIterator<T>;
  add(key: T): this;
  values(): IterableIterator<T>;
}

export default class HashSet<T extends HashTableAllowedKeyTypes> implements IHashSet<T> {
  private _map: HashMap<T, true>;

  constructor(initialSize = 32) {
    this._map = new HashMap<T, true>(initialSize);
  }

  get size(): number {
    return this._map.size;
  }

  clear(): void {
    this._map.clear();
  }

  remove(key: T): boolean {
    return this._map.remove(key);
  }

  *entries(): IterableIterator<[T, T]> {
    for (const key of this._map.keys()) {
      yield [key, key];
    }
  }

  forEach(callback: (key: T, map: IHashSet<T>) => void): void {
    for (const key of this._map.keys()) {
      callback(key, this);
    }
  }

  has(key: T): boolean {
    return this._map.get(key) !== null ? true : false;
  }

  keys(): IterableIterator<T> {
    return this._map.keys();
  }

  add(key: T): this {
    this._map.set(key, true);
    return this;
  }

  values(): IterableIterator<T> {
    return this.keys();
  }
}
