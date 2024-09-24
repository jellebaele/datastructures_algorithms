// https://algs4.cs.princeton.edu/34hash/
export const modularHash = (key: string, size: number): number => {
  let hash = 0;
  const prime = 31;

  if (typeof key === 'string') {
    for (let i = 0; i < key.length; i++) {
      hash = (prime * (hash + key.charCodeAt(i))) % size;
    }
  }

  return hash;
};
