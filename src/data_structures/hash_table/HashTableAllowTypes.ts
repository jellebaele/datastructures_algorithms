export interface Equatable {
  equals(other: this): boolean;
}

export type HashTableAllowedTypes = string | number | boolean | Equatable;
